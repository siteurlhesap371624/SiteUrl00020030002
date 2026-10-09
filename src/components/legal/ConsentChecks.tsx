import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type ConsentChoice = 'grant' | 'deny' | null

interface ConsentChecksProps {
  terms: boolean
  onTermsChange: (value: boolean) => void
  notice: boolean
  onNoticeChange: (value: boolean) => void
  termsError?: string
  noticeError?: string
  showOptional?: boolean
  training?: ConsentChoice
  onTrainingChange?: (value: ConsentChoice) => void
  special?: ConsentChoice
  onSpecialChange?: (value: ConsentChoice) => void
}

function DocLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <a href={to} target="_blank" rel="noopener noreferrer" className="text-fg underline-offset-2 hover:underline">
      {children}
    </a>
  )
}

const checkboxClass =
  'mt-0.5 h-4 w-4 shrink-0 rounded border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface-2)] accent-[color:var(--color-brand)]'

function ChoiceRow({
  name,
  value,
  onChange,
  label,
}: {
  name: string
  value: ConsentChoice
  onChange: (value: ConsentChoice) => void
  label: ReactNode
}) {
  const option = (choice: Exclude<ConsentChoice, null>, text: string) => (
    <label
      className={cn(
        'flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-[var(--radius-sm)] border px-3 py-2 text-[12.5px] transition-colors',
        value === choice
          ? 'border-[color:var(--color-border-bright)] bg-white/[0.06] text-fg'
          : 'border-[color:var(--color-border-strong)] text-fg-muted hover:text-fg',
      )}
    >
      <input
        type="radio"
        name={name}
        className="h-3.5 w-3.5 accent-[color:var(--color-brand)]"
        checked={value === choice}
        onChange={() => onChange(choice)}
      />
      {text}
    </label>
  )
  return (
    <div className="space-y-2 rounded-[var(--radius-md)] border border-[color:var(--color-border)] p-3">
      <p>{label}</p>
      <div className="flex gap-2">
        {option('grant', 'Açık rıza veriyorum')}
        {option('deny', 'Açık rıza vermiyorum')}
      </div>
    </div>
  )
}

export function ConsentChecks({
  terms,
  onTermsChange,
  notice,
  onNoticeChange,
  termsError,
  noticeError,
  showOptional = false,
  training = null,
  onTrainingChange,
  special = null,
  onSpecialChange,
}: ConsentChecksProps) {
  return (
    <div className="space-y-4 text-[12.5px] leading-snug text-fg-muted">
      <div className="space-y-2">
        <label className="flex items-start gap-2.5">
          <input
            type="checkbox"
            className={checkboxClass}
            checked={terms}
            onChange={(e) => onTermsChange(e.target.checked)}
            aria-invalid={termsError ? true : undefined}
          />
          <span>
            <DocLink to="/sartlar">Kullanım Koşulları</DocLink>’nı okudum ve kabul ediyorum. 18 yaşını doldurduğumu ya
            da 13 yaşını doldurmuş olup veli veya vasimin onayına sahip olduğumu beyan ederim.
          </span>
        </label>
        <p className="pl-[26px] text-fg-dim">
          Öne çıkan hükümler: yapay zeka yanıtları hatalı olabilir ve kullanmadan önce doğrulamanız gerekir; paylaştığınız
          içerikten siz sorumlusunuz; Plus satın alındığı anda etkinleştiği için cayma hakkı bulunmaz.
        </p>
        {termsError ? <p className="pl-[26px] text-[12px] text-[color:var(--color-danger)]">{termsError}</p> : null}
      </div>

      <div className="space-y-2">
        <label className="flex items-start gap-2.5">
          <input
            type="checkbox"
            className={checkboxClass}
            checked={notice}
            onChange={(e) => onNoticeChange(e.target.checked)}
            aria-invalid={noticeError ? true : undefined}
          />
          <span>
            Kişisel verilerimin işlenmesine ilişkin <DocLink to="/kvkk">KVKK Aydınlatma Metni</DocLink>’ni ve{' '}
            <DocLink to="/gizlilik">Gizlilik Politikası</DocLink>’nı okudum ve anladım.
          </span>
        </label>
        {noticeError ? <p className="pl-[26px] text-[12px] text-[color:var(--color-danger)]">{noticeError}</p> : null}
      </div>

      {showOptional && onTrainingChange && onSpecialChange ? (
        <div className="space-y-2.5">
          <p className="text-[11.5px] font-semibold uppercase tracking-[0.06em] text-fg-dim">
            İsteğe bağlı açık rızalar (yalnızca 18 yaşını doldurmuş kullanıcılar)
          </p>
          <ChoiceRow
            name="consent-training"
            value={training}
            onChange={onTrainingChange}
            label={
              <>
                Sohbet içeriklerimin <DocLink to="/acik-riza#egitim">Açık Rıza Metni</DocLink>’nde açıklanan şekilde,
                anonim hale getirilerek Yedikule ve sonraki Marul AI dil modellerinin geliştirilmesinde kullanılması.
              </>
            }
          />
          <ChoiceRow
            name="consent-special"
            value={special}
            onChange={onSpecialChange}
            label={
              <>
                Sohbetlerde kendi isteğimle paylaşabileceğim özel nitelikli kişisel verilerimin (sağlık, inanç ve
                benzeri) <DocLink to="/acik-riza#ozel-nitelikli">Açık Rıza Metni</DocLink>’nde açıklanan şekilde yalnızca
                bana yanıt üretilmesi ve sohbet geçmişimin saklanması amacıyla işlenmesi.
              </>
            }
          />
          <p className="text-fg-dim">
            Bu seçimler isteğe bağlıdır; seçim yapmamanız “vermiyorum” anlamına gelir ve hizmetin tamamından
            yararlanmanızı etkilemez. Seçimlerinizi dilediğiniz zaman hesabınızdaki gizlilik tercihlerinden
            değiştirebilirsiniz.
          </p>
        </div>
      ) : null}
    </div>
  )
}
