import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Loader2, MessageSquarePlus, ShieldAlert } from 'lucide-react'
import { SeoHead } from '@/components/ui/SeoHead'
import { Button } from '@/components/ui/Button'
import { ForumOnboarding } from '@/components/forum/ForumOnboarding'
import { PostCard } from '@/components/forum/PostCard'
import { BanDialog } from '@/components/forum/BanDialog'
import { ConfirmDialog } from '@/components/forum/ConfirmDialog'
import { ReportDialog, type ReportTarget } from '@/components/forum/ReportDialog'
import { useAuthStore } from '@/lib/store/auth'
import { useForumStore } from '@/lib/store/forum'
import { useUIStore } from '@/lib/store/ui'
import { ApiError, forumApi, type ForumCategory, type ForumPostSummary } from '@/lib/api'
import { FORUM_PREVIEW } from '@/lib/config'
import { PREVIEW_ME, PREVIEW_PINNED, PREVIEW_POSTS } from '@/lib/forumPreview'
import { cn } from '@/lib/utils'

const TABS: { id: ForumCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'Tümü' },
  { id: 'duyuru', label: 'Duyurular' },
  { id: 'sorun', label: 'Sorunlar' },
  { id: 'oneri', label: 'Öneriler' },
  { id: 'genel', label: 'Genel' },
]

