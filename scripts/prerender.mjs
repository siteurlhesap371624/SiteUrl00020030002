import { readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const distDir = resolve(scriptDir, '..', 'dist')
const indexPath = resolve(distDir, 'index.html')

const SITE = 'https://marulai.com.tr'
const BASE_DESC =
  'Marul AI; Türkçe konuşan, hızlı, güvenli ve özel olarak geliştirilmiş bir yapay zeka asistanıdır.'

const ROUTES = [
  {
    file: 'modeller.html',
    path: '/modeller',
    title: 'Modeller · Marul AI',
    desc: 'Yedikule ve Llama 3 modellerinin teknik özellikleri ve kullanım alanları.',
  },
  {
    file: 'fiyatlandirma.html',
    path: '/fiyatlandirma',
    title: 'Fiyatlandırma · Marul AI',
    desc: 'Marul AI ücretsiz, ücretsiz hesap ve Plus aboneliği planlarının karşılaştırması.',
  },
  {
    file: 'hakkimizda.html',
    path: '/hakkimizda',
    title: 'Hakkımızda · Marul AI',
    desc: 'Marul AI hakkında · Karakuş Tech tarafından geliştirilen yerli yapay zeka asistanı.',
  },
  {
    file: 'iletisim.html',
    path: '/iletisim',
    title: 'İletişim · Marul AI',
    desc: 'Marul AI ile iletişim kanalları. E-posta, KVKK ve sosyal medya.',
  },
  {
    file: 'baglantilar.html',
    path: '/baglantilar',
    title: 'Bağlantılar · Marul AI',
    desc: 'Marul AI resmi bağlantıları: web, mobil uygulama ve sosyal medya hesapları.',
  },
  {
    file: 'sartlar.html',
    path: '/sartlar',
    title: 'Kullanım şartları · Marul AI',
    desc: 'Marul AI kullanım şartları ve hizmet koşulları.',
  },
  {
    file: 'kvkk.html',
    path: '/kvkk',
    title: 'KVKK aydınlatma metni · Marul AI',
    desc: 'Marul AI KVKK aydınlatma metni ve kişisel verilerin korunması hakkında bilgilendirme.',
  },
]

const SITEMAP_EXTRA = [
  { loc: `${SITE}/`, changefreq: 'weekly', priority: '1.0' },
  { loc: `${SITE}/gizlilik.html`, changefreq: 'yearly', priority: '0.4' },
]

const WEBSITE_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Marul AI',
  url: SITE,
  inLanguage: 'tr-TR',
  publisher: { '@type': 'Organization', name: 'Karakuş Tech' },
}

function esc(value) {
  return String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function setTag(html, re, value, label, required = true) {
  let found = false
  const out = html.replace(re, (...args) => {
    found = true
    if (args.length >= 4 && typeof args[1] === 'string') return `${args[1]}${value}${args[2]}`
    return value
  })
  if (required && !found) throw new Error(`[prerender] required tag not found: ${label}`)
  return out
}

function applyMeta(html, route) {
  const title = esc(route.title)
  const desc = esc(route.desc)
  const url = esc(SITE + route.path)
  let out = html
  out = setTag(out, /<title>[\s\S]*?<\/title>/, `<title>${title}</title>`, 'title')
  out = setTag(out, /(<meta name="description" content=")[\s\S]*?(")/, desc, 'meta description')
  out = setTag(out, /(<meta property="og:title" content=")[\s\S]*?(")/, title, 'og:title')
  out = setTag(out, /(<meta property="og:description" content=")[\s\S]*?(")/, desc, 'og:description')
  out = setTag(out, /(<meta property="og:url" content=")[\s\S]*?(")/, url, 'og:url')
  out = setTag(out, /(<meta name="twitter:title" content=")[\s\S]*?(")/, title, 'twitter:title')
  out = setTag(out, /(<meta name="twitter:description" content=")[\s\S]*?(")/, desc, 'twitter:description')
  out = setTag(out, /(<link rel="canonical" href=")[\s\S]*?(")/, url, 'canonical')
  return out
}

function injectLd(html, obj) {
  const tag = `<script type="application/ld+json">${JSON.stringify(obj)}</script>`
  if (!html.includes('</head>')) throw new Error('[prerender] </head> not found')
  return html.replace('</head>', `    ${tag}\n  </head>`)
}

function buildSitemap(lastmod) {
  const urls = [
    ...SITEMAP_EXTRA.slice(0, 1),
    ...ROUTES.map((r) => ({ loc: SITE + r.path, changefreq: 'monthly', priority: '0.7' })),
    ...SITEMAP_EXTRA.slice(1),
  ]
  const body = urls
    .map(
      (u) =>
        `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`,
    )
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
}

async function main() {
  if (!existsSync(indexPath)) {
    console.error('[prerender] dist/index.html not found; run vite build first')
    process.exit(1)
  }
  const raw = await readFile(indexPath, 'utf8')
  const siteBase = injectLd(raw, WEBSITE_LD)

  await writeFile(indexPath, siteBase, 'utf8')

  let count = 0
  for (const route of ROUTES) {
    await writeFile(resolve(distDir, route.file), applyMeta(siteBase, route), 'utf8')
    count++
  }

  let notFound = siteBase.replace(/<link rel="canonical"[\s\S]*?\/>\s*/, '')
  notFound = notFound.replace('</head>', '    <meta name="robots" content="noindex" />\n  </head>')
  await writeFile(resolve(distDir, '404.html'), notFound, 'utf8')

  const lastmod = new Date().toISOString().slice(0, 10)
  await writeFile(resolve(distDir, 'sitemap.xml'), buildSitemap(lastmod), 'utf8')

  console.log(`[prerender] generated ${count} route pages + 404.html + sitemap.xml`)
}

main().catch((err) => {
  console.error('[prerender] failed:', err)
  process.exit(1)
})
