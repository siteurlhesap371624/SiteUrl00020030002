import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Item {
  q: string
  a: string
}

const items: Item[] = [
  {
    q: 'Marul AI verilerimi nasıl koruyor?',
    a: 'Tüm istekler HTTPS üzerinden iletilir, sohbetleriniz şifrelenir ve üçüncü taraf reklam ağlarıyla paylaşılmaz. Hesabınızı uygulama içinden tek tıkla silebilir veya marulai.resmi@gmail.com adresine talep iletebilirsiniz.',
  },
  {
    q: 'Yedikule ile Qwen3.6 arasındaki fark nedir?',
    a: 'Yedikule Türkçe için özel olarak eğitilmiş yerli modelimizdir; günlük sohbetlerde hafif ve hızlıdır, çok turlu sohbeti ve bağlam hafızasını destekler. Qwen3.6 ise 27 milyar parametreli, akıl yürüten açık kaynak modeldir; web araması yapabilir, çok adımlı görevleri yürütebilir, kod projesi ve tablo gibi dosyalar üretebilir.',
  },
  {
    q: 'Ücretsiz planda hangi sınırlar var?',
    a: 'Hesabınız varsa sohbet başına 25 mesaj, sınırsız sohbet oluşturma hakkınız vardır. Misafir modunda oturum başına 10 deneme verilir.',
  },
  {
    q: 'Plus aboneliği nasıl alınır?',
    a: 'Plus aboneliği şu anda yalnızca Android uygulamamız üzerinden Google Play satın alma sistemiyle alınabilir. Web tarafından satın alma yakında eklenecektir.',
  },
  {
    q: 'Mobil uygulama ile web aynı hesabı paylaşır mı?',
    a: 'Evet. Aynı e-posta ile giriş yaparsanız konuşma geçmişiniz, kişiselleştirme ayarlarınız ve aboneliğiniz her iki platformda da geçerlidir.',
  },
  {
    q: 'Hangi durumlarda Marul AI cevap vermez?',
    a: 'Yasa dışı içerik üretimi, zararlı yazılım talimatları, kişisel veri ifşası gibi istekleri reddeder. Bunlar dışında geniş bir konu yelpazesinde yardımcı olur.',
  },
]

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section className="py-24 md:py-28 border-t border-[color:var(--color-border)]">
      <div className="container-content">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div>
            <p className="text-[12px] font-semibold tracking-[0.12em] uppercase text-fg-dim">
              Sık sorulan
            </p>
            <h2 className="mt-3 text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold tracking-[-0.025em]">
              Aklınızdaki sorular.
            </h2>
            <p className="mt-4 text-[15.5px] text-fg-muted leading-relaxed">
              Aradığınızı bulamadıysanız bize her zaman yazabilirsiniz.
            </p>
          </div>
          <div className="divide-y divide-[color:var(--color-border)] rounded-[var(--radius-xl)] border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface)] overflow-hidden">
            {items.map((item, i) => {
              const isOpen = open === i
              return (
                <div key={item.q}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left hover:bg-white/[0.02] transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[15px] font-medium text-fg">{item.q}</span>
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 shrink-0 text-fg-muted transition-transform duration-300 ease-snappy',
                        isOpen && 'rotate-180 text-fg',
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      'grid overflow-hidden transition-[grid-template-rows] duration-300 ease-smooth',
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                    )}
                  >
                    <div className="min-h-0">
                      <p className="px-6 pb-5 text-[14px] leading-relaxed text-fg-muted">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
