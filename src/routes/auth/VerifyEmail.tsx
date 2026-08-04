import { useEffect, useRef, useState, type KeyboardEvent, type ClipboardEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { AuthShell } from '@/components/auth/AuthShell'
import { Button } from '@/components/ui/Button'
import { SeoHead } from '@/components/ui/SeoHead'
import { ApiError, authApi } from '@/lib/api'
import { useAuthStore } from '@/lib/store/auth'
import { useUIStore } from '@/lib/store/ui'
import { cn } from '@/lib/utils'

const CODE_LEN = 6
const RESEND_SECONDS = 45

export default function VerifyEmail() {
  const [params] = useSearchParams()
  const email = params.get('email') ?? ''
  const [digits, setDigits] = useState<string[]>(Array(CODE_LEN).fill(''))
  const [submitting, setSubmitting] = useState(false)
  const [resending, setResending] = useState(false)
  const [cooldown, setCooldown] = useState(RESEND_SECONDS)
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])
  const navigate = useNavigate()
  const setSession = useAuthStore((s) => s.setSession)
  const toast = useUIStore((s) => s.toast)

  useEffect(() => {
    if (cooldown <= 0) return
    const t = setInterval(() => setCooldown((c) => Math.max(0, c - 1)), 1000)
    return () => clearInterval(t)
  }, [cooldown])

  useEffect(() => {
    inputsRef.current[0]?.focus()
  }, [])

  const setDigit = (i: number, val: string) => {
    const v = val.replace(/\D/g, '').slice(0, 1)
    const next = [...digits]
    next[i] = v
    setDigits(next)
    if (v && i < CODE_LEN - 1) {
      inputsRef.current[i + 1]?.focus()
    }
  }

  const handleKey = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      inputsRef.current[i - 1]?.focus()
    }
    if (e.key === 'ArrowLeft' && i > 0) inputsRef.current[i - 1]?.focus()
    if (e.key === 'ArrowRight' && i < CODE_LEN - 1) inputsRef.current[i + 1]?.focus()
  }

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, CODE_LEN)
    if (!text) return
    e.preventDefault()
    const next = Array(CODE_LEN).fill('')
    for (let i = 0; i < text.length; i++) next[i] = text[i]
    setDigits(next)
    inputsRef.current[Math.min(text.length, CODE_LEN - 1)]?.focus()
  }

  const code = digits.join('')
  const canSubmit = code.length === CODE_LEN && !!email

  const handleSubmit = async () => {
    if (!canSubmit) return
    setSubmitting(true)
    try {
      const res = await authApi.registerVerify({ email, code })
      setSession(res.token, res.user)
      toast('Hesabınız oluşturuldu', { variant: 'success' })
      navigate('/sohbet')
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : 'Kod doğrulanamadı'
      toast(msg, { variant: 'error' })
      setDigits(Array(CODE_LEN).fill(''))
      inputsRef.current[0]?.focus()
    } finally {
      setSubmitting(false)
    }
  }

  const handleResend = async () => {
    if (cooldown > 0 || !email) return
    setResending(true)
    try {
      await authApi.resendCode({ email })
      toast('Yeni kod gönderildi', { variant: 'success' })
      setCooldown(RESEND_SECONDS)
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : 'Kod gönderilemedi'
      toast(msg, { variant: 'error' })
    } finally {
      setResending(false)
    }
  }

  return (
    <>
      <SeoHead title="E-postanı doğrula" path="/e-posta-dogrula" noindex />
      <AuthShell
        title="E-postanızı doğrulayın"
        subtitle={
          email
            ? `${email} adresine 6 haneli bir kod gönderdik.`
            : 'Hesabınızı doğrulamak için gönderilen kodu girin.'
        }
        footer={
          <Link to="/giris" className="text-fg-muted hover:text-fg">
            Giriş sayfasına dön
          </Link>
        }
      >
        <div className="space-y-6">
          <div className="flex justify-center gap-2 sm:gap-3">
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputsRef.current[i] = el
                }}
                inputMode="numeric"
                autoComplete={i === 0 ? 'one-time-code' : 'off'}
                maxLength={1}
                value={d}
                onChange={(e) => setDigit(i, e.target.value)}
                onKeyDown={(e) => handleKey(i, e)}
                onPaste={handlePaste}
                className={cn(
                  'h-12 w-10 sm:h-14 sm:w-12 rounded-md border bg-[color:var(--color-surface-2)] text-center text-[20px] font-semibold text-fg outline-none transition-colors',
                  'border-[color:var(--color-border-strong)] focus:border-[color:var(--color-brand)] focus:ring-2 focus:ring-[color:var(--color-brand)]/20',
                )}
              />
            ))}
          </div>

          <Button full size="lg" loading={submitting} disabled={!canSubmit} onClick={handleSubmit}>
            Doğrula
          </Button>

          <div className="text-center text-[13px] text-fg-muted">
            Kod gelmedi mi?{' '}
            <button
              type="button"
              onClick={handleResend}
              disabled={cooldown > 0 || resending || !email}
              className="text-[color:var(--color-brand-hover)] hover:underline disabled:text-fg-dim disabled:no-underline"
            >
              {cooldown > 0 ? `Tekrar gönder (${cooldown}s)` : resending ? 'Gönderiliyor...' : 'Tekrar gönder'}
            </button>
          </div>
        </div>
      </AuthShell>
    </>
  )
}
