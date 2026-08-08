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
  FolderOpen,
  Globe,
  ListChecks,
  Loader2,
  Trash2,
  TriangleAlert,
} from 'lucide-react'
import { cn, formatBytes } from '@/lib/utils'
import { workspaceApi } from '@/lib/api'
import { Markdown } from './Markdown'
import type { AgentArtifact, AgentFile, AgentSource, AgentStep, WorkspaceListing } from '@/lib/api'

function lastLine(text: string, max: number): string {
  const flat = text.replace(/\s+/g, ' ').trim()
  if (flat.length <= max) return flat
  return `…${flat.slice(flat.length - max)}`
}

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

  const preview = streaming && !open ? lastLine(trimmed, 110) : ''

  return (
    <div
      className={cn(
        'mb-3 overflow-hidden rounded-lg border bg-[color:var(--color-surface)] transition-colors',
        streaming ? 'border-[color:var(--color-brand)]/25' : 'border-[color:var(--color-border)]',
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2 px-3 py-2 text-left text-[12.5px] text-fg-muted transition-colors hover:bg-white/[0.03]"
        aria-expanded={open}
      >
        {streaming ? (
          <span className="relative flex h-3.5 w-3.5 shrink-0 items-center justify-center">
            <Brain className="h-3.5 w-3.5 text-[color:var(--color-brand-hover)] animate-pulse-dot" />
          </span>
        ) : (
          <Brain className="h-3.5 w-3.5 shrink-0" />
        )}
        <span className={cn('font-medium', streaming && 'shimmer-text')}>
          {streaming ? 'Marul düşünüyor' : 'Düşünme adımları'}
        </span>
        <span className="ml-auto flex items-center gap-1.5 text-[11px] text-fg-dim">
          {!streaming ? `${trimmed.length.toLocaleString('tr-TR')} karakter` : null}
          <ChevronRight className={cn('h-3.5 w-3.5 transition-transform', open && 'rotate-90')} />
        </span>
      </button>
      {preview ? (
        <p className="border-t border-[color:var(--color-border)] px-3 py-1.5 text-[11.5px] leading-relaxed text-fg-dim truncate">
          {preview}
        </p>
      ) : null}
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
  tablo_olustur: FileSpreadsheet,
}

const STEP_DONE_LABELS: Record<string, string> = {
  web_arama: 'İnternette aradı',
  derin_arastirma: 'Derinlemesine araştırdı',
  sayfa_oku: 'Sayfayı okudu',
  dosya_yaz: 'Dosya yazdı',
  dosya_oku: 'Dosyayı okudu',
  dosya_listele: 'Klasörü listeledi',
  dosya_sil: 'Dosyayı sildi',
  tablo_olustur: 'Tablo hazırladı',
}

const EXTERNAL_MARKERS = ['<<<HARICI_ICERIK_BASLANGIC>>>', '<<<HARICI_ICERIK_SON>>>']

function stepResult(step: AgentStep): string {
  if (!step.summary) return ''
  let text = step.summary
  for (const marker of EXTERNAL_MARKERS) text = text.split(marker).join(' ')
  const first = text
    .split('\n')
    .map((line) => line.trim())
    .find((line) => line.length > 0)
  if (!first) return ''
  const clean = first.replace(/\s+/g, ' ').replace(/[:.]$/, '')
  if (!clean) return ''
  return clean.length > 110 ? `${clean.slice(0, 109)}…` : clean
}

interface AgentTimelineProps {
  steps: AgentStep[]
  pending?: boolean
}

export function AgentTimeline({ steps, pending = false }: AgentTimelineProps) {
  const [open, setOpen] = useState(false)
  const list = steps ?? []
  const running = list.some((step) => step.status === 'running')
  const showPending = pending && !running
  if (list.length === 0 && !showPending) return null

  const doneCount = list.filter((step) => step.status !== 'running').length
  const active = running || showPending
  const currentStep = list.find((step) => step.status === 'running')
  const summaryLabel = currentStep
    ? currentStep.label
    : showPending
      ? 'Hazırlanıyor'
      : `${list.length} adımda tamamlandı`

  return (
    <div
      className={cn(
        'mb-3 overflow-hidden rounded-lg border bg-[color:var(--color-surface)] transition-colors',
        active ? 'border-[color:var(--color-brand)]/25' : 'border-[color:var(--color-border)]',
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-[12px] transition-colors hover:bg-white/[0.03]"
      >
        {active ? (
          <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin text-[color:var(--color-brand-hover)]" />
        ) : (
          <ListChecks className="h-3.5 w-3.5 shrink-0 text-fg-dim" />
        )}
        <span className={cn('truncate font-medium', active ? 'text-fg-muted shimmer-text' : 'text-fg-muted')}>
          {summaryLabel}
        </span>
        <span className="ml-auto flex shrink-0 items-center gap-1.5 text-[11px] text-fg-dim">
          {list.length > 0 ? <span className="font-mono tabular-nums">{doneCount}/{list.length}</span> : null}
          <ChevronRight className={cn('h-3.5 w-3.5 transition-transform', open && 'rotate-90')} />
        </span>
      </button>
      {!open ? null : (
      <ol className="border-t border-[color:var(--color-border)] py-1">
        {list.map((step, index) => {
          const Icon = STEP_ICONS[step.name] ?? Globe
          const isRunning = step.status === 'running'
          const isError = step.status === 'error'
          const isLast = index === list.length - 1 && !showPending
          const label = isRunning ? step.label : STEP_DONE_LABELS[step.name] ?? step.label
          const result = isRunning ? '' : stepResult(step)

          return (
            <li
              key={step.id}
              className={cn(
                'flex gap-2.5 px-3 py-1.5 transition-colors',
                isRunning && 'bg-[color:var(--color-brand)]/[0.07]',
              )}
            >
              <span className="flex w-4 shrink-0 flex-col items-center">
                <span className="mt-[3px] flex h-3.5 w-3.5 shrink-0 items-center justify-center">
                  {isRunning ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-[color:var(--color-brand-hover)]" />
                  ) : isError ? (
                    <TriangleAlert className="h-3.5 w-3.5 text-[color:var(--color-danger)]" />
                  ) : (
                    <Check className="h-3.5 w-3.5 text-[color:var(--color-brand-hover)]" />
                  )}
                </span>
                {!isLast ? <span className="mt-1 w-px flex-1 bg-[color:var(--color-border)]" /> : null}
              </span>
              <span className="min-w-0 flex-1 pb-0.5 text-[12.5px]">
                <span className="flex items-center gap-1.5">
                  <Icon className="h-3 w-3 shrink-0 text-fg-dim" />
                  <span className={cn('truncate font-medium', isRunning ? 'text-fg' : 'text-fg-muted')}>{label}</span>
                  {step.durationMs ? (
                    <span className="ml-auto shrink-0 font-mono text-[10.5px] text-fg-dim tabular-nums">
                      {(step.durationMs / 1000).toFixed(1)}s
                    </span>
                  ) : null}
                </span>
                {result ? (
                  <span
                    className={cn(
                      'mt-0.5 block truncate text-[11.5px]',
                      isError ? 'text-[color:var(--color-danger)]/80' : 'text-fg-dim',
                    )}
                  >
                    {result}
                  </span>
                ) : null}
              </span>
            </li>
          )
        })}
        {showPending ? (
          <li className="flex gap-2.5 bg-[color:var(--color-brand)]/[0.07] px-3 py-1.5">
            <span className="flex w-4 shrink-0 justify-center">
              <Loader2 className="mt-[3px] h-3.5 w-3.5 animate-spin text-[color:var(--color-brand-hover)]" />
            </span>
            <span className="min-w-0 flex-1 pb-0.5 text-[12.5px]">
              <span className="shimmer-text font-medium">
                {list.length === 0 ? 'Hazırlanıyor' : 'Yanıt hazırlanıyor'}
              </span>
            </span>
          </li>
        ) : null}
      </ol>
      )}
    </div>
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
  xlsx: FileSpreadsheet,
  csv: FileSpreadsheet,
  md: FileText,
  txt: FileText,
}

function artifactKind(path: string): string {
  const dot = path.lastIndexOf('.')
  return dot === -1 ? 'text' : path.slice(dot + 1).toLowerCase()
}

export function ArtifactList({ artifacts, chatId }: { artifacts: AgentArtifact[]; chatId: number | null }) {
  const [busy, setBusy] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  if (!artifacts || artifacts.length === 0 || !chatId) return null

  const totalBytes = artifacts.reduce((sum, a) => sum + (a.size ?? 0), 0)

  const run = async (key: string, action: () => Promise<void>) => {
    setBusy(key)
    setError(null)
    try {
      await action()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Dosya indirilemedi.')
    } finally {
      setBusy(null)
    }
  }

  return (
    <div className="mt-3 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-3">
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-fg-dim">
          Üretilen dosyalar · {artifacts.length} · {formatBytes(totalBytes)}
        </p>
        <button
          type="button"
          disabled={busy !== null}
          onClick={() => void run('zip', () => workspaceApi.downloadZip(chatId))}
          className="inline-flex items-center gap-1.5 rounded-md border border-[color:var(--color-brand)]/30 bg-[color:var(--color-brand)]/10 px-2.5 py-1 text-[11.5px] font-medium text-[color:var(--color-brand-hover)] transition-colors hover:bg-[color:var(--color-brand)]/15 disabled:opacity-60"
        >
          {busy === 'zip' ? <Loader2 className="h-3 w-3 animate-spin" /> : <Download className="h-3 w-3" />}
          {busy === 'zip' ? 'Hazırlanıyor' : 'ZIP indir'}
        </button>
      </div>
      <ul className="space-y-1">
        {artifacts.map((artifact) => {
          const kind = artifact.kind ?? artifactKind(artifact.path)
          const Icon = ARTIFACT_ICONS[kind] ?? FileType
          return (
            <li key={artifact.path}>
              <button
                type="button"
                disabled={busy !== null}
                onClick={() => void run(artifact.path, () => workspaceApi.downloadFile(chatId, artifact.path))}
                className="flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-left text-[12.5px] text-fg-muted transition-colors hover:bg-white/[0.04] hover:text-fg disabled:opacity-60"
              >
                <Icon className="h-3.5 w-3.5 shrink-0 text-fg-dim" />
                <span className="min-w-0 flex-1 truncate font-mono text-[11.5px]">{artifact.path}</span>
                <span className="shrink-0 text-[11px] text-fg-dim tabular-nums">{formatBytes(artifact.size)}</span>
                {busy === artifact.path ? (
                  <Loader2 className="h-3 w-3 shrink-0 animate-spin text-fg-dim" />
                ) : (
                  <Download className="h-3 w-3 shrink-0 text-fg-dim" />
                )}
              </button>
            </li>
          )
        })}
      </ul>
      <p className="mt-2 text-[11px] leading-relaxed text-fg-dim">
        Dosyalar sunucuda çalıştırılmaz, yalnızca saklanır. İndirmeden önce içeriği gözden geçirin.
      </p>
      {error ? <p className="mt-1 text-[11px] text-[color:var(--color-danger)]">{error}</p> : null}
    </div>
  )
}

interface WorkspacePanelProps {
  listing: WorkspaceListing
  chatId: number
  onRefresh?: () => void
}

export function WorkspacePanel({ listing, chatId, onRefresh }: WorkspacePanelProps) {
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  if (!listing || listing.count === 0) return null

  const quota = listing.limits?.maxChatBytes ?? 0
  const usedBytes = listing.diskBytes ?? listing.bytes
  const usedPercent = quota > 0 ? Math.min(100, Math.round((usedBytes / quota) * 100)) : 0

  const run = async (key: string, action: () => Promise<void>) => {
    setBusy(key)
    setError(null)
    try {
      await action()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'İşlem tamamlanamadı.')
    } finally {
      setBusy(null)
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-3 pt-3 md:px-6">
      <div className="overflow-hidden rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
        <div className="flex items-center gap-2 px-3 py-1.5">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="flex min-w-0 flex-1 items-center gap-2 text-left text-[12px] text-fg-muted transition-colors hover:text-fg"
          >
            <FolderOpen className="h-3.5 w-3.5 shrink-0 text-fg-dim" />
            <span className="truncate font-medium">Çalışma klasörü · {listing.count} dosya</span>
            <span className="shrink-0 font-mono text-[11px] text-fg-dim tabular-nums">
              {formatBytes(listing.bytes)}
            </span>
            <ChevronRight className={cn('h-3.5 w-3.5 shrink-0 transition-transform', open && 'rotate-90')} />
          </button>
          <button
            type="button"
            disabled={busy !== null}
            onClick={() => void run('zip', () => workspaceApi.downloadZip(chatId))}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-[color:var(--color-brand)]/30 bg-[color:var(--color-brand)]/10 px-2.5 py-1 text-[11.5px] font-medium text-[color:var(--color-brand-hover)] transition-colors hover:bg-[color:var(--color-brand)]/15 disabled:opacity-60"
          >
            {busy === 'zip' ? <Loader2 className="h-3 w-3 animate-spin" /> : <Download className="h-3 w-3" />}
            ZIP indir
          </button>
        </div>
        {open ? (
          <div className="border-t border-[color:var(--color-border)]">
            <ul className="max-h-56 overflow-y-auto py-1">
              {listing.files.map((file) => (
                <li key={file.path} className="flex items-center gap-2 px-3 py-1">
                  <FileType className="h-3.5 w-3.5 shrink-0 text-fg-dim" />
                  <button
                    type="button"
                    disabled={busy !== null}
                    onClick={() => void run(file.path, () => workspaceApi.downloadFile(chatId, file.path))}
                    className="min-w-0 flex-1 truncate text-left font-mono text-[11.5px] text-fg-muted transition-colors hover:text-fg disabled:opacity-60"
                  >
                    {file.path}
                  </button>
                  <span className="shrink-0 text-[11px] text-fg-dim tabular-nums">{formatBytes(file.size)}</span>
                  <button
                    type="button"
                    disabled={busy !== null}
                    onClick={() =>
                      void run(`sil:${file.path}`, async () => {
                        await workspaceApi.remove(chatId, file.path)
                        onRefresh?.()
                      })
                    }
                    aria-label={`${file.path} dosyasını sil`}
                    title="Sil"
                    className="shrink-0 rounded p-1 text-fg-dim transition-colors hover:text-[color:var(--color-danger)] disabled:opacity-60"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </li>
              ))}
            </ul>
            <p className="border-t border-[color:var(--color-border)] px-3 py-1.5 text-[11px] text-fg-dim">
              Bu klasör sohbete özeldir, kotanın %{usedPercent} kadarı dolu. Dosyalar sunucuda çalıştırılmaz.
            </p>
          </div>
        ) : null}
        {error ? (
          <p className="border-t border-[color:var(--color-border)] px-3 py-1.5 text-[11px] text-[color:var(--color-danger)]">
            {error}
          </p>
        ) : null}
      </div>
    </div>
  )
}

const LANGUAGE_BY_EXTENSION: Record<string, string> = {
  js: 'javascript',
  mjs: 'javascript',
  cjs: 'javascript',
  ts: 'typescript',
  tsx: 'tsx',
  jsx: 'jsx',
  py: 'python',
  html: 'html',
  htm: 'html',
  css: 'css',
  json: 'json',
  md: 'markdown',
  sh: 'bash',
  yml: 'yaml',
  yaml: 'yaml',
  sql: 'sql',
  java: 'java',
  go: 'go',
  rs: 'rust',
}

function languageOf(path: string): string {
  const dot = path.lastIndexOf('.')
  if (dot === -1) return 'text'
  return LANGUAGE_BY_EXTENSION[path.slice(dot + 1).toLowerCase()] ?? 'text'
}

function lineCount(text: string): number {
  if (!text) return 0
  return text.split('\n').length
}

function FileCard({ file, chatId }: { file: AgentFile; chatId: number | null }) {
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const writing = file.status === 'writing'
  const failed = file.status === 'error'
  const lines = lineCount(file.content)

  return (
    <div
      className={cn(
        'overflow-hidden rounded-lg border transition-colors',
        writing
          ? 'border-[color:var(--color-brand)]/30 bg-[color:var(--color-brand)]/[0.04]'
          : failed
            ? 'border-[color:var(--color-danger)]/30 bg-[color:var(--color-surface)]'
            : 'border-[color:var(--color-border)] bg-[color:var(--color-surface)]',
      )}
    >
      <div className="flex items-center gap-2 px-3 py-1.5">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex min-w-0 flex-1 items-center gap-2 text-left"
        >
          {writing ? (
            <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin text-[color:var(--color-brand-hover)]" />
          ) : failed ? (
            <TriangleAlert className="h-3.5 w-3.5 shrink-0 text-[color:var(--color-danger)]" />
          ) : (
            <Check className="h-3.5 w-3.5 shrink-0 text-[color:var(--color-brand-hover)]" />
          )}
          <span className={cn('truncate font-mono text-[12px]', writing ? 'text-fg' : 'text-fg-muted')}>
            {file.path}
          </span>
          <span className={cn('shrink-0 text-[11px] text-fg-dim', writing && 'shimmer-text')}>
            {writing
              ? file.mode === 'append' ? 'ekleniyor' : 'yazılıyor'
              : failed
                ? 'yazılamadı'
                : `${lines} satır`}
          </span>
          <ChevronRight className={cn('ml-auto h-3.5 w-3.5 shrink-0 text-fg-dim transition-transform', open && 'rotate-90')} />
        </button>
        {!writing && !failed && chatId ? (
          <button
            type="button"
            disabled={busy}
            onClick={() => {
              setBusy(true)
              void workspaceApi.downloadFile(chatId, file.path).finally(() => setBusy(false))
            }}
            aria-label={`${file.path} dosyasını indir`}
            title="İndir"
            className="shrink-0 rounded p-1 text-fg-dim transition-colors hover:text-fg disabled:opacity-60"
          >
            <Download className="h-3 w-3" />
          </button>
        ) : null}
      </div>
      {open ? (
        <div className="border-t border-[color:var(--color-border)]">
          <Markdown content={`\`\`\`${languageOf(file.path)}\n${file.content}\n\`\`\``} />
        </div>
      ) : null}
      {failed && file.error ? (
        <p className="border-t border-[color:var(--color-border)] px-3 py-1.5 text-[11px] text-[color:var(--color-danger)]">
          {file.error}
        </p>
      ) : null}
    </div>
  )
}

export function FileStream({ files, chatId }: { files: AgentFile[]; chatId: number | null }) {
  if (!files || files.length === 0) return null
  return (
    <div className="mb-3 space-y-1.5">
      {files.map((file) => (
        <FileCard key={file.id} file={file} chatId={chatId} />
      ))}
    </div>
  )
}
