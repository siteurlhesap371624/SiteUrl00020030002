import { SeoHead } from '@/components/ui/SeoHead'

const sections = [
  {
    title: 'Misyon',
    body: 'Türkçe konuşan kullanıcılar için yapay zekanın bir araç olarak hak ettiği özeni göstermek; günlük işten profesyonel araştırmaya kadar geniş bir kullanım yelpazesinde güvenli ve hızlı bir asistan sunmak.',
  },
  {
    title: 'Yaklaşımımız',
    body: 'Marul AI, açık kaynak modelleri kendi geliştirdiğimiz Yedikule modeliyle birleştirir. Sade arayüz, sürdürülebilir altyapı ve şeffaf gizlilik anlayışı önceliğimizdir.',
  },
  {
    title: 'Karakuş Tech',
    body: 'Marul AI, bağımsız bir geliştirici ekibi olan Karakuş Tech tarafından yürütülmektedir. Tüm kararlar kullanıcı deneyimi ve veri güvenliği gözetilerek alınır.',
  },
]

const stats = [
  { label: 'Aktif kullanıcı', value: '500+' },
  { label: 'Aylık mesaj', value: '2K+' },
  { label: 'Ortalama yanıt', value: '1.2 sn' },
  { label: 'Erişilebilirlik', value: '%99.9' },
]

export default function About() {
  return (
    <>
      <SeoHead
        title="Hakkımızda"
        description="Marul AI hakkında — Karakuş Tech tarafından geliştirilen yerli yapay zeka asistanı."
        path="/hakkimizda"
      />
      <div className="container-content py-20 md:py-28">
        <div className="max-w-3xl">
          <p className="text-[12px] font-semibold tracking-[0.12em] uppercase text-fg-dim">
            Hakkımızda
          </p>
          <h1 className="mt-3 text-[clamp(2rem,4.5vw,3.25rem)] font-semibold tracking-[-0.03em] leading-[1.05]">
            Bağımsız bir ekipten, bağımsız bir yapay zeka.
          </h1>
          <p className="mt-6 text-[16px] leading-relaxed text-fg-muted">
            Marul AI, kullanıcıların verisini metalaştırmadan, gösterişli vaatler vermeden gerçek
            işe odaklanan bir yapay zeka asistanıdır. Türkiye'den çıkıyor, Türkçeyi önemsiyor,
            sınırları olduğunu açıkça söylüyor.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6"
            >
              <div className="text-[28px] font-semibold tracking-[-0.02em]">{s.value}</div>
              <p className="mt-1 text-[12.5px] uppercase tracking-wider text-fg-dim">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 grid gap-12 md:grid-cols-3">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="text-[18px] font-semibold tracking-[-0.01em]">{s.title}</h2>
              <p className="mt-3 text-[14.5px] leading-relaxed text-fg-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
