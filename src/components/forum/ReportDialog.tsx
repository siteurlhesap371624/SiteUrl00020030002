import { useState } from 'react'
import { Dialog } from '@/components/ui/Dialog'
import { Textarea } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { ApiError, forumApi } from '@/lib/api'
import { useUIStore } from '@/lib/store/ui'

export interface ReportTarget {
  type: 'post' | 'reply'
  id: number
}

interface ReportDialogProps {
  target: ReportTarget | null
  onClose: () => void
}

export function ReportDialog({ target, onClose }: ReportDialogProps) {
  const [reason, setReason] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const toast = useUIStore((s) => s.toast)

  const submit = async () => {
    if (!target) return
    setSubmitting(true)
    try {
      if (target.type === 'post') await forumApi.reportPost(target.id, reason.trim())
      else await forumApi.reportReply(target.id, reason.trim())
      toast('Bildiriminiz alındı. Teşekkürler.', { variant: 'success' })
      setReason('')
      onClose()
    } catch (e) {
      toast(e instanceof ApiError ? e.message : 'Bildirim gönderilemedi', { variant: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog
      open={!!target}
      onClose={onClose}
      title="İçeriği bildir"
      description="Bu içeriği moderasyon ekibine iletin. İncelenip gerekirse kaldırılır."
      size="md"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={submitting}>
            Vazgeç
          </Button>
          <Button loading={submitting} onClick={submit}>
            Gönder
          </Button>
        </div>
      }
    >
      <Textarea
        label="Sebep (isteğe bağlı)"
        placeholder="Örn. spam, hakaret, uygunsuz içerik"
        rows={3}
        maxLength={500}
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />
    </Dialog>
  )
}
