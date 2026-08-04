import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, m } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DialogProps {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  children: ReactNode
  footer?: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  closeOnBackdrop?: boolean
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-xl',
  xl: 'max-w-2xl',
} as const

let dialogStackCount = 0

function lockBodyScroll() {
  if (dialogStackCount === 0) {
    const scrollY = window.scrollY
    document.body.dataset.scrollY = String(scrollY)
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.overflow = 'hidden'
  }
  dialogStackCount++
}

function unlockBodyScroll() {
  dialogStackCount = Math.max(0, dialogStackCount - 1)
  if (dialogStackCount === 0) {
    const scrollY = Number(document.body.dataset.scrollY || '0')
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.left = ''
    document.body.style.right = ''
    document.body.style.overflow = ''
    delete document.body.dataset.scrollY
    window.scrollTo(0, scrollY)
  }
}

export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  closeOnBackdrop = true,
}: DialogProps) {
  const panelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!open) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    lockBodyScroll()
    const selector =
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    const raf = requestAnimationFrame(() => {
      const panel = panelRef.current
      if (!panel) return
      const first = panel.querySelector<HTMLElement>(selector)
      ;(first || panel).focus()
    })
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      const panel = panelRef.current
      if (!panel) return
      const items = Array.from(panel.querySelectorAll<HTMLElement>(selector)).filter(
        (el) => el.offsetParent !== null,
      )
      if (items.length === 0) {
        e.preventDefault()
        panel.focus()
        return
      }
      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement as HTMLElement | null
      if (e.shiftKey && active === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      } else if (active && !panel.contains(active)) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('keydown', onKey)
      unlockBodyScroll()
      if (previouslyFocused && typeof previouslyFocused.focus === 'function') previouslyFocused.focus()
    }
  }, [open, onClose])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 overscroll-contain">
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={closeOnBackdrop ? onClose : undefined}
          />
          <m.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
            aria-labelledby={title ? 'dialog-title' : undefined}
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 4 }}
            transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
            className={cn(
              'relative flex w-full max-h-[calc(100dvh-2rem)] flex-col rounded-[var(--radius-xl)] bg-[color:var(--color-surface)] border border-[color:var(--color-border-strong)] shadow-[var(--shadow-pop)] overflow-hidden',
              sizeClasses[size],
            )}
          >
            <div className="flex shrink-0 items-start justify-between gap-4 px-6 pt-5 pb-3 border-b border-[color:var(--color-border)]">
              <div className="min-w-0">
                {title ? (
                  <h2 id="dialog-title" className="text-[17px] font-semibold tracking-tight text-fg">
                    {title}
                  </h2>
                ) : null}
                {description ? (
                  <p className="mt-1 text-[13px] text-fg-muted">{description}</p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Kapat"
                className="-mt-1 -mr-2 inline-flex h-9 w-9 items-center justify-center rounded-full text-fg-muted hover:text-fg hover:bg-white/[0.06] transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-6 py-5">
              {children}
            </div>
            {footer ? (
              <div className="shrink-0 border-t border-[color:var(--color-border)] px-6 py-4 bg-[color:var(--color-surface-2)]/40">
                {footer}
              </div>
            ) : null}
          </m.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}
