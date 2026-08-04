interface AppConfig {
  apiBaseUrl: string
  turnstileSiteKey: string
  playStoreUrl: string
  appPackage: string
  siteUrl: string
  supportEmail: string
  legalEmail: string
  googleClientId: string
  socials: {
    youtube: string
    instagram: string
    twitter: string
  }
}

const env = import.meta.env

export const config: AppConfig = {
  apiBaseUrl:
    (env.VITE_API_BASE_URL as string | undefined) ||
    'https://api.marulai.com.tr',
  turnstileSiteKey:
    (env.VITE_TURNSTILE_SITE_KEY as string | undefined) || '0x4AAAAAACIwky-WL9EDj91G',
  playStoreUrl: 'https://play.google.com/store/apps/details?id=ai.marul.com',
  appPackage: 'ai.marul.com',
  siteUrl: 'https://marulai.com.tr',
  supportEmail: 'marulai.resmi@gmail.com',
  legalEmail: 'marulai.resmi@gmail.com',
  googleClientId:
    (env.VITE_GOOGLE_CLIENT_ID as string | undefined) ||
    '129240134676-qbsjbonjd70mpenmoqd441hipsqps82c.apps.googleusercontent.com',
  socials: {
    youtube: 'https://www.youtube.com/@MarulAI_Resmi',
    instagram: 'https://www.instagram.com/marulai.resmi/',
    twitter: 'https://x.com/Marulai_resmi',
  },
}

export const FORUM_PREVIEW =
  import.meta.env.DEV && (env.VITE_FORUM_PREVIEW as string | undefined) === '1'

export function forumImageUrl(id: number): string {
  return `${config.apiBaseUrl}/forum/image/${id}`
}

export const FORUM_CATEGORIES = [
  { id: 'genel', label: 'Genel', adminOnly: false },
  { id: 'sorun', label: 'Sorun', adminOnly: false },
  { id: 'oneri', label: 'Öneri', adminOnly: false },
  { id: 'duyuru', label: 'Duyuru', adminOnly: true },
] as const

export const STORAGE_KEYS = {
  token: 'marul.auth.token',
  user: 'marul.auth.user',
  guestChats: 'marul.guest.chats',
  guestQuotaLeft: 'marul.guest.left',
  selectedModel: 'marul.chat.model',
  selectedMode: 'marul.chat.mode',
  gateToken: 'marul.gate.token',
} as const

export const LIMITS = {
  guestQuestionsPerSession: 10,
  freeMessagesPerChat: 25,
  personalizationMax: 600,
  composerMaxChars: 8000,
} as const

export const MODELS = [
  {
    id: 'yedikule',
    name: 'Yedikule',
    tagline: 'Yerli model',
    description: 'Yedikule, Türkçe için sıfırdan eğitilmiş yeni nesil kendi modelimiz. Çok turlu sohbet ve bağlam hafızasını destekler.',
    badge: 'Yerli',
  },
  {
    id: 'qwen',
    name: 'Qwen3.6',
    tagline: 'Açık kaynak · 27B',
    description:
      'Apache 2.0 lisanslı, akıl yürüten açık kaynak model. Web araması yapar, çok adımlı görevleri yürütür, dosya ve belge üretir.',
    badge: 'Agent',
  },
] as const

export const LEGACY_MODEL_ALIASES: Record<string, ModelId> = {
  marul: 'yedikule',
  llama: 'qwen',
  'llama-3': 'qwen',
}

export type ModelId = (typeof MODELS)[number]['id']
export type ChatMode = 'fast' | 'thinking'
