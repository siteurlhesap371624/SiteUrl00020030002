import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, MessageSquare, Download } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'
import { useAuthStore } from '@/lib/store/auth'
import { config } from '@/lib/config'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/', label: 'Ana sayfa', end: true },
  { to: '/modeller', label: 'Modeller' },
  { to: '/forum', label: 'Sosyal' },
  { to: '/fiyatlandirma', label: 'Fiyatlandırma' },
  { to: '/hakkimizda', label: 'Hakkımızda' },
  { to: '/iletisim', label: 'İletişim' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const user = useAuthStore((s) => s.user)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])


  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-[backdrop-filter,background-color,border-color] duration-300',
        scrolled
          ? 'bg-[color:var(--color-bg)]/75 backdrop-blur-xl border-b border-[color:var(--color-border)]'
          : 'bg-transparent border-b border-transparent',
      )}
    >
      <div className="container-content flex h-16 items-center justify-between gap-6">
        <div className="flex items-center gap-8 min-w-0">
          <Link to="/" className="flex items-center gap-2.5 min-w-0" aria-label="Marul AI ana sayfa">
            <Logo size={26} />
          </Link>
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    'rounded-md px-3 py-1.5 text-[13.5px] transition-colors',
                    isActive
                      ? 'text-fg bg-white/[0.05]'
                      : 'text-fg-muted hover:text-fg hover:bg-white/[0.03]',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={config.playStoreUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[13px] text-fg-muted hover:text-fg hover:bg-white/[0.04] transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            Mobil uygulama
          </a>
          {user ? (
            <Link to="/sohbet">
              <Button variant="primary" size="sm" leftIcon={<MessageSquare className="h-4 w-4" />}>
                Sohbete dön
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/giris" className="hidden sm:inline-flex">
                <Button variant="ghost" size="sm">
                  Giriş yap
                </Button>
              </Link>
              <Link to="/kayit">
                <Button variant="primary" size="sm">
                  Ücretsiz başla
                </Button>
              </Link>
            </>
          )}

          <button
            type="button"
            className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-md text-fg-muted hover:text-fg hover:bg-white/[0.05]"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Menüyü kapat' : 'Menüyü aç'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="lg:hidden border-t border-[color:var(--color-border)] bg-[color:var(--color-bg)]/95 backdrop-blur-xl">
          <nav className="container-content flex flex-col py-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    'flex items-center justify-between rounded-md px-3 py-2.5 text-[14.5px]',
                    isActive
                      ? 'text-fg bg-white/[0.05]'
                      : 'text-fg-muted hover:text-fg hover:bg-white/[0.04]',
                  )
                }
              >
                <span>{item.label}</span>
              </NavLink>
            ))}
            <a
              href={config.playStoreUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-md px-3 py-2.5 text-[14.5px] text-fg-muted"
            >
              <span>Mobil uygulama</span>
              <Download className="h-4 w-4" />
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
