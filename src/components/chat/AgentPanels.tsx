import { useEffect, useRef, useState } from 'react'
import {
  Brain,
  Check,
  ChevronRight,
  Download,
  ExternalLink,
  FileSpreadsheet,
  FileText,
  FileType,
  Globe,
  Loader2,
  Presentation,
  TriangleAlert,
} from 'lucide-react'
import { cn, formatBytes } from '@/lib/utils'
import { workspaceApi } from '@/lib/api'
import type { AgentArtifact, AgentSource, AgentStep } from '@/lib/api'

export function ThinkingPanel({ text, streaming }: { text: string; streaming: boolean }) {
  const [open, setOpen] = useState(false)
  const bodyRef = useRef<HTMLDivElement | null>(null)
  const trimmed = text.trim()

  useEffect(() => {
    if (open && streaming && bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [text, open, streaming])

  if (!trimmed) return null

  return (
    <div className="mb-3 overflow-hidden rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2 px-3 py-2 text-left text-[12.5px] text-fg-muted transition-colors hover:bg-white/[0.03]"
        aria-expanded={open}
      >
        <Brain className={cn('h-3.5 w-3.5 shrink-0', streaming && 'text-[color:var(--color-brand-hover)]')} />
        <span className={cn('font-medium', streaming && 'shimmer-text')}>
          {streaming ? 'Marul düşünüyor' : 'Düşünme adımları'}
        </span>
        <span className="ml-auto flex items-center gap-1.5 text-[11px] text-fg-dim">
          {!streaming ? `${trimmed.length.toLocaleString('tr-TR')} karakter` : null}
          <ChevronRight className={cn('h-3.5 w-3.5 transition-transform', open && 'rotate-90')} />
        </span>
      </button>
      {open ? (
        <div
          ref={bodyRef}
          className="max-h-64 overflow-y-auto border-t border-[color:var(--color-border)] px-3 py-2.5 text-[12.5px] leading-relaxed text-fg-muted whitespace-pre-wrap"
        >
          {trimmed}
        </div>
      ) : null}
    </div>
  )
}

const STEP_ICONS: Record<string, typeof Globe> = {
  web_arama: Globe,
  derin_arastirma: Globe,
  sayfa_oku: FileText,
  dosya_yaz: FileType,
  dosya_oku: FileType,
  dosya_listele: FileType,
  dosya_sil: FileType,
  pdf_olustur: FileText,
  sunum_olustur: Presentation,
  tablo_olustur: FileSpreadsheet,
}

export function AgentTimeline({ steps }: { steps: AgentStep[] }) {
  if (!steps || steps.length === 0) return null

  return (
    <ol className="mb-3 space-y-1.5">
      {steps.map((step) => {
        const Icon = STEP_ICONS[step.name] ?? Globe
        return (
          <li
            key={step.id}
            className="flex items-start gap-2.5 rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-3 py-2 text-[12.5px]"
          >
            <span className="mt-[2px] shrink-0">
              {step.status === 'running' ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin text-[color:var(--color-brand-hover)]" />
              ) : step.status === 'error' ? (
                <TriangleAlert className="h-3.5 w-3.5 text-[color:var(--color-danger)]" />
              ) : (
                <Check className="h-3.5 w-3.5 text-[color:var(--color-brand-hover)]" />
              )}
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-1.5">
                <Icon className="h-3 w-3 shrink-0 text-fg-dim" />
                <span className={cn('font-medium', step.status === 'running' ? 'text-fg' : 'text-fg-muted')}>
                  {step.label}
                </span>
                {step.durationMs ? (
                  <span className="ml-auto shrink-0 font-mono text-[10.5px] text-fg-dim tabular-nums">
                    {(step.durationMs / 1000).toFixed(1)}s
                  </span>
                ) : null}
              </span>
              {step.summary && step.status !== 'running' ? (
                <span className="mt-0.5 block truncate text-[11.5px] text-fg-dim">{step.summary}</span>
              ) : null}
            </span>
          </li>
        )
      })}
    </ol>
  )
}

export function SourceList({ sources }: { sources: AgentSource[] }) {
  const [expanded, setExpanded] = useState(false)
  if (!sources || sources.length === 0) return null
  const visible = expanded ? sources : sources.slice(0, 4)

  return (
    <div className="mt-3 border-t border-[color:var(--color-border)] pt-3">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-fg-dim">
        Kaynaklar · {sources.length}
      </p>
      <ul className="flex flex-wrap gap-1.5">
        {visible.map((source) => (
          <li key={source.url}>
            <a
              href={source.url}
              target="_blank"
              rel="noreferrer noopener"
              title={source.title}
              className="inline-flex max-w-[15rem] items-center gap-1.5 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-2.5 py-1 text-[11.5px] text-fg-muted transition-colors hover:border-[color:var(--color-border-bright)] hover:text-fg"
            >
              <span className="font-mono text-[10px] text-fg-dim">{source.index}</span>
              <span className="truncate">{source.domain || source.title}</span>
              <ExternalLink className="h-2.5 w-2.5 shrink-0 text-fg-dim" />
            </a>
          </li>
        ))}
        {!expanded && sources.length > 4 ? (
          <li>
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="rounded-full border border-[color:var(--color-border)] px-2.5 py-1 text-[11.5px] text-fg-dim hover:text-fg"
            >
              +{sources.length - 4} daha
            </button>
          </li>
        ) : null}
      </ul>
    </div>
  )
}

const ARTIFACT_ICONS: Record<string, typeof FileText> = {
  pdf: FileText,
  pptx: Presentation,
  xlsx: FileSpreadsheet,
}

function artifactKind(path: string): string {
  const dot = path.lastIndexOf('.')
  return dot === -1 ? 'text' : path.slice(dot + 1).toLowerCase()
}

export function ArtifactList({ artifacts, chatId }: { artifacts: AgentArtifact[]; chatId: number | null }) {
  if (!artifacts || artifacts.length === 0 || !chatId) return null

  return (
    <div className="mt-3 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-3">
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-fg-dim">
          Üretilen dosyalar · {artifacts.length}
        </p>
        <a
          href={workspaceApi.downloadUrl(chatId)}
          className="inline-flex items-center gap-1.5 rounded-md border border-[color:var(--color-brand)]/30 bg-[color:var(--color-brand)]/10 px-2.5 py-1 text-[11.5px] font-medium text-[color:var(--color-brand-hover)] transition-colors hover:bg-[color:var(--color-brand)]/15"
        >
          <Download className="h-3 w-3" />
          Tümünü indir
        </a>
      </div>
      <ul className="space-y-1">
        {artifacts.map((artifact) => {
          const kind = artifact.kind ?? artifactKind(artifact.path)
          const Icon = ARTIFACT_ICONS[kind] ?? FileType
          return (
            <li key={artifact.path}>
              <a
                href={workspaceApi.fileUrl(chatId, artifact.path)}
                className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-[12.5px] text-fg-muted transition-colors hover:bg-white/[0.04] hover:text-fg"
              >
                <Icon className="h-3.5 w-3.5 shrink-0 text-fg-dim" />
                <span className="min-w-0 flex-1 truncate font-mono text-[11.5px]">{artifact.path}</span>
                <span className="shrink-0 text-[11px] text-fg-dim tabular-nums">{formatBytes(artifact.size)}</span>
                <Download className="h-3 w-3 shrink-0 text-fg-dim" />
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
