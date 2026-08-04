import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type BadgeVariant = 'default' | 'brand' | 'outline' | 'warn' | 'subtle'

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
  leftDot?: boolean
}

const variantClass: Record<BadgeVariant, string> = {
  default: 'bg-white/[0.06] text-fg-muted border border-[color:var(--color-border-strong)]',
  brand:
    'bg-[color:var(--color-brand)]/12 text-[color:var(--color-brand-hover)] border border-[color:var(--color-brand)]/30',
  outline: 'bg-transparent text-fg-muted border border-[color:var(--color-border-strong)]',
  warn:
    'bg-[color:var(--color-warn)]/12 text-[color:var(--color-warn)] border border-[color:var(--color-warn)]/25',
  subtle: 'bg-white/[0.03] text-fg-muted border border-transparent',
}

export function Badge({ children, variant = 'default', className, leftDot }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-medium tracking-wide uppercase',
        variantClass[variant],
        className,
      )}
    >
      {leftDot ? (
        <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse-dot" />
      ) : null}
      {children}
    </span>
  )
}
