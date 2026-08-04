import { cn } from '@/lib/utils'

interface LogoProps {
  size?: number
  showText?: boolean
  textClassName?: string
  className?: string
  rounded?: boolean
}

export function Logo({ size = 28, showText = true, textClassName, className, rounded = true }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <img
        src="/favicon.png"
        width={size}
        height={size}
        alt="Marul AI"
        loading="eager"
        decoding="async"
        className={cn(rounded && 'rounded-[8px]')}
        style={{ width: size, height: size }}
      />
      {showText ? (
        <span className={cn('font-semibold tracking-tight text-[15px] text-fg', textClassName)}>
          Marul AI
        </span>
      ) : null}
    </span>
  )
}
