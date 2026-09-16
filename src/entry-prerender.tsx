import type { ReactElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { LazyMotion, domAnimation } from 'framer-motion'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

import Home from '@/routes/Home'
import ModelsPage from '@/routes/ModelsPage'
import PricingPage from '@/routes/PricingPage'
import About from '@/routes/About'
import Contact from '@/routes/Contact'
import Links from '@/routes/Links'
import Sss from '@/routes/Sss'
import Yedikule from '@/routes/Yedikule'
import TurkishModels from '@/routes/TurkishModels'
import Terms from '@/routes/legal/Terms'
import Kvkk from '@/routes/legal/Kvkk'

const pages: Record<string, () => ReactElement> = {
  '/': () => <Home />,
  '/modeller': () => <ModelsPage />,
  '/fiyatlandirma': () => <PricingPage />,
  '/modeller/yedikule': () => <Yedikule />,
  '/turkiye-yapay-zeka-modelleri': () => <TurkishModels />,
  '/sss': () => <Sss />,
  '/hakkimizda': () => <About />,
  '/iletisim': () => <Contact />,
  '/baglantilar': () => <Links />,
  '/sartlar': () => <Terms />,
  '/kvkk': () => <Kvkk />,
}

export function renderPath(path: string): string | null {
  const page = pages[path]
  if (!page) return null
  return renderToStaticMarkup(
    <LazyMotion features={domAnimation} strict>
      <StaticRouter location={path}>
        <div className="flex min-h-[100dvh] flex-col">
          <Header />
          <main className="flex-1">{page()}</main>
          <Footer />
        </div>
      </StaticRouter>
    </LazyMotion>,
  )
}

export { SEO_ROUTES, SHELL_ROUTES, SITE_URL, SITE_NAME, PUBLISHER, BASE_TITLE, BASE_DESCRIPTION } from '@/seo/site'
export { jsonLdFor } from '@/seo/jsonLd'
