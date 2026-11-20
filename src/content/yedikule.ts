export const YEDIKULE_HF_URL = 'https://huggingface.co/MarulAI/Yedikule-1.4'

export const YEDIKULE_SYSTEM_PROMPT =
  'Adın Yedikule. Marul AI tarafından Türkçe için geliştirilmiş bir yapay zeka asistanısın. Kullanıcılara yardım ederken açık, doğru ve nazik ol.'

export const YEDIKULE = {
  name: 'Yedikule 1.4',
  fullName: 'Yedikule 1.4 (202M)',
  developer: 'Ahmet Karakuş',
  organization: 'Marul AI',
  parameters: '202,1 milyon',
  parametersExact: '202.055.424',
  contextTokens: 2048,
  license: 'Yedikule Model Lisansı 2.0',
  released: '2026-10-20',
  weightsPublished: '2026-10-20',
  summary:
    "Yedikule 1.4, Marul AI tarafından Türkçe için sıfırdan eğitilmiş 202,1 milyon parametreli, yalnızca çözücü (decoder-only) bir dil modelidir. 24,33 milyar Türkçe token üzerinde ön eğitilmiş, ardından Marul-SFT-TR veri kümesindeki 99.847 sohbetle talimat ayarı yapılmıştır. Her yanıtta kısa bir iç plan (düşünme) üretir ve araç çağırabilir; sitede araç kullanımı kapalıdır. Ağırlıkları Hugging Face üzerinde herkese açıktır ve marulai.com.tr üzerinde ücretsiz denenebilir.",
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
  { label: 'Ağırlık biçimi', value: 'bf16 · safetensors · GGUF (BF16, F16, Q8_0, Q6_K, Q5_K_M, Q4_K_M)' },
  { label: 'Dil', value: 'Türkçe' },
]

export const YEDIKULE_TRAINING: SpecRow[] = [
  { label: 'Ön eğitim adımı', value: '45.000' },
  { label: 'Görülen token', value: '24,33 milyar' },
  { label: 'Kaynak corpus', value: '33 milyar token Türkçe metin' },
  { label: 'Veri kaynağı', value: 'CulturaX Türkçe alt kümesi (ek filtreleme ile) ve Marul AI web taraması' },
  { label: 'Ön eğitim doğrulama kaybı', value: '3,1257 (yaklaşık 22 perplexity)' },
  { label: 'Talimat ayarı (SFT)', value: 'Marul-SFT-TR · 99.847 sohbet (97.261 eğitim / 2.586 doğrulama)' },
  { label: 'SFT düzeni', value: '2 epoch · 2.353 adım · AdamW 1,5e-4 cosine' },
  { label: 'SFT doğrulama kaybı', value: '3,577 → 1,672' },
  { label: 'Biçim tokenı isabeti', value: '%95' },
  { label: 'Kayıp hesabı', value: 'Yalnız asistan turları: düşünme, yanıt, araç çağrısı' },
  { label: 'Sohbet biçimi', value: 'Rol adlarının özel token olduğu ChatML türevi' },
]

export const YEDIKULE_GENERATION: SpecRow[] = [
  { label: 'Sıcaklık', value: '0,4 (olgusal 0,3 · yaratıcı en fazla 0,6)' },
  { label: 'top_k', value: '50' },
  { label: 'top_p', value: '0,9' },
  { label: 'min_p', value: '0,05' },
  { label: 'Tekrar cezası', value: '1,12 · 1,15 üzerine çıkmayın' },
  { label: 'no_repeat_ngram', value: '0 · kapalı kalmalı' },
  { label: 'max_new_tokens', value: '1024' },
  { label: 'Durdurma tokenı', value: '<|im_end|> (id 5)' },
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
    id: 'MarulAI/Yedikule-1.4',
    url: 'https://huggingface.co/MarulAI/Yedikule-1.4',
    title: 'Yedikule 1.4',
    description:
      'Güncel talimat ayarlı sürüm. Düşünme ve araç çağırma destekli; sohbet uygulamaları için önerilen sürümdür.',
    format: 'safetensors · bf16',
  },
  {
    id: 'MarulAI/Yedikule-1.4-GGUF',
    url: 'https://huggingface.co/MarulAI/Yedikule-1.4-GGUF',
    title: 'Yedikule 1.4 · GGUF',
    description:
      'llama.cpp, Ollama ve LM Studio ile doğrudan çalışan nicelemeli sürümler. Q8_0 önerilir (217 MB); BF16 dosyası ana modelle bit düzeyinde aynıdır.',
    format: 'GGUF · Q8_0 / Q6_K / Q5_K_M / Q4_K_M / BF16 / F16',
  },
  {
    id: 'MarulAI/Yedikule-202M-Base',
    url: 'https://huggingface.co/MarulAI/Yedikule-202M-Base',
    title: 'Yedikule 202M Base',
    description:
      'Yalnızca ön eğitim yapılmış temel model. Kendi Türkçe veri kümenizle ince ayar yapmak ve araştırma için başlangıç noktasıdır.',
    format: 'safetensors · bf16',
  },
]

export const YEDIKULE_USE_CASES = [
  'Kendi bilgisayarında veya kurum içi sunucuda, veri dışarı çıkmadan Türkçe metin işleme',
  'Türkçe sohbet arayüzleri ve yardım masası taslakları',
  'Kendi alanınıza özel model eğitmek için başlangıç noktası',
  'Türkçe dil modeli araştırmaları ve tokenizasyon çalışmaları',
]

export const YEDIKULE_STRENGTHS = [
  'Yanıt öncesi kısa iç plan (düşünme) ve görünür akıl yürütme',
  'Araç çağırma: tanımdan seçim, eğitimde görülmemiş araçlarla çalışma',
  'Çok turlu Türkçe sohbet ve bağlam takibi',
  'Sistem talimatına, kimliğe (persona) ve biçim kısıtlarına uyum',
  'Doğal Türkçe: yazım hatası, argo ve eksik karakterlere rağmen anlayış',
  'Kısa özetleme, düzeltme ve yeniden yazma',
]

export const YEDIKULE_LIMITS = [
  'Geniş dünya bilgisi ve çok adımlı aritmetikte sınırlı; hesap makinesi aracı önerilir',
  'Uzun, çok kurallı sistem talimatlarının her ayrıntısına uyamayabilir',
  'Bağlam 2.048 token ile sınırlıdır',
  'Bilgisi 2026 yılına kadardır; internet erişimi yoktur',
  'Sitede araç kullanımı kapalıdır; web araması ve dosya üretimi Qwen3.6 ile yapılır',
  'Büyük ticari modellerin yerine geçmez; 202 milyon parametre küçük bir ölçektir',
]
