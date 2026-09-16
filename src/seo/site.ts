export const SITE_URL = 'https://marulai.com.tr'
export const SITE_NAME = 'Marul AI'
export const PUBLISHER = 'Karakuş Tech'
export const CONTACT_EMAIL = 'marulai.resmi@gmail.com'
export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=ai.marul.com'
export const HUGGINGFACE_URL = 'https://huggingface.co/MarulAI'

export const BASE_TITLE = "Marul AI · Türkçe yapay zeka asistanı"
export const BASE_DESCRIPTION =
  'Marul AI, Türkçe için geliştirilen yapay zeka asistanıdır. Kendi yerli modelimiz Yedikule ile sohbet edin, agent modunda web araştırması yaptırın, dosya üretin. Web ve Android üzerinde ücretsiz kullanılır.'

export const SOCIAL_PROFILES = [
  'https://www.youtube.com/@MarulAI_Resmi',
  'https://www.instagram.com/marulai.resmi/',
  'https://x.com/Marulai_resmi',
  PLAY_STORE_URL,
  HUGGINGFACE_URL,
]

export interface SeoRoute {
  path: string
  file: string
  title: string
  description: string
  priority: string
  changefreq: string
  breadcrumb?: string
}

export const SEO_ROUTES: SeoRoute[] = [
  {
    path: '/',
    file: 'index.html',
    title: BASE_TITLE,
    description: BASE_DESCRIPTION,
    priority: '1.0',
    changefreq: 'weekly',
  },
  {
    path: '/modeller',
    file: 'modeller.html',
    title: 'Modeller · Yedikule ve Qwen3.6 · Marul AI',
    description:
      'Marul AI üzerinde kullanabileceğiniz yapay zeka modelleri: Türkçe için sıfırdan eğitilen yerli model Yedikule ve 27 milyar parametreli açık kaynak Qwen3.6. Teknik özellikler ve karşılaştırma.',
    priority: '0.9',
    changefreq: 'monthly',
    breadcrumb: 'Modeller',
  },
  {
    path: '/modeller/yedikule',
    file: 'modeller/yedikule.html',
    title: 'Yedikule modeli · Türkçe için sıfırdan eğitilen yerli dil modeli',
    description:
      'Yedikule, Marul AI tarafından Türkçe için sıfırdan eğitilen 202 milyon parametreli yerli dil modelidir. Ağırlıkları Hugging Face üzerinde açıktır; 24,33 milyar Türkçe token ile eğitildi, kurum içinde veri dışarı çıkmadan yerel olarak çalıştırılabilir.',
    priority: '0.9',
    changefreq: 'monthly',
    breadcrumb: 'Yedikule',
  },
  {
    path: '/turkiye-yapay-zeka-modelleri',
    file: 'turkiye-yapay-zeka-modelleri.html',
    title: "Türkiye'de geliştirilen yapay zeka modelleri (2026 listesi)",
    description:
      "Türkiye'de geliştirilen yerli yapay zeka modelleri ve asistanları: Yedikule, Kumru, Cosmos, TURNA, Trendyol LLM ve diğerleri. Her modelin geliştiricisi, boyutu, lisansı ve kullanım alanı ile güncel liste.",
    priority: '0.9',
    changefreq: 'monthly',
    breadcrumb: "Türkiye'de yapay zeka modelleri",
  },
  {
    path: '/sss',
    file: 'sss.html',
    title: 'Sık sorulan sorular · Marul AI',
    description:
      'Marul AI hakkında sık sorulan sorular: ücretsiz mi, hangi modelleri kullanıyor, verileriniz nasıl korunuyor, agent modu ne yapar, Plus aboneliği neler sunar.',
    priority: '0.8',
    changefreq: 'monthly',
    breadcrumb: 'Sık sorulan sorular',
  },
  {
    path: '/fiyatlandirma',
    file: 'fiyatlandirma.html',
    title: 'Fiyatlandırma · Ücretsiz ve Plus planları · Marul AI',
    description:
      'Marul AI ücretsiz planı ve Plus aboneliğinin karşılaştırması: mesaj limitleri, agent görevleri, web araştırması ve dosya üretimi hakları.',
    priority: '0.8',
    changefreq: 'monthly',
    breadcrumb: 'Fiyatlandırma',
  },
  {
    path: '/hakkimizda',
    file: 'hakkimizda.html',
    title: 'Hakkımızda · Marul AI ve Karakuş Tech',
    description:
      'Marul AI, Karakuş Tech tarafından Türkiye’de geliştirilen bağımsız bir yapay zeka asistanıdır. Misyonumuz, yaklaşımımız ve ekibimiz hakkında.',
    priority: '0.7',
    changefreq: 'monthly',
    breadcrumb: 'Hakkımızda',
  },
  {
    path: '/iletisim',
    file: 'iletisim.html',
    title: 'İletişim · Marul AI',
    description:
      'Marul AI ile iletişime geçin: destek ve iş birliği için e-posta, KVKK talepleri ve resmi sosyal medya hesapları.',
    priority: '0.6',
    changefreq: 'monthly',
    breadcrumb: 'İletişim',
  },
  {
    path: '/baglantilar',
    file: 'baglantilar.html',
    title: 'Bağlantılar · Marul AI resmi hesapları',
    description:
      'Marul AI resmi bağlantıları: web uygulaması, Google Play üzerindeki Android uygulaması ve doğrulanmış sosyal medya hesapları.',
    priority: '0.5',
    changefreq: 'monthly',
    breadcrumb: 'Bağlantılar',
  },
  {
    path: '/sartlar',
    file: 'sartlar.html',
    title: 'Kullanım şartları · Marul AI',
    description: 'Marul AI kullanım şartları, hizmet koşulları ve kullanıcı sorumlulukları.',
    priority: '0.3',
    changefreq: 'yearly',
    breadcrumb: 'Kullanım şartları',
  },
  {
    path: '/kvkk',
    file: 'kvkk.html',
    title: 'KVKK aydınlatma metni · Marul AI',
    description:
      'Marul AI KVKK aydınlatma metni: işlenen kişisel veriler, işleme amaçları, saklama süreleri ve veri sahibi hakları.',
    priority: '0.3',
    changefreq: 'yearly',
    breadcrumb: 'KVKK',
  },
]

export function findSeoRoute(path: string): SeoRoute | undefined {
  return SEO_ROUTES.find((route) => route.path === path)
}

export interface ShellRoute {
  path: string
  file: string
  title: string
}

export const SHELL_ROUTES: ShellRoute[] = [
  { path: '/sohbet', file: 'sohbet.html', title: 'Sohbet · Marul AI' },
  { path: '/forum', file: 'forum.html', title: 'Sosyal · Marul AI' },
  { path: '/giris', file: 'giris.html', title: 'Giriş yap · Marul AI' },
  { path: '/kayit', file: 'kayit.html', title: 'Hesap oluştur · Marul AI' },
]
