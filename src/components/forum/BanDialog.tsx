import { useState } from 'react'
import { Dialog } from '@/components/ui/Dialog'
import { Textarea } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { ApiError, forumApi } from '@/lib/api'
import { useUIStore } from '@/lib/store/ui'

interface BanDialogProps {
  username: string | null
  onClose: () => void
  onDone: (username: string) => void
}

export function BanDialog({ username, onClose, onDone }: BanDialogProps) {
  const [reason, setReason] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const toast = useUIStore((s) => s.toast)

  const confirm = async () => {
    if (!username) return
    setSubmitting(true)
    try {
      await forumApi.ban({ username, banned: true, reason: reason.trim() || undefined })
      toast(`@${username} engellendi.`, { variant: 'success' })
      onDone(username)
      setReason('')
      onClose()
    } catch (e) {
      toast(e instanceof ApiError ? e.message : 'İşlem başarısız', { variant: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog
      open={!!username}
      onClose={onClose}
      title="Kullanıcıyı engelle"
      description={username ? `@${username} forumda içerik paylaşamayacak. İçerikleri görünür kalır.` : undefined}
      size="md"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={submitting}>
            Vazgeç
          </Button>
          <Button variant="danger" loading={submitting} onClick={confirm}>
            Engelle
          </Button>
        </div>
      }
    >
      <Textarea
        label="Sebep (isteğe bağlı)"
        placeholder="Örn. tekrarlayan spam paylaşımı"
        rows={3}
        maxLength={200}
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />
    </Dialog>
  )
}
