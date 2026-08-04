import { BadgeCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

interface VerifiedBadgeProps {
  size?: number
  className?: string
  withLabel?: boolean
}

export function VerifiedBadge({ size = 15, className, withLabel = false }: VerifiedBadgeProps) {
  return (
    <span
      className={cn('inline-flex items-center gap-1 text-[color:var(--color-brand-hover)]', className)}
      title="Doğrulanmış hesap"
      aria-label="Doğrulanmış hesap"
    >
      <BadgeCheck style={{ width: size, height: size }} className="shrink-0" />
      {withLabel ? <span className="text-[11px] font-medium">Doğrulanmış</span> : null}
    </span>
  )
}
