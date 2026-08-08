import { config, STORAGE_KEYS } from '@/lib/config'
import { ApiError } from './client'

function readToken(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEYS.token)
  } catch {
    return null
  }
}

function filenameFromHeader(header: string | null, fallback: string): string {
  if (!header) return fallback
  const encoded = /filename\*=UTF-8''([^;]+)/i.exec(header)
  if (encoded) {
    try {
      return decodeURIComponent(encoded[1].trim())
    } catch {
      return fallback
    }
  }
  const plain = /filename="?([^";]+)"?/i.exec(header)
  return plain ? plain[1].trim() : fallback
}

export async function downloadProtectedFile(path: string, fallbackName: string): Promise<void> {
  const token = readToken()
  const headers: Record<string, string> = {}
  if (token) headers.Authorization = `Bearer ${token}`

  let response: Response
  try {
    response = await fetch(`${config.apiBaseUrl}${path}`, {
      method: 'GET',
      headers,
      mode: 'cors',
      credentials: 'omit',
    })
  } catch (error) {
    throw new ApiError('Sunucuya ulaşılamıyor. İnternet bağlantınızı kontrol edin.', 0, error)
  }

  if (!response.ok) {
    let message = 'Dosya indirilemedi.'
    try {
      const payload = await response.json()
      if (payload && typeof payload === 'object' && typeof (payload as { error?: unknown }).error === 'string') {
        message = (payload as { error: string }).error
      }
    } catch {
      message = response.status === 404 ? 'Dosya bulunamadı.' : message
    }
    throw new ApiError(message, response.status, null)
  }

  const blob = await response.blob()
  const name = filenameFromHeader(response.headers.get('content-disposition'), fallbackName)
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = name
  anchor.rel = 'noopener'
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  setTimeout(() => URL.revokeObjectURL(url), 4000)
}
