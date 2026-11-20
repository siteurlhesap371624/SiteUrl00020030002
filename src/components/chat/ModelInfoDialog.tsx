import { Dialog } from '@/components/ui/Dialog'
import { Badge } from '@/components/ui/Badge'

interface ModelInfoDialogProps {
  open: boolean
  onClose: () => void
}

export function ModelInfoDialog({ open, onClose }: ModelInfoDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} title="Model bilgisi" size="lg">
      <div className="space-y-6">
        <section>
          <div className="flex items-center gap-2">
            <h3 className="text-[15px] font-semibold">Yedikule 1.4</h3>
            <Badge variant="brand">Yerli</Badge>
            <Badge variant="outline">Düşünme</Badge>
          </div>
          <p className="mt-2 text-[13.5px] leading-relaxed text-fg-muted">
            Yedikule 1.4, Türkçe için sıfırdan eğitilmiş yerli modelimizdir. Her yanıtta kısa bir iç
            plan yapar; bu planı düşünme panelinde izleyebilirsiniz. Çok turlu sohbeti ve bağlam
            hafızasını destekler; gündelik diyalog, özetleme ve metin düzeltmede doğal Türkçe üretir.
            Araç çağırma yeteneği vardır; sitede araçlar kapalıdır. ChatGPT veya Gemini gibi büyük
            ticari modellerin doğrudan alternatifi değildir.
          </p>
          <ul className="mt-3 space-y-1.5 text-[13.5px] text-fg-muted">
            <li>· Yanıt öncesi görünür düşünme adımları</li>
            <li>· Doğal, çok turlu Türkçe sohbet</li>
            <li>· Kısa metin özetleme ve yeniden yazma</li>
            <li>· Araştırma, dosya üretimi ve çok adımlı görevler için Qwen3.6 önerilir</li>
          </ul>
          <p className="mt-3 text-[12.5px] text-fg-dim">
            Yedikule 1.4 kendi sunucularımızda çalışır; 202 milyon parametre küçük bir ölçektir, geniş
            dünya bilgisi ve çok adımlı aritmetikte sınırlıdır.
          </p>
        </section>

        <div className="divider-h" />

        <section>
          <div className="flex items-center gap-2">
            <h3 className="text-[15px] font-semibold">Qwen3.6 (27B)</h3>
            <Badge variant="outline">Açık kaynak</Badge>
            <Badge variant="brand">Agent</Badge>
          </div>
          <p className="mt-2 text-[13.5px] leading-relaxed text-fg-muted">
            Apache 2.0 lisanslı, 27 milyar parametreli akıl yürüten model. Yanıt vermeden önce
            düşünür, gerektiğinde internette araştırma yapar ve çok adımlı görevleri kendi başına
            yürütür. Düşük gecikmeli altyapı üzerinde sunulur.
          </p>
          <ul className="mt-3 space-y-1.5 text-[13.5px] text-fg-muted">
            <li>· Güncel bilgi için otomatik web araması ve kaynak gösterimi</li>
            <li>· Excel tablosu ve veri dosyası hazırlama</li>
            <li>· Kod projesi yazıp dosya olarak teslim etme</li>
            <li>· Çok adımlı derin araştırma</li>
          </ul>
          <p className="mt-3 text-[12.5px] text-fg-dim">
            Ürettiği dosyalar sohbetin çalışma klasöründe birikir; dilediğiniz an tek dosya ya da
            tümünü zip olarak indirebilirsiniz.
          </p>
        </section>
      </div>
    </Dialog>
  )
}
