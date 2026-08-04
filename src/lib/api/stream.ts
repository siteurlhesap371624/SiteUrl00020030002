import { config, STORAGE_KEYS } from '@/lib/config'
import { ApiError } from './client'

export interface StreamEvent {
  event: string
  data: unknown
}

export interface StreamHandlers {
  onEvent?: (event: string, data: any) => void
  onOpen?: () => void
}

function readToken(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEYS.token)
  } catch {
    return null
  }
}

function parseFrame(raw: string): StreamEvent | null {
  let event = 'message'
  const dataLines: string[] = []

  for (const line of raw.split('\n')) {
    if (line.length === 0 || line.startsWith(':')) continue
    const colon = line.indexOf(':')
    const field = colon === -1 ? line : line.slice(0, colon)
    let value = colon === -1 ? '' : line.slice(colon + 1)
    if (value.startsWith(' ')) value = value.slice(1)
    if (field === 'event') event = value
    else if (field === 'data') dataLines.push(value)
  }

  if (dataLines.length === 0) return null
  const payload = dataLines.join('\n')
  try {
    return { event, data: JSON.parse(payload) }
  } catch {
    return { event, data: payload }
  }
}

export async function streamRequest(
  path: string,
  body: unknown,
  handlers: StreamHandlers,
  signal?: AbortSignal,
): Promise<void> {
  const token = readToken()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'text/event-stream',
  }
  if (token) headers.Authorization = `Bearer ${token}`

  let response: Response
  try {
    response = await fetch(`${config.apiBaseUrl}${path}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
      mode: 'cors',
      credentials: 'omit',
      signal,
    })
  } catch (error) {
    if ((error as Error)?.name === 'AbortError') return
    throw new ApiError('Sunucuya ulaşılamıyor. İnternet bağlantınızı kontrol edin.', 0, error)
  }

  if (!response.ok) {
    let payload: unknown = null
    try {
      payload = await response.json()
    } catch {
      payload = null
    }
    const message =
      payload && typeof payload === 'object' && 'error' in payload && typeof (payload as any).error === 'string'
        ? (payload as any).error
        : response.status === 429
          ? 'Çok fazla istek gönderdiniz. Lütfen biraz bekleyin.'
          : 'Sunucu şu anda yanıt vermiyor.'
    throw new ApiError(message, response.status, payload)
  }

  if (!response.body) throw new ApiError('Akış başlatılamadı.', 0, null)

  handlers.onOpen?.()

  const reader = response.body.getReader()
  const decoder = new TextDecoder('utf-8')
  let buffer = ''

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      buffer += decoder.decode(value, { stream: true })

      let boundary = buffer.indexOf('\n\n')
      while (boundary !== -1) {
        const raw = buffer.slice(0, boundary)
        buffer = buffer.slice(boundary + 2)
        boundary = buffer.indexOf('\n\n')
        const frame = parseFrame(raw)
        if (frame) handlers.onEvent?.(frame.event, frame.data)
      }

      if (buffer.length > 2_000_000) {
        buffer = ''
      }
    }
  } catch (error) {
    if ((error as Error)?.name !== 'AbortError') throw error
  } finally {
    try {
      reader.releaseLock()
    } catch {
      void 0
    }
  }
}
