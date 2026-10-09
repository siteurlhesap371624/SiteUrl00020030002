import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { LazyMotion, domAnimation } from 'framer-motion'
import { router } from './router'
import { Toaster } from '@/components/ui/Toaster'
import { useAuthStore } from '@/lib/store/auth'
import { useChatStore } from '@/lib/store/chat'

function cleanupLegacyServiceWorkers() {
  if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return
  navigator.serviceWorker.getRegistrations().then((regs) => {
    for (const reg of regs) {
      reg.unregister().catch(() => undefined)
    }
  }).catch(() => undefined)
  if (typeof caches !== 'undefined') {
    caches.keys().then((names) => {
      for (const n of names) caches.delete(n).catch(() => undefined)
    }).catch(() => undefined)
  }
  navigator.serviceWorker.addEventListener('message', (e) => {
    if (e?.data?.type === 'sw-unregister-reload') {
      window.location.reload()
    }
  })
}

const LEGACY_STORAGE_KEYS = ['bWFydWxfc190b2tlbg==', 'bWFydWxfc191c2Vy', 'guest_left', 'g_chats', 'marulApiUrl']
const LEGACY_COOKIES = ['__mt', '__mu', '_ga', '_gid', '_ga_V0TG9J2D9C']

function cleanupLegacySiteData() {
  try {
    for (const key of LEGACY_STORAGE_KEYS) {
      localStorage.removeItem(key)
      sessionStorage.removeItem(key)
    }
  } catch {
    return
  }
  const host = window.location.hostname
  const domains = ['', `; domain=${host}`, `; domain=.${host.replace(/^www\./, '')}`]
  for (const name of LEGACY_COOKIES) {
    if (!document.cookie.includes(`${name}=`)) continue
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain}`
    }
  }
}

export default function App() {
  const hydrateAuth = useAuthStore((s) => s.hydrate)
  const hydrateChat = useChatStore((s) => s.hydrate)

  useEffect(() => {
    hydrateAuth()
    hydrateChat()
    cleanupLegacyServiceWorkers()
    cleanupLegacySiteData()
  }, [hydrateAuth, hydrateChat])

  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState !== 'visible') return
      const state = useAuthStore.getState()
      if (state.token && !state.legal && !state.isLoading) void state.refresh()
    }
    document.addEventListener('visibilitychange', onVisible)
    return () => document.removeEventListener('visibilitychange', onVisible)
  }, [])

  return (
    <LazyMotion features={domAnimation} strict>
      <RouterProvider router={router} />
      <Toaster />
    </LazyMotion>
  )
}
