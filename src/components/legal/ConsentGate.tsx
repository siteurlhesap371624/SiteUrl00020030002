import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Dialog } from '@/components/ui/Dialog'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ConsentChecks, type ConsentChoice } from '@/components/legal/ConsentChecks'
import { LEGAL_PATHS } from '@/content/legal/entity'
import { ApiError, authApi, buildConsent, legalApi } from '@/lib/api'
import { useAuthStore } from '@/lib/store/auth'
import { DELETE_CONFIRM_PHRASE, isDeleteConfirmation } from '@/lib/utils'
import { useUIStore } from '@/lib/store/ui'

const EXEMPT_PATHS = new Set<string>([...LEGAL_PATHS, '/yasal-arsiv', '/iletisim', '/oauth/google', '/e-posta-dogrula', '/sifre-yenile'])

const HIGHLIGHTS = [
  'Kullanım Koşulları; yapay zeka çıktıları, Sosyal bölümü, Plus ve sorumluluk hükümlerini düzenler.',
  'KVKK Aydınlatma Metni ve Gizlilik Politikası, verilerin aktarıldığı tüm hizmet sağlayıcıları ve saklama sürelerini açıklar.',
  'Sohbetlerin model geliştirmede kullanılması ve özel nitelikli verilerin işlenmesi yalnızca ayrı açık rızanızla mümkündür.',
]

function toBoolean(choice: ConsentChoice): boolean | null {
  if (choice === 'grant') return true
  if (choice === 'deny') return false
  return null
}

export function ConsentGate() {
  const user = useAuthStore((s) => s.user)
  const legal = useAuthStore((s) => s.legal)
  const location = useLocation()
  const open = !!user && !!legal && !legal.termsUpToDate && !EXEMPT_PATHS.has(location.pathname)
  return open ? <ConsentGateDialog /> : null
}

