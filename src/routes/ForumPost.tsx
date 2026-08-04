import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Heart, Loader2, Pin, Send } from 'lucide-react'
import { SeoHead } from '@/components/ui/SeoHead'
import { Button } from '@/components/ui/Button'
import { Markdown } from '@/components/chat/Markdown'
import { MarkdownEditor } from '@/components/forum/MarkdownEditor'
import { AuthorLine, CategoryBadge } from '@/components/forum/shared'
import { PostMenu } from '@/components/forum/PostMenu'
import { BanDialog } from '@/components/forum/BanDialog'
import { ConfirmDialog } from '@/components/forum/ConfirmDialog'
import { ReportDialog, type ReportTarget } from '@/components/forum/ReportDialog'
import { useAuthStore } from '@/lib/store/auth'
import { useForumStore } from '@/lib/store/forum'
import { useUIStore } from '@/lib/store/ui'
import { ApiError, forumApi, type ForumPostDetail, type ForumReply } from '@/lib/api'
import { FORUM_PREVIEW, forumImageUrl } from '@/lib/config'
import { PREVIEW_ME, previewDetail } from '@/lib/forumPreview'
import { cn } from '@/lib/utils'

const REPLY_MAX = 4000

export default function ForumPost() {
  const params = useParams()
  const postId = Number(params.id)
  const authHydrated = useAuthStore((s) => s.isHydrated)
  const user = useAuthStore((s) => s.user)
  const me = useForumStore((s) => s.me)
  const loadMe = useForumStore((s) => s.loadMe)
  const setMe = useForumStore((s) => s.setMe)
  const toast = useUIStore((s) => s.toast)
  const navigate = useNavigate()

  const [post, setPost] = useState<ForumPostDetail | null>(null)
  const [replies, setReplies] = useState<ForumReply[]>([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [replyBody, setReplyBody] = useState('')
  const [sending, setSending] = useState(false)
  const [banTarget, setBanTarget] = useState<string | null>(null)
  const [replyCursor, setReplyCursor] = useState<number | null>(null)
  const [hasMoreReplies, setHasMoreReplies] = useState(false)
  const [loadingMoreReplies, setLoadingMoreReplies] = useState(false)
  const [removePostOpen, setRemovePostOpen] = useState(false)
  const [removingPost, setRemovingPost] = useState(false)
  const [removeReplyId, setRemoveReplyId] = useState<number | null>(null)
  const [removingReply, setRemovingReply] = useState(false)
  const [reportTarget, setReportTarget] = useState<ReportTarget | null>(null)
  const postLikePending = useRef(false)
  const replyLikePending = useRef<Set<number>>(new Set())

  const isAdmin = !!me?.isAdmin
  const canInteract = !!me?.hasProfile && !me?.isBanned

  useEffect(() => {
    if (FORUM_PREVIEW) {
      setMe(PREVIEW_ME)
      return
    }
    if (authHydrated && user) void loadMe(true)
  }, [authHydrated, user, loadMe, setMe])

  const load = useCallback(async () => {
    if (!Number.isInteger(postId) || postId <= 0) {
      setNotFound(true)
      setLoading(false)
      return
    }
    if (FORUM_PREVIEW) {
      const d = previewDetail(postId)
      if (d) {
        setPost(d.post)
        setReplies(d.replies)
        setReplyCursor(null)
        setHasMoreReplies(false)
      } else {
        setNotFound(true)
      }
      setLoading(false)
      return
    }
    setLoading(true)
    try {
      const res = await forumApi.post(postId)
      setPost(res.post)
      setReplies(res.replies)
      setReplyCursor(res.replyCursor)
      setHasMoreReplies(res.hasMoreReplies)
    } catch (e) {
      if (e instanceof ApiError && e.status === 404) setNotFound(true)
      else toast(e instanceof ApiError ? e.message : 'Gönderi yüklenemedi', { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }, [postId, toast])

  useEffect(() => {
    void load()
  }, [load])

  const likePost = async () => {
    if (!canInteract || !post) return
    if (FORUM_PREVIEW) {
      setPost((p) =>
        p ? { ...p, likedByMe: !p.likedByMe, likeCount: p.likeCount + (p.likedByMe ? -1 : 1) } : p,
      )
      return
    }
    if (postLikePending.current) return
    postLikePending.current = true
    const prev = { likedByMe: post.likedByMe, likeCount: post.likeCount }
    setPost((p) =>
      p ? { ...p, likedByMe: !p.likedByMe, likeCount: p.likeCount + (p.likedByMe ? -1 : 1) } : p,
    )
    try {
      const res = await forumApi.likePost(post.id)
      setPost((p) => (p ? { ...p, likedByMe: res.liked, likeCount: res.likeCount } : p))
    } catch (e) {
      setPost((p) => (p ? { ...p, ...prev } : p))
      toast(e instanceof ApiError ? e.message : 'İşlem başarısız', { variant: 'error' })
    } finally {
      postLikePending.current = false
    }
  }

  const likeReply = async (id: number) => {
    if (!canInteract) return
    if (FORUM_PREVIEW) {
      setReplies((rs) =>
        rs.map((r) =>
          r.id === id ? { ...r, likedByMe: !r.likedByMe, likeCount: r.likeCount + (r.likedByMe ? -1 : 1) } : r,
        ),
      )
      return
    }
    const target = replies.find((r) => r.id === id)
    if (!target) return
    if (replyLikePending.current.has(id)) return
    replyLikePending.current.add(id)
    const prev = { likedByMe: target.likedByMe, likeCount: target.likeCount }
    setReplies((rs) =>
      rs.map((r) =>
        r.id === id ? { ...r, likedByMe: !r.likedByMe, likeCount: r.likeCount + (r.likedByMe ? -1 : 1) } : r,
      ),
    )
    try {
      const res = await forumApi.likeReply(id)
      setReplies((rs) => rs.map((r) => (r.id === id ? { ...r, likedByMe: res.liked, likeCount: res.likeCount } : r)))
    } catch (e) {
      setReplies((rs) => rs.map((r) => (r.id === id ? { ...r, ...prev } : r)))
      toast(e instanceof ApiError ? e.message : 'İşlem başarısız', { variant: 'error' })
    } finally {
      replyLikePending.current.delete(id)
    }
  }

  const confirmRemovePost = async () => {
    if (!post) return
    if (FORUM_PREVIEW) {
      toast('Gönderi kaldırıldı (önizleme).', { variant: 'success' })
      navigate('/forum')
      return
    }
    setRemovingPost(true)
    try {
      await forumApi.removePost(post.id)
      toast('Gönderi kaldırıldı.', { variant: 'success' })
      navigate('/forum')
    } catch (e) {
      toast(e instanceof ApiError ? e.message : 'Gönderi kaldırılamadı', { variant: 'error' })
      setRemovingPost(false)
    }
  }

  const togglePin = async () => {
    if (!post) return
    const next = !post.isPinned
    if (FORUM_PREVIEW) {
      setPost((p) => (p ? { ...p, isPinned: next } : p))
      toast(next ? 'Sabitlendi (önizleme).' : 'Sabit kaldırıldı (önizleme).', { variant: 'success' })
      return
    }
    try {
      await forumApi.pinPost(post.id, next)
      setPost((p) => (p ? { ...p, isPinned: next } : p))
      toast(next ? 'Gönderi sabitlendi.' : 'Sabitleme kaldırıldı.', { variant: 'success' })
    } catch (e) {
      toast(e instanceof ApiError ? e.message : 'İşlem başarısız', { variant: 'error' })
    }
  }

  const confirmRemoveReply = async () => {
    const id = removeReplyId
    if (id == null) return
    if (FORUM_PREVIEW) {
      setReplies((rs) => rs.filter((r) => r.id !== id))
      setPost((p) => (p ? { ...p, replyCount: Math.max(0, p.replyCount - 1) } : p))
      setRemoveReplyId(null)
      toast('Yanıt kaldırıldı (önizleme).', { variant: 'success' })
      return
    }
    setRemovingReply(true)
    try {
      await forumApi.removeReply(id)
      setReplies((rs) => rs.filter((r) => r.id !== id))
      setPost((p) => (p ? { ...p, replyCount: Math.max(0, p.replyCount - 1) } : p))
      setRemoveReplyId(null)
      toast('Yanıt kaldırıldı.', { variant: 'success' })
    } catch (e) {
      toast(e instanceof ApiError ? e.message : 'Yanıt kaldırılamadı', { variant: 'error' })
    } finally {
      setRemovingReply(false)
    }
  }

  const loadMoreReplies = async () => {
    if (!post || replyCursor == null || loadingMoreReplies) return
    setLoadingMoreReplies(true)
    try {
      const res = await forumApi.replies(post.id, replyCursor)
      setReplies((rs) => {
        const seen = new Set(rs.map((r) => r.id))
        return [...rs, ...res.replies.filter((r) => !seen.has(r.id))]
      })
      setReplyCursor(res.replyCursor)
      setHasMoreReplies(res.hasMoreReplies)
    } catch (e) {
      toast(e instanceof ApiError ? e.message : 'Yanıtlar yüklenemedi', { variant: 'error' })
    } finally {
      setLoadingMoreReplies(false)
    }
  }

  const sendReply = async () => {
    if (!post) return
    const b = replyBody.trim()
    if (b.length < 1) {
      toast('Yanıt boş olamaz.', { variant: 'warn' })
      return
    }
    if (FORUM_PREVIEW) {
      const newReply: ForumReply = {
        id: Date.now(),
        body: b,
        createdAt: new Date().toISOString(),
        author: { username: me?.username || 'siz', verified: !!me?.isAdmin },
        likeCount: 0,
        likedByMe: false,
        isMine: true,
      }
      setReplies((rs) => [...rs, newReply])
      setPost((p) => (p ? { ...p, replyCount: p.replyCount + 1 } : p))
      setReplyBody('')
      toast('Yanıtınız eklendi (önizleme).', { variant: 'success' })
      return
    }
    setSending(true)
    try {
      const res = await forumApi.createReply(post.id, b)
      setReplies((rs) => [...rs, res.reply])
      setPost((p) => (p ? { ...p, replyCount: p.replyCount + 1 } : p))
      setReplyBody('')
      toast('Yanıtınız eklendi.', { variant: 'success' })
    } catch (e) {
      toast(e instanceof ApiError ? e.message : 'Yanıt gönderilemedi', { variant: 'error' })
    } finally {
      setSending(false)
    }
  }

  if (!authHydrated) return <CenterLoader />
  if (!user && !FORUM_PREVIEW) return <Navigate to={`/giris?redirect=/forum/${params.id ?? ''}`} replace />
  if (loading) return <CenterLoader />
  if (!post) {
    return (
      <>
        <SeoHead title="Gönderi bulunamadı" path="/forum" noindex />
        <section className="container-content py-20">
          <div className="mx-auto max-w-md text-center">
            <h1 className="text-[20px] font-semibold text-fg">Gönderi bulunamadı</h1>
            <p className="mt-2 text-[14px] text-fg-muted">
              {notFound
                ? 'Bu gönderi kaldırılmış veya hiç var olmamış olabilir.'
                : 'Gönderi şu anda yüklenemedi. Lütfen tekrar deneyin.'}
            </p>
            <Link to="/forum" className="mt-6 inline-block">
              <Button variant="outline" leftIcon={<ArrowLeft className="h-4 w-4" />}>
                Sosyal akışa dön
              </Button>
            </Link>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <SeoHead title={post.title} path={`/forum/${post.id}`} noindex />
      <section className="container-content py-8 md:py-10">
        <div className="mx-auto max-w-3xl">
          <Link
            to="/forum"
            className="inline-flex items-center gap-1.5 text-[13px] text-fg-muted hover:text-fg transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Sosyal akışa dön
          </Link>

          <article className="mt-4 rounded-[var(--radius-xl)] border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface)] p-5 md:p-7">
            <div className="flex items-start justify-between gap-3">
              <AuthorLine author={post.author} createdAt={post.createdAt} size={38} />
              <div className="flex items-center gap-1.5">
                {post.isPinned ? (
                  <span className="inline-flex items-center gap-1 rounded-full border border-[color:var(--color-brand)]/30 bg-[color:var(--color-brand)]/10 px-2 py-0.5 text-[10.5px] font-medium text-[color:var(--color-brand-hover)]">
                    <Pin className="h-3 w-3" />
                    Sabit
                  </span>
                ) : null}
                <CategoryBadge category={post.category} />
                <PostMenu
                  isAdmin={isAdmin}
                  isMine={post.isMine}
                  showPin
                  isPinned={post.isPinned}
                  onRemove={() => setRemovePostOpen(true)}
                  onTogglePin={togglePin}
                  onBan={() => setBanTarget(post.author.username)}
                  onReport={() => setReportTarget({ type: 'post', id: post.id })}
                />
              </div>
            </div>

            <h1 className="mt-4 text-[clamp(1.4rem,2.8vw,1.9rem)] font-semibold leading-tight tracking-[-0.02em] text-fg">
              {post.title}
            </h1>

            {post.imageId ? (
              <div className="mt-4 overflow-hidden rounded-[var(--radius-md)] border border-[color:var(--color-border)]">
                <img
                  src={forumImageUrl(post.imageId)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="max-h-[32rem] w-full object-contain bg-[color:var(--color-bg)]"
                />
              </div>
            ) : null}

            <div className="mt-4">
              <Markdown content={post.body} />
            </div>

            <div className="mt-5 flex items-center gap-1 border-t border-[color:var(--color-border)] pt-3">
              <button
                type="button"
                disabled={!canInteract}
                onClick={likePost}
                aria-pressed={post.likedByMe}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[13.5px] transition-colors disabled:cursor-not-allowed disabled:opacity-50',
                  post.likedByMe
                    ? 'text-[color:var(--color-danger)] hover:bg-[color:var(--color-danger)]/10'
                    : 'text-fg-muted hover:text-fg hover:bg-white/[0.05]',
                )}
              >
                <Heart className={cn('h-4 w-4', post.likedByMe && 'fill-current')} />
                {post.likeCount}
              </button>
              <span className="px-2 text-[13px] text-fg-dim">
                {post.replyCount} yanıt
              </span>
            </div>
          </article>

          <div className="mt-8">
            <h2 className="text-[15px] font-semibold text-fg">Yanıtlar</h2>

            {canInteract ? (
              <div className="mt-3 rounded-[var(--radius-lg)] border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface)] p-4">
                <MarkdownEditor
                  value={replyBody}
                  onChange={setReplyBody}
                  maxLength={REPLY_MAX}
                  minRows={4}
                  placeholder="Yanıtınızı yazın…"
                />
                <div className="mt-3 flex justify-end">
                  <Button loading={sending} onClick={sendReply} leftIcon={<Send className="h-4 w-4" />}>
                    Yanıtla
                  </Button>
                </div>
              </div>
            ) : me?.isBanned ? (
              <p className="mt-3 rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-4 py-3 text-[13px] text-fg-muted">
                Forumda içerik paylaşımınız kısıtlandığı için yanıt yazamazsınız.
              </p>
            ) : null}

            <div className="mt-4 flex flex-col gap-3">
              {replies.length === 0 ? (
                <p className="rounded-[var(--radius-md)] border border-dashed border-[color:var(--color-border-strong)] bg-[color:var(--color-surface)] px-4 py-8 text-center text-[13.5px] text-fg-muted">
                  Henüz yanıt yok. İlk yorumu siz yapın.
                </p>
              ) : (
                replies.map((reply) => (
                  <div
                    key={reply.id}
                    className="rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <AuthorLine author={reply.author} createdAt={reply.createdAt} size={30} />
                      <PostMenu
                        isAdmin={isAdmin}
                        isMine={reply.isMine}
                        onRemove={() => setRemoveReplyId(reply.id)}
                        onBan={() => setBanTarget(reply.author.username)}
                        onReport={() => setReportTarget({ type: 'reply', id: reply.id })}
                        label="Yanıt"
                      />
                    </div>
                    <div className="mt-2.5 pl-[42px] text-[14px]">
                      <Markdown content={reply.body} />
                    </div>
                    <div className="mt-2 pl-[38px]">
                      <button
                        type="button"
                        disabled={!canInteract}
                        onClick={() => likeReply(reply.id)}
                        aria-pressed={reply.likedByMe}
                        className={cn(
                          'inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[12.5px] transition-colors disabled:cursor-not-allowed disabled:opacity-50',
                          reply.likedByMe
                            ? 'text-[color:var(--color-danger)] hover:bg-[color:var(--color-danger)]/10'
                            : 'text-fg-muted hover:text-fg hover:bg-white/[0.05]',
                        )}
                      >
                        <Heart className={cn('h-3.5 w-3.5', reply.likedByMe && 'fill-current')} />
                        {reply.likeCount}
                      </button>
                    </div>
                  </div>
                ))
              )}
              {hasMoreReplies ? (
                <div className="flex justify-center pt-1">
                  <Button variant="outline" size="sm" onClick={loadMoreReplies} loading={loadingMoreReplies}>
                    Daha fazla yanıt
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <BanDialog username={banTarget} onClose={() => setBanTarget(null)} onDone={() => undefined} />
      <ConfirmDialog
        open={removePostOpen}
        title="Gönderiyi kaldır"
        confirmLabel="Kaldır"
        loading={removingPost}
        onConfirm={confirmRemovePost}
        onClose={() => setRemovePostOpen(false)}
      />
      <ConfirmDialog
        open={removeReplyId !== null}
        title="Yanıtı kaldır"
        confirmLabel="Kaldır"
        loading={removingReply}
        onConfirm={confirmRemoveReply}
        onClose={() => setRemoveReplyId(null)}
      />
      <ReportDialog target={reportTarget} onClose={() => setReportTarget(null)} />
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
