import { VerifiedBadge } from '@/components/ui/VerifiedBadge'
import type { ForumAuthor, ForumCategory } from '@/lib/api'
import { cn, formatRelativeTime, getInitials } from '@/lib/utils'

const CATEGORY_META: Record<ForumCategory, { label: string; className: string }> = {
  genel: {
    label: 'Genel',
    className: 'bg-white/[0.06] text-fg-muted border-[color:var(--color-border-strong)]',
  },
  sorun: {
    label: 'Sorun',
    className: 'bg-[color:var(--color-danger)]/12 text-[color:var(--color-danger)] border-[color:var(--color-danger)]/25',
  },
  oneri: {
    label: 'Öneri',
    className: 'bg-[color:var(--color-accent)]/12 text-[color:#a5b4fc] border-[color:var(--color-accent)]/25',
  },
  duyuru: {
    label: 'Duyuru',
    className: 'bg-[color:var(--color-brand)]/12 text-[color:var(--color-brand-hover)] border-[color:var(--color-brand)]/30',
  },
}

export function CategoryBadge({ category, className }: { category: ForumCategory; className?: string }) {
  const meta = CATEGORY_META[category] ?? CATEGORY_META.genel
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide',
        meta.className,
        className,
      )}
    >
      {meta.label}
    </span>
  )
}

export function Avatar({ name, size = 34 }: { name: string; size?: number }) {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full bg-[color:var(--color-surface-3)] border border-[color:var(--color-border-strong)] font-semibold text-fg-muted"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
      aria-hidden
    >
      {getInitials(name)}
    </span>
  )
}

export function AuthorLine({
  author,
  createdAt,
  size = 34,
}: {
  author: ForumAuthor
  createdAt: string
  size?: number
}) {
  return (
    <div className="flex items-center gap-2.5 min-w-0">
      <Avatar name={author.username} size={size} />
      <div className="min-w-0">
        <div className="flex items-center gap-1">
          <span className="truncate text-[13.5px] font-medium text-fg">{author.username}</span>
          {author.verified ? <VerifiedBadge size={14} /> : null}
        </div>
        <span className="text-[11.5px] text-fg-dim">{formatRelativeTime(createdAt)}</span>
      </div>
    </div>
  )
}
