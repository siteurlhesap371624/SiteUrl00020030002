import { api } from './client'
import { downloadProtectedFile } from './download'
import { LEGAL_VERSIONS } from '@/content/legal/entity'
import type { LegalState } from './types'

export type ConsentChannel = 'web-register' | 'web-update' | 'web-settings'

export interface ConsentPayload {
  acceptTerms?: true
  termsVersion?: string
  acknowledgeNotice?: true
  privacyVersion?: string
  training?: boolean
  special?: boolean
  consentVersion?: string
  channel?: ConsentChannel
}

export function buildConsent(input: {
  acceptTerms?: boolean
  training?: boolean | null
  special?: boolean | null
  channel?: ConsentChannel
}): ConsentPayload {
  const payload: ConsentPayload = {}
  if (input.channel) payload.channel = input.channel
  if (input.acceptTerms) {
    payload.acceptTerms = true
    payload.termsVersion = LEGAL_VERSIONS.terms
    payload.acknowledgeNotice = true
    payload.privacyVersion = LEGAL_VERSIONS.privacy
  }
  if (typeof input.training === 'boolean') payload.training = input.training
  if (typeof input.special === 'boolean') payload.special = input.special
  if (payload.training !== undefined || payload.special !== undefined) {
    payload.consentVersion = LEGAL_VERSIONS.training
  }
  return payload
}

const REGISTRATION_KEY = 'marul.registration'

export function rememberRegistration(email: string, registrationId: string | undefined) {
  try {
    if (registrationId) sessionStorage.setItem(REGISTRATION_KEY, JSON.stringify({ email, registrationId }))
    else sessionStorage.removeItem(REGISTRATION_KEY)
  } catch {
    return
  }
}

export function registrationIdFor(email: string): string | undefined {
  try {
    const raw = sessionStorage.getItem(REGISTRATION_KEY)
    if (!raw) return undefined
    const parsed = JSON.parse(raw) as { email?: string; registrationId?: string }
    return parsed.email === email && typeof parsed.registrationId === 'string' ? parsed.registrationId : undefined
  } catch {
    return undefined
  }
}

export function forgetRegistration() {
  try {
    sessionStorage.removeItem(REGISTRATION_KEY)
  } catch {
    return
  }
}

export const legalApi = {
  consent: (payload: ConsentPayload) =>
    api.post<{ success: boolean; legal: LegalState }>('/legal/consent', payload),

  exportData: () => downloadProtectedFile('/account/export', 'marul-ai-verilerim.json'),
}
