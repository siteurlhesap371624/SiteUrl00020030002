export interface AuthUser {
  id: number
  email: string
  name: string
  avatarUrl?: string | null
}

export interface AuthResponse {
  token: string
  user: AuthUser
}

export interface SessionResponse {
  valid: boolean
  isGuest?: boolean
  user?: AuthUser
  isPremium?: boolean
  subscriptionEndDate?: string | null
}

export interface ChatSummary {
  id: number
  user_id: number
  title: string
  created_at: string
  updated_at: string
  message_count?: number
}

export interface TokenUsage {
  inputTokens: number
  outputTokens: number
  totalTokens: number
  contextUsed?: number | null
  contextMax?: number | null
}

export interface AgentSource {
  index: number
  url: string
  title: string
  domain: string
  snippet?: string
}

export interface AgentArtifact {
  path: string
  size: number
  kind?: string
}

export type AgentFileStatus = 'writing' | 'done' | 'error'

export interface AgentFile {
  id: string
  path: string
  content: string
  status: AgentFileStatus
  mode: 'write' | 'append'
  size?: number
  error?: string | null
}

export type AgentStepStatus = 'running' | 'done' | 'error'

export interface AgentStep {
  id: string
  name: string
  label: string
  status: AgentStepStatus
  summary?: string
  durationMs?: number
}

export interface ChatMessage {
  id?: number
  chat_id?: number
  role: 'user' | 'assistant' | 'system'
  content: string
  created_at?: string
  usage?: TokenUsage | null
  model?: 'yedikule' | 'qwen'
  reasoning?: string
  streaming?: boolean
  sources?: AgentSource[]
  artifacts?: AgentArtifact[]
  files?: AgentFile[]
  steps?: AgentStep[]
  agentMode?: 'agent' | 'deep_research' | null
  stopReason?: string
  elapsedMs?: number
}

export interface WorkspaceFile {
  path: string
  size: number
  modifiedAt: string
}

export interface WorkspaceListing {
  files: WorkspaceFile[]
  count: number
  bytes: number
  diskBytes?: number
  limits: { maxChatBytes: number; maxChatFiles: number; maxFileBytes: number }
}

export interface SkillInfo {
  name: string
  title: string
  description: string
  whenToUse: string
  command: string
  mode: string
  icon: string
  examples: string[]
}

export interface ChatStats {
  messageCount: number
  isLocked: boolean
  limit: number
}

export interface SendChatPayload {
  chatId: number | 'new' | null
  message: string
  model: 'yedikule' | 'qwen'
  mode: 'fast' | 'thinking'
}

export interface SendChatResponse {
  response: string
  chatId: number
  isNewChat: boolean
  newTitle: string | null
  usage?: TokenUsage | null
}

export interface GuestChatResponse {
  response: string
  usage?: TokenUsage | null
}

export interface GuestChatPayload {
  message: string
  model: 'yedikule' | 'qwen'
  mode: 'fast' | 'thinking'
  history?: { role: 'user' | 'assistant' | 'system'; content: string }[]
}

export interface PersonalizationResponse {
  systemPrompt: string
  createdAt?: string
  updatedAt?: string
}

export interface SubscriptionResponse {
  isSubscribed: boolean
  plan: 'free' | 'plus'
  endDate: string | null
  autoRenew: boolean
  messageCount: number
  limit: number
}

export interface VerifyGateResponse {
  success: boolean
  gateToken: string
}

export interface EmailCodeResponse {
  success: boolean
  expiresInSeconds: number
}

export interface GoogleAuthUrlResponse {
  url: string
  state: string
}

export type ForumCategory = 'genel' | 'sorun' | 'oneri' | 'duyuru'

export interface ForumAuthor {
  username: string
  verified: boolean
}

export interface ForumMe {
  hasProfile: boolean
  username: string | null
  isBanned: boolean
  banReason: string | null
  acceptedRules: boolean
  isAdmin: boolean
}

export interface ForumPostSummary {
  id: number
  title: string
  excerpt: string
  category: ForumCategory
  imageId: number | null
  isPinned: boolean
  createdAt: string
  updatedAt?: string
  author: ForumAuthor
  likeCount: number
  replyCount: number
  likedByMe: boolean
  isMine: boolean
}

export interface ForumPostDetail {
  id: number
  title: string
  body: string
  category: ForumCategory
  imageId: number | null
  isPinned: boolean
  createdAt: string
  updatedAt?: string
  author: ForumAuthor
  likeCount: number
  replyCount: number
  likedByMe: boolean
  isMine: boolean
}

export interface ForumReply {
  id: number
  body: string
  createdAt: string
  author: ForumAuthor
  likeCount: number
  likedByMe: boolean
  isMine: boolean
}

export interface ForumFeedResponse {
  pinned: ForumPostSummary[]
  posts: ForumPostSummary[]
  nextCursor: number | null
}

export interface ForumPostResponse {
  post: ForumPostDetail
  replies: ForumReply[]
  replyCursor: number | null
  hasMoreReplies: boolean
}

export interface ForumRepliesResponse {
  replies: ForumReply[]
  replyCursor: number | null
  hasMoreReplies: boolean
}

export interface ForumCreatePostResponse {
  post: ForumPostDetail
}

export interface ForumCreateReplyResponse {
  reply: ForumReply
}

export interface ForumLikeResponse {
  liked: boolean
  likeCount: number
}

export interface ForumProfileResponse {
  success: boolean
  username: string
  alreadyExists?: boolean
}

export interface ForumUploadResponse {
  id: number
}
