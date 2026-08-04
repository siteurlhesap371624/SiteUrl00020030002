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

export default function App() {
  const hydrateAuth = useAuthStore((s) => s.hydrate)
  const hydrateChat = useChatStore((s) => s.hydrate)

  useEffect(() => {
    hydrateAuth()
    hydrateChat()
    cleanupLegacyServiceWorkers()
  }, [hydrateAuth, hydrateChat])

  return (
    <LazyMotion features={domAnimation} strict>
      <RouterProvider router={router} />
      <Toaster />
    </LazyMotion>
  )
}
