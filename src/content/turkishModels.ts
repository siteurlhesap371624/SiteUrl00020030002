export interface TurkishModel {
  name: string
  developer: string
  size: string
  kind: string
  access: string
  url?: string
  own?: boolean
  note: string
}

export const TURKISH_MODELS: TurkishModel[] = [
  {
    name: 'Yedikule',
    developer: 'Marul AI',
    size: '202 milyon',
    kind: 'Sıfırdan eğitilmiş',
    access: 'Açık ağırlıklı (Yedikule Model Lisansı 2.0)',
    url: 'https://huggingface.co/MarulAI/Yedikule-202M-Instruct',
    own: true,
    note: 'Bu sitenin modeli. Bağımsız bir geliştirici tarafından Türkçe için sıfırdan eğitildi: 24,33 milyar Türkçe token ile ön eğitim, 159.734 örnekle talimat ayarı. Listedeki en küçük ölçekli modellerden biridir; internete çıkmadan kendi bilgisayarınızda veya kurum içi sunucunuzda çalışacak kadar hafif olması hedeflendi.',
  },
  {
    name: 'Kumru',
    developer: 'VNGRS',
    size: '7,4 milyar',
    kind: 'Sıfırdan eğitilmiş',
    access: 'Kumru-2B sürümü açık ağırlıklı (Apache 2.0)',
    url: 'https://huggingface.co/vngrs-ai/Kumru-2B',
    note: 'Ekim 2025’te duyuruldu. 500 GB temizlenmiş veri üzerinde yaklaşık 300 milyar token ile ön eğitildi, bağlam uzunluğu 8.192 token. Türkçe için sıfırdan eğitilip kamuya açılan büyük dil modellerinin başında gelir.',
  },
  {
    name: 'BİLGE',
    developer: 'TÜBİTAK BİLGEM',
    size: '37 milyar',
    kind: 'Sıfırdan eğitilmiş',
    access: 'Geliştiricilere açılacağı duyuruldu',
    note: 'Kamu tarafından yürütülen en büyük ölçekli Türkçe temel model çalışmasıdır. Duyurular 2026 yazında yapıldı; erişim koşulları için resmi açıklamaların takip edilmesi gerekir.',
  },
  {
    name: 'T3 AI',
    developer: 'T3 Vakfı ve Baykar',
    size: 'Açıklanmadı',
    kind: 'Türkçe odaklı, çok dilli',
    access: 'Beta olarak sunuldu',
    note: 'TEKNOFEST Sosyal platformu üzerinde beta olarak kullanıma sunuldu. İçerik iş birlikleri arasında Millî Eğitim Bakanlığı, TRT ve TÜBA yer alıyor.',
  },
  {
    name: 'Cosmos serisi',
    developer: 'Yıldız Teknik Üniversitesi · COSMOS',
    size: '8–9 milyar',
    kind: 'Uyarlama (Llama ve Gemma tabanlı)',
    access: 'Açık ağırlıklı',
    url: 'https://huggingface.co/ytu-ce-cosmos',
    note: 'Turkish-Llama-8b ve Turkish-Gemma-9b gibi modellerin yanı sıra Türkçe gömme (embedding) modelleri yayımlar. Türkçe açık ağırlıklı model ekosisteminin en üretken akademik grubudur.',
  },
  {
    name: 'TURNA',
    developer: 'Boğaziçi Üniversitesi · TABILAB',
    size: '1,1 milyar',
    kind: 'Sıfırdan eğitilmiş (encoder-decoder)',
    access: 'Açık ağırlıklı',
    url: 'https://huggingface.co/boun-tabi-LMG/TURNA',
    note: 'UL2 mimarisiyle eğitilmiş, özetleme, başlık üretme ve metin anlama görevlerinde güçlü bir modeldir. Sohbet için değil, dil görevleri için tasarlandı.',
  },
  {
    name: 'Kanarya',
    developer: 'Ali Safaya (akademik çalışma)',
    size: '2 milyar',
    kind: 'Sıfırdan eğitilmiş',
    access: 'Açık ağırlıklı (Apache 2.0)',
    url: 'https://huggingface.co/asafaya/kanarya-2b',
    note: 'Yalnızca Türkçe metin üzerinde ön eğitilmiş temel modeldir; 750 milyon parametreli bir sürümü de bulunur.',
  },
  {
    name: 'Trendyol LLM',
    developer: 'Trendyol',
    size: '7–70 milyar aralığında sürümler',
    kind: 'Uyarlama',
    access: 'Açık ağırlıklı sürümler var',
    url: 'https://huggingface.co/Trendyol',
    note: 'E-ticaret kullanımına yönelik geliştirildi; sohbet, temel ve alan odaklı (örneğin siber güvenlik) sürümleri yayımlandı.',
  },
  {
    name: 'Turkcell LLM',
    developer: 'Turkcell',
    size: '7 milyar',
    kind: 'Uyarlama (Mistral tabanlı)',
    access: 'Açık ağırlıklı',
    url: 'https://huggingface.co/TURKCELL/Turkcell-LLM-7b-v1',
    note: 'Yaklaşık 5 milyar tokenlık temizlenmiş Türkçe metinle iki aşamalı olarak eğitildi.',
  },
  {
    name: 'MAIN',
    developer: 'HAVELSAN',
    size: '9 milyar dahil çoklu model',
    kind: 'Kurumsal platform',
    access: 'Kurumsal',
    note: 'Dil modellerini, çok kipli analizi ve iş akışı otomasyonunu birleştiren kurumsal yapay zeka platformudur. Kamuya açık indirilebilir ağırlık sunulmaz.',
  },
]

export interface ModelSource {
  label: string
  url: string
}

export const TURKISH_MODEL_SOURCES: ModelSource[] = [
  { label: 'Kumru-2B model kartı · Hugging Face', url: 'https://huggingface.co/vngrs-ai/Kumru-2B' },
  { label: 'YTÜ COSMOS model koleksiyonu', url: 'https://huggingface.co/ytu-ce-cosmos' },
  { label: 'TURNA model kartı · Boğaziçi TABILAB', url: 'https://huggingface.co/boun-tabi-LMG/TURNA' },
  { label: 'Trendyol model koleksiyonu', url: 'https://huggingface.co/Trendyol' },
  { label: 'Turkcell-LLM-7b-v1 model kartı', url: 'https://huggingface.co/TURKCELL/Turkcell-LLM-7b-v1' },
  { label: 'Yedikule model kartı · Marul AI', url: 'https://huggingface.co/MarulAI/Yedikule-202M-Instruct' },
]
