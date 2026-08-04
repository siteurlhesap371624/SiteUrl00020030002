import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail } from 'lucide-react'
import { AuthShell } from '@/components/auth/AuthShell'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Turnstile } from '@/components/auth/Turnstile'
import { SeoHead } from '@/components/ui/SeoHead'
import { ApiError, authApi } from '@/lib/api'
import { useUIStore } from '@/lib/store/ui'

const schema = z.object({ email: z.string().email('Geçerli bir e-posta girin') })
type FormValues = z.infer<typeof schema>

export default function Forgot() {
  const [tsToken, setTsToken] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState<string | null>(null)
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
      const email = data.email.trim().toLowerCase()
      await authApi.forgot({ email, turnstileToken: tsToken })
      setSent(email)
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : 'İşlem başarısız'
      toast(msg, { variant: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <SeoHead title="Şifremi sıfırla" path="/sifre-sifirla" noindex />
      <AuthShell
        title="Şifrenizi sıfırlayın"
        subtitle="Hesabınıza bağlı e-posta adresini girin, size bir sıfırlama bağlantısı gönderelim."
        footer={
          <Link to="/giris" className="text-fg-muted hover:text-fg">
            Giriş sayfasına dön
          </Link>
        }
      >
        {sent ? (
          <div className="space-y-4 text-center">
            <p className="text-[14px] text-fg-muted">
              <span className="text-fg">{sent}</span> adresine bir bağlantı gönderdik. Gelmediyse
              spam klasörünüzü kontrol edin.
            </p>
            <p className="text-[12.5px] text-fg-dim">Bağlantı 1 saat geçerlidir.</p>
          </div>
        ) : (
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
            <Turnstile onToken={setTsToken} onExpire={() => setTsToken(null)} />
            <Button type="submit" full size="lg" loading={submitting} disabled={!tsToken}>
              Sıfırlama bağlantısı gönder
            </Button>
          </form>
        )}
      </AuthShell>
    </>
  )
}
