import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { YEDIKULE_HF_URL } from '@/content/yedikule'

const specs = [
  { label: 'Parametre', value: '202,1 milyon' },
  { label: 'Mimari', value: 'Decoder-only Transformer · 24 katman' },
  { label: 'Bağlam', value: '2.048 token · çok turlu' },
  { label: 'Ön eğitim', value: '24,33 milyar Türkçe token' },
  { label: 'Talimat ayarı', value: 'Marul-SFT-TR · 99.847 sohbet' },
  { label: 'Düşünme', value: 'Her yanıtta kısa iç plan' },
  { label: 'Araç kullanımı', value: 'Destekler · sitede kapalı' },
  { label: 'Dil', value: 'Türkçe' },
  { label: 'Barındırma', value: 'Kendi sunucularımız · Türkiye' },
  { label: 'Lisans', value: 'Yedikule Model Lisansı 2.0' },
]

const capabilities = [
  'Çok turlu Türkçe sohbet ve bağlam takibi',
  'Yanıt öncesi görünür düşünme adımları',
  'Özetleme, yeniden yazma ve metin düzeltme',
  'Sistem talimatına, kimliğe ve biçim kısıtlarına uyum',
  'Doğal Türkçe: çekim ekleri, deyimler, günlük dil',
]

export function Models() {
  return (
    <section id="models" className="border-t border-[color:var(--color-border)] py-24 md:py-28">
      <div className="container-content">
        <Reveal className="max-w-2xl">
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-fg-dim">Modeller</p>
          <h2 className="mt-3 text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold tracking-[-0.025em]">
            Yedikule 1.4
          </h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-fg-muted">
            Türkçe için sıfırdan eğitilmiş yerli modelimiz. Her yanıtta önce kısa bir iç plan yapar,
            sonra net ve doğal Türkçeyle yanıtlar. Araç kullanma yeteneği vardır; sitede araçlar
            kapalıdır. Ağırlıkları Hugging Face üzerinde herkese açıktır ve kendi sunucularımızda
            Türkiye'de çalışır.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 md:grid-cols-[1fr_1.2fr] md:gap-14">
          <Reveal>
            <div className="flex h-full flex-col">
              <p className="text-[10.5px] uppercase tracking-[0.09em] text-fg-dim">Öne çıkanlar</p>
              <ul className="mt-3">
                {capabilities.map((cap) => (
                  <li
                    key={cap}
                    className="border-b border-[color:var(--color-border)] py-2.5 text-[13.5px] text-fg-muted last:border-b-0"
                  >
                    {cap}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
                <Link to="/sohbet?model=yedikule" className="flex-1">
                  <Button variant="primary" full rightIcon={<ArrowUpRight className="h-4 w-4" />}>
                    Yedikule 1.4 ile başla
                  </Button>
                </Link>
                <a href={YEDIKULE_HF_URL} target="_blank" rel="noreferrer" className="flex-1">
                  <Button variant="outline" full rightIcon={<ArrowUpRight className="h-4 w-4" />}>
                    Hugging Face
                  </Button>
                </a>
              </div>
              <p className="mt-3 text-[11.5px] leading-relaxed text-fg-dim">
                202 milyon parametre küçük bir ölçektir; geniş dünya bilgisi ve çok adımlı
                aritmetikte sınırlıdır. Büyük ticari modellerin doğrudan alternatifi değildir.
              </p>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <div className="overflow-hidden rounded-[var(--radius-xl)] border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface)]">
              <table className="w-full border-collapse text-left">
                <caption className="sr-only">Yedikule 1.4 teknik özellikleri</caption>
                <tbody>
                  {specs.map((s) => (
                    <tr
                      key={s.label}
                      className="border-b border-[color:var(--color-border)] last:border-b-0"
                    >
                      <th
                        scope="row"
                        className="w-[38%] px-5 py-3 align-top text-[12px] font-medium uppercase tracking-[0.06em] text-fg-dim"
                      >
                        {s.label}
                      </th>
                      <td className="px-5 py-3 text-[13.5px] leading-snug text-fg">{s.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
