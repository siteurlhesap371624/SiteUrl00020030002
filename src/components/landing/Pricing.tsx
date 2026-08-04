import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { config } from '@/lib/config'

interface Plan {
  name: string
  price: string
  period: string
  description: string
  ctaLabel: string
  ctaHref: string
  external?: boolean
  highlight?: boolean
  features: string[]
  footnote?: string
}

const plans: Plan[] = [
  {
    name: 'Misafir',
    price: '0',
    period: 'TL',
    description: 'Hesap oluşturmadan denemek için.',
    ctaLabel: 'Hemen dene',
    ctaHref: '/sohbet',
    features: [
      'Oturum başına 10 mesaj',
      'Tüm modellere erişim',
      'Konuşma geçmişi cihazınızda',
    ],
    footnote: 'Limit sıfırlamak için kayıt olun.',
  },
  {
    name: 'Ücretsiz',
    price: '0',
    period: 'TL',
    description: 'Bireysel günlük kullanım için.',
    ctaLabel: 'Hesap oluştur',
    ctaHref: '/kayit',
    highlight: true,
    features: [
      'Sohbet başına 25 mesaj',
      'Sınırsız sohbet oluşturma',
      'Konuşma geçmişi senkron',
      'Kişiselleştirme talimatları',
      'Günde 25 agent görevi',
      'Yeni özelliklere ilk erişim',
    ],
  },
  {
    name: 'Plus',
    price: '49,99',
    period: 'TL · tek seferlik',
    description: 'Bir kez öde, sınırsız sohbet et.',
    ctaLabel: 'Uygulamada satın al',
    ctaHref: config.playStoreUrl,
    external: true,
    features: [
      'Sınırsız mesaj',
      'Günde 150 agent görevi',
      'Derin araştırma modu',
      'Öncelikli yanıt kuyruğu',
      'Yeni model önizlemeleri',
      'Birebir e-posta desteği',
    ],
    footnote: 'Tek seferlik ödeme, yenileme yok. Şu an yalnızca Android uygulaması üzerinden.',
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-28 border-t border-[color:var(--color-border)]">
      <div className="container-content">
        <Reveal className="max-w-2xl">
          <p className="text-[12px] font-semibold tracking-[0.12em] uppercase text-fg-dim">
            Fiyatlandırma
          </p>
          <h2 className="mt-3 text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold tracking-[-0.025em]">
            Şeffaf, basit, abartısız.
          </h2>
          <p className="mt-4 text-[15.5px] text-fg-muted leading-relaxed">
            Hiçbir gizli ücret yok. Çoğu kullanıcı ücretsiz planla tüm günü rahatlıkla geçirir.
          </p>
        </Reveal>

        <div className="mt-12 flex flex-col gap-3">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 90}>
              <div
                className={
                  'group relative rounded-[var(--radius-xl)] border transition-colors ' +
                  (p.highlight
                    ? 'border-[color:var(--color-brand)]/35 bg-[linear-gradient(100deg,rgba(16,185,129,0.07),rgba(16,185,129,0.01)_45%,transparent)]'
                    : 'border-[color:var(--color-border-strong)] bg-[color:var(--color-surface)] hover:border-[color:var(--color-border-bright)]')
                }
              >
                {p.highlight ? (
                  <span className="absolute left-0 top-7 h-10 w-[3px] rounded-r-full bg-[color:var(--color-brand)]" />
                ) : null}

                <div className="grid items-center gap-7 p-7 md:grid-cols-[15rem_1fr_13rem] md:gap-9 md:p-8">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-[18px] font-semibold tracking-[-0.01em]">{p.name}</h3>
                      {p.highlight ? (
                        <span className="rounded-full border border-[color:var(--color-brand)]/30 bg-[color:var(--color-brand)]/10 px-2 py-[3px] text-[10.5px] font-medium tracking-wide text-[color:var(--color-brand-hover)]">
                          Tavsiye edilen
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1.5 text-[13px] text-fg-muted leading-relaxed">{p.description}</p>
                    <div className="mt-4 flex items-baseline gap-1.5">
                      <span className="text-[34px] font-semibold tracking-[-0.03em] leading-none">{p.price}</span>
                      <span className="text-[13px] text-fg-muted">{p.period}</span>
                    </div>
                  </div>

                  <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2 md:border-x md:border-[color:var(--color-border)] md:px-9">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-[13px]">
                        <Check className="mt-[3px] h-3.5 w-3.5 shrink-0 text-[color:var(--color-brand-hover)]" />
                        <span className="text-fg-muted leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div>
                    {p.external ? (
                      <a href={p.ctaHref} target="_blank" rel="noreferrer">
                        <Button variant={p.highlight ? 'primary' : 'outline'} full>
                          {p.ctaLabel}
                        </Button>
                      </a>
                    ) : (
                      <Link to={p.ctaHref}>
                        <Button variant={p.highlight ? 'primary' : 'outline'} full>
                          {p.ctaLabel}
                        </Button>
                      </Link>
                    )}
                    {p.footnote ? (
                      <p className="mt-3 text-[11.5px] leading-relaxed text-fg-dim">{p.footnote}</p>
                    ) : null}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
