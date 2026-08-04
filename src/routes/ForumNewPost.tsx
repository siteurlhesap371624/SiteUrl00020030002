import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { ArrowLeft, ImagePlus, Loader2, X } from 'lucide-react'
import { SeoHead } from '@/components/ui/SeoHead'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { MarkdownEditor } from '@/components/forum/MarkdownEditor'
import { useAuthStore } from '@/lib/store/auth'
import { useForumStore } from '@/lib/store/forum'
import { useUIStore } from '@/lib/store/ui'
import { ApiError, forumApi, type ForumCategory } from '@/lib/api'
import { FORUM_CATEGORIES, FORUM_PREVIEW } from '@/lib/config'
import { PREVIEW_ME } from '@/lib/forumPreview'
import { cn } from '@/lib/utils'

const TITLE_MAX = 140
const BODY_MAX = 12000
const MAX_DATA_URL = 1_050_000
const MAX_INPUT_BYTES = 15 * 1024 * 1024
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif']

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(img)
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Görsel okunamadı'))
    }
    img.src = url
  })
}

async function compressImage(file: File): Promise<string> {
  const img = await loadImage(file)
  const maxDim = 1600
  let width = img.naturalWidth || img.width
  let height = img.naturalHeight || img.height
  if (!width || !height) throw new Error('Görsel boyutu okunamadı')
  if (width > maxDim || height > maxDim) {
    const scale = Math.min(maxDim / width, maxDim / height)
    width = Math.round(width * scale)
    height = Math.round(height * scale)
  }
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Görsel işlenemedi')
  ctx.fillStyle = '#0a0d13'
  ctx.fillRect(0, 0, width, height)
  ctx.drawImage(img, 0, 0, width, height)
  let quality = 0.85
  let dataUrl = canvas.toDataURL('image/jpeg', quality)
  while (dataUrl.length > MAX_DATA_URL && quality > 0.4) {
    quality -= 0.12
    dataUrl = canvas.toDataURL('image/jpeg', quality)
  }
  if (dataUrl.length > MAX_DATA_URL) throw new Error('Görsel çok büyük, daha küçük bir görsel deneyin')
  return dataUrl
}

