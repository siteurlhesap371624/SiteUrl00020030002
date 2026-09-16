import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { SeoHead } from '@/components/ui/SeoHead'
import { TURKISH_MODELS, TURKISH_MODEL_SOURCES } from '@/content/turkishModels'

const UPDATED = '17 Eylül 2026'

export default function TurkishModels() {
  return (
    <>
      <SeoHead path="/turkiye-yapay-zeka-modelleri" />
      <article className="container-content py-20 md:py-28">
        <nav aria-label="Sayfa yolu" className="text-[12.5px] text-fg-dim">
          <Link to="/" className="hover:text-fg transition-colors">
            Ana sayfa
          </Link>
          <span className="mx-2">/</span>
          <span className="text-fg-muted">Türkiye'de yapay zeka modelleri</span>
        </nav>

        <header className="mt-6 max-w-3xl">
          <p className="text-[12px] font-semibold tracking-[0.12em] uppercase text-fg-dim">Rehber</p>
          <h1 className="mt-3 text-[clamp(2rem,4.5vw,3.25rem)] font-semibold tracking-[-0.03em] leading-[1.05]">
            Türkiye'de geliştirilen yapay zeka modelleri
          </h1>
          <p className="mt-6 text-[16px] leading-relaxed text-fg-muted">
            Türkiye'de geliştirilen başlıca yapay zeka modelleri arasında VNGRS'in Kumru modeli, TÜBİTAK
            BİLGEM'in BİLGE modeli, T3 Vakfı ve Baykar'ın T3 AI modeli, Marul AI'nin Yedikule modeli, Yıldız
            Teknik Üniversitesi'nin Cosmos serisi, Boğaziçi Üniversitesi'nin TURNA modeli ile Trendyol ve
            Turkcell'in kurumsal modelleri bulunur. Aşağıdaki liste her modelin geliştiricisini, boyutunu ve
            erişim durumunu özetler. Liste, Yedikule modelini geliştiren Marul AI tarafından hazırlanmıştır;
            kendi modelimiz listede açıkça işaretlenir ve ölçeği diğerleriyle karşılaştırmalı olarak verilir.
          </p>
          <p className="mt-4 text-[13.5px] text-fg-dim">Son güncelleme: {UPDATED}</p>
        </header>

        <section className="mt-14">
          <h2 className="text-[22px] font-semibold tracking-[-0.02em]">
            Türkiye'de geliştirilen yapay zeka modelleri hangileri?
          </h2>
          <div className="mt-6 overflow-x-auto rounded-[var(--radius-lg)] border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface)]">
            <table className="w-full min-w-[46rem] border-collapse text-left text-[13.5px]">
              <caption className="sr-only">
                Türkiye'de geliştirilen yapay zeka modelleri, geliştiricileri ve erişim durumları
              </caption>
              <thead>
                <tr className="border-b border-[color:var(--color-border)] text-fg-dim">
                  <th scope="col" className="px-5 py-3 font-medium">
                    Model
                  </th>
                  <th scope="col" className="px-5 py-3 font-medium">
                    Geliştirici
                  </th>
                  <th scope="col" className="px-5 py-3 font-medium">
                    Parametre
                  </th>
                  <th scope="col" className="px-5 py-3 font-medium">
                    Erişim
                  </th>
                </tr>
              </thead>
              <tbody>
                {TURKISH_MODELS.map((model) => (
                  <tr key={model.name} className="border-b border-[color:var(--color-border)] last:border-b-0">
                    <th scope="row" className="px-5 py-3 font-semibold text-fg align-top">
                      {model.name}
                      {model.own ? (
                        <span className="ml-2 whitespace-nowrap rounded-full border border-[color:var(--color-brand)]/30 bg-[color:var(--color-brand)]/10 px-2 py-[2px] text-[10px] font-medium text-[color:var(--color-brand-hover)]">
                          bu site
                        </span>
                      ) : null}
                    </th>
                    <td className="px-5 py-3 text-fg-muted align-top">{model.developer}</td>
                    <td className="px-5 py-3 text-fg-muted align-top">{model.size}</td>
                    <td className="px-5 py-3 text-fg-muted align-top">{model.access}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-[22px] font-semibold tracking-[-0.02em]">Modeller tek tek ne yapıyor?</h2>
          <div className="mt-6 grid gap-3">
            {TURKISH_MODELS.map((model) => (
              <article
                key={model.name}
                className="rounded-[var(--radius-lg)] border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface)] p-6"
              >
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-[16px] font-semibold tracking-[-0.01em]">{model.name}</h3>
                  <span className="text-[12.5px] text-fg-dim">
                    {model.developer} · {model.size} parametre · {model.kind}
                  </span>
                </div>
                <p className="mt-3 text-[14px] leading-relaxed text-fg-muted">{model.note}</p>
                {model.url ? (
                  <a
                    href={model.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-[13px] text-fg-muted hover:text-fg transition-colors"
                  >
                    Model kartı
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14 max-w-3xl">
          <h2 className="text-[22px] font-semibold tracking-[-0.02em]">
            Sıfırdan eğitilen model ile uyarlanan model arasındaki fark nedir?
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">
            Sıfırdan eğitilen bir model, mimarisi ve ağırlıklarıyla baştan kurulur; tokenizer'ı da hedef dil
            için eğitilir. Kumru, BİLGE, TURNA, Kanarya ve Yedikule bu gruptadır. Uyarlanan modellerde ise
            Llama, Gemma veya Mistral gibi hazır bir modelin ağırlıkları Türkçe veriyle yeniden eğitilir;
            Cosmos serisi, Trendyol ve Turkcell modelleri bu yaklaşımı kullanır. İki yöntem de geçerlidir:
            uyarlama daha az kaynakla daha güçlü sonuç verirken, sıfırdan eğitim dilin kendi yapısına uygun
            bir tokenizer ve tamamen bağımsız bir model sağlar.
          </p>
        </section>

        <section className="mt-14 max-w-3xl">
          <h2 className="text-[22px] font-semibold tracking-[-0.02em]">
            BERTurk Türkiye'de mi geliştirildi?
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">
            Hayır. Türkçe doğal dil işlemede yaygın olarak kullanılan BERTurk
            (<span className="font-mono text-[13px]">bert-base-turkish-cased</span>) ve Türkçe ELECTRA
            modelleri, Almanya'daki Bavyera Devlet Kütüphanesi bünyesindeki MDZ Digital Library ekibi
            tarafından yayımlanmıştır. Türkçe için geliştirilmiş olmaları Türkiye'de geliştirildikleri
            anlamına gelmez; birçok listede bu ayrım atlanır.
          </p>
        </section>

        <section className="mt-14 max-w-3xl">
          <h2 className="text-[22px] font-semibold tracking-[-0.02em]">Yedikule bu listede nerede duruyor?</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">
            Yedikule, listedeki en küçük ölçekli modellerden biridir: 202 milyon parametre, Kumru'nun yaklaşık
            otuz yedide biri, BİLGE'nin yaklaşık yüz seksende biri kadardır. Buna karşılık Türkçe için
            sıfırdan eğitilmiş, ağırlıkları herkese açık ve tek bir bilgisayarda çalışabilen bir modeldir.
            Günlük sohbet, kısa özetleme ve Türkçe dil görevleri için tasarlandı; akıl yürütme ve matematik
            gerektiren işler için uygun değildir. Ayrıntılar için{' '}
            <Link to="/modeller/yedikule" className="text-fg underline underline-offset-4">
              Yedikule model sayfasına
            </Link>{' '}
            bakabilir, modeli{' '}
            <Link to="/sohbet?model=yedikule" className="text-fg underline underline-offset-4">
              doğrudan tarayıcıdan
            </Link>{' '}
            deneyebilirsiniz.
          </p>
        </section>

        <section className="mt-14 max-w-3xl">
          <h2 className="text-[22px] font-semibold tracking-[-0.02em]">Kaynaklar</h2>
          <ul className="mt-4 flex flex-col gap-2">
            {TURKISH_MODEL_SOURCES.map((source) => (
              <li key={source.url}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[14px] text-fg-muted hover:text-fg transition-colors underline underline-offset-4"
                >
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[13.5px] leading-relaxed text-fg-dim">
            Bu liste kamuya açık duyurular ve model kartları temel alınarak hazırlandı. Eksik veya güncelliğini
            yitirmiş bir bilgi görürseniz{' '}
            <Link to="/iletisim" className="underline underline-offset-4 hover:text-fg-muted">
              bize bildirebilirsiniz
            </Link>
            .
          </p>
        </section>
      </article>
    </>
  )
}
