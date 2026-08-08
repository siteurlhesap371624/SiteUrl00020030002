import { memo, useMemo, useState, type ReactNode, type ReactElement } from 'react'
import hljs from 'highlight.js/lib/core'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import python from 'highlight.js/lib/languages/python'
import bash from 'highlight.js/lib/languages/bash'
import json from 'highlight.js/lib/languages/json'
import xml from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'
import sql from 'highlight.js/lib/languages/sql'
import java from 'highlight.js/lib/languages/java'
import kotlin from 'highlight.js/lib/languages/kotlin'
import go from 'highlight.js/lib/languages/go'
import rust from 'highlight.js/lib/languages/rust'
import cpp from 'highlight.js/lib/languages/cpp'
import markdown from 'highlight.js/lib/languages/markdown'
import 'highlight.js/styles/github-dark.css'
import { Check, Copy } from 'lucide-react'
import { copyToClipboard } from '@/lib/utils'

const HIGHLIGHT_LANGUAGES = {
  javascript,
  js: javascript,
  typescript,
  ts: typescript,
  python,
  py: python,
  bash,
  sh: bash,
  shell: bash,
  json,
  xml,
  html: xml,
  css,
  sql,
  java,
  kotlin,
  kt: kotlin,
  go,
  rust,
  rs: rust,
  cpp,
  'c++': cpp,
  c: cpp,
  markdown,
  md: markdown,
}

let languagesRegistered = false

function ensureLanguages() {
  if (languagesRegistered) return
  for (const [name, definition] of Object.entries(HIGHLIGHT_LANGUAGES)) {
    if (!hljs.getLanguage(name)) hljs.registerLanguage(name, definition)
  }
  languagesRegistered = true
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export function RawFileView({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false)

  const html = useMemo(() => {
    ensureLanguages()
    if (language && hljs.getLanguage(language)) {
      try {
        return hljs.highlight(code, { language, ignoreIllegals: true }).value
      } catch {
        return escapeHtml(code)
      }
    }
    return escapeHtml(code)
  }, [code, language])

  const handleCopy = async () => {
    const ok = await copyToClipboard(code)
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between border-b border-[color:var(--color-border)] bg-[color:var(--color-surface-2)] px-3 py-1.5">
        <span className="font-mono text-[11px] uppercase tracking-wider text-fg-dim">{language || 'text'}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[11.5px] text-fg-muted transition-colors hover:bg-white/[0.05] hover:text-fg"
          aria-label="Dosya içeriğini kopyala"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? 'Kopyalandı' : 'Kopyala'}
        </button>
      </div>
      <pre className="!my-0 max-h-[380px] overflow-auto !rounded-none bg-[color:var(--color-code-bg,#0d1117)] px-3 py-2.5">
        <code
          className="hljs !bg-transparent !p-0 text-[12px] leading-relaxed"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </pre>
    </div>
  )
}

function CodeBlock({ children, className }: { children?: ReactNode; className?: string }) {
  const [copied, setCopied] = useState(false)
  const lang = (className ?? '').replace('language-', '') || 'text'
  const text = String(children ?? '')

  const handleCopy = async () => {
    const ok = await copyToClipboard(text)
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    }
  }

  return (
    <div className="group relative">
      <div className="flex items-center justify-between rounded-t-[12px] border border-b-0 border-[color:var(--color-border)] bg-[color:var(--color-surface-2)] px-3 py-1.5">
        <span className="font-mono text-[11px] uppercase tracking-wider text-fg-dim">{lang}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[11.5px] text-fg-muted hover:text-fg hover:bg-white/[0.05] transition-colors"
          aria-label="Kodu kopyala"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? 'Kopyalandı' : 'Kopyala'}
        </button>
      </div>
      <pre className="!mt-0 !rounded-t-none">
        <code className={className}>{children}</code>
      </pre>
    </div>
  )
}

interface MarkdownProps {
  content: string
}

function MarkdownInner({ content }: MarkdownProps) {
  return (
    <div className="markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          [
            rehypeHighlight,
            { detect: true, ignoreMissing: true, languages: HIGHLIGHT_LANGUAGES },
          ],
        ]}
        components={{
          a: ({ children, ...props }) => (
            <a {...props} target="_blank" rel="noopener noreferrer nofollow">
              {children}
            </a>
          ),
          img: ({ src, alt }) => {
            const s = typeof src === 'string' ? src : ''
            if (!s) return null
            const isData = s.startsWith('data:image/')
            let sameOrigin = false
            try {
              if (typeof window !== 'undefined') {
                sameOrigin = new URL(s, window.location.href).origin === window.location.origin
              }
            } catch {
              sameOrigin = false
            }
            const allowed = isData || sameOrigin || s.startsWith('https://marulai.com.tr/')
            if (!allowed) {
              return (
                <a href={s} target="_blank" rel="noopener noreferrer nofollow">
                  {alt || 'görsel'}
                </a>
              )
            }
            return (
              <img
                src={s}
                alt={alt || ''}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="rounded-lg"
              />
            )
          },
          pre: ({ children, ...props }) => {
            const child = children as ReactElement<{ className?: string; children?: ReactNode }> | undefined
            const cls = child?.props?.className
            if (cls && typeof cls === 'string' && cls.startsWith('language-')) {
              return <CodeBlock className={cls}>{child?.props?.children}</CodeBlock>
            }
            return <pre {...props}>{children}</pre>
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

export const Markdown = memo(MarkdownInner)
