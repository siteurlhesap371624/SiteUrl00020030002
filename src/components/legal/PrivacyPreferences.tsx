import { useState, type ReactNode } from 'react'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ApiError, buildConsent, legalApi } from '@/lib/api'
import { useAuthStore } from '@/lib/store/auth'
import { useUIStore } from '@/lib/store/ui'
import { cn } from '@/lib/utils'

type ConsentKind = 'training' | 'special'

function Toggle({
  checked,
  disabled,
  onChange,
  label,
}: {
  checked: boolean
  disabled?: boolean
  onChange: (value: boolean) => void
  label: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors disabled:opacity-50',
        checked
          ? 'border-[color:var(--color-brand)] bg-[color:var(--color-brand)]/80'
          : 'border-[color:var(--color-border-strong)] bg-[color:var(--color-surface-3)]',
      )}
    >
      <span
        className={cn(
          'inline-block h-4.5 w-4.5 rounded-full bg-white shadow transition-transform',
          checked ? 'translate-x-[22px]' : 'translate-x-[3px]',
        )}
      />
    </button>
  )
}

function Row({ title, children, control }: { title: string; children: ReactNode; control: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <p className="text-[13.5px] font-medium text-fg">{title}</p>
        <p className="mt-1 text-[12.5px] leading-relaxed text-fg-muted">{children}</p>
      </div>
      {control}
    </div>
  )
}

export function PrivacyPreferences() {
  const legal = useAuthStore((s) => s.legal)
  const setLegal = useAuthStore((s) => s.setLegal)
  const toast = useUIStore((s) => s.toast)
  const [busy, setBusy] = useState<ConsentKind | null>(null)
  const [exporting, setExporting] = useState(false)

  const update = async (kind: ConsentKind, value: boolean) => {
    setBusy(kind)
    try {
      const res = await legalApi.consent(buildConsent({ [kind]: value, channel: 'web-settings' }))
      setLegal(res.legal)
      toast(value ? 'Açık rızanız kaydedildi.' : 'Açık rızanız geri alındı.', { variant: 'success' })
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : 'Tercihiniz kaydedilemedi.'
      toast(msg, { variant: 'error' })
    } finally {
      setBusy(null)
    }
  }

  const exportData = async () => {
    setExporting(true)
    try {
      await legalApi.exportData()
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : 'Verileriniz indirilemedi.'
      toast(msg, { variant: 'error' })
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="rounded-[var(--radius-lg)] border border-[color:var(--color-border)] p-5">
      <p className="text-[12px] uppercase tracking-wider text-fg-dim">Gizlilik tercihleri</p>
      <div className="mt-4 space-y-5">
        <Row
          title="Model geliştirme"
          control={
            <Toggle
              label="Sohbetlerin model geliştirmede kullanılması"
              checked={!!legal?.trainingConsent}
              disabled={!legal || busy !== null}
              onChange={(v) => void update('training', v)}
            />
          }
        >
          Sohbet içeriklerinizin anonim hale getirilerek Marul AI dil modellerinin geliştirilmesinde kullanılması.
          Ayrıntılar{' '}
          <a href="/acik-riza#egitim" target="_blank" rel="noopener noreferrer" className="text-fg hover:underline">
            Açık Rıza Metni
          </a>
          ’nde.
        </Row>
        <Row
          title="Özel nitelikli veriler"
          control={
            <Toggle
              label="Özel nitelikli kişisel verilerin işlenmesi"
              checked={!!legal?.specialConsent}
              disabled={!legal || busy !== null}
              onChange={(v) => void update('special', v)}
            />
          }
        >
          Sohbetlerde kendi isteğinizle paylaştığınız sağlık, inanç ve benzeri verilerin yalnızca size yanıt üretilmesi ve
          sohbet geçmişinizin saklanması amacıyla işlenmesi. Ayrıntılar{' '}
          <a
            href="/acik-riza#ozel-nitelikli"
            target="_blank"
            rel="noopener noreferrer"
            className="text-fg hover:underline"
          >
            Açık Rıza Metni
          </a>
          ’nde.
        </Row>
        <p className="text-[12px] leading-relaxed text-fg-dim">
          Rızanızı geri almanız, geri alma tarihinden önceki işlemleri etkilemez. Bu tercihler hizmetin temel
          özelliklerinden yararlanmanızı etkilemez.
        </p>
        <div className="flex flex-wrap items-center gap-3 border-t border-[color:var(--color-border)] pt-4">
          <Button
            size="sm"
            variant="outline"
            loading={exporting}
            leftIcon={<Download className="h-3.5 w-3.5" />}
            onClick={exportData}
          >
            Verilerimi indir
          </Button>
          <span className="text-[12px] text-fg-dim">Hesap, sohbet ve onay kayıtlarınızın bir kopyası (JSON).</span>
        </div>
      </div>
    </div>
  )
}
