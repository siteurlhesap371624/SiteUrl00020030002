import { useMemo, useState } from 'react'
import { AtSign, ShieldCheck, TriangleAlert } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { ApiError, forumApi, type ForumMe } from '@/lib/api'
import { FORUM_PREVIEW } from '@/lib/config'
import { PREVIEW_ME } from '@/lib/forumPreview'
import { useUIStore } from '@/lib/store/ui'

const RULES = [
  'Saygılı olun. Hakaret, taciz, tehdit ve nefret söylemi içeren paylaşımlar yasaktır.',
  'Spam, reklam, yanıltıcı veya alakasız içerik paylaşmayın.',
  'Yasa dışı içerik, başkalarına ait kişisel veri ve telif hakkı ihlali kesinlikle yasaktır.',
  'Uygunsuz kullanıcı adı seçenler ve kuralları ihlal edenler uyarısız olarak engellenebilir.',
  'Paylaşımlar Marul AI ekibi tarafından denetlenebilir; uygun olmayan içerikler kaldırılabilir.',
]

function localUsernameError(value: string): string | null {
  const v = value.trim().toLowerCase()
  if (!v) return null
  if (v.length < 3) return 'En az 3 karakter olmalı'
  if (v.length > 20) return 'En fazla 20 karakter olabilir'
  if (!/^[a-z][a-z0-9_]*$/.test(v)) return 'Küçük harfle başlamalı; harf, rakam ve alt çizgi kullanın'
  if (v.includes('__')) return 'Arka arkaya alt çizgi olamaz'
  if (v.endsWith('_')) return 'Alt çizgi ile bitemez'
  return null
}

interface ForumOnboardingProps {
  onDone: (me: ForumMe) => void
}

export function ForumOnboarding({ onDone }: ForumOnboardingProps) {
  const [step, setStep] = useState<'rules' | 'username'>('rules')
  const [accepted, setAccepted] = useState(false)
  const [username, setUsername] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const toast = useUIStore((s) => s.toast)

  const liveError = useMemo(() => localUsernameError(username), [username])

  const submit = async () => {
    const err = localUsernameError(username)
    if (err || username.trim().length < 3) {
      toast('Geçerli bir kullanıcı adı girin.', { variant: 'warn' })
      return
    }
    if (FORUM_PREVIEW) {
      toast(`Aramıza hoş geldiniz, ${username.trim()}`, { variant: 'success' })
      onDone({ ...PREVIEW_ME, username: username.trim(), hasProfile: true })
      return
    }
    setSubmitting(true)
    try {
      const res = await forumApi.createProfile({ username: username.trim(), acceptRules: true })
      toast(`Aramıza hoş geldiniz, ${res.username}`, { variant: 'success' })
      const me = await forumApi.me()
      onDone(me)
    } catch (e) {
      toast(e instanceof ApiError ? e.message : 'Kullanıcı adı oluşturulamadı', { variant: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-lg">
      <div className="rounded-[var(--radius-xl)] border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface)] p-6 md:p-8 shadow-[var(--shadow-soft)]">
        {step === 'rules' ? (
          <>
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[color:var(--color-brand)]/12 text-[color:var(--color-brand-hover)]">
                <ShieldCheck className="h-[18px] w-[18px]" />
              </span>
              <div>
                <h2 className="text-[17px] font-semibold tracking-tight text-fg">Marul Sosyal kuralları</h2>
                <p className="text-[12.5px] text-fg-muted">Topluluğa katılmadan önce lütfen okuyun.</p>
              </div>
            </div>

            <ul className="mt-5 flex flex-col gap-3">
              {RULES.map((rule, i) => (
                <li key={i} className="flex gap-2.5 text-[13.5px] leading-relaxed text-fg-muted">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[color:var(--color-border-strong)] text-[11px] font-mono text-fg-dim">
                    {i + 1}
                  </span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>

            <label className="mt-6 flex cursor-pointer items-start gap-2.5 rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-[color:var(--color-surface-2)] p-3.5">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-[color:var(--color-brand)]"
              />
              <span className="text-[13.5px] text-fg">
                Forum kurallarını okudum ve kabul ediyorum.
              </span>
            </label>

            <Button
              className="mt-5"
              full
              size="lg"
              disabled={!accepted}
              onClick={() => setStep('username')}
            >
              Kabul ediyorum, devam et
            </Button>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[color:var(--color-brand)]/12 text-[color:var(--color-brand-hover)]">
                <AtSign className="h-[18px] w-[18px]" />
              </span>
              <div>
                <h2 className="text-[17px] font-semibold tracking-tight text-fg">Kullanıcı adınızı seçin</h2>
                <p className="text-[12.5px] text-fg-muted">Paylaşımlarınızda bu ad görünecek.</p>
              </div>
            </div>

            <div className="mt-5 flex items-start gap-2.5 rounded-[var(--radius-md)] border border-[color:var(--color-warn)]/25 bg-[color:var(--color-warn)]/10 p-3.5">
              <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--color-warn)]" />
              <p className="text-[13px] leading-relaxed text-fg-muted">
                Düzgün ve uygun bir kullanıcı adı seçin. Hakaret içeren, yanıltıcı veya başkalarını
                taklit eden adlar seçerseniz hesabınız uyarısız olarak engellenebilir.
              </p>
            </div>

            <div className="mt-5">
              <Input
                label="Kullanıcı adı"
                leftIcon={<AtSign className="h-4 w-4" />}
                placeholder="ornek_kullanici"
                autoComplete="off"
                autoCapitalize="none"
                spellCheck={false}
                maxLength={20}
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase())}
                error={liveError ?? undefined}
                hint={liveError ? undefined : '3-20 karakter; küçük harf, rakam ve alt çizgi'}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') submit()
                }}
              />
            </div>

            <div className="mt-5 flex gap-3">
              <Button variant="outline" size="lg" onClick={() => setStep('rules')} disabled={submitting}>
                Geri
              </Button>
              <Button
                full
                size="lg"
                loading={submitting}
                disabled={!!liveError || username.trim().length < 3}
                onClick={submit}
              >
                Kaydet ve başla
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
