import { useLayoutEffect, useRef, useState } from 'react'
import { Bold, Code2, Eye, Heading2, Italic, Link2, List, ListOrdered, Pencil, Quote } from 'lucide-react'
import { Markdown } from '@/components/chat/Markdown'
import { cn } from '@/lib/utils'

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  maxLength?: number
  minRows?: number
  error?: string
  id?: string
}

type ToolAction =
  | { kind: 'wrap'; prefix: string; suffix: string; placeholder: string }
  | { kind: 'line'; prefix: string }
  | { kind: 'link' }

const TOOLS: { icon: typeof Bold; label: string; action: ToolAction }[] = [
  { icon: Bold, label: 'Kalın', action: { kind: 'wrap', prefix: '**', suffix: '**', placeholder: 'kalın metin' } },
  { icon: Italic, label: 'İtalik', action: { kind: 'wrap', prefix: '_', suffix: '_', placeholder: 'italik metin' } },
  { icon: Heading2, label: 'Başlık', action: { kind: 'line', prefix: '## ' } },
  { icon: List, label: 'Liste', action: { kind: 'line', prefix: '- ' } },
  { icon: ListOrdered, label: 'Numaralı liste', action: { kind: 'line', prefix: '1. ' } },
  { icon: Quote, label: 'Alıntı', action: { kind: 'line', prefix: '> ' } },
  { icon: Code2, label: 'Kod', action: { kind: 'wrap', prefix: '`', suffix: '`', placeholder: 'kod' } },
  { icon: Link2, label: 'Bağlantı', action: { kind: 'link' } },
]

export function MarkdownEditor({
  value,
  onChange,
  placeholder,
  maxLength,
  minRows = 8,
  error,
  id,
}: MarkdownEditorProps) {
  const [tab, setTab] = useState<'write' | 'preview'>('write')
  const ref = useRef<HTMLTextAreaElement | null>(null)
  const pendingSelection = useRef<[number, number] | null>(null)

  useLayoutEffect(() => {
    if (pendingSelection.current && ref.current) {
      const [start, end] = pendingSelection.current
      ref.current.focus()
      ref.current.setSelectionRange(start, end)
      pendingSelection.current = null
    }
  }, [value])

  const applyValue = (next: string, selStart: number, selEnd: number) => {
    if (maxLength && next.length > maxLength) return
    pendingSelection.current = [selStart, selEnd]
    onChange(next)
  }

  const runAction = (action: ToolAction) => {
    const el = ref.current
    if (!el) return
    const start = el.selectionStart
    const end = el.selectionEnd
    const selected = value.slice(start, end)

    if (action.kind === 'wrap') {
      const inner = selected || action.placeholder
      const next = value.slice(0, start) + action.prefix + inner + action.suffix + value.slice(end)
      const innerStart = start + action.prefix.length
      applyValue(next, innerStart, innerStart + inner.length)
      return
    }

    if (action.kind === 'link') {
      const text = selected || 'bağlantı metni'
      const snippet = `[${text}](https://)`
      const next = value.slice(0, start) + snippet + value.slice(end)
      const urlStart = start + text.length + 3
      applyValue(next, urlStart, urlStart + 8)
      return
    }

    const lineStart = value.lastIndexOf('\n', start - 1) + 1
    const before = value.slice(0, lineStart)
    const rest = value.slice(lineStart)
    const next = before + action.prefix + rest
    const pos = start + action.prefix.length
    applyValue(next, pos, end + action.prefix.length)
  }

  const count = value.length

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 rounded-[var(--radius-sm)] border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface-2)] p-1">
          <TabButton active={tab === 'write'} onClick={() => setTab('write')} icon={Pencil} label="Yaz" />
          <TabButton active={tab === 'preview'} onClick={() => setTab('preview')} icon={Eye} label="Önizle" />
        </div>
        {tab === 'write' ? (
          <div className="flex flex-wrap items-center justify-end gap-0.5">
            {TOOLS.map((t) => {
              const Icon = t.icon
              return (
                <button
                  key={t.label}
                  type="button"
                  title={t.label}
                  aria-label={t.label}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => runAction(t.action)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md text-fg-muted hover:text-fg hover:bg-white/[0.06] transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </button>
              )
            })}
          </div>
        ) : null}
      </div>

      <div
        className={cn(
          'rounded-[var(--radius-md)] border bg-[color:var(--color-surface-2)] transition-colors',
          error
            ? 'border-[color:var(--color-danger)]/60'
            : 'border-[color:var(--color-border-strong)] focus-within:border-[color:var(--color-border-bright)] focus-within:ring-2 focus-within:ring-[color:var(--color-brand)]/15',
        )}
      >
        {tab === 'write' ? (
          <textarea
            ref={ref}
            id={id}
            value={value}
            onChange={(e) => {
              if (maxLength && e.target.value.length > maxLength) {
                onChange(e.target.value.slice(0, maxLength))
              } else {
                onChange(e.target.value)
              }
            }}
            placeholder={placeholder}
            rows={minRows}
            className="block w-full resize-y bg-transparent px-3.5 py-3 text-[14.5px] leading-relaxed text-fg placeholder:text-fg-dim outline-none"
          />
        ) : (
          <div className="min-h-[12rem] px-3.5 py-3">
            {value.trim() ? (
              <Markdown content={value} />
            ) : (
              <p className="text-[13.5px] text-fg-dim">Önizlenecek içerik yok.</p>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-[12px] text-fg-dim">
        <span>Markdown desteklenir — başlık, liste, kod, bağlantı, kalın ve italik.</span>
        {maxLength ? (
          <span className={cn(count > maxLength * 0.95 && 'text-[color:var(--color-warn)]')}>
            {count} / {maxLength}
          </span>
        ) : null}
      </div>
      {error ? <p className="text-[12px] text-[color:var(--color-danger)]">{error}</p> : null}
    </div>
  )
}

function TabButton({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean
  onClick: () => void
  icon: typeof Bold
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-[6px] px-2.5 py-1 text-[12.5px] font-medium transition-colors',
        active ? 'bg-white/[0.08] text-fg' : 'text-fg-muted hover:text-fg',
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  )
}
