import { create } from 'zustand'
import { ApiError, forumApi, type ForumMe } from '@/lib/api'

interface ForumState {
  me: ForumMe | null
  loaded: boolean
  loading: boolean
  loadMe: (force?: boolean) => Promise<ForumMe | null>
  setMe: (me: ForumMe) => void
  reset: () => void
}

export const useForumStore = create<ForumState>((set, get) => ({
  me: null,
  loaded: false,
  loading: false,

  loadMe: async (force = false) => {
    if (get().loading) return get().me
    if (get().loaded && !force) return get().me
    set({ loading: true })
    try {
      const me = await forumApi.me()
      set({ me, loaded: true })
      return me
    } catch (e) {
      if (e instanceof ApiError && e.status === 401) {
        const { useAuthStore } = await import('@/lib/store/auth')
        void useAuthStore.getState().logout()
      }
      return null
    } finally {
      set({ loading: false })
    }
  },

  setMe: (me) => set({ me, loaded: true }),

  reset: () => set({ me: null, loaded: false, loading: false }),
}))
