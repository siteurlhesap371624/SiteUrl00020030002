import { FAQ_ITEMS } from '@/content/faq'
import { YEDIKULE, YEDIKULE_REPOS } from '@/content/yedikule'
import { TURKISH_MODELS } from '@/content/turkishModels'
import {
  BASE_DESCRIPTION,
  CONTACT_EMAIL,
  HUGGINGFACE_URL,
  PLAY_STORE_URL,
  PUBLISHER,
  SEO_ROUTES,
  SITE_NAME,
  SITE_URL,
  SOCIAL_PROFILES,
  findSeoRoute,
} from './site'

type Json = Record<string, unknown>

const PUBLISHER_ID = `${SITE_URL}/#karakus-tech`
const BRAND_ID = `${SITE_URL}/#marul-ai`
const PERSON_ID = `${SITE_URL}/hakkimizda#ahmet-karakus`
const WEBSITE_ID = `${SITE_URL}/#website`
const APP_ID = `${SITE_URL}/#app`
const MODEL_ID = `${SITE_URL}/modeller/yedikule#model`

export function personLd(): Json {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Ahmet Karakuş',
    url: `${SITE_URL}/hakkimizda`,
    jobTitle: 'Yapay zeka geliştiricisi',
    description:
      'Marul AI yapay zeka asistanını ve Yedikule Türkçe dil modelini geliştiren bağımsız yazılım geliştiricisi.',
    nationality: { '@type': 'Country', name: 'Türkiye' },
    knowsAbout: [
      'Yapay zeka',
      'Büyük dil modelleri',
      'Türkçe doğal dil işleme',
      'Makine öğrenmesi',
      'Yazılım geliştirme',
    ],
    worksFor: { '@id': PUBLISHER_ID },
    sameAs: [HUGGINGFACE_URL],
  }
}

export function organizationLd(): Json {
  return {
    '@type': 'Organization',
    '@id': PUBLISHER_ID,
    name: PUBLISHER,
    url: `${SITE_URL}/hakkimizda`,
    description:
      'Karakuş Tech, Ahmet Karakuş tarafından yürütülen bağımsız bir yapay zeka geliştirme çalışmasıdır. Marul AI asistanını ve Yedikule Türkçe dil modelini geliştirir.',
    email: CONTACT_EMAIL,
    foundingDate: '2026',
    founder: { '@id': PERSON_ID },
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.png`, width: 256, height: 256 },
    areaServed: { '@type': 'Country', name: 'Türkiye' },
    knowsLanguage: ['tr', 'en'],
    sameAs: SOCIAL_PROFILES,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: CONTACT_EMAIL,
        availableLanguage: ['Turkish', 'English'],
      },
    ],
  }
}

export function brandLd(): Json {
  return {
    '@type': 'Brand',
    '@id': BRAND_ID,
    name: SITE_NAME,
    url: SITE_URL,
    description: BASE_DESCRIPTION,
    logo: `${SITE_URL}/favicon.png`,
    sameAs: SOCIAL_PROFILES,
  }
}

export function websiteLd(): Json {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: 'tr-TR',
    description: BASE_DESCRIPTION,
    publisher: { '@id': PUBLISHER_ID },
    creator: { '@id': PERSON_ID },
  }
}

export function applicationLd(): Json {
  return {
    '@type': 'WebApplication',
    '@id': APP_ID,
    name: SITE_NAME,
    url: SITE_URL,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web, Android',
    browserRequirements: 'JavaScript destekleyen güncel bir tarayıcı gerekir.',
    inLanguage: 'tr-TR',
    description: BASE_DESCRIPTION,
    publisher: { '@id': PUBLISHER_ID },
    creator: { '@id': PERSON_ID },
    brand: { '@id': BRAND_ID },
    installUrl: PLAY_STORE_URL,
    featureList: [
      'Türkçe yapay zeka sohbeti',
      'Yerli dil modeli Yedikule',
      'Açık kaynak Qwen3.6 modeli',
      'Agent modu ile çok adımlı görevler',
      'Web araştırması ve kaynak gösterimi',
      'Sohbet başına dosya çalışma alanı ve indirme',
      'Android uygulaması',
    ],
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'TRY',
      availability: 'https://schema.org/InStock',
      description: 'Ücretsiz plan; Plus, Google Play üzerinden tek seferlik satın alınır.',
    },
  }
}

export function yedikuleModelLd(): Json {
  return {
    '@type': 'CreativeWork',
    '@id': MODEL_ID,
    name: YEDIKULE.fullName,
    alternateName: 'Yedikule 202M Instruct',
    url: `${SITE_URL}/modeller/yedikule`,
    description: YEDIKULE.summary,
    inLanguage: 'tr-TR',
    creator: { '@id': PERSON_ID },
    publisher: { '@id': PUBLISHER_ID },
    license: `${YEDIKULE_REPOS[0].url}/blob/main/LICENSE.md`,
    datePublished: YEDIKULE.weightsPublished,
    keywords: [
      'Türkçe dil modeli',
      'yerli yapay zeka modeli',
      'açık ağırlıklı model',
      'küçük dil modeli',
      'Yedikule',
    ],
    sameAs: YEDIKULE_REPOS.map((repo) => repo.url),
    about: { '@id': BRAND_ID },
  }
}

export function breadcrumbLd(path: string): Json | null {
  const route = findSeoRoute(path)
  if (!route || !route.breadcrumb) return null

  const items = [{ name: 'Ana sayfa', url: `${SITE_URL}/` }]
  const segments = path.split('/').filter(Boolean)
  let current = ''
  for (const segment of segments) {
    current += `/${segment}`
    const match = SEO_ROUTES.find((r) => r.path === current)
    if (match?.breadcrumb) items.push({ name: match.breadcrumb, url: SITE_URL + match.path })
  }

  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function webPageLd(path: string): Json | null {
  const route = findSeoRoute(path)
  if (!route || path === '/') return null
  return {
    '@type': 'WebPage',
    '@id': `${SITE_URL}${route.path}#webpage`,
    url: SITE_URL + route.path,
    name: route.title,
    description: route.description,
    inLanguage: 'tr-TR',
    isPartOf: { '@id': WEBSITE_ID },
    publisher: { '@id': PUBLISHER_ID },
  }
}

