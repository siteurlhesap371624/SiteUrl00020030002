import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { ArrowUp, Radar, Square } from 'lucide-react'
import { useChatStore } from '@/lib/store/chat'
import { useAuthStore } from '@/lib/store/auth'
import { useUIStore } from '@/lib/store/ui'
import { LIMITS, MODELS, type ModelId } from '@/lib/config'
import { cn } from '@/lib/utils'

interface ComposerProps {
  disabled?: boolean
  onSent?: () => void
}

export function Composer({ disabled, onSent }: ComposerProps) {
  const [value, setValue] = useState('')
  const taRef = useRef<HTMLTextAreaElement | null>(null)
  const isSending = useChatStore((s) => s.isSending)
  const send = useChatStore((s) => s.sendMessage)
  const model = useChatStore((s) => s.model)
  const setModel = useChatStore((s) => s.setModel)
  const guestLeft = useChatStore((s) => s.guestQuestionsLeft)
  const messagesLen = useChatStore((s) => s.messages.length)
  const messageCount = useChatStore((s) => s.messages.filter((m) => m.role === 'user').length)
  const token = useAuthStore((s) => s.token)
  const isPremium = useAuthStore((s) => s.isPremium)
  const toast = useUIStore((s) => s.toast)
  const agentMode = useChatStore((s) => s.agentMode)
  const setAgentMode = useChatStore((s) => s.setAgentMode)
  const stopGeneration = useChatStore((s) => s.stopGeneration)

  useEffect(() => {
    const el = taRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 220) + 'px'
  }, [value])

  const canSend =
    !disabled && !isSending && value.trim().length > 0 && value.length <= LIMITS.composerMaxChars

  const handleSend = async () => {
    if (!canSend) return
    const text = value
    setValue('')
    const res = await send(text)
    if (!res.ok) {
      if (res.error) toast(res.error, { variant: 'error' })
    } else {
      onSent?.()
    }
  }

  const handleKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      void handleSend()
    }
  }

  return (
    <div className="border-t border-[color:var(--color-border)] bg-[color:var(--color-bg)]/95 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-3xl px-3 py-3 md:px-6 md:py-4">
        <div
          className={cn(
            'group relative rounded-[var(--radius-xl)] border bg-[color:var(--color-surface)] transition-colors',
            'border-[color:var(--color-border-strong)] focus-within:border-[color:var(--color-border-bright)] focus-within:shadow-[0_0_0_4px_rgba(16,185,129,0.06)]',
          )}
        >
          <textarea
            ref={taRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Marul AI'ye mesaj gönder..."
            rows={1}
            maxLength={LIMITS.composerMaxChars}
            className="block w-full resize-none bg-transparent px-4 pt-3.5 pb-2 text-[15px] leading-snug text-fg placeholder:text-fg-dim outline-none"
          />
          <div className="flex items-center justify-between gap-2 px-2 pb-2">
            <div className="flex items-center gap-1.5">
              <ModelPickerInline value={model} onChange={(v) => setModel(v)} />
              {model === 'qwen' ? (
                <button
                  type="button"
                  onClick={() => {
                    if (!token) {
                      toast('Agent modu için giriş yapmanız gerekiyor.', { variant: 'warn' })
                      return
                    }
                    setAgentMode(!agentMode)
                  }}
                  title="Agent modu: internette araştırır, kod ve tablo dosyaları üretir"
                  aria-pressed={agentMode && Boolean(token)}
                  className={cn(
                    'inline-flex h-7 items-center gap-1.5 rounded-full border py-0 pr-2 pl-2.5 text-[11.5px] font-medium tracking-[0.01em] transition-colors duration-200 ease-snappy',
                    agentMode && token
                      ? 'border-[color:var(--color-brand)]/35 bg-[color:var(--color-brand)]/10 text-[color:var(--color-brand-hover)] shadow-[inset_0_1px_0_rgba(16,185,129,0.16),0_0_0_1px_rgba(16,185,129,0.06)]'
                      : 'border-[color:var(--color-border)] text-fg-dim hover:border-[color:var(--color-border-strong)] hover:text-fg-muted',
                  )}
                >
                  <Radar className="h-3.5 w-3.5 shrink-0" />
                  <span>Agent</span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      'h-1.5 w-1.5 shrink-0 rounded-full transition-opacity duration-200',
                      agentMode && token
                        ? 'bg-[color:var(--color-brand)] opacity-100 shadow-[0_0_6px_rgba(16,185,129,0.55)]'
                        : 'bg-transparent opacity-0',
                    )}
                  />
                </button>
              ) : null}
            </div>
            {isSending ? (
              <button
                type="button"
                onClick={stopGeneration}
                aria-label="Üretimi durdur"
                title="Durdur"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--color-border-strong)] bg-white/[0.05] text-fg-muted transition-colors hover:text-fg"
              >
                <Square className="h-3.5 w-3.5 fill-current" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSend}
                disabled={!canSend}
                aria-label="Gönder"
                className={cn(
                  'inline-flex h-9 w-9 items-center justify-center rounded-full transition-all ease-snappy',
                  canSend
                    ? 'bg-[color:var(--color-brand)] text-black hover:bg-[color:var(--color-brand-hover)] shadow-[0_4px_14px_-4px_rgba(16,185,129,0.6)]'
                    : 'bg-white/[0.05] text-fg-dim',
                )}
              >
                <ArrowUp className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between gap-3 px-1 text-[11.5px] text-fg-dim">
          <span className="truncate">
            {agentMode && model === 'qwen'
              ? "Agent modu açık: gerektiğinde internette araştırır, kod ve tablo dosyaları üretir."
              : 'Marul AI hata yapabilir. Önemli bilgileri doğrulayın.'}
          </span>
          {!token ? (
            <span className="shrink-0">Kalan misafir hakkı: {guestLeft}</span>
          ) : isPremium ? (
            <span className="shrink-0 text-[color:var(--color-brand-hover)]">Plus · Sınırsız</span>
          ) : messagesLen > 0 ? (
            <span className="shrink-0">{messageCount} / {LIMITS.freeMessagesPerChat} mesaj</span>
          ) : (
            <span className="shrink-0">{LIMITS.freeMessagesPerChat} mesaj / sohbet</span>
          )}
        </div>
      </div>
    </div>
  )
}

function ModelPickerInline({
  value,
  onChange,
}: {
  value: string
  onChange: (id: ModelId) => void
}) {
  return (
    <div className="inline-flex items-center rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] p-0.5">
      {MODELS.map((m) => {
        const active = value === m.id
        return (
          <button
            key={m.id}
            type="button"
            onClick={() => onChange(m.id)}
            className={cn(
              'rounded-full px-2.5 py-1 text-[12px] transition-colors',
              active
                ? 'bg-white/[0.08] text-fg'
                : 'text-fg-muted hover:text-fg',
            )}
            aria-pressed={active}
          >
            {m.name}
          </button>
        )
      })}
    </div>
  )
}
