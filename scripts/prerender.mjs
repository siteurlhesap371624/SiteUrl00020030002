import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { pathToFileURL } from 'node:url'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const distDir = resolve(scriptDir, '..', 'dist')
const ssrEntry = resolve(scriptDir, '..', 'dist-ssr', 'entry-prerender.js')
const indexPath = resolve(distDir, 'index.html')

const ROOT_RE = /<div id="root">[\s\S]*?<\/div>/

function esc(value) {
  return String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function setTag(html, re, value, label) {
  let found = false
  const out = html.replace(re, (...args) => {
    found = true
    if (args.length >= 4 && typeof args[1] === 'string') return `${args[1]}${value}${args[2]}`
    return value
  })
  if (!found) throw new Error(`[prerender] required tag not found: ${label}`)
  return out
}

function applyMeta(html, route, site) {
  const title = esc(route.title)
  const desc = esc(route.description)
  const url = esc(site + route.path)
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

function injectLd(html, blocks) {
  if (!html.includes('</head>')) throw new Error('[prerender] </head> not found')
  const tags = blocks
    .map((block) => `<script type="application/ld+json">${JSON.stringify(block).replace(/</g, '\\u003c')}</script>`)
    .join('\n    ')
  return html.replace('</head>', `    ${tags}\n  </head>`)
}

function injectBody(html, markup, label) {
  if (!ROOT_RE.test(html)) throw new Error(`[prerender] root container not found for ${label}`)
  return html.replace(ROOT_RE, `<div id="root">${markup}</div>`)
}

function buildSitemap(entries, site, lastmod) {
  const body = entries
    .map(
      (u) =>
        `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`,
    )
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
}

function buildLlmsTxt(mod, lastmod) {
  const { SITE_URL, SEO_ROUTES, BASE_DESCRIPTION } = mod
  const lines = [
    '# Marul AI',
    '',
    `> ${BASE_DESCRIPTION}`,
    '',
    `Marul AI, Karakuş Tech adıyla çalışan bağımsız geliştirici Ahmet Karakuş tarafından Türkiye'de geliştirilen Türkçe yapay zeka asistanıdır. Web (${SITE_URL}) ve Google Play üzerindeki Android uygulaması ile kullanılır.`,
    '',
    `Son güncelleme: ${lastmod}`,
    '',
    '## Yedikule dil modeli',
    '',
    '- Türkçe için sıfırdan eğitilmiş, 202,1 milyon parametreli decoder-only Transformer modelidir; başka bir modelin ince ayarı değildir.',
    '- 24,33 milyar Türkçe token ile ön eğitildi, 159.734 örnekle talimat ayarı yapıldı. Bağlam uzunluğu 2.048 token, tokenizer Türkçe için eğitilmiş 48.000 sözcüklü Byte-Level BPE.',
    '- Ağırlıkları Hugging Face üzerinde herkese açıktır (Yedikule Model Lisansı 2.0, açık ağırlıklı; OSI onaylı açık kaynak lisansı değildir).',
    '- [Yedikule 202M Instruct](https://huggingface.co/MarulAI/Yedikule-202M-Instruct): talimat ayarlı sürüm, safetensors.',
    '- [Yedikule 202M Base](https://huggingface.co/MarulAI/Yedikule-202M-Base): temel model, ince ayar için.',
    '- [Yedikule 202M Instruct GGUF](https://huggingface.co/MarulAI/Yedikule-202M-Instruct-GGUF): Ollama ve llama.cpp için GGUF sürümü.',
    '- Güçlü olduğu alanlar: çok turlu Türkçe sohbet, kısa özetleme, kısa olgusal sorular. Zayıf olduğu alanlar: akıl yürütme, matematik, kod üretimi. Araç kullanımı yoktur.',
    '',
    '## Sayfalar',
    '',
    ...SEO_ROUTES.map((route) => `- [${route.title}](${SITE_URL}${route.path}): ${route.description}`),
    '',
    '## İletişim',
    '',
    '- E-posta: marulai.resmi@gmail.com',
    '- Google Play: https://play.google.com/store/apps/details?id=ai.marul.com',
    '- Hugging Face: https://huggingface.co/MarulAI',
    '',
  ]
  return lines.join('\n')
}

async function main() {
  if (!existsSync(indexPath)) {
    console.error('[prerender] dist/index.html not found; run vite build first')
    process.exit(1)
  }
  if (!existsSync(ssrEntry)) {
    console.error('[prerender] dist-ssr/entry-prerender.js not found; run the ssr build first')
    process.exit(1)
  }

  const mod = await import(pathToFileURL(ssrEntry).href)
  const { SEO_ROUTES, SHELL_ROUTES, SITE_URL, renderPath, jsonLdFor } = mod
  const shell = await readFile(indexPath, 'utf8')

  let rendered = 0
  let empty = 0

  for (const route of SEO_ROUTES) {
    let html = applyMeta(shell, route, SITE_URL)
    html = injectLd(html, jsonLdFor(route.path))

    const markup = renderPath(route.path)
    if (markup) {
      html = injectBody(html, markup, route.path)
      rendered++
    } else {
      empty++
      console.warn(`[prerender] no component for ${route.path}, meta only`)
    }

    const target = resolve(distDir, route.file)
    await mkdir(dirname(target), { recursive: true })
    await writeFile(target, html, 'utf8')
  }

  for (const route of SHELL_ROUTES) {
    let html = setTag(shell, /<title>[\s\S]*?<\/title>/, `<title>${esc(route.title)}</title>`, 'shell title')
    html = setTag(html, /(<meta name="robots" content=")[\s\S]*?(")/, 'noindex, follow', 'shell robots')
    html = html.replace(/<link rel="canonical"[\s\S]*?\/>\s*/, '')
    const target = resolve(distDir, route.file)
    await mkdir(dirname(target), { recursive: true })
    await writeFile(target, html, 'utf8')
  }

  let notFound = shell.replace(/<link rel="canonical"[\s\S]*?\/>\s*/, '')
  notFound = setTag(
    notFound,
    /(<meta name="robots" content=")[\s\S]*?(")/,
    'noindex, follow',
    '404 robots',
  )
  await writeFile(resolve(distDir, '404.html'), notFound, 'utf8')

  const lastmod = new Date().toISOString().slice(0, 10)
  const sitemapEntries = SEO_ROUTES.map((route) => ({
    loc: SITE_URL + route.path,
    changefreq: route.changefreq,
    priority: route.priority,
  }))
  sitemapEntries.push({ loc: `${SITE_URL}/gizlilik.html`, changefreq: 'yearly', priority: '0.3' })
  await writeFile(resolve(distDir, 'sitemap.xml'), buildSitemap(sitemapEntries, SITE_URL, lastmod), 'utf8')
  await writeFile(resolve(distDir, 'llms.txt'), buildLlmsTxt(mod, lastmod), 'utf8')

  console.log(`[prerender] ${rendered} sayfa icerikle, ${empty} sayfa yalniz meta ile uretildi; sitemap.xml ve llms.txt yazildi`)
}

main().catch((err) => {
  console.error('[prerender] failed:', err)
  process.exit(1)
})
