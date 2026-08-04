import { Hero } from '@/components/landing/Hero'
import { Models } from '@/components/landing/Models'
import { Pricing } from '@/components/landing/Pricing'
import { Faq } from '@/components/landing/Faq'
import { AppCta } from '@/components/landing/AppCta'
import { Reveal } from '@/components/ui/Reveal'
import { SeoHead } from '@/components/ui/SeoHead'

export default function Home() {
  return (
    <>
      <SeoHead path="/" />
      <h1 className="sr-only">
        Marul AI · Türkçe için geliştirilmiş yapay zeka asistanı ve agent platformu
      </h1>
      <Hero />
      <Models />
      <Pricing />
      <Reveal threshold={0.06}>
        <Faq />
      </Reveal>
      <Reveal threshold={0.06}>
        <AppCta />
      </Reveal>
    </>
  )
}
