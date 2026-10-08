import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { Printer } from 'lucide-react'
import { LEGAL_DOCUMENTS } from '@/content/legal/entity'
import { cn } from '@/lib/utils'

interface TocItem {
  id: string
  title: string
}

interface LegalPageProps {
  title: string
  lastUpdated: string
  version?: string
  intro?: ReactNode
  toc?: TocItem[]
  children: ReactNode
}

export function LegalPage({ title, lastUpdated, version, intro, toc, children }: LegalPageProps) {
  return (
    <div className="container-content py-20 md:py-28">
      <div className="max-w-3xl">
        <p className="text-[12px] font-semibold tracking-[0.12em] uppercase text-fg-dim">Yasal</p>
        <h1 className="mt-3 text-[clamp(2rem,4.5vw,3rem)] font-semibold tracking-[-0.03em] leading-[1.05]">
          {title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="text-[13px] text-fg-dim">
            Son güncelleme: {lastUpdated}
            {version ? <span> · Sürüm {version}</span> : null}
          </p>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 text-[13px] text-fg-muted hover:text-fg transition-colors print:hidden"
          >
            <Printer className="h-3.5 w-3.5" />
            Yazdır veya PDF olarak kaydet
          </button>
        </div>

        <nav aria-label="Yasal belgeler" className="mt-6 flex flex-wrap gap-2 print:hidden">
          {LEGAL_DOCUMENTS.map((doc) => (
            <NavLink
              key={doc.path}
              to={doc.path}
              className={({ isActive }) =>
                cn(
                  'rounded-md border px-2.5 py-1 text-[12.5px] transition-colors',
                  isActive
                    ? 'border-[color:var(--color-border-bright)] bg-white/[0.05] text-fg'
                    : 'border-[color:var(--color-border)] text-fg-muted hover:text-fg hover:border-[color:var(--color-border-strong)]',
                )
              }
            >
              {doc.short}
            </NavLink>
          ))}
        </nav>

        {intro ? (
          <div className="mt-8 space-y-3 text-[16px] text-fg-muted leading-relaxed">{intro}</div>
        ) : null}

        {toc && toc.length > 0 ? (
          <nav
            aria-label="İçindekiler"
            className="mt-10 rounded-[var(--radius-lg)] border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface)] p-5 print:hidden"
          >
            <p className="text-[12px] font-semibold tracking-[0.06em] uppercase text-fg-dim">İçindekiler</p>
            <ol className="mt-3 grid gap-1.5 text-[13.5px] sm:grid-cols-2">
              {toc.map((item, index) => (
                <li key={item.id} className="flex gap-2">
                  <span className="w-6 shrink-0 tabular-nums text-fg-dim">{index + 1}.</span>
                  <a href={`#${item.id}`} className="text-fg-muted hover:text-fg transition-colors">
                    {item.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <div className="prose-legal mt-12 space-y-10 text-[16px] leading-relaxed text-fg-muted">
          {children}
        </div>
      </div>
    </div>
  )
}

interface SectionProps {
  title: string
  children: ReactNode
  id?: string
  number?: number
}

export function Section({ title, children, id, number }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-24 space-y-3">
      <h2 className="text-[19px] font-semibold tracking-[-0.01em] text-fg">
        {number ? <span className="mr-2 tabular-nums text-fg-dim">{number}.</span> : null}
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  )
}

export function SubSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-2 pt-1">
      <h3 className="text-[16.5px] font-semibold text-fg">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  )
}

export function List({ items, ordered = false }: { items: ReactNode[]; ordered?: boolean }) {
  const Tag = ordered ? 'ol' : 'ul'
  return (
    <Tag className={cn('space-y-1.5 pl-5', ordered ? 'list-decimal' : 'list-disc')}>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </Tag>
  )
}

export function Callout({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface)] p-5">
      {title ? <p className="text-[16px] font-semibold text-fg">{title}</p> : null}
      <div className={cn('space-y-2 text-[16px]', title ? 'mt-2' : undefined)}>{children}</div>
    </div>
  )
}

interface LegalTableProps {
  caption?: string
  head: string[]
  rows: ReactNode[][]
}

export function LegalTable({ caption, head, rows }: LegalTableProps) {
  return (
    <div className="overflow-x-auto rounded-[var(--radius-lg)] border border-[color:var(--color-border-strong)]">
      <table className="w-full min-w-[640px] border-collapse text-left text-[14.5px] leading-snug">
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        <thead className="bg-[color:var(--color-surface)]">
          <tr>
            {head.map((cell) => (
              <th
                key={cell}
                scope="col"
                className="border-b border-[color:var(--color-border-strong)] px-3 py-2.5 font-semibold text-fg"
              >
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="align-top">
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={cn(
                    'border-b border-[color:var(--color-border)] px-3 py-2.5',
                    cellIndex === 0 ? 'font-medium text-fg' : undefined,
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function MailLink({ email, subject }: { email: string; subject?: string }) {
  const href = subject ? `mailto:${email}?subject=${encodeURIComponent(subject)}` : `mailto:${email}`
  return (
    <a className="text-fg hover:underline [overflow-wrap:anywhere]" href={href}>
      {email}
    </a>
  )
}
