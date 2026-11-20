export const LEGAL_VERSIONS = {
  terms: '2026-11',
  privacy: '2026-11',
  training: '2026-11',
  plus: '2026-11',
} as const

export const LEGAL_UPDATED = '20 Kasım 2026'

export const CONTROLLER = {
  person: 'Ahmet Karakuş',
  tradeName: 'Karakuş Tech',
  brand: 'Marul AI',
  website: 'https://marulai.com.tr',
  email: 'info@marulai.com.tr',
  city: 'İstanbul, Türkiye',
  postalAddress: '',
  taxId: '',
  phone: '',
  kep: '',
  serverHosting: 'Türkiye’de bulunan sanal sunucu altyapısı',
  siteHosting: 'GitHub Pages (GitHub, Inc., ABD)',
} as const

export const IMPRINT_ROWS: [string, string][] = [
  ['Hizmet sağlayıcı', `${CONTROLLER.person} (gerçek kişi)`],
  ['Hizmet ve proje adı', `${CONTROLLER.brand} (${CONTROLLER.tradeName} projesi)`],
  ...(CONTROLLER.taxId ? ([['Vergi kimlik numarası', CONTROLLER.taxId]] as [string, string][]) : []),
  ['Yerleşim yeri', CONTROLLER.postalAddress || CONTROLLER.city],
  ['E-posta', CONTROLLER.email],
  ...(CONTROLLER.phone ? ([['Telefon', CONTROLLER.phone]] as [string, string][]) : []),
  ...(CONTROLLER.kep ? ([['KEP adresi', CONTROLLER.kep]] as [string, string][]) : []),
  ['Uygulama sunucusu', CONTROLLER.serverHosting],
  ['İnternet sitesinin barındırıldığı yer', CONTROLLER.siteHosting],
]

export const CONTROLLER_LINE = `${CONTROLLER.person} (${CONTROLLER.brand} hizmetini ${CONTROLLER.tradeName} proje adıyla geliştiren ve işleten gerçek kişi)`

export const PLUS_OFFER = {
  price: '49,99',
  features: ['Sohbet başına sınırsız mesaj', 'Günde 150 agent görevi', 'Birebir e-posta desteği'],
} as const

export const LEGAL_DOCUMENTS = [
  { path: '/sartlar', short: 'Kullanım koşulları', title: 'Kullanım koşulları' },
  { path: '/gizlilik', short: 'Gizlilik politikası', title: 'Gizlilik politikası' },
  { path: '/kvkk', short: 'KVKK aydınlatma metni', title: 'KVKK aydınlatma metni' },
  { path: '/acik-riza', short: 'Açık rıza metni', title: 'Açık rıza metni' },
  { path: '/cerez-politikasi', short: 'Çerez politikası', title: 'Çerez ve yerel depolama politikası' },
  { path: '/plus-satis-sozlesmesi', short: 'Plus satış sözleşmesi', title: 'Plus ön bilgilendirme formu ve mesafeli satış sözleşmesi' },
] as const

export const LEGAL_PATHS: string[] = LEGAL_DOCUMENTS.map((doc) => doc.path)
