import { Mail, MessageCircle, ShieldAlert } from 'lucide-react'
import { SeoHead } from '@/components/ui/SeoHead'
import { config } from '@/lib/config'

const channels = [
  {
    icon: Mail,
    title: 'Genel iletişim',
    body: 'Geri bildirim, iş birliği teklifleri ve teknik sorular için kullanın.',
    href: `mailto:${config.supportEmail}`,
    value: config.supportEmail,
  },
  {
    icon: ShieldAlert,
    title: 'Hesap silme ve KVKK',
    body: 'Kişisel verilerinizin silinmesi taleplerini bu adrese e-posta ile iletin.',
    href: `mailto:${config.legalEmail}?subject=HESAP%20SILME%20TALEBI`,
    value: config.legalEmail,
  },
  {
    icon: MessageCircle,
    title: 'Sosyal medya',
    body: 'Güncellemeler ve duyurular için bizi takip edin.',
    href: config.socials.twitter,
    value: '@Marulai_resmi',
    external: true,
  },
]

export default function Contact() {
  return (
    <>
      <SeoHead
        title="İletişim"
        description="Marul AI ile iletişim kanalları. E-posta, KVKK ve sosyal medya."
        path="/iletisim"
      />
      <div className="container-content py-20 md:py-28">
        <div className="max-w-2xl">
          <p className="text-[12px] font-semibold tracking-[0.12em] uppercase text-fg-dim">
            İletişim
          </p>
          <h1 className="mt-3 text-[clamp(2rem,4.5vw,3rem)] font-semibold tracking-[-0.03em] leading-[1.05]">
            Bize ulaşın.
          </h1>
          <p className="mt-5 text-[15.5px] text-fg-muted leading-relaxed">
            Her e-postanızı okuyor ve hafta içi 48 saat içinde yanıtlıyoruz.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {channels.map((c) => {
            const Icon = c.icon
            return (
              <a
                key={c.title}
                href={c.href}
                target={c.external ? '_blank' : undefined}
                rel={c.external ? 'noreferrer' : undefined}
                className="group block rounded-[var(--radius-lg)] border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface)] p-6 transition-colors hover:border-[color:var(--color-border-bright)]"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-white/[0.04] ring-1 ring-inset ring-[color:var(--color-border-strong)] text-fg">
                  <Icon className="h-4 w-4" />
                </div>
                <h2 className="mt-5 text-[16px] font-medium tracking-[-0.01em]">{c.title}</h2>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-fg-muted">{c.body}</p>
                <p className="mt-4 font-mono text-[13px] text-[color:var(--color-brand-hover)] group-hover:text-[color:var(--color-brand)] transition-colors">
                  {c.value}
                </p>
              </a>
            )
          })}
        </div>
      </div>
    </>
  )
}
