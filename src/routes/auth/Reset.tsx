import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Lock, Eye, EyeOff } from 'lucide-react'
import { AuthShell } from '@/components/auth/AuthShell'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { SeoHead } from '@/components/ui/SeoHead'
import { ApiError, authApi } from '@/lib/api'
import { useUIStore } from '@/lib/store/ui'

const schema = z
  .object({
    password: z
      .string()
      .min(8, 'Şifre en az 8 karakter')
      .regex(/[A-Za-z]/, 'En az bir harf içermeli')
      .regex(/\d/, 'En az bir rakam içermeli'),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: 'Şifreler eşleşmiyor',
    path: ['confirm'],
  })

type FormValues = z.infer<typeof schema>

export default function Reset() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const token = params.get('token') ?? ''
  const [showPwd, setShowPwd] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const toast = useUIStore((s) => s.toast)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormValues) => {
    if (!token) {
      toast('Geçersiz sıfırlama bağlantısı.', { variant: 'error' })
      return
    }
    setSubmitting(true)
    try {
      await authApi.reset({ token, password: data.password })
      toast('Şifreniz güncellendi. Giriş yapabilirsiniz.', { variant: 'success' })
      navigate('/giris')
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : 'İşlem başarısız'
      toast(msg, { variant: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <SeoHead title="Yeni şifre" path="/sifre-yenile" noindex />
      <AuthShell
        title="Yeni şifre belirleyin"
        subtitle="Yeni şifrenizi belirledikten sonra otomatik olarak giriş sayfasına yönlendirileceksiniz."
        footer={
          <Link to="/giris" className="text-fg-muted hover:text-fg">
            Giriş sayfasına dön
          </Link>
        }
      >
        {!token ? (
          <div className="rounded-md border border-[color:var(--color-danger)]/30 bg-[color:var(--color-danger)]/10 px-4 py-3 text-[13.5px] text-[color:var(--color-danger)]">
            Geçersiz veya süresi dolmuş bir sıfırlama bağlantısı. Lütfen yeni bir sıfırlama
            bağlantısı isteyin.
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <Input
              label="Yeni şifre"
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
            <Input
              label="Yeni şifre (tekrar)"
              type={showPwd ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="••••••••"
              leftIcon={<Lock className="h-4 w-4" />}
              error={errors.confirm?.message}
              {...register('confirm')}
            />
            <Button type="submit" full size="lg" loading={submitting}>
              Şifreyi güncelle
            </Button>
          </form>
        )}
      </AuthShell>
    </>
  )
}
