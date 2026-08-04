import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, Lock, User as UserIcon, Eye, EyeOff } from 'lucide-react'
import { AuthShell } from '@/components/auth/AuthShell'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Turnstile } from '@/components/auth/Turnstile'
import { GoogleButton } from '@/components/auth/GoogleButton'
import { SeoHead } from '@/components/ui/SeoHead'
import { ApiError, authApi } from '@/lib/api'
import { useUIStore } from '@/lib/store/ui'

const schema = z
  .object({
    name: z
      .string()
      .min(2, 'Adınızı girin')
      .max(60, 'Ad en fazla 60 karakter'),
    email: z.string().email('Geçerli bir e-posta girin'),
    password: z
      .string()
      .min(8, 'Şifre en az 8 karakter olmalı')
      .regex(/[A-Za-z]/, 'En az bir harf içermeli')
      .regex(/\d/, 'En az bir rakam içermeli'),
    accept: z.literal(true, { error: 'Şartları kabul edin' }),
  })

type FormValues = z.infer<typeof schema>

export default function Register() {
  const [showPwd, setShowPwd] = useState(false)
  const [tsToken, setTsToken] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()
  const toast = useUIStore((s) => s.toast)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { accept: false as unknown as true },
  })

  const onSubmit = async (data: FormValues) => {
    if (!tsToken) {
      toast('Önce güvenlik doğrulamasını tamamlayın.', { variant: 'warn' })
      return
    }
    setSubmitting(true)
    try {
      await authApi.registerStart({
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        password: data.password,
        turnstileToken: tsToken,
      })
      toast('E-postanıza doğrulama kodu gönderildi.', { variant: 'success' })
      navigate(`/e-posta-dogrula?email=${encodeURIComponent(data.email.trim().toLowerCase())}`)
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : 'Kayıt başarısız'
      toast(msg, { variant: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <SeoHead title="Hesap oluştur" path="/kayit" noindex />
      <AuthShell
        title="Hesap oluşturun"
        subtitle="Ücretsiz hesap; kart bilgisi gerekmez."
        footer={
          <>
            Hesabınız var mı?{' '}
            <Link to="/giris" className="text-[color:var(--color-brand-hover)] hover:underline">
              Giriş yapın
            </Link>
          </>
        }
      >
        <GoogleButton label="Google ile kaydol" />
        <div className="my-5 flex items-center gap-3 text-[12px] text-fg-dim">
          <div className="h-px flex-1 bg-[color:var(--color-border)]" />
          veya e-posta ile
          <div className="h-px flex-1 bg-[color:var(--color-border)]" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <Input
            label="Ad soyad"
            type="text"
            autoComplete="name"
            placeholder="Adınız Soyadınız"
            leftIcon={<UserIcon className="h-4 w-4" />}
            error={errors.name?.message}
            {...register('name')}
          />
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
            autoComplete="new-password"
            placeholder="En az 8 karakter, harf ve rakam"
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

          <label className="flex items-start gap-2.5 text-[12.5px] text-fg-muted leading-snug">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 rounded border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface-2)] accent-[color:var(--color-brand)]"
              {...register('accept')}
            />
            <span>
              <Link to="/sartlar" className="text-fg hover:underline">
                Kullanım şartlarını
              </Link>{' '}
              ve{' '}
              <Link to="/gizlilik" className="text-fg hover:underline">
                gizlilik politikasını
              </Link>{' '}
              okudum ve kabul ediyorum.
            </span>
          </label>
          {errors.accept?.message ? (
            <p className="text-[12px] text-[color:var(--color-danger)]">{errors.accept.message}</p>
          ) : null}

          <Turnstile onToken={setTsToken} onExpire={() => setTsToken(null)} />

          <Button type="submit" full size="lg" loading={submitting} disabled={!tsToken}>
            Hesap oluştur
          </Button>
        </form>
      </AuthShell>
    </>
  )
}
