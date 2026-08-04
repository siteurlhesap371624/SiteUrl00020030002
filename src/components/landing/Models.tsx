import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'

interface ModelCard {
  id: 'yedikule' | 'qwen'
  name: string
  badge: string
  tagline: string
  specs: { label: string; value: string }[]
  capabilities: string[]
  description: string
  footnote?: string
  highlight?: boolean
}

const cards: ModelCard[] = [
  {
    id: 'yedikule',
    name: 'Yedikule',
    badge: 'Yerli model',
    tagline: 'Türkçe için sıfırdan eğitilmiş yeni nesil yerli model.',
    specs: [
      { label: 'Mimari', value: 'Transformer · TR-tokenizer' },
      { label: 'Eğitim verisi', value: 'Türkçe odaklı' },
      { label: 'Bağlam', value: 'Çok turlu · 2048 token' },
      { label: 'Servis', value: 'Karakuş Tech' },
    ],
    capabilities: ['Çok turlu sohbet', 'Türkçe dilbilgisi', 'Düşük gecikme'],
    description:
      'Türkçe dilbilgisi, yerel terminoloji ve günlük diyaloglarda doğal performans gösteren deneysel modelimiz.',
    footnote: 'Kendi altyapımızda çalışır, sürekli geliştirilir.',
    highlight: true,
  },
  {
    id: 'qwen',
    name: 'Qwen3.6 (27B)',
    badge: 'Açık kaynak',
    tagline: 'Karmaşık görevler için çok dilli, akıl yürütebilen güçlü model.',
    specs: [
      { label: 'Parametre', value: '27B' },
      { label: 'Bağlam', value: '131K token' },
      { label: 'Lisans', value: 'Apache 2.0' },
      { label: 'Servis', value: 'Groq · düşük gecikme' },
    ],
    capabilities: [
      'Akıl yürütme',
      'Araç kullanımı',
      'Web araması',
      'Belge üretimi',
      'Çok adımlı görev',
      'Kod üretimi',
    ],
    description:
      'Kod üretimi, çeviri ve mantıksal çıkarım gerektiren ileri görevler için. Agent modunda web araması yapar, belge hazırlar.',
    footnote: 'Agent görevleri plan limitlerine tabidir.',
  },
]

export function Models() {
  return (
    <section id="models" className="py-24 md:py-28 border-t border-[color:var(--color-border)]">
      <div className="container-content">
        <Reveal className="max-w-2xl">
          <p className="text-[12px] font-semibold tracking-[0.12em] uppercase text-fg-dim">Modeller</p>
          <h2 className="mt-3 text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold tracking-[-0.025em]">
            Doğru iş için doğru model.
          </h2>
          <p className="mt-4 text-[15.5px] text-fg-muted leading-relaxed">
            Hızlı ve samimi sohbetler için kendi modelimiz Yedikule; yoğun analiz, araştırma ve
            üretim için açık kaynak Qwen3.6. Sohbet sırasında istediğiniz an geçiş yapabilirsiniz.
          </p>
        </Reveal>

        <div className="mt-12 flex flex-col gap-3">
          {cards.map((c, i) => (
            <Reveal key={c.id} delay={i * 90}>
              <article
                className={
                  'group relative rounded-[var(--radius-xl)] border transition-colors ' +
                  (c.highlight
                    ? 'border-[color:var(--color-brand)]/35 bg-[linear-gradient(100deg,rgba(16,185,129,0.07),rgba(16,185,129,0.01)_45%,transparent)]'
                    : 'border-[color:var(--color-border-strong)] bg-[color:var(--color-surface)] hover:border-[color:var(--color-border-bright)]')
                }
              >
                {c.highlight ? (
                  <span className="absolute left-0 top-7 h-10 w-[3px] rounded-r-full bg-[color:var(--color-brand)]" />
                ) : null}

                <div className="grid items-center gap-7 p-7 md:grid-cols-[15rem_1fr_13rem] md:gap-9 md:p-8">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="text-[18px] font-semibold tracking-[-0.01em]">{c.name}</h3>
                      <span
                        className={
                          'whitespace-nowrap rounded-full border px-2 py-[3px] text-[10.5px] font-medium tracking-wide ' +
                          (c.highlight
                            ? 'border-[color:var(--color-brand)]/30 bg-[color:var(--color-brand)]/10 text-[color:var(--color-brand-hover)]'
                            : 'border-[color:var(--color-border-strong)] bg-white/[0.03] text-fg-muted')
                        }
                      >
                        {c.badge}
                      </span>
                    </div>
                    <p className="mt-1.5 text-[13px] text-fg-muted leading-relaxed">{c.tagline}</p>
                    <p className="mt-3.5 text-[12.5px] text-fg-dim leading-relaxed">{c.description}</p>
                  </div>

                  <div className="md:border-x md:border-[color:var(--color-border)] md:px-9">
                    <dl className="grid grid-cols-2 gap-x-8 gap-y-4 lg:grid-cols-4">
                      {c.specs.map((s) => (
                        <div key={s.label}>
                          <dt className="text-[10.5px] uppercase tracking-[0.09em] text-fg-dim">
                            {s.label}
                          </dt>
                          <dd className="mt-1 text-[13.5px] text-fg leading-snug">{s.value}</dd>
                        </div>
                      ))}
                    </dl>

                    <div className="mt-6 border-t border-[color:var(--color-border)] pt-5">
                      <p className="text-[10.5px] uppercase tracking-[0.09em] text-fg-dim">
                        Yetenekler
                      </p>
                      <ul className="mt-2.5 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
                        {c.capabilities.map((cap) => (
                          <li
                            key={cap}
                            className="border-b border-[color:var(--color-border)] py-1.5 text-[13px] text-fg-muted last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0 lg:[&:nth-last-child(-n+3)]:border-b-0"
                          >
                            {cap}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <Link to={`/sohbet?model=${c.id}`}>
                      <Button
                        variant={c.highlight ? 'primary' : 'outline'}
                        full
                        rightIcon={<ArrowUpRight className="h-4 w-4" />}
                      >
                        Bu modelle başla
                      </Button>
                    </Link>
                    {c.footnote ? (
                      <p className="mt-3 text-[11.5px] leading-relaxed text-fg-dim">{c.footnote}</p>
                    ) : null}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
