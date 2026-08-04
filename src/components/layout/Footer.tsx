import { Link } from 'react-router-dom'
import { Logo } from '@/components/ui/Logo'
import { InstagramIcon, XIcon, YouTubeIcon } from '@/components/ui/SocialIcons'
import { config } from '@/lib/config'

const linkGroups = [
  {
    title: 'Ürün',
    links: [
      { to: '/sohbet', label: 'Sohbet' },
      { to: '/forum', label: 'Sosyal' },
      { to: '/modeller', label: 'Modeller' },
      { to: '/fiyatlandirma', label: 'Fiyatlandırma' },
      { to: '/baglantilar', label: 'Bağlantılar' },
    ],
  },
  {
    title: 'Kurumsal',
    links: [
      { to: '/hakkimizda', label: 'Hakkımızda' },
      { to: '/iletisim', label: 'İletişim' },
      { href: config.playStoreUrl, label: 'Mobil uygulama', external: true },
    ],
  },
  {
    title: 'Yasal',
    links: [
      { to: '/gizlilik', label: 'Gizlilik' },
      { to: '/kvkk', label: 'KVKK' },
      { to: '/sartlar', label: 'Kullanım şartları' },
    ],
  },
]

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-[color:var(--color-border)] bg-[color:var(--color-bg)] mt-24">
      <div className="container-content py-12">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-12">
          <div className="col-span-2 md:col-span-4">
            <Logo size={28} />
            <p className="mt-4 text-[13.5px] leading-relaxed text-fg-muted max-w-sm">
              Marul AI, Karakuş Tech tarafından Türkiye için geliştirilen yapay zeka asistanıdır.
              Konuşmalarınız şifrelenir, üçüncü taraflarla paylaşılmaz.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <a
                href={config.socials.twitter}
                target="_blank"
                rel="noreferrer"
                aria-label="X (Twitter)"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[color:var(--color-border-strong)] text-fg-muted hover:text-fg hover:border-[color:var(--color-border-bright)] transition-colors"
              >
                <XIcon size={14} />
              </a>
              <a
                href={config.socials.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[color:var(--color-border-strong)] text-fg-muted hover:text-fg hover:border-[color:var(--color-border-bright)] transition-colors"
              >
                <InstagramIcon size={16} />
              </a>
              <a
                href={config.socials.youtube}
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[color:var(--color-border-strong)] text-fg-muted hover:text-fg hover:border-[color:var(--color-border-bright)] transition-colors"
              >
                <YouTubeIcon size={16} />
              </a>
            </div>
          </div>

          {linkGroups.map((group) => (
            <div key={group.title} className="col-span-1 md:col-span-2 md:col-start-auto">
              <h3 className="text-[12px] font-semibold tracking-[0.06em] uppercase text-fg-dim">
                {group.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {group.links.map((l) =>
                  'external' in l && l.external && 'href' in l ? (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[13.5px] text-fg-muted hover:text-fg transition-colors"
                      >
                        {l.label}
                      </a>
                    </li>
                  ) : 'to' in l && l.to ? (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        className="text-[13.5px] text-fg-muted hover:text-fg transition-colors"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ) : null,
                )}
              </ul>
            </div>
          ))}

          <div className="col-span-2 md:col-span-2">
            <h3 className="text-[12px] font-semibold tracking-[0.06em] uppercase text-fg-dim">
              İletişim
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5 text-[13.5px] text-fg-muted">
              <li>
                <a
                  href={`mailto:${config.supportEmail}`}
                  className="hover:text-fg transition-colors"
                >
                  {config.supportEmail}
                </a>
              </li>
              <li className="text-fg-dim">İstanbul, Türkiye</li>
            </ul>
          </div>
        </div>

        <div className="divider-h my-10" />

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-[12.5px] text-fg-dim">
            © {year} Karakuş Tech · Marul AI. Tüm hakları saklıdır.
          </p>
          <p className="text-[12.5px] text-fg-dim">
            Yedikule yerli ve milli LLM mimarisi — TR
          </p>
        </div>
      </div>
    </footer>
  )
}
