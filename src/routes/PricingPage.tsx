import { Pricing } from '@/components/landing/Pricing'
import { Faq } from '@/components/landing/Faq'
import { SeoHead } from '@/components/ui/SeoHead'

export default function PricingPage() {
  return (
    <>
      <SeoHead
        title="Fiyatlandırma"
        description="Marul AI ücretsiz, ücretsiz hesap ve Plus aboneliği planlarının karşılaştırması."
        path="/fiyatlandirma"
      />
      <div className="pt-16">
        <h1 className="sr-only">Marul AI fiyatlandırma · ücretsiz plan ve Plus aboneliği</h1>
        <Pricing />
        <Faq />
      </div>
    </>
  )
}
