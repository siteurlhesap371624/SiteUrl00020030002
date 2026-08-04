import { useEffect, useRef, useState } from 'react'
import { Ban, Flag, MoreHorizontal, Pin, PinOff, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PostMenuProps {
  isAdmin: boolean
  isMine: boolean
  showPin?: boolean
  isPinned?: boolean
  onRemove: () => void
  onTogglePin?: () => void
  onBan?: () => void
  onReport?: () => void
  label?: string
}

export function PostMenu({
  isAdmin,
  isMine,
  showPin,
  isPinned,
  onRemove,
  onTogglePin,
  onBan,
  onReport,
  label = 'Gönderi',
}: PostMenuProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const raf = requestAnimationFrame(() => {
      ref.current?.querySelector<HTMLElement>('[role="menuitem"]')?.focus()
    })
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const canRemove = isMine || isAdmin
  const canPin = isAdmin && showPin && onTogglePin
  const canBan = isAdmin && !isMine && onBan
  const canReport = !isMine && !isAdmin && onReport
  if (!canRemove && !canPin && !canBan && !canReport) return null

  const run = (fn?: () => void) => {
    setOpen(false)
    fn?.()
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-label={`${label} işlemleri`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-fg-dim hover:text-fg hover:bg-white/[0.06] transition-colors"
      >
        <MoreHorizontal className="h-[18px] w-[18px]" />
      </button>
      {open ? (
        <div
          role="menu"
          className="absolute right-0 z-30 mt-1 w-52 overflow-hidden rounded-[var(--radius-md)] border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface-2)] p-1 shadow-[var(--shadow-pop)]"
        >
          {canPin ? (
            <MenuItem icon={isPinned ? PinOff : Pin} onClick={() => run(onTogglePin)}>
              {isPinned ? 'Sabitlemeyi kaldır' : 'Sabitle'}
            </MenuItem>
          ) : null}
          {canRemove ? (
            <MenuItem icon={Trash2} danger onClick={() => run(onRemove)}>
              {isMine && !isAdmin ? 'Sil' : 'Kaldır'}
            </MenuItem>
          ) : null}
          {canBan ? (
            <MenuItem icon={Ban} danger onClick={() => run(onBan)}>
              Kullanıcıyı engelle
            </MenuItem>
          ) : null}
          {canReport ? (
            <MenuItem icon={Flag} onClick={() => run(onReport)}>
              Bildir
            </MenuItem>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

function MenuItem({
  icon: Icon,
  children,
  onClick,
  danger,
}: {
  icon: typeof Ban
  children: React.ReactNode
  onClick: () => void
  danger?: boolean
}) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-2.5 rounded-[8px] px-3 py-2 text-left text-[13px] transition-colors',
        danger
          ? 'text-[color:var(--color-danger)] hover:bg-[color:var(--color-danger)]/10'
          : 'text-fg-muted hover:text-fg hover:bg-white/[0.05]',
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {children}
    </button>
  )
}