export function faqLd(items: { q: string; a: string }[]): Json {
  return {
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/sss#faq`,
    inLanguage: 'tr-TR',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
}

function techArticleLd(path: string, headline: string, lastUpdated: string): Json {
  return {
    '@type': 'TechArticle',
    '@id': `${SITE_URL}${path}#article`,
    headline,
    url: SITE_URL + path,
    inLanguage: 'tr-TR',
    author: { '@id': PERSON_ID },
    publisher: { '@id': PUBLISHER_ID },
    datePublished: '2026-09-17',
    dateModified: lastUpdated,
    isPartOf: { '@id': WEBSITE_ID },
  }
}

function turkishModelsListLd(): Json {
  return {
    '@type': 'ItemList',
    '@id': `${SITE_URL}/turkiye-yapay-zeka-modelleri#liste`,
    name: "Türkiye'de geliştirilen yapay zeka modelleri",
    numberOfItems: TURKISH_MODELS.length,
    itemListElement: TURKISH_MODELS.map((model, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: model.name,
      description: `${model.developer} tarafından geliştirilen ${model.size} parametreli Türkçe model.`,
      ...(model.url ? { url: model.url } : {}),
    })),
  }
}

export function jsonLdFor(path: string, lastUpdated = '2026-09-17'): Json[] {
  const graph: Json[] = [personLd(), organizationLd(), brandLd(), websiteLd()]

  if (path === '/') {
    graph.push(applicationLd(), yedikuleModelLd(), faqLd(FAQ_ITEMS))
  } else {
    const page = webPageLd(path)
    if (page) graph.push(page)
    const crumbs = breadcrumbLd(path)
    if (crumbs) graph.push(crumbs)
    if (path === '/sss') graph.push(faqLd(FAQ_ITEMS))
    if (path === '/fiyatlandirma') graph.push(applicationLd())
    if (path === '/modeller') graph.push(applicationLd(), yedikuleModelLd())
    if (path === '/modeller/yedikule') {
      graph.push(
        yedikuleModelLd(),
        techArticleLd(path, 'Yedikule: Türkçe için sıfırdan eğitilmiş 202 milyon parametreli dil modeli', lastUpdated),
      )
    }
    if (path === '/turkiye-yapay-zeka-modelleri') {
      graph.push(
        techArticleLd(path, "Türkiye'de geliştirilen yapay zeka modelleri", lastUpdated),
        turkishModelsListLd(),
      )
    }
  }

  return [{ '@context': 'https://schema.org', '@graph': graph }]
}
