import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'
import { SeoHead } from '@/components/ui/SeoHead'

export default function NotFound() {
  return (
    <>
      <SeoHead title="Sayfa bulunamadı" noindex />
      <div className="container-content py-32 text-center">
        <Logo size={36} showText={false} className="mx-auto" />
        <p className="mt-10 text-[12px] uppercase tracking-[0.18em] text-fg-dim">404</p>
        <h1 className="mt-3 text-[clamp(2rem,5vw,3rem)] font-semibold tracking-[-0.03em]">
          Bu sayfa bulunamadı.
        </h1>
        <p className="mt-4 text-[15.5px] text-fg-muted">
          Aradığınız sayfa kaldırılmış, yeniden adlandırılmış veya hiç var olmamış olabilir.
        </p>
        <div className="mt-8 inline-flex">
          <Link to="/">
            <Button variant="outline" leftIcon={<ArrowLeft className="h-4 w-4" />}>
              Ana sayfaya dön
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}
