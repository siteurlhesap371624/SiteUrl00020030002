import { Outlet, ScrollRestoration } from 'react-router-dom'
import { ConsentGate } from '@/components/legal/ConsentGate'

export function BlankLayout() {
  return (
    <div className="min-h-[100dvh] bg-[color:var(--color-bg)]">
      <Outlet />
      <ConsentGate />
      <ScrollRestoration />
    </div>
  )
}
