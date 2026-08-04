import { useEffect, useState } from 'react'
import { Smartphone, CheckCircle2, Trash2 } from 'lucide-react'
import { Dialog } from '@/components/ui/Dialog'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { useAuthStore } from '@/lib/store/auth'
import { useUIStore } from '@/lib/store/ui'
import { authApi, subscriptionApi, ApiError, type SubscriptionResponse } from '@/lib/api'
import { config } from '@/lib/config'

interface SubscriptionDialogProps {
  open: boolean
  onClose: () => void
}

const features = [
  'Sınırsız mesaj',
  'Tüm modellere erişim',
  'Öncelikli yanıt',
  'Yeni özelliklere ilk erişim',
]

export function SubscriptionDialog({ open, onClose }: SubscriptionDialogProps) {
  const user = useAuthStore((s) => s.user)
  const isPremium = useAuthStore((s) => s.isPremium)
  const logout = useAuthStore((s) => s.logout)
  const toast = useUIStore((s) => s.toast)
  const [data, setData] = useState<SubscriptionResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [confirmText, setConfirmText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!open) return
    setLoading(true)
    subscriptionApi
      .status()
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false))
  }, [open])

  return (
    <Dialog open={open} onClose={onClose} title="Abonelik & hesap" size="lg">
      <div className="space-y-6">
        <div className="rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-[color:var(--color-surface-2)] p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12px] uppercase tracking-wider text-fg-dim">Mevcut plan</p>
              <p className="mt-1 text-[18px] font-semibold tracking-[-0.01em]">
                {isPremium ? 'Plus' : 'Ücretsiz'}
              </p>
            </div>
            <Badge variant={isPremium ? 'brand' : 'outline'}>{isPremium ? 'Aktif' : 'Free tier'}</Badge>
          </div>
          {!isPremium ? (
            <p className="mt-3 text-[12.5px] text-fg-muted">
              Sohbet başına 25 mesajla sınırlı. Plus aboneliği yalnızca Android uygulaması üzerinden.
            </p>
          ) : (
            <p className="mt-3 text-[12.5px] text-fg-muted">Sınırsız mesaj. Aboneliğiniz aktif.</p>
          )}
        </div>

        {user ? (
          <div className="rounded-[var(--radius-lg)] border border-[color:var(--color-border)] p-5">
            <p className="text-[12px] uppercase tracking-wider text-fg-dim">Hesap</p>
            <p className="mt-2 text-[14px] text-fg">{user.name}</p>
            <p className="text-[12.5px] text-fg-muted">{user.email}</p>
          </div>
        ) : null}

        {!isPremium ? (
          <div className="rounded-[var(--radius-lg)] border border-[color:var(--color-brand)]/30 bg-[linear-gradient(180deg,rgba(16,185,129,0.06),rgba(16,185,129,0))] p-5">
            <h3 className="text-[15.5px] font-semibold tracking-[-0.01em]">Plus aboneliği</h3>
            <ul className="mt-3 space-y-1.5">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-[13.5px] text-fg-muted">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--color-brand-hover)]" />
                  {f}
                </li>
              ))}
            </ul>
            <a href={config.playStoreUrl} target="_blank" rel="noreferrer" className="mt-5 block">
              <Button full leftIcon={<Smartphone className="h-4 w-4" />}>
                Android uygulamasında satın al
              </Button>
            </a>
            <p className="mt-2 text-center text-[11.5px] text-fg-dim">
              Web üzerinden ödeme yakında eklenecektir.
            </p>
          </div>
        ) : (
          <div className="rounded-[var(--radius-lg)] border border-[color:var(--color-border)] p-5">
            <p className="text-[13px] text-fg-muted">
              Aboneliğinizi iptal etmek için Google Play hesap ayarlarınızı kullanın.
            </p>
          </div>
        )}

        {data && data.messageCount > 0 ? (
          <div className="text-[12px] text-fg-dim">
            Bu sohbetteki mesaj sayısı: {data.messageCount} / {data.limit === -1 ? 'sınırsız' : data.limit}
          </div>
        ) : loading ? (
          <p className="text-[12px] text-fg-dim">Durum yükleniyor...</p>
        ) : null}

        {user ? (
        <div className="rounded-[var(--radius-lg)] border border-[color:var(--color-danger)]/30 p-5">
          <h3 className="text-[14.5px] font-semibold text-[color:var(--color-danger)]">Tehlikeli alan</h3>
          <p className="mt-1 text-[13px] text-fg-muted">
            Hesabınızı silerseniz tüm konuşma geçmişiniz, kişiselleştirme ayarlarınız ve aboneliğiniz kalıcı
            olarak silinir. Bu işlem geri alınamaz.
          </p>
          {!deleteOpen ? (
            <Button
              size="sm"
              variant="danger"
              className="mt-4"
              leftIcon={<Trash2 className="h-3.5 w-3.5" />}
              onClick={() => setDeleteOpen(true)}
            >
              Hesabımı sil
            </Button>
          ) : (
            <div className="mt-4 space-y-3">
              <Input
                label='Onaylamak için "HESABIMI SIL" yazın'
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                autoComplete="off"
              />
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="danger"
                  loading={deleting}
                  disabled={confirmText !== 'HESABIMI SIL'}
                  onClick={async () => {
                    setDeleting(true)
                    try {
                      await authApi.deleteAccount(confirmText)
                      toast('Hesabınız silindi.', { variant: 'success' })
                      await logout()
                      window.location.assign('/')
                    } catch (err) {
                      const msg = err instanceof ApiError ? err.message : 'İşlem başarısız'
                      toast(msg, { variant: 'error' })
                    } finally {
                      setDeleting(false)
                    }
                  }}
                >
                  Kalıcı olarak sil
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setDeleteOpen(false)}>
                  Vazgeç
                </Button>
              </div>
            </div>
          )}
        </div>
        ) : null}
      </div>
    </Dialog>
  )
}
