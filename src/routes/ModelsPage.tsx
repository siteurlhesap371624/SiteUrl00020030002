import { Models } from '@/components/landing/Models'
import { SeoHead } from '@/components/ui/SeoHead'

export default function ModelsPage() {
  return (
    <>
      <SeoHead
        title="Modeller"
        description="Yedikule ve Qwen3.6 modellerinin teknik özellikleri ve kullanım alanları."
        path="/modeller"
      />
      <div className="pt-16">
        <Models />
      </div>
    </>
  )
}
