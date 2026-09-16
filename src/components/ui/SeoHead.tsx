import { useEffect } from 'react'
import { BASE_DESCRIPTION, BASE_TITLE, SITE_URL, findSeoRoute } from '@/seo/site'

interface SeoHeadProps {
  title?: string
  description?: string
  path?: string
  image?: string
  noindex?: boolean
}

function setMeta(selector: string, attr: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    const [keyAttr, keyVal] = selector.replace(/[[\]"']/g, '').split('=')
    if (keyAttr && keyVal) el.setAttribute(keyAttr, keyVal)
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function SeoHead({ title, description, path, image, noindex }: SeoHeadProps) {
  useEffect(() => {
    const route = path ? findSeoRoute(path) : undefined
    const fullTitle = route?.title ?? (title ? `${title} · Marul AI` : BASE_TITLE)
    const desc = route?.description ?? description ?? BASE_DESCRIPTION
    const url = `${SITE_URL}${path ?? ''}`
    const img = image ?? `${SITE_URL}/og.png`

    document.title = fullTitle
    setMeta('meta[name="description"]', 'content', desc)
    setMeta('meta[property="og:title"]', 'content', fullTitle)
    setMeta('meta[property="og:description"]', 'content', desc)
    setMeta('meta[property="og:url"]', 'content', url)
    setMeta('meta[property="og:image"]', 'content', img)
    setMeta('meta[name="twitter:title"]', 'content', fullTitle)
    setMeta('meta[name="twitter:description"]', 'content', desc)
    setMeta('meta[name="twitter:image"]', 'content', img)
    setLink('canonical', url)

    setMeta(
      'meta[name="robots"]',
      'content',
      noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    )
  }, [title, description, path, image, noindex])

  return null
}
