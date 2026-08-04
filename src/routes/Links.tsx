import { ArrowUpRight, Globe, Smartphone } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { SeoHead } from '@/components/ui/SeoHead'
import { InstagramIcon, XIcon, YouTubeIcon } from '@/components/ui/SocialIcons'
import { config } from '@/lib/config'
import type { ReactElement } from 'react'

interface LinkItem {
  label: string
  href: string
  icon: ReactElement
  description?: string
}

const items: LinkItem[] = [
  {
    label: 'Web sitemiz',
    href: 'https://marulai.com.tr',
    icon: <Globe className="h-5 w-5" />,
    description: 'marulai.com.tr',
  },
  {
    label: 'Android uygulaması',
    href: config.playStoreUrl,
    icon: <Smartphone className="h-5 w-5" />,
    description: 'Google Play',
  },
  {
    label: 'YouTube',
    href: config.socials.youtube,
    icon: <YouTubeIcon size={20} />,
    description: '@MarulAI_Resmi',
  },
  {
    label: 'Instagram',
    href: config.socials.instagram,
    icon: <InstagramIcon size={20} />,
    description: '@marulai.resmi',
  },
  {
    label: 'X (Twitter)',
    href: config.socials.twitter,
    icon: <XIcon size={20} />,
    description: '@Marulai_resmi',
  },
]

export default function Links() {
  return (
    <>
      <SeoHead title="Bağlantılar" path="/baglantilar" />
      <div className="relative min-h-[100dvh] overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40 mask-fade-b" aria-hidden />
        <div
          className="absolute left-1/2 top-[-12rem] -z-10 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
          aria-hidden
          style={{
            background:
              'radial-gradient(60% 60% at 50% 50%, rgba(16,185,129,0.20) 0%, rgba(99,102,241,0.06) 45%, transparent 80%)',
          }}
        />

        <div className="relative mx-auto max-w-md px-5 py-16">
          <div className="flex flex-col items-center text-center">
            <Logo size={48} showText={false} />
            <h1 className="mt-5 text-[28px] font-semibold tracking-[-0.025em]">Marul AI</h1>
            <p className="mt-1.5 text-[13.5px] text-fg-muted">
              Tüm resmi kanallarımız tek bir yerde.
            </p>
          </div>

          <div className="mt-10 space-y-2.5">
            {items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 rounded-[var(--radius-lg)] border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface)] px-4 py-3.5 transition-all hover:border-[color:var(--color-border-bright)] hover:bg-[color:var(--color-surface-2)] hover:scale-[1.01] active:scale-100"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white/[0.04] text-fg ring-1 ring-inset ring-[color:var(--color-border-strong)]">
                  {item.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[14.5px] font-medium text-fg">{item.label}</p>
                  {item.description ? (
                    <p className="text-[12.5px] text-fg-dim truncate">{item.description}</p>
                  ) : null}
                </div>
                <ArrowUpRight className="h-4 w-4 text-fg-dim group-hover:text-fg transition-colors" />
              </a>
            ))}
          </div>

          <p className="mt-12 text-center text-[12px] text-fg-dim">
            © {new Date().getFullYear()} Karakuş Tech · Marul AI
          </p>
        </div>
      </div>
    </>
  )
}
