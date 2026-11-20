import { Models } from '@/components/landing/Models'
import { SeoHead } from '@/components/ui/SeoHead'

export default function ModelsPage() {
  return (
    <>
      <SeoHead
        title="Modeller"
        description="Yedikule 1.4'ün teknik özellikleri, yetenekleri ve kullanım alanları."
        path="/modeller"
      />
      <div className="pt-16">
        <h1 className="sr-only">Marul AI yapay zeka modeli · Yedikule 1.4</h1>
        <Models />
      </div>
    </>
  )
}
