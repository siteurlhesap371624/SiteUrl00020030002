import type { ReactElement } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { AlertCircle, CheckCircle2, Info, TriangleAlert, X } from 'lucide-react'
import { useUIStore, type ToastVariant } from '@/lib/store/ui'
import { cn } from '@/lib/utils'

const variantStyles: Record<ToastVariant, { ring: string; icon: ReactElement }> = {
  default: {
    ring: 'border-[color:var(--color-border-strong)]',
    icon: <Info className="h-4 w-4 text-fg-muted" />,
  },
  success: {
    ring: 'border-[color:var(--color-brand)]/40',
    icon: <CheckCircle2 className="h-4 w-4 text-[color:var(--color-brand-hover)]" />,
  },
  error: {
    ring: 'border-[color:var(--color-danger)]/40',
    icon: <AlertCircle className="h-4 w-4 text-[color:var(--color-danger)]" />,
  },
  warn: {
    ring: 'border-[color:var(--color-warn)]/40',
    icon: <TriangleAlert className="h-4 w-4 text-[color:var(--color-warn)]" />,
  },
}

export function Toaster() {
  const toasts = useUIStore((s) => s.toasts)
  const dismiss = useUIStore((s) => s.dismissToast)

  return (
    <div
      aria-live="polite"
      role="region"
      className="pointer-events-none fixed bottom-4 right-4 z-[90] flex flex-col gap-2"
    >
      <AnimatePresence>
        {toasts.map((t) => {
          const v = variantStyles[t.variant]
          return (
            <m.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.96 }}
              transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
              className={cn(
                'pointer-events-auto flex w-[min(360px,90vw)] items-start gap-3 rounded-[var(--radius-md)] border bg-[color:var(--color-surface)] px-3.5 py-3 shadow-[var(--shadow-pop)]',
                v.ring,
              )}
            >
              <span className="mt-0.5 shrink-0">{v.icon}</span>
              <p className="flex-1 text-[13.5px] leading-snug text-fg">{t.message}</p>
              <button
                type="button"
                onClick={() => dismiss(t.id)}
                className="shrink-0 rounded p-1 text-fg-dim hover:text-fg hover:bg-white/[0.06]"
                aria-label="Bildirimi kapat"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </m.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

