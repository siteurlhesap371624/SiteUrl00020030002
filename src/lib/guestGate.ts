import { STORAGE_KEYS } from '@/lib/config'

const GATE_TTL_MS = 23 * 60 * 60 * 1000

export function readGateToken(): string | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.gateToken)
    if (!raw) return null
    const parsed = JSON.parse(raw) as { token?: string; exp?: number }
    if (typeof parsed.token !== 'string' || typeof parsed.exp !== 'number' || parsed.exp < Date.now()) return null
    return parsed.token
  } catch {
    return null
  }
}

export function saveGateToken(token: string) {
  try {
    localStorage.setItem(STORAGE_KEYS.gateToken, JSON.stringify({ token, exp: Date.now() + GATE_TTL_MS }))
  } catch {
    return
  }
}

export function clearGateToken() {
  try {
    localStorage.removeItem(STORAGE_KEYS.gateToken)
  } catch {
    return
  }
}
