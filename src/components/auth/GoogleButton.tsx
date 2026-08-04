import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authApi, ApiError } from '@/lib/api'
import { Button } from '@/components/ui/Button'
import { useUIStore } from '@/lib/store/ui'
import { config } from '@/lib/config'

interface GoogleButtonProps {
  full?: boolean
  label?: string
}

export function GoogleButton({ full = true, label = 'Google ile devam et' }: GoogleButtonProps) {
  const [loading, setLoading] = useState(false)
  const toast = useUIStore((s) => s.toast)
  const navigate = useNavigate()

  const handleClick = async () => {
    if (!config.googleClientId) {
      toast('Google girişi henüz aktif değil. E-posta ile devam edin.', { variant: 'warn' })
      return
    }
    setLoading(true)
    try {
      const res = await authApi.googleStart()
      sessionStorage.setItem('marul.oauth.state', res.state)
      const redirect = new URLSearchParams(window.location.search).get('redirect')
      if (redirect) sessionStorage.setItem('marul.oauth.redirect', redirect)
      else sessionStorage.removeItem('marul.oauth.redirect')
      window.location.assign(res.url)
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : 'Google başlatılamadı'
      toast(msg, { variant: 'error' })
      navigate('/giris')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      type="button"
      variant="secondary"
      size="lg"
      full={full}
      loading={loading}
      onClick={handleClick}
      leftIcon={
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
          <path
            d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.49h4.84a4.13 4.13 0 01-1.79 2.71v2.25h2.9c1.7-1.56 2.69-3.86 2.69-6.61z"
            fill="#4285F4"
          />
          <path
            d="M9 18c2.43 0 4.47-.81 5.96-2.19l-2.9-2.25c-.81.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.97v2.34A9 9 0 009 18z"
            fill="#34A853"
          />
          <path
            d="M3.95 10.7A5.41 5.41 0 013.66 9c0-.59.1-1.16.28-1.7V4.96H.97A9.001 9.001 0 000 9c0 1.45.35 2.83.97 4.04l2.98-2.34z"
            fill="#FBBC05"
          />
          <path
            d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 00.97 4.96l2.98 2.34C4.66 5.17 6.65 3.58 9 3.58z"
            fill="#EA4335"
          />
        </svg>
      }
    >
      {label}
    </Button>
  )
}
