import { create } from 'zustand'
import {
  chatApi,
  streamRequest,
  type AgentArtifact,
  type AgentSource,
  type AgentStep,
  type ChatMessage,
  type ChatSummary,
} from '@/lib/api'
import { LIMITS, MODELS, STORAGE_KEYS, type ChatMode, type ModelId } from '@/lib/config'
import { safeJsonParse } from '@/lib/utils'
import { useAuthStore } from './auth'

interface GuestChat {
  id: string
  title: string
  messages: ChatMessage[]
  updated_at: string
}

interface ChatState {
  chats: ChatSummary[]
  activeChatId: number | 'new' | null
  messages: ChatMessage[]
  isLoadingChats: boolean
  isLoadingMessages: boolean
  isSending: boolean
  model: ModelId
  mode: ChatMode
  agentMode: boolean
  streamingId: string | null

  guestChats: GuestChat[]
  guestActiveId: string | null
  guestQuestionsLeft: number

  hydrate: () => void
  setModel: (model: ModelId) => void
  setMode: (mode: ChatMode) => void
  setAgentMode: (on: boolean) => void
  stopGeneration: () => void

  loadChats: () => Promise<void>
  selectChat: (id: number | 'new') => Promise<void>
  createNew: () => void
  removeChat: (id: number) => Promise<void>
  renameChat: (id: number, title: string) => Promise<void>
  sendMessage: (text: string) => Promise<{ ok: boolean; error?: string }>

  selectGuestChat: (id: string) => void
  createGuestChat: () => void
  removeGuestChat: (id: string) => void
  resetGuestQuota: () => void
  resetSession: () => void
}

function persistGuest(chats: GuestChat[], left: number) {
  try {
    localStorage.setItem(STORAGE_KEYS.guestChats, JSON.stringify(chats))
    localStorage.setItem(STORAGE_KEYS.guestQuotaLeft, String(left))
  } catch {
    return
  }
}

function persistModelPrefs(model: ModelId, mode: ChatMode) {
  try {
    localStorage.setItem(STORAGE_KEYS.selectedModel, model)
    localStorage.setItem(STORAGE_KEYS.selectedMode, mode)
  } catch {
    return
  }
}

const DEFAULT_MODEL: ModelId = MODELS[0].id
const DEFAULT_MODE: ChatMode = 'fast'

let abortController: AbortController | null = null

const TOOL_LABELS: Record<string, string> = {
  web_arama: 'İnternette arıyor',
  derin_arastirma: 'Derinlemesine araştırıyor',
  sayfa_oku: 'Sayfayı okuyor',
  dosya_yaz: 'Dosya yazıyor',
  dosya_oku: 'Dosyayı okuyor',
  dosya_listele: 'Klasörü listeliyor',
  dosya_sil: 'Dosyayı siliyor',
  pdf_olustur: 'PDF hazırlıyor',
  sunum_olustur: 'Sunum hazırlıyor',
  tablo_olustur: 'Tablo hazırlıyor',
}

function toolLabel(name: string): string {
  return TOOL_LABELS[name] ?? name.replace(/_/g, ' ')
}

type SetState = (fn: (s: ChatState) => Partial<ChatState>) => void

