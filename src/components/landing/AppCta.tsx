import { Smartphone, Globe } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { config } from '@/lib/config'

export function AppCta() {
  return (
    <section className="py-24 md:py-28 border-t border-[color:var(--color-border)]">
      <div className="container-content">
        <div className="relative overflow-hidden rounded-[var(--radius-2xl)] border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface)] noise">
          <div
            className="absolute inset-0 opacity-[0.6]"
            aria-hidden
            style={{
              background:
                'radial-gradient(60% 80% at 80% 0%, rgba(16,185,129,0.18) 0%, transparent 60%), radial-gradient(50% 80% at 0% 100%, rgba(99,102,241,0.18) 0%, transparent 60%)',
            }}
          />
          <div className="relative grid gap-8 p-8 md:grid-cols-2 md:p-14">
            <div>
              <p className="text-[12px] font-semibold tracking-[0.12em] uppercase text-fg-dim">
                Her yerde Marul AI
              </p>
              <h2 className="mt-3 text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold tracking-[-0.025em]">
                Cebinizdeki yapay zeka asistanı.
              </h2>
              <p className="mt-4 text-[15.5px] text-fg-muted leading-relaxed max-w-md">
                Android uygulamamızla aynı hesabınız, aynı sohbet geçmişiniz; bildirimler, hızlı
                paylaşım menüsü ve abonelik satın alma uygulamada hazır.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a href={config.playStoreUrl} target="_blank" rel="noreferrer">
                  <Button size="lg" leftIcon={<Smartphone className="h-4 w-4" />}>
                    Android için indir
                  </Button>
                </a>
                <Link to="/sohbet">
                  <Button size="lg" variant="outline" leftIcon={<Globe className="h-4 w-4" />}>
                    Tarayıcıda kullan
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative flex items-center justify-center md:justify-end">
              <div className="relative w-[240px] aspect-[9/19.5] rounded-[36px] border border-[color:var(--color-border-bright)] bg-[color:var(--color-bg)] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] overflow-hidden">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 h-5 w-24 rounded-full bg-black" />
                <div className="absolute inset-x-3 top-12 bottom-3 rounded-2xl bg-[color:var(--color-surface)] p-3 flex flex-col gap-2 text-[11px]">
                  <div className="rounded-md bg-white/[0.04] px-2.5 py-1.5 text-fg-muted">
                    Yeni Sohbet
                  </div>
                  <div className="self-end max-w-[80%] rounded-xl rounded-br-sm bg-white/[0.06] px-2.5 py-1.5 text-fg">
                    Bana SEO için 3 öneri ver
                  </div>
                  <div className="max-w-[90%] rounded-xl rounded-bl-sm bg-[color:var(--color-bg-elevated)] px-2.5 py-1.5 text-fg-muted leading-relaxed">
                    Tabii. Önce sayfa hızı, sonra başlık etiketleri, ardından iç bağlantı yapısı...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
