import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatRelativeTime(input: string | number | Date): string {
  const date = new Date(input)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMin = Math.round(diffMs / 60000)
  const diffHour = Math.round(diffMin / 60)
  const diffDay = Math.round(diffHour / 24)

  if (diffMin < 1) return 'şimdi'
  if (diffMin < 60) return `${diffMin} dk önce`
  if (diffHour < 24) return `${diffHour} sa önce`
  if (diffDay < 7) return `${diffDay} gün önce`

  return date.toLocaleDateString('tr-TR', {
    day: '2-digit',
    month: 'short',
    year: date.getFullYear() === now.getFullYear() ? undefined : 'numeric',
  })
}

export function getInitials(name?: string | null): string {
  if (!name) return 'M'
  const parts = name.trim().split(/\s+/).slice(0, 2)
  return parts.map((p) => p.charAt(0).toUpperCase()).join('') || 'M'
}

export function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim())
}

export function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max)
}

export function copyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text).then(
      () => true,
      () => false,
    )
  }
  return Promise.resolve(false)
}

export function isMobile(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(max-width: 768px)').matches
}

export function safeJsonParse<T>(value: string | null | undefined, fallback: T): T {
  if (!value) return fallback
  try {
    return JSON.parse(value) as T
  } catch {
    return fallback
  }
}

export function safeRedirectPath(value: string | null | undefined, fallback = '/sohbet'): string {
  if (!value || typeof value !== 'string') return fallback
  if (value.includes('\\')) return fallback
  if (Array.from(value).some((c) => c.charCodeAt(0) <= 32)) return fallback
  if (!value.startsWith('/') || value.startsWith('//')) return fallback
  return value
}

export function stripMarkdown(input: string): string {
  if (!input) return ''
  return input
    .replace(/```[^\n`]*\n?([\s\S]*?)```/g, ' $1 ')
    .replace(/~~~[^\n]*\n?([\s\S]*?)~~~/g, ' $1 ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/^[ \t]{0,3}#{1,6}[ \t]+/gm, '')
    .replace(/^[ \t]{0,3}>[ \t]?/gm, '')
    .replace(/^[ \t]*[-*+][ \t]+/gm, '')
    .replace(/^[ \t]*\d+\.[ \t]+/gm, '')
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/(\*|_)(.*?)\1/g, '$2')
    .replace(/~~(.*?)~~/g, '$1')
    .replace(/[|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(bytes < 10240 ? 1 : 0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