function createPatcher(set: SetState, get: () => ChatState) {
  let contentBuffer = ''
  let reasoningBuffer = ''
  let scheduled = false

  const applyToLast = (mutate: (msg: ChatMessage) => ChatMessage) => {
    set((s) => {
      const messages = s.messages.slice()
      for (let i = messages.length - 1; i >= 0; i--) {
        if (messages[i].role === 'assistant') {
          messages[i] = mutate(messages[i])
          break
        }
      }
      return { messages }
    })
  }

  const flush = () => {
    scheduled = false
    if (!contentBuffer && !reasoningBuffer) return
    const c = contentBuffer
    const r = reasoningBuffer
    contentBuffer = ''
    reasoningBuffer = ''
    applyToLast((m) => ({
      ...m,
      content: c ? m.content + c : m.content,
      reasoning: r ? (m.reasoning ?? '') + r : m.reasoning,
    }))
  }

  const schedule = () => {
    if (scheduled) return
    scheduled = true
    setTimeout(flush, 45)
  }

  const patch = (partial: Partial<ChatMessage>) => {
    flush()
    applyToLast((m) => ({ ...m, ...partial }))
  }

  patch.appendContent = (text: string) => {
    if (!text) return
    contentBuffer += text
    schedule()
  }

  patch.appendReasoning = (text: string) => {
    if (!text) return
    reasoningBuffer += text
    schedule()
  }

  patch.upsertStep = (step: AgentStep) => {
    flush()
    applyToLast((m) => {
      const steps = (m.steps ?? []).slice()
      const idx = steps.findIndex((s) => s.id === step.id)
      if (idx >= 0) steps[idx] = { ...steps[idx], ...step }
      else steps.push(step)
      return { ...m, steps }
    })
  }

  patch.addSource = (source: AgentSource) => {
    if (!source?.url) return
    flush()
    applyToLast((m) => {
      const sources = m.sources ?? []
      if (sources.some((s) => s.url === source.url)) return m
      return { ...m, sources: [...sources, source] }
    })
  }

  patch.addArtifact = (artifact: AgentArtifact) => {
    if (!artifact?.path) return
    flush()
    applyToLast((m) => {
      const artifacts = (m.artifacts ?? []).filter((a) => a.path !== artifact.path)
      return { ...m, artifacts: [...artifacts, artifact] }
    })
  }

  patch.finish = (final: Partial<ChatMessage> & { content?: string }) => {
    flush()
    void get
    applyToLast((m) => ({
      ...m,
      ...final,
      content: final.content !== undefined ? final.content : m.content,
      streaming: false,
    }))
  }

  return patch
}

