export const YEDIKULE = {
  name: 'Yedikule',
  fullName: 'Yedikule 202M',
  developer: 'Ahmet Karakuş',
  organization: 'Marul AI',
  parameters: '202,1 milyon',
  parametersExact: '202.055.424',
  contextTokens: 2048,
  license: 'Yedikule Model Lisansı 2.0',
  released: '2026-06-24',
  weightsPublished: '2026-08-19',
  summary:
    'Yedikule, Marul AI tarafından Türkçe için sıfırdan eğitilmiş 202,1 milyon parametreli, yalnızca çözücü (decoder-only) bir dil modelidir. 24,33 milyar Türkçe token üzerinde ön eğitilmiş, ardından 159.734 örnekle talimat ayarı yapılmıştır. Ağırlıkları Hugging Face üzerinde herkese açıktır ve marulai.com.tr üzerinde ücretsiz denenebilir.',
} as const

export interface SpecRow {
  label: string
  value: string
}

export const YEDIKULE_SPECS: SpecRow[] = [
  { label: 'Model türü', value: 'Decoder-only Transformer' },
  { label: 'Parametre', value: '202,1 milyon (202.055.424)' },
  { label: 'Katman', value: '24' },
  { label: 'Gizli boyut', value: '768' },
  { label: 'Ara boyut (FFN)', value: '2.304 · SwiGLU' },
  { label: 'Dikkat', value: 'Grouped Query Attention · 12 sorgu, 4 anahtar/değer başlığı' },
  { label: 'Başlık boyutu', value: '64' },
  { label: 'Normalizasyon', value: 'Pre-norm RMSNorm · QK-Norm' },
  { label: 'Konum kodlaması', value: 'RoPE (theta 10.000)' },
  { label: 'Gömmeler', value: 'Bağlı giriş/çıkış gömmeleri, hiçbir katmanda bias yok' },
  { label: 'Tokenizer', value: 'Marul 48k · Türkçe için eğitilmiş Byte-Level BPE' },
  { label: 'Bağlam uzunluğu', value: '2.048 token' },
  { label: 'Ağırlık biçimi', value: 'bf16 · safetensors (GGUF sürümü F16)' },
  { label: 'Dil', value: 'Türkçe' },
]

export const YEDIKULE_TRAINING: SpecRow[] = [
  { label: 'Ön eğitim adımı', value: '45.000' },
  { label: 'Görülen token', value: '24,33 milyar' },
  { label: 'Kaynak corpus', value: '33 milyar token Türkçe metin' },
  { label: 'Veri kaynağı', value: 'CulturaX Türkçe alt kümesi (ek filtreleme ile) ve Marul AI web taraması' },
  { label: 'Ön eğitim doğrulama kaybı', value: '3,1257 (yaklaşık 22 perplexity)' },
  { label: 'Talimat ayarı (SFT)', value: '159.734 örnek · 60,3 milyon token' },
  { label: 'SFT doğrulama kaybı', value: '1,6044 (yaklaşık 5,0 perplexity)' },
  { label: 'Sohbet biçimi', value: 'Rol adlarının özel token olduğu ChatML türevi' },
]

export interface HfRepo {
  id: string
  url: string
  title: string
  description: string
  format: string
}

export const YEDIKULE_REPOS: HfRepo[] = [
  {
    id: 'MarulAI/Yedikule-202M-Instruct',
    url: 'https://huggingface.co/MarulAI/Yedikule-202M-Instruct',
    title: 'Yedikule 202M Instruct',
    description:
      'Talimat ayarlı sürüm. Sohbet şablonunu tanır, soruları yanıtlar. Sohbet uygulamaları için önerilen sürümdür.',
    format: 'safetensors · bf16',
  },
  {
    id: 'MarulAI/Yedikule-202M-Base',
    url: 'https://huggingface.co/MarulAI/Yedikule-202M-Base',
    title: 'Yedikule 202M Base',
    description:
      'Yalnızca ön eğitim yapılmış temel model. Kendi Türkçe veri kümenizle ince ayar yapmak ve araştırma için başlangıç noktasıdır.',
    format: 'safetensors · bf16',
  },
  {
    id: 'MarulAI/Yedikule-202M-Instruct-GGUF',
    url: 'https://huggingface.co/MarulAI/Yedikule-202M-Instruct-GGUF',
    title: 'Yedikule 202M Instruct · GGUF',
    description:
      'Ollama ve llama.cpp ile doğrudan çalışan GGUF biçimi. 406 MB, niceleme uygulanmamış F16 dosya.',
    format: 'GGUF · F16',
  },
]

export const YEDIKULE_USE_CASES = [
  'Kendi bilgisayarında veya kurum içi sunucuda, veri dışarı çıkmadan Türkçe metin işleme',
  'Türkçe sohbet arayüzleri ve yardım masası taslakları',
  'Kendi alanınıza özel model eğitmek için başlangıç noktası',
  'Türkçe dil modeli araştırmaları ve tokenizasyon çalışmaları',
]

export const YEDIKULE_STRENGTHS = [
  'Çok turlu Türkçe sohbet ve bağlam takibi',
  'Kısa özetleme ve yeniden yazma',
  'Kısa, olgusal Türkçe sorulara yanıt',
  'Türkçe çekim ekleri ve deyimlerde doğal dil kullanımı',
  'Verilen kimliğe (persona) ve sistem talimatına uyma',
]

export const YEDIKULE_LIMITS = [
  'Akıl yürütme, matematik ve çok adımlı mantık gerektiren görevler',
  'Araç kullanımı yoktur: web araması yapamaz, dosya üretemez',
  'Uzun metin üretiminde tutarlılık; bağlam 2.048 token ile sınırlıdır',
  'Kod üretimi ve sınıflandırma görevleri',
  'Büyük ticari modellerin yerine geçmez; 202 milyon parametre küçük bir ölçektir',
]
