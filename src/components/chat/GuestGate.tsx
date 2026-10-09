import { useState } from 'react'
import { Turnstile } from '@/components/auth/Turnstile'
import { ApiError, authApi } from '@/lib/api'
import { saveGateToken } from '@/lib/guestGate'
import { useChatStore } from '@/lib/store/chat'

export function GuestGate() {
  const setGuestGateReady = useChatStore((s) => s.setGuestGateReady)
  const [error, setError] = useState<string | null>(null)
  const [checking, setChecking] = useState(false)

  const onToken = async (turnstileToken: string) => {
    setChecking(true)
    setError(null)
    try {
      const res = await authApi.verifyGate(turnstileToken)
      saveGateToken(res.gateToken)
      setGuestGateReady(true)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Doğrulama tamamlanamadı. Lütfen tekrar deneyin.')
    } finally {
      setChecking(false)
    }
  }

  return (
    <div className="mb-2 rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-[color:var(--color-surface-2)]/60 px-3 py-2.5">
      <p className="mb-2 text-[12px] text-fg-muted">
        {checking ? 'Doğrulanıyor...' : 'Misafir olarak devam etmek için kısa güvenlik doğrulamasını tamamlayın.'}
      </p>
      <Turnstile onToken={onToken} />
      {error ? <p className="mt-2 text-[12px] text-[color:var(--color-danger)]">{error}</p> : null}
    </div>
  )
}