function ConsentGateDialog() {
  const setLegal = useAuthStore((s) => s.setLegal)
  const logout = useAuthStore((s) => s.logout)
  const toast = useUIStore((s) => s.toast)

  const [terms, setTerms] = useState(false)
  const [notice, setNotice] = useState(false)
  const [training, setTraining] = useState<ConsentChoice>(null)
  const [special, setSpecial] = useState<ConsentChoice>(null)
  const [termsError, setTermsError] = useState<string | undefined>()
  const [noticeError, setNoticeError] = useState<string | undefined>()
  const [saving, setSaving] = useState(false)
  const [view, setView] = useState<'ask' | 'decline' | 'delete'>('ask')
  const [confirmText, setConfirmText] = useState('')
  const [deleting, setDeleting] = useState(false)

  const accept = async () => {
    const missingTerms = !terms
    const missingNotice = !notice
    setTermsError(missingTerms ? 'Devam etmek için Kullanım Koşulları’nı onaylamanız gerekiyor.' : undefined)
    setNoticeError(missingNotice ? 'Devam etmek için Aydınlatma Metni’ni okuduğunuzu belirtmeniz gerekiyor.' : undefined)
    if (missingTerms || missingNotice) return
    setSaving(true)
    try {
      const res = await legalApi.consent(
        buildConsent({
          acceptTerms: true,
          training: toBoolean(training),
          special: toBoolean(special),
          channel: 'web-update',
        }),
      )
      setLegal(res.legal)
      toast('Onayınız kaydedildi.', { variant: 'success' })
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : 'Onay kaydedilemedi. Lütfen tekrar deneyin.'
      toast(msg, { variant: 'error' })
    } finally {
      setSaving(false)
    }
  }

  const exportData = async () => {
    try {
      await legalApi.exportData()
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : 'Verileriniz indirilemedi.'
      toast(msg, { variant: 'error' })
    }
  }

  const removeAccount = async () => {
    setDeleting(true)
    try {
      await authApi.deleteAccount(DELETE_CONFIRM_PHRASE)
      toast('Hesabınız ve verileriniz silindi.', { variant: 'success' })
      await logout()
      window.location.assign('/')
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : 'İşlem başarısız'
      toast(msg, { variant: 'error' })
    } finally {
      setDeleting(false)
    }
  }

  const footer =
    view === 'ask' ? (
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <Button variant="outline" size="md" full onClick={() => setView('decline')}>
          Kabul etmiyorum
        </Button>
        <Button size="md" full loading={saving} onClick={accept}>
          Onayla ve devam et
        </Button>
      </div>
    ) : view === 'decline' ? (
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
        <Button variant="ghost" size="md" onClick={() => setView('ask')}>
          Geri dön
        </Button>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button variant="outline" size="md" onClick={() => void logout()}>
            Çıkış yap
          </Button>
          <Button variant="danger" size="md" onClick={() => setView('delete')}>
            Hesabımı sil
          </Button>
        </div>
      </div>
    ) : (
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
        <Button variant="ghost" size="md" onClick={() => setView('decline')}>
          Vazgeç
        </Button>
        <Button
          variant="danger"
          size="md"
          loading={deleting}
          disabled={!isDeleteConfirmation(confirmText)}
          onClick={removeAccount}
        >
          Kalıcı olarak sil
        </Button>
      </div>
    )

  return (
    <Dialog
      open
      onClose={() => undefined}
      dismissible={false}
      size="lg"
      title={view === 'ask' ? 'Kullanım Koşulları’nı onaylayın' : view === 'decline' ? 'Onay vermezseniz' : 'Hesabı sil'}
      description={
        view === 'ask'
          ? 'Hesabınızla devam etmek için güncel Kullanım Koşulları’nı onaylamanız ve Aydınlatma Metni’ni okuduğunuzu belirtmeniz gerekiyor.'
          : undefined
      }
      footer={footer}
    >
      {view === 'ask' ? (
        <div className="space-y-5">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-fg-dim">Güncel metinlerde öne çıkanlar</p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[13px] leading-relaxed text-fg-muted">
              {HIGHLIGHTS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <ConsentChecks
            terms={terms}
            onTermsChange={(v) => {
              setTerms(v)
              if (v) setTermsError(undefined)
            }}
            notice={notice}
            onNoticeChange={(v) => {
              setNotice(v)
              if (v) setNoticeError(undefined)
            }}
            termsError={termsError}
            noticeError={noticeError}
            showOptional
            training={training}
            onTrainingChange={setTraining}
            special={special}
            onSpecialChange={setSpecial}
          />
        </div>
      ) : view === 'decline' ? (
        <div className="space-y-3 text-[13.5px] leading-relaxed text-fg-muted">
          <p>
            Güncel koşulları onaylamadan hesabınızla hizmeti kullanmaya devam edemezsiniz. Daha önce onayladığınız bir
            sürüm varsa, onaylayıncaya veya hesabınızı silinceye kadar o sürüm sizin için geçerliliğini korur.
          </p>
          <p>
            Dilerseniz çıkış yapıp daha sonra karar verebilir, verilerinizin bir kopyasını indirebilir ya da hesabınızı
            ve sohbet geçmişinizi kalıcı olarak silebilirsiniz. KVKK kapsamındaki haklarınızı kullanmak için bize her
            zaman e-posta ile ulaşabilirsiniz.
          </p>
          <Button variant="outline" size="sm" onClick={exportData}>
            Verilerimi indir
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-[13.5px] leading-relaxed text-fg-muted">
            Hesabınız, sohbet geçmişiniz, kişiselleştirme ayarlarınız, Sosyal bölüm paylaşımlarınız ve Plus hakkınız
            kalıcı olarak silinir. Kanunen
            saklamakla yükümlü olduğumuz kayıtlar, Gizlilik Politikası’nda belirtilen süreler boyunca erişimi
            kısıtlanarak saklanır. Bu işlem geri alınamaz.
          </p>
          <Input
            label='Onaylamak için "HESABIMI SIL" yazın'
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            autoComplete="off"
          />
        </div>
      )}
    </Dialog>
  )
}
