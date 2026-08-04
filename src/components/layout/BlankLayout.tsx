import { Outlet, ScrollRestoration } from 'react-router-dom'

export function BlankLayout() {
  return (
    <div className="min-h-[100dvh] bg-[color:var(--color-bg)]">
      <Outlet />
      <ScrollRestoration />
    </div>
  )
}
