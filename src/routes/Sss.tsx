import { Link } from 'react-router-dom'
import { SeoHead } from '@/components/ui/SeoHead'
import { FAQ_ITEMS } from '@/content/faq'
import { findSeoRoute } from '@/seo/site'

const route = findSeoRoute('/sss')

export default function Sss() {
  return (
    <>
      <SeoHead path="/sss" />
      <div className="container-content py-20 md:py-28">
        <div className="max-w-3xl">
          <p className="text-[12px] font-semibold tracking-[0.12em] uppercase text-fg-dim">
            Sık sorulan sorular
          </p>
          <h1 className="mt-3 text-[clamp(2rem,4.5vw,3.25rem)] font-semibold tracking-[-0.03em] leading-[1.05]">
            Marul AI hakkında merak edilenler.
          </h1>
          <p className="mt-6 text-[16px] leading-relaxed text-fg-muted">
            {route?.description}
          </p>
        </div>

        <div className="mt-14 grid gap-3 lg:grid-cols-2">
          {FAQ_ITEMS.map((item) => (
            <article
              key={item.q}
              className="rounded-[var(--radius-lg)] border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface)] p-6"
            >
              <h2 className="text-[16px] font-semibold tracking-[-0.01em]">{item.q}</h2>
              <p className="mt-3 text-[14.5px] leading-relaxed text-fg-muted">{item.a}</p>
            </article>
          ))}
        </div>

        <div className="mt-14 max-w-3xl text-[14.5px] leading-relaxed text-fg-muted">
          <p>
            Aradığınız cevabı bulamadıysanız{' '}
            <Link to="/iletisim" className="text-fg underline underline-offset-4">
              iletişim sayfasından
            </Link>{' '}
            bize yazabilir, model ayrıntıları için{' '}
            <Link to="/modeller" className="text-fg underline underline-offset-4">
              modeller sayfasına
            </Link>{' '}
            bakabilirsiniz.
          </p>
        </div>
      </div>
    </>
  )
}
