import { useState } from 'react'
import { m } from 'framer-motion'
import { Check, Copy, Hash } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { Markdown } from './Markdown'
import { TypingDots } from './TypingDots'
import { AgentTimeline, ArtifactList, FileStream, SourceList, ThinkingPanel } from './AgentPanels'
import { copyToClipboard, getInitials } from '@/lib/utils'
import { useChatStore } from '@/lib/store/chat'
import type { ChatMessage } from '@/lib/api'

interface MessageProps {
  message: ChatMessage
  authorName?: string | null
}

export function Message({ message, authorName }: MessageProps) {
  const [copied, setCopied] = useState(false)
  const rawChatId = useChatStore((s) => s.activeChatId)
  const activeChatId = typeof rawChatId === 'number' ? rawChatId : null
  const isUser = message.role === 'user'

  const handleCopy = async () => {
    const ok = await copyToClipboard(message.content)
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }

  if (isUser) {
    return (
      <m.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="flex justify-end"
      >
        <div className="group max-w-[85%] md:max-w-[75%]">
          <div className="rounded-2xl rounded-br-md bg-white/[0.06] border border-[color:var(--color-border)] px-4 py-3 text-[14.5px] text-fg whitespace-pre-wrap leading-relaxed">
            {message.content}
          </div>
          <div className="mt-1 flex items-center justify-end gap-2 pr-1 text-[11px] text-fg-dim opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 hover:text-fg hover:bg-white/[0.04]"
              aria-label="Mesajı kopyala"
            >
              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              {copied ? 'Kopyalandı' : 'Kopyala'}
            </button>
            <span>{authorName ?? ''}</span>
          </div>
        </div>
      </m.div>
    )
  }

  const steps = message.steps ?? []
  const streaming = Boolean(message.streaming)
  const isAgent = Boolean(message.agentMode)
  const hasReasoning = Boolean(message.reasoning && message.reasoning.trim())
  const files = message.files ?? []
  const streamedPaths = new Set(files.map((f) => f.path))
  const otherArtifacts = (message.artifacts ?? []).filter((a) => !streamedPaths.has(a.path))
  const awaitingText = streaming && !message.content
  const timelinePending = awaitingText && isAgent && files.length === 0 && (steps.length > 0 || !hasReasoning)
  const showDots = awaitingText && !isAgent && !hasReasoning && steps.length === 0 && files.length === 0

  return (
    <m.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex gap-3"
    >
      <div className="mt-0.5 hidden md:flex h-7 w-7 shrink-0 items-center justify-center">
        <Logo size={28} showText={false} rounded={false} />
      </div>
      <div className="group min-w-0 flex-1">
        <ThinkingPanel text={message.reasoning ?? ''} streaming={streaming} />
        <AgentTimeline steps={steps} pending={timelinePending} />
        <FileStream files={message.files ?? []} chatId={activeChatId} />
        {message.content ? <Markdown content={message.content} /> : showDots ? <TypingDots /> : null}
        {streaming && message.content ? (
          <span className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[2px] bg-[color:var(--color-brand-hover)] animate-pulse-dot align-middle" />
        ) : null}
        <SourceList sources={message.sources ?? []} />
        <ArtifactList artifacts={otherArtifacts} chatId={activeChatId} />
        <div className="mt-2 flex items-center gap-3 text-[11px] text-fg-dim">
          {message.usage && message.model === 'yedikule' ? (
            <span
              className="inline-flex items-center gap-1 font-mono tabular-nums"
              title={`Girdi: ${message.usage.inputTokens} token · Çıktı: ${message.usage.outputTokens} token${
                message.usage.contextMax ? ` · Bağlam: ${message.usage.contextUsed}/${message.usage.contextMax}` : ''
              }`}
            >
              <Hash className="h-3 w-3" />
              {message.usage.outputTokens} token
            </span>
          ) : null}
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 hover:text-fg hover:bg-white/[0.04] opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Yanıtı kopyala"
          >
            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            {copied ? 'Kopyalandı' : 'Kopyala'}
          </button>
        </div>
      </div>
    </m.div>
  )
}

export function UserAvatar({ name }: { name?: string | null }) {
  return (
    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[color:var(--color-brand)]/15 text-[color:var(--color-brand-hover)] text-[12px] font-medium">
      {getInitials(name)}
    </div>
  )
}
