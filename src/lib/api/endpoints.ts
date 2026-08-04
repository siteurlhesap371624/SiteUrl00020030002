import { api } from './client'
import { config } from '@/lib/config'
import type {
  AuthResponse,
  SkillInfo,
  WorkspaceListing,
  ChatMessage,
  ChatStats,
  ChatSummary,
  EmailCodeResponse,
  ForumCategory,
  ForumCreatePostResponse,
  ForumCreateReplyResponse,
  ForumFeedResponse,
  ForumLikeResponse,
  ForumMe,
  ForumPostResponse,
  ForumProfileResponse,
  ForumRepliesResponse,
  ForumUploadResponse,
  GoogleAuthUrlResponse,
  GuestChatPayload,
  GuestChatResponse,
  PersonalizationResponse,
  SendChatPayload,
  SendChatResponse,
  SessionResponse,
  SubscriptionResponse,
  VerifyGateResponse,
} from './types'

export const authApi = {
  verifyGate: (turnstileToken: string) =>
    api.post<VerifyGateResponse>('/verify-gate', { token: turnstileToken }, { auth: false }),

  registerStart: (data: { name: string; email: string; password: string; turnstileToken: string }) =>
    api.post<EmailCodeResponse>('/auth/register/start', data, { auth: false }),

  registerVerify: (data: { email: string; code: string }) =>
    api.post<AuthResponse>('/auth/register/verify', data, { auth: false }),

  registerLegacy: (data: { name: string; email: string; password: string; turnstileToken: string }) =>
    api.post<AuthResponse>('/register', data, { auth: false }),

  login: (data: { email: string; password: string; turnstileToken: string }) =>
    api.post<AuthResponse>('/login', data, { auth: false }),

  forgot: (data: { email: string; turnstileToken: string }) =>
    api.post<{ success: boolean }>('/auth/forgot', data, { auth: false }),

  reset: (data: { token: string; password: string }) =>
    api.post<{ success: boolean }>('/auth/reset', data, { auth: false }),

  resendCode: (data: { email: string }) =>
    api.post<EmailCodeResponse>('/auth/resend-code', data, { auth: false }),

  googleStart: () => api.get<GoogleAuthUrlResponse>('/auth/google/url', { auth: false }),

  googleCallback: (data: { code: string; state: string }) =>
    api.post<AuthResponse>('/auth/google/callback', data, { auth: false }),

  verifySession: () => api.get<SessionResponse>('/verify-session'),

  logout: () => api.post<{ success: boolean }>('/auth/logout', {}).catch(() => ({ success: true })),

  deleteAccount: (confirm: string) =>
    api.del<{ success: boolean }>('/auth/account', { confirm }),
}

export const chatApi = {
  list: () => api.get<ChatSummary[]>('/chats'),
  create: (title?: string) => api.post<ChatSummary>('/chats', { title: title ?? 'Yeni Sohbet' }),
  rename: (id: number, title: string) => api.put<{ success: boolean }>(`/chats/${id}`, { title }),
  remove: (id: number) => api.del<{ success: boolean }>(`/chats/${id}`),
  messages: (id: number) => api.get<ChatMessage[]>(`/chats/${id}/messages`),
  stats: (id: number) => api.get<ChatStats>(`/chats/${id}/stats`),

  send: (payload: SendChatPayload) => api.post<SendChatResponse>('/chat', payload),

  guest: (payload: GuestChatPayload) =>
    api.post<GuestChatResponse>('/guest-chat', payload, { auth: false }),
}

export const personalizationApi = {
  get: () => api.get<PersonalizationResponse>('/personalization'),
  save: (systemPrompt: string) =>
    api.put<{ success: boolean }>('/personalization', { systemPrompt }),
  clear: () => api.del<{ success: boolean }>('/personalization'),
}

export const forumApi = {
  me: () => api.get<ForumMe>('/forum/me'),

  createProfile: (data: { username: string; acceptRules: boolean }) =>
    api.post<ForumProfileResponse>('/forum/profile', data),

  feed: (opts?: { category?: ForumCategory | null; cursor?: number | null }) => {
    const params = new URLSearchParams()
    if (opts?.category) params.set('category', opts.category)
    if (opts?.cursor) params.set('cursor', String(opts.cursor))
    const q = params.toString()
    return api.get<ForumFeedResponse>(`/forum/posts${q ? `?${q}` : ''}`)
  },

  post: (id: number) => api.get<ForumPostResponse>(`/forum/posts/${id}`),

  replies: (postId: number, cursor: number) =>
    api.get<ForumRepliesResponse>(`/forum/posts/${postId}/replies?cursor=${cursor}`),

  createPost: (data: {
    title: string
    body: string
    category: ForumCategory
    imageId?: number | null
    pin?: boolean
  }) => api.post<ForumCreatePostResponse>('/forum/posts', data),

  removePost: (id: number) => api.del<{ success: boolean }>(`/forum/posts/${id}`),

  likePost: (id: number) => api.post<ForumLikeResponse>(`/forum/posts/${id}/like`, {}),

  pinPost: (id: number, pinned: boolean) =>
    api.post<{ success: boolean; pinned: boolean }>(`/forum/posts/${id}/pin`, { pinned }),

  createReply: (postId: number, body: string) =>
    api.post<ForumCreateReplyResponse>(`/forum/posts/${postId}/replies`, { body }),

  removeReply: (id: number) => api.del<{ success: boolean }>(`/forum/replies/${id}`),

  likeReply: (id: number) => api.post<ForumLikeResponse>(`/forum/replies/${id}/like`, {}),

  upload: (data: string) => api.post<ForumUploadResponse>('/forum/upload', { data }),

  ban: (data: { username: string; banned: boolean; reason?: string }) =>
    api.post<{ success: boolean; banned: boolean }>('/forum/admin/ban', data),

  reportPost: (id: number, reason: string) =>
    api.post<{ success: boolean }>(`/forum/posts/${id}/report`, { reason }),

  reportReply: (id: number, reason: string) =>
    api.post<{ success: boolean }>(`/forum/replies/${id}/report`, { reason }),
}

export const subscriptionApi = {
  status: (chatId?: number | null) => {
    const q = chatId && chatId !== null ? `?chatId=${chatId}` : ''
    return api.get<SubscriptionResponse>(`/subscription${q}`)
  },
  cancel: () => api.post<{ success: boolean }>('/subscription/cancel', {}),
}

export const workspaceApi = {
  list: (chatId: number) => api.get<WorkspaceListing>(`/workspace/${chatId}`),

  remove: (chatId: number, path: string) =>
    api.del<{ path: string; removed: boolean }>(`/workspace/${chatId}/file?path=${encodeURIComponent(path)}`),

  fileUrl: (chatId: number, path: string) =>
    `${config.apiBaseUrl}/workspace/${chatId}/file?path=${encodeURIComponent(path)}`,

  downloadUrl: (chatId: number) => `${config.apiBaseUrl}/workspace/${chatId}/download`,
}

export const skillsApi = {
  list: () => api.get<{ skills: SkillInfo[] }>('/skills'),
}

export const agentApi = {
  runs: (chatId?: number) =>
    api.get<{ runs: Array<Record<string, unknown>> }>(`/agent/runs${chatId ? `?chatId=${chatId}` : ''}`),
  cancel: (runId: string) => api.post<{ success: boolean }>(`/agent/cancel/${runId}`, {}),
}
