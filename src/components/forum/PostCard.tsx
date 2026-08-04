import { memo } from 'react'
import { Link } from 'react-router-dom'
import { Heart, MessageCircle, Pin } from 'lucide-react'
import { AuthorLine, CategoryBadge } from '@/components/forum/shared'
import { PostMenu } from '@/components/forum/PostMenu'
import { forumImageUrl } from '@/lib/config'
import type { ForumPostSummary } from '@/lib/api'
import { cn, stripMarkdown } from '@/lib/utils'

interface PostCardProps {
  post: ForumPostSummary
  isAdmin: boolean
  canInteract: boolean
  onLike: (id: number) => void
  onRemove: (id: number) => void
  onTogglePin: (id: number, pinned: boolean) => void
  onBan: (username: string) => void
  onReport: (id: number) => void
}

function PostCardInner({ post, isAdmin, canInteract, onLike, onRemove, onTogglePin, onBan, onReport }: PostCardProps) {
  return (
    <article className="group relative rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] transition-colors hover:border-[color:var(--color-border-strong)]">
      <div className="flex items-start justify-between gap-3 px-4 pt-4 md:px-5">
        <AuthorLine author={post.author} createdAt={post.createdAt} />
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
            onRemove={() => onRemove(post.id)}
            onTogglePin={() => onTogglePin(post.id, !post.isPinned)}
            onBan={() => onBan(post.author.username)}
            onReport={() => onReport(post.id)}
          />
        </div>
      </div>

      <Link to={`/forum/${post.id}`} className="block px-4 pb-2 pt-3 md:px-5">
        <h3 className="text-[16.5px] font-semibold leading-snug tracking-[-0.01em] text-fg">
          {post.title}
        </h3>
        {post.excerpt ? (
          <p className="mt-1.5 line-clamp-2 text-[13.5px] leading-relaxed text-fg-muted">
            {stripMarkdown(post.excerpt)}
          </p>
        ) : null}
        {post.imageId ? (
          <div className="mt-3 overflow-hidden rounded-[var(--radius-md)] border border-[color:var(--color-border)]">
            <img
              src={forumImageUrl(post.imageId)}
              alt=""
              loading="lazy"
              decoding="async"
              className="max-h-72 w-full object-cover"
            />
          </div>
        ) : null}
      </Link>

      <div className="flex items-center gap-1 border-t border-[color:var(--color-border)] px-2.5 py-1.5 md:px-3.5">
        <button
          type="button"
          disabled={!canInteract}
          onClick={() => onLike(post.id)}
          aria-pressed={post.likedByMe}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[13px] transition-colors disabled:cursor-not-allowed disabled:opacity-50',
            post.likedByMe
              ? 'text-[color:var(--color-danger)] hover:bg-[color:var(--color-danger)]/10'
              : 'text-fg-muted hover:text-fg hover:bg-white/[0.05]',
          )}
        >
          <Heart className={cn('h-4 w-4', post.likedByMe && 'fill-current')} />
          {post.likeCount}
        </button>
        <Link
          to={`/forum/${post.id}`}
          className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[13px] text-fg-muted hover:text-fg hover:bg-white/[0.05] transition-colors"
        >
          <MessageCircle className="h-4 w-4" />
          {post.replyCount}
        </Link>
      </div>
    </article>
  )
}

export const PostCard = memo(PostCardInner)
