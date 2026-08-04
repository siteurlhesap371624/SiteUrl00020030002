import { create } from 'zustand'
import { STORAGE_KEYS } from '@/lib/config'
import { authApi, type AuthUser } from '@/lib/api'
import { safeJsonParse } from '@/lib/utils'
import { useForumStore } from '@/lib/store/forum'

interface AuthState {
  user: AuthUser | null
  token: string | null
  isPremium: boolean
  isHydrated: boolean
  isLoading: boolean

  hydrate: () => void
  setSession: (token: string, user: AuthUser, isPremium?: boolean) => void
  refresh: () => Promise<void>
  logout: () => Promise<void>
}

function persist(token: string | null, user: AuthUser | null) {
  try {
    if (token) localStorage.setItem(STORAGE_KEYS.token, token)
    else localStorage.removeItem(STORAGE_KEYS.token)

    if (user) localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user))
    else localStorage.removeItem(STORAGE_KEYS.user)
  } catch {
    return
  }
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isPremium: false,
  isHydrated: false,
  isLoading: false,

  hydrate: () => {
    if (get().isHydrated) return
    try {
      const token = localStorage.getItem(STORAGE_KEYS.token)
      const userJson = localStorage.getItem(STORAGE_KEYS.user)
      const user = safeJsonParse<AuthUser | null>(userJson, null)
      set({ token, user, isHydrated: true })
      if (token) {
        void get().refresh()
      }
    } catch {
      set({ isHydrated: true })
    }
  },

  setSession: (token, user, isPremium = false) => {
    persist(token, user)
    set({ token, user, isPremium })
  },

  refresh: async () => {
    if (get().isLoading) return
    set({ isLoading: true })
    try {
      const res = await authApi.verifySession()
      if (!res.valid) {
        persist(null, null)
        set({ token: null, user: null, isPremium: false })
        useForumStore.getState().reset()
      } else if (res.user) {
        const merged = { ...(get().user ?? {}), ...res.user } as AuthUser
        persist(get().token, merged)
        set({ user: merged, isPremium: !!res.isPremium })
      }
    } catch {
      return
    } finally {
      set({ isLoading: false })
    }
  },

  logout: async () => {
    await authApi.logout()
    persist(null, null)
    set({ token: null, user: null, isPremium: false })
    useForumStore.getState().reset()
    const { useChatStore } = await import('@/lib/store/chat')
    useChatStore.getState().resetSession()
  },
}))
