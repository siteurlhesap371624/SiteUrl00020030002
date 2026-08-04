import { config, STORAGE_KEYS } from '@/lib/config'

export class ApiError extends Error {
  status: number
  data: unknown

  constructor(message: string, status: number, data?: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

type RequestInitJson = Omit<RequestInit, 'body' | 'headers'> & {
  body?: unknown
  headers?: Record<string, string>
  auth?: boolean
  signal?: AbortSignal
}

function readToken(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEYS.token)
  } catch {
    return null
  }
}

function clearAuthLocal() {
  try {
    localStorage.removeItem(STORAGE_KEYS.token)
    localStorage.removeItem(STORAGE_KEYS.user)
  } catch {
    return
  }
}

export async function request<T = unknown>(
  path: string,
  init: RequestInitJson = {},
): Promise<T> {
  const { body, headers = {}, auth = true, ...rest } = init
  const finalHeaders: Record<string, string> = {
    Accept: 'application/json',
    ...headers,
  }

  if (body !== undefined) {
    finalHeaders['Content-Type'] = 'application/json'
  }

  if (auth) {
    const token = readToken()
    if (token) finalHeaders.Authorization = `Bearer ${token}`
  }

  const url = path.startsWith('http') ? path : `${config.apiBaseUrl}${path}`

  let res: Response
  try {
    res = await fetch(url, {
      ...rest,
      headers: finalHeaders,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      mode: 'cors',
      credentials: 'omit',
    })
  } catch (err) {
    throw new ApiError(
      'Sunucuya ulaşılamıyor. İnternet bağlantınızı kontrol edin.',
      0,
      err,
    )
  }

  const contentType = res.headers.get('content-type') ?? ''
  const isJson = contentType.includes('application/json')
  const payload = isJson ? await res.json().catch(() => null) : await res.text().catch(() => null)

  if (!res.ok) {
    if (res.status === 401 && auth) {
      clearAuthLocal()
    }
    const message =
      (payload && typeof payload === 'object' && 'error' in payload && typeof (payload as { error: unknown }).error === 'string'
        ? (payload as { error: string }).error
        : null) ?? errorMessageForStatus(res.status)
    throw new ApiError(message, res.status, payload)
  }

  return payload as T
}

function errorMessageForStatus(status: number): string {
  switch (status) {
    case 400:
      return 'Geçersiz istek.'
    case 401:
      return 'Oturum geçersiz. Lütfen tekrar giriş yapın.'
    case 403:
      return 'Bu işlem için yetkiniz yok.'
    case 404:
      return 'Kaynak bulunamadı.'
    case 429:
      return 'Çok fazla istek gönderdiniz. Lütfen biraz bekleyin.'
    case 500:
    case 502:
    case 503:
    case 504:
      return 'Sunucu şu anda yanıt vermiyor.'
    default:
      return 'Bir hata oluştu.'
  }
}

export const api = {
  get: <T>(path: string, init?: RequestInitJson) =>
    request<T>(path, { ...init, method: 'GET' }),
  post: <T>(path: string, body?: unknown, init?: RequestInitJson) =>
    request<T>(path, { ...init, method: 'POST', body }),
  put: <T>(path: string, body?: unknown, init?: RequestInitJson) =>
    request<T>(path, { ...init, method: 'PUT', body }),
  del: <T>(path: string, body?: unknown, init?: RequestInitJson) =>
    request<T>(path, { ...init, method: 'DELETE', body }),
}
