import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Menu, PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { useAuthStore } from '@/lib/store/auth'
import { useChatStore } from '@/lib/store/chat'
import type { ModelId } from '@/lib/config'
import { useUIStore } from '@/lib/store/ui'
import { Sidebar } from '@/components/chat/Sidebar'
import { Composer } from '@/components/chat/Composer'
import { Message } from '@/components/chat/Message'
import { TypingDots } from '@/components/chat/TypingDots'
import { WelcomeView } from '@/components/chat/WelcomeView'
import { PersonalizationDialog } from '@/components/chat/PersonalizationDialog'
import { ModelInfoDialog } from '@/components/chat/ModelInfoDialog'
import { SubscriptionDialog } from '@/components/chat/SubscriptionDialog'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'
import { SeoHead } from '@/components/ui/SeoHead'
import { cn } from '@/lib/utils'

export default function Chat() {
  const user = useAuthStore((s) => s.user)
  const authHydrated = useAuthStore((s) => s.isHydrated)

  const messages = useChatStore((s) => s.messages)
  const isSending = useChatStore((s) => s.isSending)
  const activeChatId = useChatStore((s) => s.activeChatId)
  const chats = useChatStore((s) => s.chats)
  const setModel = useChatStore((s) => s.setModel)
  const loadChats = useChatStore((s) => s.loadChats)
  const sendMessage = useChatStore((s) => s.sendMessage)

  const [searchParams, setSearchParams] = useSearchParams()

  const sidebarOpen = useUIStore((s) => s.sidebarOpen)
  const setSidebarOpen = useUIStore((s) => s.setSidebarOpen)
  const sidebarCollapsed = useUIStore((s) => s.sidebarCollapsed)
  const toggleSidebarCollapsed = useUIStore((s) => s.toggleSidebarCollapsed)

  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [openPersonalization, setOpenPersonalization] = useState(false)
  const [openSubscription, setOpenSubscription] = useState(false)
  const [openModelInfo, setOpenModelInfo] = useState(false)

  const userId = user?.id ?? null

  useEffect(() => {
    if (!authHydrated) return
    if (userId) void loadChats()
  }, [authHydrated, userId, loadChats])

  useEffect(() => {
    const requested = searchParams.get('model') as ModelId | null
    if (requested === 'yedikule' || requested === 'qwen') {
      setModel(requested)
      const next = new URLSearchParams(searchParams)
      next.delete('model')
      setSearchParams(next, { replace: true })
    }
  }, [searchParams, setModel, setSearchParams])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }, [messages, isSending])

  const hasMessages = messages.length > 0

  const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null
  const showPendingBubble = isSending && (!lastMessage || lastMessage.role === 'user')

  const activeChatTitle = useMemo(() => {
    if (activeChatId && activeChatId !== 'new') {
      const found = chats.find((c) => c.id === activeChatId)
      if (found) return found.title
    }
    return 'Yeni sohbet'
  }, [activeChatId, chats])


  return (
    <div className="flex h-[100dvh] w-full overflow-hidden bg-[color:var(--color-bg)]">
      <SeoHead title="Sohbet" path="/sohbet" noindex />

      <aside
        className={cn(
          'hidden md:flex shrink-0 border-r border-[color:var(--color-border)] transition-[width] duration-200 ease-snappy overflow-hidden',
          sidebarCollapsed ? 'w-0 border-r-0' : 'w-[280px]',
        )}
      >
        <Sidebar
          onOpenSettings={() => setOpenPersonalization(true)}
          onOpenSubscription={() => setOpenSubscription(true)}
          onOpenModelInfo={() => setOpenModelInfo(true)}
        />
      </aside>

      <div
        className={cn(
          'md:hidden fixed inset-0 z-50 transition-opacity',
          sidebarOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
        aria-hidden={!sidebarOpen}
      >
        <div className="absolute inset-0 bg-black/70" onClick={() => setSidebarOpen(false)} />
        <div
          className={cn(
            'absolute inset-y-0 left-0 w-[82vw] max-w-[320px] border-r border-[color:var(--color-border)] transition-transform',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          )}
        >
          <Sidebar
            onOpenSettings={() => setOpenPersonalization(true)}
            onOpenSubscription={() => setOpenSubscription(true)}
            onOpenModelInfo={() => setOpenModelInfo(true)}
          />
        </div>
      </div>

      <main className="flex h-full min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-3 border-b border-[color:var(--color-border)] bg-[color:var(--color-bg)]/85 backdrop-blur-xl px-3 py-2.5 md:px-5">
          <div className="flex items-center gap-2 min-w-0">
            <button
              type="button"
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md text-fg-muted hover:text-fg hover:bg-white/[0.05]"
              onClick={() => setSidebarOpen(true)}
              aria-label="Menüyü aç"
            >
              <Menu className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="hidden md:inline-flex h-9 w-9 items-center justify-center rounded-md text-fg-muted hover:text-fg hover:bg-white/[0.05]"
              onClick={toggleSidebarCollapsed}
              aria-label={sidebarCollapsed ? 'Yan paneli aç' : 'Yan paneli kapat'}
              title={sidebarCollapsed ? 'Yan paneli aç' : 'Yan paneli kapat'}
            >
              {sidebarCollapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
            </button>
            <div className="flex items-center gap-2 min-w-0">
              <Logo size={20} showText={false} />
              <span className="hidden sm:block text-[13.5px] text-fg-muted truncate">
                {activeChatTitle}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!user ? (
              <Link to="/giris">
                <Button size="sm" variant="primary">
                  Giriş yap
                </Button>
              </Link>
            ) : null}
          </div>
        </header>

        <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto">
          {!hasMessages ? (
            <WelcomeView userName={user?.name} onPrompt={(t) => void sendMessage(t)} />
          ) : (
            <div className="mx-auto w-full max-w-3xl px-4 py-6 md:py-8">
              <div className="flex flex-col gap-7">
                {messages.map((m, i) => (
                  <Message
                    key={(m.id ?? `${i}_${m.role}_${m.created_at ?? ''}`).toString()}
                    message={m}
                    authorName={user?.name}
                  />
                ))}
                {showPendingBubble ? (
                  <div className="flex gap-3">
                    <div className="mt-0.5 hidden md:flex h-7 w-7 shrink-0 items-center justify-center">
                      <Logo size={28} showText={false} rounded={false} />
                    </div>
                    <TypingDots />
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </div>

        <Composer />
      </main>

      <PersonalizationDialog open={openPersonalization} onClose={() => setOpenPersonalization(false)} />
      <SubscriptionDialog open={openSubscription} onClose={() => setOpenSubscription(false)} />
      <ModelInfoDialog open={openModelInfo} onClose={() => setOpenModelInfo(false)} />
    </div>
  )
}
