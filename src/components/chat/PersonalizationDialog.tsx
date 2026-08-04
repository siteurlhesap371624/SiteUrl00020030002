import { useEffect, useState } from 'react'
import { Dialog } from '@/components/ui/Dialog'
import { Textarea } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { personalizationApi, ApiError } from '@/lib/api'
import { useUIStore } from '@/lib/store/ui'
import { LIMITS } from '@/lib/config'

const examples = [
  'Samimi ve doğrudan konuş, gereksiz uzatma.',
  'Profesyonel ton kullan, üst düzey iş yazışmaları için.',
  'Cevapları madde madde ver ve örneklerle açıkla.',
  'Türkçe karakterleri her zaman doğru kullan.',
]

interface PersonalizationDialogProps {
  open: boolean
  onClose: () => void
}

export function PersonalizationDialog({ open, onClose }: PersonalizationDialogProps) {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const toast = useUIStore((s) => s.toast)

  useEffect(() => {
    if (!open) return
    setLoading(true)
    personalizationApi
      .get()
      .then((res) => setValue(res.systemPrompt ?? ''))
      .catch(() => setValue(''))
      .finally(() => setLoading(false))
  }, [open])

  const handleSave = async () => {
    setSaving(true)
    try {
      await personalizationApi.save(value)
      toast('Kişiselleştirme kaydedildi', { variant: 'success' })
      onClose()
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : 'Kaydedilemedi'
      toast(msg, { variant: 'error' })
    } finally {
      setSaving(false)
    }
  }

  const handleClear = async () => {
    if (!value) {
      onClose()
      return
    }
    setSaving(true)
    try {
      await personalizationApi.clear()
      setValue('')
      toast('Kişiselleştirme temizlendi', { variant: 'success' })
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : 'İşlem başarısız'
      toast(msg, { variant: 'error' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Kişiselleştirme"
      description="Marul AI'nin size nasıl hitap edeceğini ve cevaplarını nasıl şekillendireceğini söyleyin."
      size="lg"
      footer={
        <div className="flex items-center justify-end gap-2">
          <Button variant="ghost" onClick={handleClear} disabled={loading || saving}>
            Temizle
          </Button>
          <Button onClick={handleSave} loading={saving} disabled={loading}>
            Kaydet
          </Button>
        </div>
      }
    >
      <Textarea
        rows={6}
        maxLength={LIMITS.personalizationMax}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Örneğin: Bana her zaman 'siz' diye hitap et, cevapları kısa tut..."
        hint={`${value.length} / ${LIMITS.personalizationMax} karakter`}
      />
      <div className="mt-4">
        <p className="text-[12px] uppercase tracking-wider text-fg-dim">Hızlı örnekler</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {examples.map((e) => (
            <button
              key={e}
              type="button"
              onClick={() => setValue((v) => (v ? `${v}\n${e}` : e))}
              className="rounded-full border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface-2)] px-3 py-1 text-[12px] text-fg-muted hover:text-fg hover:border-[color:var(--color-border-bright)] transition-colors"
            >
              {e}
            </button>
          ))}
        </div>
      </div>
    </Dialog>
  )
}