export default function ForumNewPost() {
  const authHydrated = useAuthStore((s) => s.isHydrated)
  const user = useAuthStore((s) => s.user)
  const me = useForumStore((s) => s.me)
  const loadMe = useForumStore((s) => s.loadMe)
  const setMe = useForumStore((s) => s.setMe)
  const toast = useUIStore((s) => s.toast)
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [category, setCategory] = useState<ForumCategory>('genel')
  const [pin, setPin] = useState(false)
  const [imageId, setImageId] = useState<number | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const fileRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (FORUM_PREVIEW) {
      setMe(PREVIEW_ME)
      return
    }
    if (authHydrated && user) void loadMe(true)
  }, [authHydrated, user, loadMe, setMe])

  const isAdmin = !!me?.isAdmin
  const categories = FORUM_CATEGORIES.filter((c) => !c.adminOnly || isAdmin)

  const onPickFile = async (file: File | undefined) => {
    if (!file) return
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast('Yalnızca PNG, JPEG, WebP veya GIF yükleyebilirsiniz.', { variant: 'warn' })
      return
    }
    if (file.size > MAX_INPUT_BYTES) {
      toast('Görsel çok büyük. En fazla 15 MB seçin.', { variant: 'warn' })
      return
    }
    if (FORUM_PREVIEW) {
      setUploading(true)
      try {
        const dataUrl = await compressImage(file)
        setImagePreview(dataUrl)
        setImageId(1)
      } catch (e) {
        toast(e instanceof Error ? e.message : 'Görsel yüklenemedi', { variant: 'error' })
      } finally {
        setUploading(false)
        if (fileRef.current) fileRef.current.value = ''
      }
      return
    }
    setUploading(true)
    try {
      const dataUrl = await compressImage(file)
      const res = await forumApi.upload(dataUrl)
      setImageId(res.id)
      setImagePreview(dataUrl)
    } catch (e) {
      toast(e instanceof ApiError ? e.message : e instanceof Error ? e.message : 'Görsel yüklenemedi', {
        variant: 'error',
      })
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const submit = async () => {
    const t = title.trim()
    const b = body.trim()
    if (t.length < 3) {
      toast('Başlık en az 3 karakter olmalı.', { variant: 'warn' })
      return
    }
    if (b.length < 2) {
      toast('İçerik boş olamaz.', { variant: 'warn' })
      return
    }
    if (FORUM_PREVIEW) {
      toast('Önizleme modu: gönderi kaydedilmedi.', { variant: 'default' })
      navigate('/forum')
      return
    }
    setSubmitting(true)
    try {
      const res = await forumApi.createPost({
        title: t,
        body: b,
        category,
        imageId: imageId ?? undefined,
        pin: isAdmin ? pin : undefined,
      })
      toast('Gönderiniz yayınlandı.', { variant: 'success' })
      navigate(`/forum/${res.post.id}`)
    } catch (e) {
      toast(e instanceof ApiError ? e.message : 'Gönderi yayınlanamadı', { variant: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  if (!authHydrated) return <CenterLoader />
  if (!user && !FORUM_PREVIEW) return <Navigate to="/giris?redirect=/forum/yeni" replace />
  if (me && !me.hasProfile) return <Navigate to="/forum" replace />
  if (me && me.isBanned) return <Navigate to="/forum" replace />

  return (
    <>
      <SeoHead title="Yeni gönderi" path="/forum/yeni" noindex />
      <section className="container-content py-8 md:py-10">
        <div className="mx-auto max-w-3xl">
          <Link
            to="/forum"
            className="inline-flex items-center gap-1.5 text-[13px] text-fg-muted hover:text-fg transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Sosyal akışa dön
          </Link>

          <h1 className="mt-4 text-[clamp(1.4rem,2.6vw,1.8rem)] font-semibold tracking-[-0.02em] text-fg">
            Yeni gönderi
          </h1>
          <p className="mt-1.5 text-[14px] text-fg-muted">
            Düşüncelerinizi Markdown ile zengin biçimde paylaşın.
          </p>

          <div className="mt-7 flex flex-col gap-5 rounded-[var(--radius-xl)] border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface)] p-5 md:p-7">
            <div>
              <p className="mb-2 text-[13px] font-medium text-fg-muted">Kategori</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCategory(c.id)}
                    className={cn(
                      'rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors',
                      category === c.id
                        ? 'border-[color:var(--color-brand)]/40 bg-[color:var(--color-brand)]/12 text-[color:var(--color-brand-hover)]'
                        : 'border-[color:var(--color-border-strong)] text-fg-muted hover:text-fg hover:border-[color:var(--color-border-bright)]',
                    )}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <Input
              label="Başlık"
              placeholder="Kısa ve açıklayıcı bir başlık"
              maxLength={TITLE_MAX}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              hint={`${title.length} / ${TITLE_MAX}`}
            />

            <div>
              <p className="mb-2 text-[13px] font-medium text-fg-muted">İçerik</p>
              <MarkdownEditor
                value={body}
                onChange={setBody}
                maxLength={BODY_MAX}
                minRows={10}
                placeholder="Düşüncelerinizi yazın. Markdown kullanabilirsiniz."
              />
            </div>

            <div>
              <p className="mb-2 text-[13px] font-medium text-fg-muted">Görsel (isteğe bağlı)</p>
              {imagePreview ? (
                <div className="relative overflow-hidden rounded-[var(--radius-md)] border border-[color:var(--color-border)]">
                  <img src={imagePreview} alt="" className="max-h-80 w-full object-contain bg-[color:var(--color-bg)]" />
                  <button
                    type="button"
                    onClick={() => {
                      setImageId(null)
                      setImagePreview(null)
                    }}
                    className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                    aria-label="Görseli kaldır"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  className="flex w-full flex-col items-center justify-center gap-2 rounded-[var(--radius-md)] border border-dashed border-[color:var(--color-border-strong)] bg-[color:var(--color-surface-2)] px-6 py-8 text-fg-muted transition-colors hover:border-[color:var(--color-border-bright)] hover:text-fg disabled:opacity-60"
                >
                  {uploading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <ImagePlus className="h-5 w-5" />
                  )}
                  <span className="text-[13px]">{uploading ? 'Yükleniyor…' : 'Görsel ekle (JPEG, PNG, WebP, GIF)'}</span>
                  <span className="text-[11.5px] text-fg-dim">En fazla 800 KB; büyük görseller otomatik küçültülür</span>
                </button>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                className="hidden"
                onChange={(e) => onPickFile(e.target.files?.[0])}
              />
            </div>

            {isAdmin ? (
              <label className="flex cursor-pointer items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={pin}
                  onChange={(e) => setPin(e.target.checked)}
                  className="h-4 w-4 accent-[color:var(--color-brand)]"
                />
                <span className="text-[13.5px] text-fg">Bu gönderiyi en üste sabitle</span>
              </label>
            ) : null}

            <div className="flex justify-end gap-3 border-t border-[color:var(--color-border)] pt-5">
              <Link to="/forum">
                <Button variant="outline" disabled={submitting}>
                  Vazgeç
                </Button>
              </Link>
              <Button loading={submitting} disabled={uploading} onClick={submit}>
                Yayınla
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function CenterLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Loader2 className="h-5 w-5 animate-spin text-fg-muted" />
    </div>
  )
}
