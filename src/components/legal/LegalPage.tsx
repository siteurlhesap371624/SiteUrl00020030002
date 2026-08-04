import type { ReactNode } from 'react'

interface LegalPageProps {
  title: string
  lastUpdated: string
  intro?: string
  children: ReactNode
}

export function LegalPage({ title, lastUpdated, intro, children }: LegalPageProps) {
  return (
    <div className="container-content py-20 md:py-28">
      <div className="max-w-3xl">
        <p className="text-[12px] font-semibold tracking-[0.12em] uppercase text-fg-dim">Yasal</p>
        <h1 className="mt-3 text-[clamp(2rem,4.5vw,3rem)] font-semibold tracking-[-0.03em] leading-[1.05]">
          {title}
        </h1>
        <p className="mt-4 text-[12.5px] text-fg-dim">Son güncelleme: {lastUpdated}</p>
        {intro ? <p className="mt-6 text-[15.5px] text-fg-muted leading-relaxed">{intro}</p> : null}
        <div className="prose-legal mt-10 space-y-8 text-[14.5px] leading-relaxed text-fg-muted">
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
}

export function Section({ title, children, id }: SectionProps) {
  return (
    <section id={id} className="space-y-3">
      <h2 className="text-[18px] font-semibold tracking-[-0.01em] text-fg">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  )
}
