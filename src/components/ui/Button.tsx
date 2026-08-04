import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'subtle' | 'danger'
type Size = 'sm' | 'md' | 'lg' | 'icon'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  full?: boolean
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-[color:var(--color-brand)] text-black hover:bg-[color:var(--color-brand-hover)] active:bg-[color:var(--color-brand-dim)] shadow-[0_1px_0_rgba(255,255,255,0.2)_inset,0_8px_24px_-12px_rgba(16,185,129,0.6)]',
  secondary:
    'bg-[color:var(--color-surface-3)] text-fg hover:bg-[color:var(--color-surface-2)] border border-[color:var(--color-border-strong)]',
  ghost: 'bg-transparent text-fg hover:bg-white/[0.04] active:bg-white/[0.07]',
  outline:
    'bg-transparent text-fg border border-[color:var(--color-border-strong)] hover:bg-white/[0.03] hover:border-[color:var(--color-border-bright)]',
  subtle:
    'bg-white/[0.03] text-fg hover:bg-white/[0.06] border border-transparent',
  danger:
    'bg-[color:var(--color-danger)]/12 text-[color:var(--color-danger)] hover:bg-[color:var(--color-danger)]/18 border border-[color:var(--color-danger)]/30',
}

const sizeClasses: Record<Size, string> = {
  sm: 'h-8 px-3 text-[13px] gap-1.5 rounded-[var(--radius-sm)]',
  md: 'h-10 px-4 text-[14px] gap-2 rounded-[var(--radius-md)]',
  lg: 'h-12 px-6 text-[15px] gap-2 rounded-[var(--radius-md)]',
  icon: 'h-9 w-9 rounded-[var(--radius-md)] p-0',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading,
    disabled,
    leftIcon,
    rightIcon,
    children,
    className,
    full,
    type = 'button',
    ...rest
  },
  ref,
) {
  const isDisabled = disabled || loading
  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      className={cn(
        'relative inline-flex items-center justify-center font-medium select-none whitespace-nowrap transition-[background,color,box-shadow,transform] ease-snappy duration-200',
        'focus-visible:outline-2 focus-visible:outline-[color:var(--color-brand)] focus-visible:outline-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',
        'active:scale-[0.98]',
        variantClasses[variant],
        sizeClasses[size],
        full && 'w-full',
        className,
      )}
      {...rest}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : leftIcon ? (
        <span className="inline-flex shrink-0">{leftIcon}</span>
      ) : null}
      {children ? <span className="inline-flex items-center">{children}</span> : null}
      {!loading && rightIcon ? <span className="inline-flex shrink-0">{rightIcon}</span> : null}
    </button>
  )
})