export default function Forum() {
  const authHydrated = useAuthStore((s) => s.isHydrated)
  const user = useAuthStore((s) => s.user)
  const me = useForumStore((s) => s.me)
  const loadMe = useForumStore((s) => s.loadMe)
  const setMe = useForumStore((s) => s.setMe)
  const toast = useUIStore((s) => s.toast)

  const [meReady, setMeReady] = useState(false)
  const [category, setCategory] = useState<ForumCategory | 'all'>('all')
  const [pinned, setPinned] = useState<ForumPostSummary[]>([])
  const [posts, setPosts] = useState<ForumPostSummary[]>([])
  const [nextCursor, setNextCursor] = useState<number | null>(null)
  const [loadingFeed, setLoadingFeed] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [banTarget, setBanTarget] = useState<string | null>(null)
  const [removeTarget, setRemoveTarget] = useState<number | null>(null)
  const [removing, setRemoving] = useState(false)
  const [reportTarget, setReportTarget] = useState<ReportTarget | null>(null)
  const feedReqId = useRef(0)
  const likePending = useRef<Set<number>>(new Set())

  useEffect(() => {
    if (FORUM_PREVIEW) {
      const wantOnboarding = new URLSearchParams(window.location.search).get('onboarding') === '1'
      setMe({ ...PREVIEW_ME, hasProfile: !wantOnboarding })
      setMeReady(true)
      return
    }
    if (!authHydrated || !user) return
    let active = true
    void loadMe(true).finally(() => {
      if (active) setMeReady(true)
    })
    return () => {
      active = false
    }
  }, [authHydrated, user, loadMe, setMe])

  const hasProfile = !!me?.hasProfile
  const isAdmin = !!me?.isAdmin
  const isBanned = !!me?.isBanned
  const canInteract = hasProfile && !isBanned

  const loadFeed = useCallback(
    async (cat: ForumCategory | 'all') => {
      if (FORUM_PREVIEW) {
        const fc = cat === 'all' ? null : cat
        setPinned(PREVIEW_PINNED.filter((p) => !fc || p.category === fc))
        setPosts(PREVIEW_POSTS.filter((p) => !fc || p.category === fc))
        setNextCursor(null)
        setLoadingFeed(false)
        return
      }
      const reqId = ++feedReqId.current
      setLoadingFeed(true)
      try {
        const res = await forumApi.feed({ category: cat === 'all' ? null : cat })
        if (reqId !== feedReqId.current) return
        setPinned(res.pinned)
        setPosts(res.posts)
        setNextCursor(res.nextCursor)
      } catch (e) {
        if (reqId === feedReqId.current) {
          toast(e instanceof ApiError ? e.message : 'Gönderiler yüklenemedi', { variant: 'error' })
        }
      } finally {
        if (reqId === feedReqId.current) setLoadingFeed(false)
      }
    },
    [toast],
  )

  useEffect(() => {
    if (!hasProfile) return
    void loadFeed(category)
  }, [hasProfile, category, loadFeed])

  const loadMore = useCallback(async () => {
    if (!nextCursor || loadingMore) return
    setLoadingMore(true)
    try {
      const res = await forumApi.feed({ category: category === 'all' ? null : category, cursor: nextCursor })
      setPosts((prev) => [...prev, ...res.posts])
      setNextCursor(res.nextCursor)
    } catch (e) {
      toast(e instanceof ApiError ? e.message : 'Daha fazla yüklenemedi', { variant: 'error' })
    } finally {
      setLoadingMore(false)
    }
  }, [nextCursor, loadingMore, category, toast])

  const patchPost = useCallback((id: number, updater: (p: ForumPostSummary) => ForumPostSummary) => {
    setPinned((prev) => prev.map((p) => (p.id === id ? updater(p) : p)))
    setPosts((prev) => prev.map((p) => (p.id === id ? updater(p) : p)))
  }, [])

  const dropPost = useCallback((id: number) => {
    setPinned((prev) => prev.filter((p) => p.id !== id))
    setPosts((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const handleLike = useCallback(
    async (id: number) => {
      if (!canInteract) return
      if (likePending.current.has(id)) return
      likePending.current.add(id)
      const toggle = (p: ForumPostSummary): ForumPostSummary => ({
        ...p,
        likedByMe: !p.likedByMe,
        likeCount: p.likeCount + (p.likedByMe ? -1 : 1),
      })
      patchPost(id, toggle)
      if (FORUM_PREVIEW) {
        likePending.current.delete(id)
        return
      }
      try {
        const res = await forumApi.likePost(id)
        patchPost(id, (p) => ({ ...p, likedByMe: res.liked, likeCount: res.likeCount }))
      } catch (e) {
        patchPost(id, toggle)
        toast(e instanceof ApiError ? e.message : 'İşlem başarısız', { variant: 'error' })
      } finally {
        likePending.current.delete(id)
      }
    },
    [canInteract, patchPost, toast],
  )

  const requestRemove = useCallback((id: number) => setRemoveTarget(id), [])

  const confirmRemove = useCallback(async () => {
    const id = removeTarget
    if (id == null) return
    if (FORUM_PREVIEW) {
      dropPost(id)
      setRemoveTarget(null)
      toast('Gönderi kaldırıldı (önizleme).', { variant: 'success' })
      return
    }
    setRemoving(true)
    try {
      await forumApi.removePost(id)
      dropPost(id)
      setRemoveTarget(null)
      toast('Gönderi kaldırıldı.', { variant: 'success' })
    } catch (e) {
      toast(e instanceof ApiError ? e.message : 'Gönderi kaldırılamadı', { variant: 'error' })
    } finally {
      setRemoving(false)
    }
  }, [removeTarget, dropPost, toast])

  const handleTogglePin = useCallback(
    async (id: number, pin: boolean) => {
      if (FORUM_PREVIEW) {
        toast(pin ? 'Sabitlendi (önizleme).' : 'Sabit kaldırıldı (önizleme).', { variant: 'success' })
        return
      }
      try {
        await forumApi.pinPost(id, pin)
        toast(pin ? 'Gönderi sabitlendi.' : 'Sabitleme kaldırıldı.', { variant: 'success' })
        void loadFeed(category)
      } catch (e) {
        toast(e instanceof ApiError ? e.message : 'İşlem başarısız', { variant: 'error' })
      }
    },
    [toast, loadFeed, category],
  )

  const handleReport = useCallback((id: number) => setReportTarget({ type: 'post', id }), [])

  if (!authHydrated) {
    return <CenterLoader />
  }
  if (!user && !FORUM_PREVIEW) {
    return <Navigate to="/giris?redirect=/forum" replace />
  }
  if (!meReady) {
    return <CenterLoader />
  }
  if (!me) {
    return (
      <>
        <SeoHead title="Marul Sosyal" path="/forum" noindex />
        <section className="container-content py-20">
          <div className="mx-auto max-w-md text-center">
            <h1 className="text-[18px] font-semibold text-fg">Sosyal şu anda yüklenemedi</h1>
            <p className="mt-2 text-[14px] text-fg-muted">
              Bağlantı kurulamadı. Lütfen biraz sonra tekrar deneyin.
            </p>
            <div className="mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setMeReady(false)
                  void loadMe(true).finally(() => setMeReady(true))
                }}
              >
                Tekrar dene
              </Button>
            </div>
          </div>
        </section>
      </>
    )
  }

  if (!hasProfile) {
    return (
      <>
        <SeoHead title="Marul Sosyal" path="/forum" noindex />
        <section className="container-content py-12 md:py-16">
          <ForumOnboarding
            onDone={(updated) => {
              setMe(updated)
            }}
          />
        </section>
      </>
    )
  }

  const showEmpty = !loadingFeed && pinned.length === 0 && posts.length === 0

  return (
    <>
      <SeoHead title="Marul Sosyal" path="/forum" noindex />
      <section className="container-content py-8 md:py-10">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-[-0.02em] text-fg">
                Marul Sosyal
              </h1>
              <p className="mt-1.5 text-[14px] text-fg-muted">
                Sorunları, önerileri ve deneyimleri paylaşın. Marul AI ekibi de buradan duyuru yapar.
              </p>
            </div>
            <Link to="/forum/yeni" className={cn(!canInteract && 'pointer-events-none')}>
              <Button leftIcon={<MessageSquarePlus className="h-4 w-4" />} disabled={!canInteract}>
                Yeni gönderi
              </Button>
            </Link>
          </div>

          {isBanned ? (
            <div className="mt-6 flex items-start gap-2.5 rounded-[var(--radius-md)] border border-[color:var(--color-danger)]/30 bg-[color:var(--color-danger)]/10 p-4">
              <ShieldAlert className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[color:var(--color-danger)]" />
              <div className="text-[13px] leading-relaxed text-fg-muted">
                <p className="font-medium text-fg">Forumda içerik paylaşımınız kısıtlandı.</p>
                <p className="mt-0.5">
                  Gönderileri görüntülemeye devam edebilirsiniz ancak yeni gönderi, yanıt veya beğeni
                  ekleyemezsiniz.
                  {me?.banReason ? ` Sebep: ${me.banReason}` : ''}
                </p>
              </div>
            </div>
          ) : null}

          <div className="mt-6 flex gap-1.5 overflow-x-auto no-scrollbar border-b border-[color:var(--color-border)] pb-px">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setCategory(tab.id)}
                className={cn(
                  'relative whitespace-nowrap rounded-t-md px-3.5 py-2 text-[13.5px] font-medium transition-colors',
                  category === tab.id
                    ? 'text-fg'
                    : 'text-fg-muted hover:text-fg',
                )}
              >
                {tab.label}
                {category === tab.id ? (
                  <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-[color:var(--color-brand)]" />
                ) : null}
              </button>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3.5">
            {loadingFeed ? (
              <CenterLoader inline />
            ) : showEmpty ? (
              <div className="rounded-[var(--radius-lg)] border border-dashed border-[color:var(--color-border-strong)] bg-[color:var(--color-surface)] px-6 py-14 text-center">
                <p className="text-[14px] text-fg-muted">Bu kategoride henüz gönderi yok.</p>
                {canInteract ? (
                  <Link to="/forum/yeni" className="mt-3 inline-block">
                    <Button variant="outline" size="sm" leftIcon={<MessageSquarePlus className="h-4 w-4" />}>
                      İlk gönderiyi sen paylaş
                    </Button>
                  </Link>
                ) : null}
              </div>
            ) : (
              <>
                {pinned.map((post) => (
                  <PostCard
                    key={`pin-${post.id}`}
                    post={post}
                    isAdmin={isAdmin}
                    canInteract={canInteract}
                    onLike={handleLike}
                    onRemove={requestRemove}
                    onTogglePin={handleTogglePin}
                    onBan={setBanTarget}
                    onReport={handleReport}
                  />
                ))}
                {posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    isAdmin={isAdmin}
                    canInteract={canInteract}
                    onLike={handleLike}
                    onRemove={requestRemove}
                    onTogglePin={handleTogglePin}
                    onBan={setBanTarget}
                    onReport={handleReport}
                  />
                ))}
                {nextCursor ? (
                  <div className="flex justify-center pt-2">
                    <Button variant="outline" onClick={loadMore} loading={loadingMore}>
                      Daha fazla göster
                    </Button>
                  </div>
                ) : null}
              </>
            )}
          </div>
        </div>
      </section>

      <BanDialog username={banTarget} onClose={() => setBanTarget(null)} onDone={() => undefined} />
      <ConfirmDialog
        open={removeTarget !== null}
        title="Gönderiyi kaldır"
        confirmLabel="Kaldır"
        loading={removing}
        onConfirm={confirmRemove}
        onClose={() => setRemoveTarget(null)}
      />
      <ReportDialog target={reportTarget} onClose={() => setReportTarget(null)} />
    </>
  )
}

function CenterLoader({ inline }: { inline?: boolean }) {
  return (
    <div className={cn('flex items-center justify-center', inline ? 'py-16' : 'min-h-[60vh]')}>
      <Loader2 className="h-5 w-5 animate-spin text-fg-muted" />
    </div>
  )
}
