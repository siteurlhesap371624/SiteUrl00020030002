import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type RevealVariant = 'up' | 'left' | 'right' | 'scale'

interface RevealProps {
  children: ReactNode
  as?: ElementType
  className?: string
  delay?: number
  variant?: RevealVariant
  threshold?: number
  once?: boolean
  id?: string
}

const VARIANT_CLASS: Record<RevealVariant, string> = {
  up: '',
  left: 'reveal-left',
  right: 'reveal-right',
  scale: 'reveal-scale',
}

export function Reveal({
  children,
  as,
  className,
  delay = 0,
  variant = 'up',
  threshold = 0.15,
  once = true,
  id,
}: RevealProps) {
  const Component = (as ?? 'div') as ElementType
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const reveal = () => setVisible(true)

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce || typeof IntersectionObserver === 'undefined') {
      reveal()
      return
    }

    const rect = node.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      reveal()
      if (once) return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal()
            if (once) observer.disconnect()
          } else if (!once) {
            setVisible(false)
          }
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    )
    observer.observe(node)

    const safety = window.setTimeout(() => {
      const r = node.getBoundingClientRect()
      if (r.top < window.innerHeight * 1.5) reveal()
    }, 1600)

    return () => {
      observer.disconnect()
      window.clearTimeout(safety)
    }
  }, [threshold, once])

  return (
    <Component
      ref={ref}
      id={id}
      className={cn('reveal', VARIANT_CLASS[variant], visible && 'reveal-in', className)}
      style={delay ? ({ ['--reveal-delay' as string]: `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Component>
  )
}

export function RevealGroup({
  children,
  className,
  step = 70,
  variant = 'up',
  as,
}: {
  children: ReactNode[]
  className?: string
  step?: number
  variant?: RevealVariant
  as?: ElementType
}) {
  return (
    <>
      {children.map((child, index) => (
        <Reveal key={index} as={as} className={className} delay={index * step} variant={variant}>
          {child}
        </Reveal>
      ))}
    </>
  )
}
