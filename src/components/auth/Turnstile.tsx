import { useEffect, useRef, useState } from 'react'
import { config } from '@/lib/config'

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        opts: {
          sitekey: string
          callback?: (token: string) => void
          'expired-callback'?: () => void
          'error-callback'?: (code?: string | number) => void
          theme?: 'light' | 'dark' | 'auto'
          size?: 'normal' | 'compact' | 'flexible'
          appearance?: 'always' | 'execute' | 'interaction-only'
          retry?: 'auto' | 'never'
          language?: string
        },
      ) => string
      reset: (id?: string) => void
      remove: (id?: string) => void
      execute: (id?: string) => void
    }
  }
}

const SCRIPT_URL = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'

let scriptLoadingPromise: Promise<void> | null = null

function ensureScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()
  if (window.turnstile) return Promise.resolve()
  if (scriptLoadingPromise) return scriptLoadingPromise

  scriptLoadingPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src^="${SCRIPT_URL}"]`)
    if (existing) {
      if (window.turnstile) return resolve()
      existing.addEventListener('load', () => resolve())
      existing.addEventListener('error', () => reject(new Error('script-load-failed')))
      return
    }
    const s = document.createElement('script')
    s.src = SCRIPT_URL
    s.async = true
    s.defer = true
    s.onload = () => resolve()
    s.onerror = () => reject(new Error('script-load-failed'))
    document.head.appendChild(s)
  })
  return scriptLoadingPromise
}

interface TurnstileProps {
  onToken: (token: string) => void
  onExpire?: () => void
  onError?: () => void
  size?: 'normal' | 'compact' | 'flexible'
}

type Status = 'loading' | 'rendered' | 'token' | 'error'

export function Turnstile({ onToken, onExpire, onError, size = 'flexible' }: TurnstileProps) {
  const hostRef = useRef<HTMLDivElement | null>(null)
  const widgetIdRef = useRef<string | null>(null)
  const onTokenRef = useRef(onToken)
  const onExpireRef = useRef(onExpire)
  const onErrorRef = useRef(onError)
  const renderedRef = useRef(false)
  const [status, setStatus] = useState<Status>('loading')
  const [errorCode, setErrorCode] = useState<string>('')

  useEffect(() => {
    onTokenRef.current = onToken
    onExpireRef.current = onExpire
    onErrorRef.current = onError
  })

  useEffect(() => {
    let cancelled = false
    ensureScript()
      .then(() => {
        if (cancelled || renderedRef.current) return
        if (!window.turnstile) {
          setErrorCode('no-turnstile-global')
          setStatus('error')
          return
        }
        if (!hostRef.current) {
          setErrorCode('no-host')
          setStatus('error')
          return
        }
        try {
          widgetIdRef.current = window.turnstile.render(hostRef.current, {
            sitekey: config.turnstileSiteKey,
            theme: 'dark',
            size,
            appearance: 'always',
            language: 'tr',
            retry: 'auto',
            callback: (t) => {
              setStatus('token')
              onTokenRef.current(t)
            },
            'expired-callback': () => {
              setStatus('rendered')
              onExpireRef.current?.()
            },
            'error-callback': (code) => {
              setErrorCode(String(code ?? 'unknown'))
              setStatus('error')
              onErrorRef.current?.()
            },
          })
          renderedRef.current = true
          setStatus('rendered')
        } catch (e) {
          setErrorCode(e instanceof Error ? e.message : 'render-threw')
          setStatus('error')
        }
      })
      .catch((e) => {
        if (cancelled) return
        setErrorCode(e instanceof Error ? e.message : 'script-load-failed')
        setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [size])

  useEffect(() => {
    return () => {
      try {
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.remove(widgetIdRef.current)
          widgetIdRef.current = null
          renderedRef.current = false
        }
      } catch {
        return
      }
    }
  }, [])

  return (
    <div>
      <div ref={hostRef} className="min-h-[65px]" />
      {status === 'error' ? (
        <div className="mt-2 rounded-md border border-[color:var(--color-danger)]/30 bg-[color:var(--color-danger)]/10 px-3 py-2 text-[12.5px] text-[color:var(--color-danger)]">
          Güvenlik doğrulayıcı yüklenemedi.
          {errorCode ? <span className="ml-1 font-mono text-[11px] opacity-80">({errorCode})</span> : null}
          {' '}
          Sayfayı yenileyin; sorun devam ederse Cloudflare → Turnstile site key → Hostname
          Management'a <code>marulai.com.tr</code> ekleyin.
        </div>
      ) : null}
    </div>
  )
}
