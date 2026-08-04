import { create } from 'zustand'

type ToastVariant = 'default' | 'success' | 'error' | 'warn'

interface Toast {
  id: string
  message: string
  variant: ToastVariant
  duration: number
}

interface UIState {
  sidebarOpen: boolean
  sidebarCollapsed: boolean
  toasts: Toast[]
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void
  setSidebarCollapsed: (collapsed: boolean) => void
  toggleSidebarCollapsed: () => void
  toast: (message: string, opts?: { variant?: ToastVariant; duration?: number }) => string
  dismissToast: (id: string) => void
}

const COLLAPSE_KEY = 'marul.ui.sidebarCollapsed'

function readCollapsed(): boolean {
  try {
    return localStorage.getItem(COLLAPSE_KEY) === '1'
  } catch {
    return false
  }
}

function writeCollapsed(v: boolean) {
  try {
    localStorage.setItem(COLLAPSE_KEY, v ? '1' : '0')
  } catch {
    return
  }
}

let toastSeq = 0

export const useUIStore = create<UIState>((set, get) => ({
  sidebarOpen: false,
  sidebarCollapsed: typeof window !== 'undefined' ? readCollapsed() : false,
  toasts: [],

  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarCollapsed: (collapsed) => {
    writeCollapsed(collapsed)
    set({ sidebarCollapsed: collapsed })
  },
  toggleSidebarCollapsed: () => {
    const next = !get().sidebarCollapsed
    writeCollapsed(next)
    set({ sidebarCollapsed: next })
  },

  toast: (message, opts) => {
    const id = `t_${Date.now()}_${++toastSeq}`
    const t: Toast = {
      id,
      message,
      variant: opts?.variant ?? 'default',
      duration: opts?.duration ?? 4200,
    }
    set((s) => ({ toasts: [...s.toasts, t] }))
    if (t.duration > 0) {
      setTimeout(() => get().dismissToast(id), t.duration)
    }
    return id
  },

  dismissToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}))

export type { Toast, ToastVariant }
