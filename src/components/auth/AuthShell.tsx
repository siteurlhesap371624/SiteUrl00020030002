import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Logo } from '@/components/ui/Logo'

interface AuthShellProps {
  title: string
  subtitle?: string
  children: ReactNode
  footer?: ReactNode
}

export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <div className="relative min-h-[100dvh] overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 mask-fade-b" aria-hidden />
      <div
        className="absolute left-1/2 top-[-10rem] -z-10 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
        aria-hidden
        style={{
          background:
            'radial-gradient(60% 60% at 50% 50%, rgba(16,185,129,0.18) 0%, rgba(99,102,241,0.06) 45%, transparent 80%)',
        }}
      />

      <header className="relative">
        <div className="container-content flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <Logo size={26} />
          </Link>
          <Link to="/" className="text-[13px] text-fg-muted hover:text-fg transition-colors">
            Ana sayfa
          </Link>
        </div>
      </header>

      <main className="relative">
        <div className="mx-auto flex w-full max-w-md flex-col items-center px-4 py-10 md:py-16">
          <div className="text-center">
            <h1 className="text-[clamp(1.5rem,3.5vw,2rem)] font-semibold tracking-[-0.025em]">
              {title}
            </h1>
            {subtitle ? (
              <p className="mt-2 text-[14px] text-fg-muted">{subtitle}</p>
            ) : null}
          </div>

          <div className="mt-8 w-full rounded-[var(--radius-xl)] border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface)] p-6 md:p-8 shadow-[var(--shadow-soft)]">
            {children}
          </div>

          {footer ? (
            <div className="mt-5 text-center text-[13px] text-fg-muted">{footer}</div>
          ) : null}
        </div>
      </main>
    </div>
  )
}
