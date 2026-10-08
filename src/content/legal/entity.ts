export const LEGAL_VERSIONS = {
  terms: '2026-10',
  privacy: '2026-10',
  training: '2026-10',
} as const

export const LEGAL_UPDATED = '8 Ekim 2026'

export const CONTROLLER = {
  person: 'Ahmet Karakuş',
  tradeName: 'Karakuş Tech',
  brand: 'Marul AI',
  website: 'https://marulai.com.tr',
  email: 'marulai.resmi@gmail.com',
  city: 'İstanbul, Türkiye',
  postalAddress: '',
  taxId: '',
  phone: '',
  kep: '',
  serverHosting: 'Türkiye’de bulunan sanal sunucu altyapısı',
  siteHosting: 'GitHub Pages (GitHub, Inc., ABD)',
} as const

export const IMPRINT_ROWS: [string, string][] = [
  ['Hizmet sağlayıcı', `${CONTROLLER.person} (${CONTROLLER.tradeName})`],
  ['Marka', CONTROLLER.brand],
  ...(CONTROLLER.taxId ? ([['Vergi kimlik numarası', CONTROLLER.taxId]] as [string, string][]) : []),
  ['Adres', CONTROLLER.postalAddress || CONTROLLER.city],
  ['E-posta', CONTROLLER.email],
  ...(CONTROLLER.phone ? ([['Telefon', CONTROLLER.phone]] as [string, string][]) : []),
  ...(CONTROLLER.kep ? ([['KEP adresi', CONTROLLER.kep]] as [string, string][]) : []),
  ['Uygulama sunucusu', CONTROLLER.serverHosting],
  ['İnternet sitesinin barındırıldığı yer', CONTROLLER.siteHosting],
]

export const CONTROLLER_LINE = `${CONTROLLER.person} (${CONTROLLER.tradeName} adıyla faaliyet gösteren, ${CONTROLLER.brand} hizmetinin sahibi ve işleteni)`

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
