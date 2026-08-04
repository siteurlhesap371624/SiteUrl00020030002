import { forwardRef, useId, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface FieldProps {
  label?: string
  hint?: string
  error?: string
  leftIcon?: ReactNode
  rightSlot?: ReactNode
  optional?: boolean
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & FieldProps

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, leftIcon, rightSlot, optional, className, id, ...rest },
  ref,
) {
  const autoId = useId()
  const inputId = id ?? autoId
  return (
    <div className="flex flex-col gap-1.5">
      {label ? (
        <label htmlFor={inputId} className="text-[13px] font-medium text-fg-muted">
          {label}
          {optional ? <span className="ml-1 text-fg-dim font-normal">(opsiyonel)</span> : null}
        </label>
      ) : null}
      <div
        className={cn(
          'group flex items-center gap-2 rounded-[var(--radius-md)] border bg-[color:var(--color-surface-2)] px-3 transition-colors ease-snappy duration-150',
          error
            ? 'border-[color:var(--color-danger)]/60 focus-within:border-[color:var(--color-danger)]'
            : 'border-[color:var(--color-border-strong)] focus-within:border-[color:var(--color-border-bright)]',
          'focus-within:ring-2 focus-within:ring-[color:var(--color-brand)]/15',
        )}
      >
        {leftIcon ? <span className="text-fg-dim shrink-0">{leftIcon}</span> : null}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'h-11 w-full bg-transparent text-[14px] text-fg placeholder:text-fg-dim outline-none',
            className,
          )}
          {...rest}
        />
        {rightSlot ? <span className="shrink-0">{rightSlot}</span> : null}
      </div>
      {error ? (
        <p className="text-[12px] text-[color:var(--color-danger)]">{error}</p>
      ) : hint ? (
        <p className="text-[12px] text-fg-dim">{hint}</p>
      ) : null}
    </div>
  )
})

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & FieldProps

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, hint, error, optional, className, id, ...rest },
  ref,
) {
  const autoId = useId()
  const ta = id ?? autoId
  return (
    <div className="flex flex-col gap-1.5">
      {label ? (
        <label htmlFor={ta} className="text-[13px] font-medium text-fg-muted">
          {label}
          {optional ? <span className="ml-1 text-fg-dim font-normal">(opsiyonel)</span> : null}
        </label>
      ) : null}
      <div
        className={cn(
          'rounded-[var(--radius-md)] border bg-[color:var(--color-surface-2)] px-3 py-2.5 transition-colors ease-snappy duration-150',
          error
            ? 'border-[color:var(--color-danger)]/60 focus-within:border-[color:var(--color-danger)]'
            : 'border-[color:var(--color-border-strong)] focus-within:border-[color:var(--color-border-bright)]',
          'focus-within:ring-2 focus-within:ring-[color:var(--color-brand)]/15',
        )}
      >
        <textarea
          ref={ref}
          id={ta}
          className={cn(
            'block w-full bg-transparent text-[14px] text-fg placeholder:text-fg-dim outline-none resize-none',
            className,
          )}
          {...rest}
        />
      </div>
      {error ? (
        <p className="text-[12px] text-[color:var(--color-danger)]">{error}</p>
      ) : hint ? (
        <p className="text-[12px] text-fg-dim">{hint}</p>
      ) : null}
    </div>
  )
})
