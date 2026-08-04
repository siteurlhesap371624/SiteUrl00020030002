import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Loader2, Smartphone } from 'lucide-react'
import { AuthShell } from '@/components/auth/AuthShell'
import { Button } from '@/components/ui/Button'
import { SeoHead } from '@/components/ui/SeoHead'
import { ApiError, authApi } from '@/lib/api'
import { useAuthStore } from '@/lib/store/auth'
import { useUIStore } from '@/lib/store/ui'
import { safeRedirectPath } from '@/lib/utils'

function decodeStatePlatform(state: string): 'mobile' | 'web' {
  try {
    const middle = state.split('.')[1]
    if (!middle) return 'web'
    const normalized = middle.replace(/-/g, '+').replace(/_/g, '/')
    const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4)
    const decoded = atob(padded)
    const payload = JSON.parse(decoded) as { platform?: string }
    return payload.platform === 'mobile' ? 'mobile' : 'web'
  } catch {
    return 'web'
  }
}

export default function GoogleCallback() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const setSession = useAuthStore((s) => s.setSession)
  const toast = useUIStore((s) => s.toast)
  const [error, setError] = useState<string | null>(null)
  const [mobileDeepLink, setMobileDeepLink] = useState<string | null>(null)
  const ran = useRef(false)

  useEffect(() => {
    if (ran.current) return
    ran.current = true
    const code = params.get('code')
    const state = params.get('state')

    if (!code || !state) {
      setError('Eksik OAuth parametreleri')
      return
    }

    const platform = decodeStatePlatform(state)

    if (platform === 'mobile') {
      const link = `marulai://oauth?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state)}`
      setMobileDeepLink(link)
      const t = setTimeout(() => {
        window.location.href = link
      }, 250)
      return () => clearTimeout(t)
    }

    sessionStorage.removeItem('marul.oauth.state')
    const redirect = safeRedirectPath(sessionStorage.getItem('marul.oauth.redirect'))
    sessionStorage.removeItem('marul.oauth.redirect')

    authApi
      .googleCallback({ code, state })
      .then((res) => {
        setSession(res.token, res.user)
        toast(`Hoş geldiniz, ${res.user.name || res.user.email}`, { variant: 'success' })
        navigate(redirect, { replace: true })
      })
      .catch((err) => {
        const msg = err instanceof ApiError ? err.message : 'Google ile giriş başarısız'
        setError(msg)
      })
  }, [params, navigate, setSession, toast])

  return (
    <>
      <SeoHead title="Google ile giriş" path="/oauth/google" noindex />
      <AuthShell
        title={mobileDeepLink ? 'Uygulamaya dönülüyor' : error ? 'Giriş başarısız' : 'Giriş yapılıyor...'}
      >
        {mobileDeepLink ? (
          <div className="text-center space-y-5">
            <div className="flex justify-center">
              <Smartphone className="h-10 w-10 text-[color:var(--color-brand-hover)]" />
            </div>
            <p className="text-[14px] text-fg-muted leading-relaxed">
              Marul AI uygulamanıza yönlendiriliyorsunuz. Otomatik açılmazsa aşağıdaki butona dokunun.
            </p>
            <a href={mobileDeepLink}>
              <Button full size="lg" leftIcon={<Smartphone className="h-4 w-4" />}>
                Uygulamayı aç
              </Button>
            </a>
            <button
              type="button"
              onClick={() => navigate('/giris')}
              className="block mx-auto text-[13px] text-fg-dim hover:text-fg"
            >
              Tarayıcıda devam et
            </button>
          </div>
        ) : error ? (
          <div className="text-center space-y-4">
            <div className="rounded-md border border-[color:var(--color-danger)]/30 bg-[color:var(--color-danger)]/10 px-4 py-3 text-[13.5px] text-[color:var(--color-danger)]">
              {error}
            </div>
            <button
              type="button"
              onClick={() => navigate('/giris')}
              className="text-[13px] text-fg-muted hover:text-fg"
            >
              Giriş sayfasına dön
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-fg-muted">
            <Loader2 className="h-6 w-6 animate-spin" />
            <p className="mt-3 text-[13.5px]">Hesabınız hazırlanıyor...</p>
          </div>
        )}
      </AuthShell>
    </>
  )
}