export const useChatStore = create<ChatState>((set, get) => ({
  chats: [],
  activeChatId: null,
  messages: [],
  isLoadingChats: false,
  isLoadingMessages: false,
  isSending: false,
  model: DEFAULT_MODEL,
  mode: DEFAULT_MODE,
  agentMode: false,
  streamingId: null,

  guestChats: [],
  guestActiveId: null,
  guestQuestionsLeft: LIMITS.guestQuestionsPerSession,

  hydrate: () => {
    try {
      const rawModel = localStorage.getItem(STORAGE_KEYS.selectedModel)
      const storedModel: ModelId = MODELS.some((m) => m.id === rawModel) ? (rawModel as ModelId) : DEFAULT_MODEL
      const storedMode = (localStorage.getItem(STORAGE_KEYS.selectedMode) as ChatMode | null) ?? DEFAULT_MODE
      const guestChats = safeJsonParse<GuestChat[]>(localStorage.getItem(STORAGE_KEYS.guestChats), [])
      const leftRaw = localStorage.getItem(STORAGE_KEYS.guestQuotaLeft)
      const left = leftRaw === null ? LIMITS.guestQuestionsPerSession : Math.max(0, Number(leftRaw) || 0)
      set({
        model: storedModel,
        mode: storedMode,
        guestChats,
        guestQuestionsLeft: left,
      })
    } catch {
      return
    }
  },

  setModel: (model) => {
    persistModelPrefs(model, get().mode)
    set({ model })
  },
  setMode: (mode) => {
    persistModelPrefs(get().model, mode)
    set({ mode })
  },

  loadChats: async () => {
    if (!useAuthStore.getState().token) return
    set({ isLoadingChats: true })
    try {
      const chats = await chatApi.list()
      set({ chats })
    } catch {
      return
    } finally {
      set({ isLoadingChats: false })
    }
  },

  selectChat: async (id) => {
    if (id === 'new') {
      set({ activeChatId: 'new', messages: [] })
      return
    }
    set({ activeChatId: id, isLoadingMessages: true, messages: [] })
    try {
      const messages = await chatApi.messages(id)
      set({ messages })
    } catch {
      set({ messages: [] })
    } finally {
      set({ isLoadingMessages: false })
    }
  },

  createNew: () => {
    set({ activeChatId: 'new', messages: [] })
  },

  removeChat: async (id) => {
    await chatApi.remove(id)
    set((s) => ({
      chats: s.chats.filter((c) => c.id !== id),
      activeChatId: s.activeChatId === id ? null : s.activeChatId,
      messages: s.activeChatId === id ? [] : s.messages,
    }))
  },

  renameChat: async (id, title) => {
    await chatApi.rename(id, title)
    set((s) => ({
      chats: s.chats.map((c) => (c.id === id ? { ...c, title } : c)),
    }))
  },

  sendMessage: async (text) => {
    const trimmed = text.trim()
    if (!trimmed) return { ok: false, error: 'Mesaj boş olamaz' }
    if (get().isSending) return { ok: false, error: 'Önceki mesaj tamamlanmadı' }

    const token = useAuthStore.getState().token
    const { model, mode } = get()
    const now = new Date().toISOString()

    if (!token) {
      const left = get().guestQuestionsLeft
      if (left <= 0) {
        return { ok: false, error: 'Misafir hakkınız doldu. Hesap oluşturun.' }
      }
      let activeId = get().guestActiveId
      const guestChats = [...get().guestChats]
      if (!activeId) {
        const newChat: GuestChat = {
          id: `g_${Date.now()}`,
          title: trimmed.slice(0, 40),
          messages: [],
          updated_at: now,
        }
        guestChats.unshift(newChat)
        activeId = newChat.id
        set({ guestActiveId: activeId })
      }
      const chat = guestChats.find((c) => c.id === activeId)!
      const history = chat.messages.map((m) => ({ role: m.role, content: m.content }))
      chat.messages.push({ role: 'user', content: trimmed, created_at: now })
      chat.updated_at = now
      set({ guestChats, messages: [...chat.messages], isSending: true })

      try {
        const res = await chatApi.guest({ message: trimmed, model, mode, history })
        chat.messages.push({
          role: 'assistant',
          content: res.response,
          created_at: new Date().toISOString(),
          usage: res.usage ?? null,
          model,
        })
        const newLeft = Math.max(0, left - 1)
        persistGuest(guestChats, newLeft)
        set({ guestChats: [...guestChats], messages: [...chat.messages], guestQuestionsLeft: newLeft })
        return { ok: true }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Yanıt alınamadı'
        chat.messages.push({
          role: 'assistant',
          content: `Yanıt alınamadı: ${errorMsg}. Lütfen tekrar deneyin.`,
          created_at: new Date().toISOString(),
        })
        set({ guestChats: [...guestChats], messages: [...chat.messages] })
        return { ok: false, error: errorMsg }
      } finally {
        set({ isSending: false })
      }
    }

    const activeChatId = get().activeChatId === 'new' || !get().activeChatId ? 'new' : get().activeChatId
    const useAgent = get().agentMode && model === 'qwen'
    const optimisticUser: ChatMessage = { role: 'user', content: trimmed, created_at: now }
    const placeholder: ChatMessage = {
      role: 'assistant',
      content: '',
      created_at: new Date().toISOString(),
      model,
      streaming: true,
      reasoning: '',
      sources: [],
      artifacts: [],
      steps: [],
      agentMode: useAgent ? 'agent' : null,
    }

    abortController = new AbortController()
    set((s) => ({
      messages: [...s.messages, optimisticUser, placeholder],
      isSending: true,
      streamingId: now,
    }))

    const patch = createPatcher(set, get)
    let resolvedChatId: number | null = typeof activeChatId === 'number' ? activeChatId : null
    let sawTitle: string | null = null
    let failed: string | null = null

    try {
      await streamRequest(
        useAgent ? '/agent/run' : '/chat/stream',
        { chatId: activeChatId, message: trimmed, model, mode },
        {
          onEvent: (event, data) => {
            switch (event) {
              case 'start':
                if (data?.chatId) resolvedChatId = data.chatId
                patch({ agentMode: data?.mode ?? (useAgent ? 'agent' : null) })
                break
              case 'reasoning':
                patch.appendReasoning(String(data?.text ?? ''))
                break
              case 'delta':
              case 'content':
                patch.appendContent(String(data?.text ?? ''))
                break
              case 'step':
                break
              case 'tool_start':
                patch.upsertStep({
                  id: String(data?.id ?? Math.random()),
                  name: String(data?.name ?? 'arac'),
                  label: toolLabel(String(data?.name ?? '')),
                  status: 'running',
                })
                break
              case 'tool_end':
                patch.upsertStep({
                  id: String(data?.id ?? ''),
                  name: String(data?.name ?? ''),
                  label: toolLabel(String(data?.name ?? '')),
                  status: data?.ok ? 'done' : 'error',
                  summary: data?.summary ? String(data.summary).slice(0, 160) : undefined,
                  durationMs: data?.durationMs,
                })
                break
              case 'source':
                patch.addSource(data)
                break
              case 'artifact':
                patch.addArtifact(data)
                break
              case 'notice':
                break
              case 'done':
                if (data?.chatId) resolvedChatId = data.chatId
                if (data?.newTitle) sawTitle = data.newTitle
                patch.finish({
                  content: typeof data?.text === 'string' && data.text.length > 0 ? data.text : undefined,
                  usage: data?.usage ?? null,
                  id: data?.messageId ?? undefined,
                  stopReason: data?.stopReason,
                  elapsedMs: data?.elapsedMs,
                })
                break
              case 'error':
                failed = String(data?.error ?? 'Yanıt alınamadı')
                break
              default:
                break
            }
          },
        },
        abortController.signal,
      )
    } catch (err) {
      const rawMsg = err instanceof Error ? err.message : 'Mesaj gönderilemedi'
      failed =
        rawMsg === 'MESSAGE_LIMIT_REACHED'
          ? `Bu sohbette mesaj limitine ulaştınız (${LIMITS.freeMessagesPerChat} mesaj). Yeni bir sohbet başlatabilir veya Plus aboneliği alarak sınırsız mesaj atabilirsiniz.`
          : rawMsg
    } finally {
      abortController = null
    }

    const current = get().messages
    const last = current[current.length - 1]

    if (failed && last && last.role === 'assistant' && !last.content) {
      patch.finish({ content: `Yanıt alınamadı: ${failed}` })
      set({ isSending: false, streamingId: null })
      return { ok: false, error: failed }
    }

    patch.finish({})
    set({ isSending: false, streamingId: null })
    if (resolvedChatId) set({ activeChatId: resolvedChatId })

    if (activeChatId === 'new' || sawTitle) {
      await get().loadChats()
    } else if (resolvedChatId) {
      const id = resolvedChatId
      set((s) => ({
        chats: s.chats.map((c) =>
          c.id === id
            ? { ...c, updated_at: new Date().toISOString(), message_count: (c.message_count ?? 0) + 2 }
            : c,
        ),
      }))
    }

    return failed ? { ok: false, error: failed } : { ok: true }
  },

  setAgentMode: (on) => set({ agentMode: on }),

  stopGeneration: () => {
    if (abortController) {
      try {
        abortController.abort()
      } catch {
        void 0
      }
      abortController = null
    }
    set({ isSending: false, streamingId: null })
  },

  selectGuestChat: (id) => {
    const chat = get().guestChats.find((c) => c.id === id)
    if (!chat) return
    set({ guestActiveId: id, messages: [...chat.messages] })
  },

  createGuestChat: () => {
    set({ guestActiveId: null, messages: [] })
  },

  removeGuestChat: (id) => {
    const next = get().guestChats.filter((c) => c.id !== id)
    persistGuest(next, get().guestQuestionsLeft)
    set((s) => ({
      guestChats: next,
      guestActiveId: s.guestActiveId === id ? null : s.guestActiveId,
      messages: s.guestActiveId === id ? [] : s.messages,
    }))
  },

  resetGuestQuota: () => {
    persistGuest(get().guestChats, LIMITS.guestQuestionsPerSession)
    set({ guestQuestionsLeft: LIMITS.guestQuestionsPerSession })
  },

  resetSession: () =>
    set({
      chats: [],
      activeChatId: null,
      messages: [],
      isLoadingChats: false,
      isLoadingMessages: false,
      isSending: false,
    }),
}))
