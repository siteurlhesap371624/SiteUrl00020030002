import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/globals.css'

if (import.meta.env.PROD) {
  const noop = () => undefined
  for (const k of ['log', 'info', 'debug', 'warn', 'trace', 'dir', 'table'] as const) {
    ;(console as unknown as Record<string, typeof noop>)[k] = noop
  }
}

const root = document.getElementById('root')
if (!root) throw new Error('Root container not found')

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
