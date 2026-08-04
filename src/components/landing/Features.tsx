import { Reveal } from '@/components/ui/Reveal'
interface Point {
  num: string
  lead: string
  body: string
}

const points: Point[] = [
  {
    num: '01',
    lead: 'İki model, bir arayüz.',
    body: 'Günlük sohbet için kendi modelim Yedikule; araştırma, kod ve belge üretimi için agent yetenekli Qwen3.6. Konuşmanın ortasında bile geçiş yapabilirsin.',
  },
  {
    num: '02',
    lead: 'Verin reklam ağına satılmaz.',
    body: 'Üçüncü tarafa kişisel veri devredilmez. Sohbetlerin yalnızca anonimleştirildikten sonra modelin Türkçeyi daha iyi konuşması için kullanılabilir; istemiyorsan bir mail ile çıkarırız. Hesabını da tek tıkla kalıcı silersin.',
  },
  {
    num: '03',
    lead: 'Türkçe için sıfırdan eğitildi.',
    body: 'Yedikule bir çeviri katmanı değil; kendi tokenizer’ı ve kendi eğitim verisiyle Türkçe için sıfırdan yazıldı. Türkçe ekleri, deyimleri ve günlük dili daha doğru yakalar.',
  },
  {
    num: '04',
    lead: 'Kod ve metin için ciddi formatlama.',
    body: 'Markdown başlıklar, listeler, tablolar, dipnotlar, kod blokları için söz dizimi vurgusu ve kopyalama. Mobil tarafta da aynı render kalitesi.',
  },
  {
    num: '05',
    lead: 'Web ile mobil tek hesap.',
    body: 'Tarayıcıda başladığın bir sohbete Android’den devam edebilirsin. Aynı geçmiş, aynı kişiselleştirme, aynı abonelik.',
  },
  {
    num: '06',
    lead: 'Tek kişi tarafından yazılıyor.',
    body: 'Marul, kuruluş kâr beklentisi olan bir şirketin ürünü değil. Karakuş Tech adıyla, tek bir geliştirici tarafından yapılıyor. Geri bildirim doğrudan bana ulaşır.',
  },
]

export function Features() {
  return (
    <section className="py-24 md:py-28 border-t border-[color:var(--color-border)]">
      <div className="container-content">
        <Reveal className="max-w-3xl">
          <p className="text-[12px] font-semibold tracking-[0.12em] uppercase text-fg-dim">
            Neden Marul AI
          </p>
          <h2 className="mt-3 text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold tracking-[-0.025em] text-fg leading-[1.1]">
            Pazarlama broşürü değil,{' '}
            <span
              className="text-[color:var(--color-brand-hover)] font-medium italic"
              style={{ fontFamily: "ui-serif, 'Charter', 'Cambria', 'Times New Roman', serif" }}
            >
              gerçek bir ürün.
            </span>
          </h2>
          <p className="mt-5 text-[15px] text-fg-muted leading-relaxed max-w-2xl">
            Aşağıdaki maddeler "AI destekli, dönüştürücü, yenilikçi" değil. Marul’un bugün ne yaptığını
            ve neyi yapmadığını anlatıyor.
          </p>
        </Reveal>

        <ol className="mt-14 grid gap-y-10 gap-x-12 md:grid-cols-2">
          {points.map((p, i) => (
            <Reveal
              key={p.num}
              as="li"
              delay={(i % 2) * 80 + Math.floor(i / 2) * 40}
              className="border-t border-[color:var(--color-border-strong)] pt-5"
            >
              <div className="flex items-start gap-5">
                <span className="text-[12px] font-mono tracking-wider text-fg-dim mt-1">
                  {p.num}
                </span>
                <div className="min-w-0">
                  <p className="text-[16px] font-semibold tracking-[-0.01em] text-fg leading-snug">
                    {p.lead}
                  </p>
                  <p className="mt-2 text-[14px] leading-relaxed text-fg-muted">{p.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
