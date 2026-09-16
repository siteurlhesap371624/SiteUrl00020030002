import { Link } from 'react-router-dom'
import { ArrowUpRight, Download } from 'lucide-react'
import { SeoHead } from '@/components/ui/SeoHead'
import { Button } from '@/components/ui/Button'
import {
  YEDIKULE,
  YEDIKULE_LIMITS,
  YEDIKULE_REPOS,
  YEDIKULE_SPECS,
  YEDIKULE_STRENGTHS,
  YEDIKULE_TRAINING,
  YEDIKULE_USE_CASES,
} from '@/content/yedikule'

function SpecTable({ rows, caption }: { rows: { label: string; value: string }[]; caption: string }) {
  return (
    <div className="overflow-x-auto rounded-[var(--radius-lg)] border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface)]">
      <table className="w-full border-collapse text-left text-[14px]">
        <caption className="sr-only">{caption}</caption>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-[color:var(--color-border)] last:border-b-0">
              <th scope="row" className="w-[42%] px-5 py-3 font-medium text-fg-muted align-top">
                {row.label}
              </th>
              <td className="px-5 py-3 text-fg">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function Yedikule() {
  return (
    <>
      <SeoHead path="/modeller/yedikule" />
      <article className="container-content py-20 md:py-28">
        <nav aria-label="Sayfa yolu" className="text-[12.5px] text-fg-dim">
          <Link to="/" className="hover:text-fg transition-colors">
            Ana sayfa
          </Link>
          <span className="mx-2">/</span>
          <Link to="/modeller" className="hover:text-fg transition-colors">
            Modeller
          </Link>
          <span className="mx-2">/</span>
          <span className="text-fg-muted">Yedikule</span>
        </nav>

        <header className="mt-6 max-w-3xl">
          <p className="text-[12px] font-semibold tracking-[0.12em] uppercase text-fg-dim">
            Yerli dil modeli
          </p>
          <h1 className="mt-3 text-[clamp(2rem,4.5vw,3.25rem)] font-semibold tracking-[-0.03em] leading-[1.05]">
            Yedikule: Türkçe için sıfırdan eğitilmiş 202 milyon parametreli dil modeli
          </h1>
          <p className="mt-6 text-[16px] leading-relaxed text-fg-muted">{YEDIKULE.summary}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/sohbet?model=yedikule">
              <Button rightIcon={<ArrowUpRight className="h-4 w-4" />}>Yedikule ile sohbet et</Button>
            </Link>
            <a href={YEDIKULE_REPOS[0].url} target="_blank" rel="noreferrer">
              <Button variant="outline" rightIcon={<Download className="h-4 w-4" />}>
                Hugging Face üzerinde indir
              </Button>
            </a>
          </div>
        </header>

        <section className="mt-16 max-w-3xl">
          <h2 className="text-[22px] font-semibold tracking-[-0.02em]">Yedikule modeli nedir?</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">
            Yedikule, başka bir modelin ince ayarı değildir; mimarisi, tokenizer'ı ve ağırlıklarıyla
            Türkçe metin üzerinde sıfırdan eğitilmiştir. Bağımsız bir geliştirici olan{' '}
            {YEDIKULE.developer} tarafından {YEDIKULE.organization} adı altında geliştirilir ve Marul AI
            sohbet uygulamasında varsayılan model olarak sunulur. 202 milyon parametrelik ölçeği, modeli
            tek bir bilgisayarda çalışacak kadar küçük tutar; buna karşılık büyük ticari modellerin
            yeteneklerini beklemek doğru olmaz.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">
            Model, daha önce yayımlanan Marul V7'nin (258 milyon parametre) devamıdır. Yedikule daha küçük
            olmasına rağmen çok daha fazla ve daha temiz veriyle eğitildiği için Türkçede belirgin biçimde
            daha tutarlıdır.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-[22px] font-semibold tracking-[-0.02em]">
            Yedikule'nin teknik özellikleri neler?
          </h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <SpecTable rows={YEDIKULE_SPECS} caption="Yedikule mimari özellikleri" />
            <SpecTable rows={YEDIKULE_TRAINING} caption="Yedikule eğitim bilgileri" />
          </div>
          <p className="mt-4 max-w-3xl text-[13.5px] leading-relaxed text-fg-dim">
            Doğrulama kayıpları, geliştiricinin kendi ayırdığı doğrulama kümesinde ölçülmüştür; kamuya açık
            bir ölçüt (benchmark) sonucu değildir.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-[22px] font-semibold tracking-[-0.02em]">
            Yedikule nasıl indirilir ve çalıştırılır?
          </h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-fg-muted">
            Ağırlıklar Hugging Face üzerinde üç depoda yayımlanmıştır. Sohbet için talimat ayarlı sürümü,
            kendi modelinizi eğitmek için temel modeli, yerel bilgisayarda çalıştırmak için GGUF sürümünü
            kullanın.
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {YEDIKULE_REPOS.map((repo) => (
              <a
                key={repo.id}
                href={repo.url}
                target="_blank"
                rel="noreferrer"
                className="group rounded-[var(--radius-lg)] border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface)] p-6 transition-colors hover:border-[color:var(--color-border-bright)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-[15.5px] font-semibold tracking-[-0.01em]">{repo.title}</h3>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-fg-dim transition-colors group-hover:text-fg" />
                </div>
                <p className="mt-1.5 font-mono text-[11.5px] text-fg-dim">{repo.format}</p>
                <p className="mt-3 text-[13.5px] leading-relaxed text-fg-muted">{repo.description}</p>
              </a>
            ))}
          </div>

          <div className="mt-6 max-w-3xl">
            <h3 className="text-[15px] font-semibold">Ollama ile yerel kullanım</h3>
            <pre className="mt-3 overflow-x-auto rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] p-4 font-mono text-[12.5px] leading-relaxed text-fg-muted">
              <code>{`ollama create yedikule-sft -f Modelfile
ollama run yedikule-sft`}</code>
            </pre>
            <p className="mt-3 text-[13.5px] leading-relaxed text-fg-dim">
              llama.cpp kullanıyorsanız önerilen örnekleme ayarları: sıcaklık 0.3, top_k 50, top_p 0.9,
              tekrar cezası 1.08. Sohbet şablonu ve sistem promptu GGUF üstverisine gömülüdür.
            </p>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-[22px] font-semibold tracking-[-0.02em]">
            Yedikule ne yapabilir, ne yapamaz?
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-[var(--radius-lg)] border border-[color:var(--color-brand)]/30 bg-[color:var(--color-brand)]/[0.05] p-6">
              <h3 className="text-[15px] font-semibold">İyi olduğu işler</h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {YEDIKULE_STRENGTHS.map((item) => (
                  <li key={item} className="text-[14px] leading-relaxed text-fg-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[var(--radius-lg)] border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface)] p-6">
              <h3 className="text-[15px] font-semibold">Sınırları</h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {YEDIKULE_LIMITS.map((item) => (
                  <li key={item} className="text-[14px] leading-relaxed text-fg-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-fg-muted">
            Marul AI içinde web araması, çok adımlı görevler ve dosya üretimi gerektiren işler Qwen3.6
            modeline yönlendirilir. Model seçimini sohbet sırasında değiştirebilirsiniz.
          </p>
        </section>

        <section className="mt-14 max-w-3xl">
          <h2 className="text-[22px] font-semibold tracking-[-0.02em]">
            Yedikule kurum içinde, veriyi dışarı çıkarmadan çalıştırılabilir mi?
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">
            Evet. Yedikule'nin tasarım amaçlarından biri, Türkçe işlerin kendi bilgisayarınızda veya kurum içi
            sunucunuzda, veriyi dışarıya göndermeden yapılabilmesidir. GGUF sürümü 406 MB'tır; Ollama veya
            llama.cpp ile ekran kartı olmadan da çalışır. Bu sayede sözleşme, form ve yazışma gibi kurum içi
            metinler internete çıkmadan işlenebilir.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">
            Modelin bugünkü sürümü araç (tool) çağırmayı desteklemez. Yerel kullanımda araç çağırabilen,
            yani kurum içi sistemlerle konuşabilen sürümler üzerinde çalışılmaktadır.
          </p>
          <ul className="mt-5 grid gap-2">
            {YEDIKULE_USE_CASES.map((item) => (
              <li key={item} className="text-[14px] leading-relaxed text-fg-muted">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14 max-w-3xl">
          <h2 className="text-[22px] font-semibold tracking-[-0.02em]">Lisans ve atıf</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">
            Yedikule, {YEDIKULE.license} ile yayımlanır. Kişisel kullanım, araştırma, ince ayar, türev model
            üretimi ve biçim dönüştürme serbesttir. Üç şart vardır: modele atıf yapılması, türev modelin
            adında Yedikule geçmesi ve türevlerin aynı lisansa tabi olması. Ticari kullanım için telif hakkı
            sahibinden yazılı izin alınması gerekir. Bu nedenle model{' '}
            <strong className="text-fg">açık ağırlıklı</strong> olarak tanımlanır; OSI onaylı bir açık kaynak
            lisansı kullanmaz.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">
            Akademik çalışmalarda önerilen atıf: “Yedikule, 202M parametreli Türkçe dil modeli.{' '}
            {YEDIKULE.developer}, {YEDIKULE.organization}, 2026.”
          </p>
        </section>

        <section className="mt-14 max-w-3xl">
          <h2 className="text-[22px] font-semibold tracking-[-0.02em]">Yedikule nasıl denenir?</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">
            Modeli indirmeden denemek için{' '}
            <Link to="/sohbet?model=yedikule" className="text-fg underline underline-offset-4">
              marulai.com.tr üzerindeki sohbet uygulamasını
            </Link>{' '}
            kullanabilirsiniz; hesap açmadan da soru sorabilirsiniz. Türkiye'de geliştirilen diğer modellerle
            birlikte değerlendirmek için{' '}
            <Link to="/turkiye-yapay-zeka-modelleri" className="text-fg underline underline-offset-4">
              Türkiye'de geliştirilen yapay zeka modelleri
            </Link>{' '}
            sayfasına bakabilirsiniz.
          </p>
        </section>
      </article>
    </>
  )
}
