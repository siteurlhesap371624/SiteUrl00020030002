import { Outlet, ScrollRestoration } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { ConsentGate } from '@/components/legal/ConsentGate'

export function MainLayout() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ConsentGate />
      <ScrollRestoration />
    </div>
  )
}
