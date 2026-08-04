import { Link } from 'react-router-dom'
import { m } from 'framer-motion'
import { ArrowRight, Paperclip, Send } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-4rem)] flex-col justify-center overflow-hidden pt-10 pb-16 md:pt-12 md:pb-20">
      <div className="absolute inset-0 grid-bg opacity-40 mask-fade-b" aria-hidden />
      <div
        className="absolute -z-10 left-1/2 top-[-6rem] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            'radial-gradient(60% 60% at 50% 50%, rgba(16,185,129,0.16) 0%, rgba(99,102,241,0.04) 50%, transparent 80%)',
        }}
        aria-hidden
      />
      <div className="container-content relative">
        <div className="mx-auto w-full max-w-3xl">
          <HeroPreview />

          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
            className="mt-6 flex flex-col gap-4 border-t border-[color:var(--color-border)] pt-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8"
          >
            <div className="max-w-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-fg-dim">Önizleme</p>
              <p className="mt-2 text-[14px] leading-relaxed text-fg-muted">
                Yukarıdaki arayüzün tamamı hazır. Yedikule ile Türkçe sohbeti şimdi deneyin.
              </p>
            </div>

            <Link to="/sohbet" className="self-end shrink-0">
              <Button
                className="group"
                rightIcon={
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-snappy group-hover:translate-x-1" />
                }
              >
                Sohbete başla
              </Button>
            </Link>
          </m.div>
        </div>
      </div>
    </section>
  )
}

function HeroPreview() {
  return (
    <m.div
      initial={{ opacity: 0, y: 20, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
      className="relative w-full"
    >
      <div
        className="absolute -inset-6 rounded-[32px] opacity-50 blur-3xl"
        aria-hidden
        style={{
          background: 'radial-gradient(55% 60% at 50% 40%, rgba(16,185,129,0.18) 0%, transparent 70%)',
        }}
      />
      <div className="relative overflow-hidden rounded-[18px] border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface)] shadow-[0_40px_140px_-50px_rgba(0,0,0,0.85)]">
        <div className="flex items-center justify-between border-b border-[color:var(--color-border)] px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--color-border-bright)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--color-border-bright)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--color-border-bright)]" />
          </div>
          <div className="text-[11px] text-fg-dim font-mono">marulai.com.tr/sohbet</div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--color-border)] px-2 py-0.5 text-[10px] text-fg-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-brand)] animate-pulse" />
            <span className="font-mono">yedikule</span>
          </div>
        </div>

        <div className="space-y-5 p-5 md:p-7 text-left">
          <div className="flex justify-end">
            <div className="max-w-[82%] rounded-2xl rounded-br-md bg-white/[0.06] border border-[color:var(--color-border)] px-4 py-2.5 text-[14px] text-fg">
              Yeni başlayan bir geliştiriciye monorepo'yu nasıl anlatırsın?
            </div>
          </div>

          <div className="flex gap-3">
            <div className="shrink-0 h-8 w-8 rounded-lg bg-[color:var(--color-brand)]/15 border border-[color:var(--color-brand)]/25 flex items-center justify-center">
              <span className="text-[11px] font-bold text-[color:var(--color-brand-hover)]">M</span>
            </div>
            <div className="flex-1 text-[14px] text-fg leading-relaxed">
              <p>Tek bir Git deposunda birden fazla projeyi birlikte barındırma yöntemidir.</p>
              <div className="mt-3 space-y-2">
                <div className="flex items-start gap-2.5">
                  <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[color:var(--color-brand)] shrink-0" />
                  <span>
                    <strong className="text-fg">Avantaj:</strong> kod paylaşımı, tek atomik commit ve tutarlı
                    araç zinciri.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[color:var(--color-brand)] shrink-0" />
                  <span>
                    <strong className="text-fg">Dezavantaj:</strong> büyüyen depo, uzayan CI süreleri ve
                    erişim kontrolü.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[color:var(--color-brand)] shrink-0" />
                  <span>
                    <strong className="text-fg">Türkçe karşılığı:</strong>{' '}
                    <span className="font-mono text-[13px] text-fg-muted">tek havuz repo</span>
                  </span>
                </div>
              </div>
              <p className="mt-3 text-fg-muted">
                Küçük ekipler için pratiktir; ölçeklendikçe modüler sınırlar koymak gerekir.
                <span className="ml-1 inline-block h-3.5 w-1.5 translate-y-0.5 bg-[color:var(--color-brand-hover)] animate-pulse-dot" />
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)]/60 px-4 py-3">
          <div className="flex items-center gap-2 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface-2)] px-3 py-2">
            <Paperclip className="h-4 w-4 text-fg-dim" />
            <span className="flex-1 text-[13px] text-fg-dim">Marul'a bir şeyler sorun…</span>
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[color:var(--color-brand)] text-black">
              <Send className="h-3.5 w-3.5" />
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between px-0.5 text-[10.5px] text-fg-dim">
            <span>3 / 25 mesaj · ücretsiz plan</span>
            <span className="font-mono">~1.18s</span>
          </div>
        </div>
      </div>
    </m.div>
  )
}
