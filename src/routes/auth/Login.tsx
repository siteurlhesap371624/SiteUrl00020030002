import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { AuthShell } from '@/components/auth/AuthShell'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Turnstile } from '@/components/auth/Turnstile'
import { GoogleButton } from '@/components/auth/GoogleButton'
import { SeoHead } from '@/components/ui/SeoHead'
import { ApiError, authApi } from '@/lib/api'
import { useAuthStore } from '@/lib/store/auth'
import { useUIStore } from '@/lib/store/ui'
import { safeRedirectPath } from '@/lib/utils'

const schema = z.object({
  email: z.string().email('Geçerli bir e-posta girin'),
  password: z.string().min(6, 'Şifre en az 6 karakter olmalı'),
})

type FormValues = z.infer<typeof schema>

export default function Login() {
  const [showPwd, setShowPwd] = useState(false)
  const [tsToken, setTsToken] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const setSession = useAuthStore((s) => s.setSession)
  const toast = useUIStore((s) => s.toast)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormValues) => {
    if (!tsToken) {
      toast('Önce güvenlik doğrulamasını tamamlayın.', { variant: 'warn' })
      return
    }
    setSubmitting(true)
    try {
      const res = await authApi.login({
        email: data.email.trim().toLowerCase(),
        password: data.password,
        turnstileToken: tsToken,
      })
      setSession(res.token, res.user)
      toast(`Hoş geldiniz, ${res.user.name || res.user.email}`, { variant: 'success' })
      const redirect = safeRedirectPath(new URLSearchParams(location.search).get('redirect'))
      navigate(redirect)
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : 'Giriş başarısız'
      toast(msg, { variant: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <SeoHead title="Giriş yap" path="/giris" noindex />
      <AuthShell
        title="Hesabınıza giriş yapın"
        subtitle="Sohbet geçmişiniz ve aboneliğiniz sizinle."
        footer={
          <>
            Hesabınız yok mu?{' '}
            <Link to="/kayit" className="text-[color:var(--color-brand-hover)] hover:underline">
              Ücretsiz oluştur
            </Link>
          </>
        }
      >
        <GoogleButton />
        <div className="my-5 flex items-center gap-3 text-[12px] text-fg-dim">
          <div className="h-px flex-1 bg-[color:var(--color-border)]" />
          veya e-posta ile
          <div className="h-px flex-1 bg-[color:var(--color-border)]" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <Input
            label="E-posta adresi"
            type="email"
            autoComplete="email"
            placeholder="ornek@marulai.com.tr"
            leftIcon={<Mail className="h-4 w-4" />}
            error={errors.email?.message}
            {...register('email')}
          />
          <Input
            label="Şifre"
            type={showPwd ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="••••••••"
            leftIcon={<Lock className="h-4 w-4" />}
            error={errors.password?.message}
            rightSlot={
              <button
                type="button"
                onClick={() => setShowPwd((v) => !v)}
                aria-label={showPwd ? 'Şifreyi gizle' : 'Şifreyi göster'}
                className="text-fg-dim hover:text-fg p-1"
              >
                {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            }
            {...register('password')}
          />

          <div className="flex items-center justify-end -mt-1">
            <Link
              to="/sifre-sifirla"
              className="text-[12.5px] text-fg-muted hover:text-fg transition-colors"
            >
              Şifremi unuttum
            </Link>
          </div>

          <Turnstile onToken={setTsToken} onExpire={() => setTsToken(null)} />

          <Button type="submit" full size="lg" loading={submitting} disabled={!tsToken}>
            Giriş yap
          </Button>
        </form>
      </AuthShell>
    </>
  )
}
