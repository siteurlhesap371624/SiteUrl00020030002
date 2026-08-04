import { useEffect } from 'react'

interface SeoHeadProps {
  title?: string
  description?: string
  path?: string
  image?: string
  noindex?: boolean
}

const BASE_TITLE = "Marul AI · Türkiye'nin yapay zeka asistanı"
const BASE_DESC =
  'Marul AI; Türkçe konuşan, hızlı, güvenli ve özel olarak geliştirilmiş bir yapay zeka asistanıdır.'
const SITE = 'https://marulai.com.tr'

function setMeta(selector: string, attr: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    const [keyAttr, keyVal] = selector.replace(/[\[\]"']/g, '').split('=')
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
    const fullTitle = title ? `${title} · Marul AI` : BASE_TITLE
    const desc = description ?? BASE_DESC
    const url = `${SITE}${path ?? ''}`
    const img = image ?? `${SITE}/og.png`

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

    if (noindex) {
      setMeta('meta[name="robots"]', 'content', 'noindex, nofollow')
    } else {
      const robots = document.head.querySelector('meta[name="robots"]')
      if (robots) robots.remove()
    }
  }, [title, description, path, image, noindex])

  return null
}
