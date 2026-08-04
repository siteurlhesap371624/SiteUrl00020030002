import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, MessageSquare, Trash2, LogIn, Settings, CreditCard, Info, LogOut, ChevronsLeft, Pencil } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useChatStore } from '@/lib/store/chat'
import { useAuthStore } from '@/lib/store/auth'
import { useUIStore } from '@/lib/store/ui'
import { cn, getInitials } from '@/lib/utils'

interface SidebarProps {
  onOpenSettings: () => void
  onOpenSubscription: () => void
  onOpenModelInfo: () => void
}

export function Sidebar({ onOpenSettings, onOpenSubscription, onOpenModelInfo }: SidebarProps) {
  const chats = useChatStore((s) => s.chats)
  const guestChats = useChatStore((s) => s.guestChats)
  const activeChatId = useChatStore((s) => s.activeChatId)
  const guestActiveId = useChatStore((s) => s.guestActiveId)
  const selectChat = useChatStore((s) => s.selectChat)
  const selectGuest = useChatStore((s) => s.selectGuestChat)
  const createNew = useChatStore((s) => s.createNew)
  const createGuest = useChatStore((s) => s.createGuestChat)
  const removeChat = useChatStore((s) => s.removeChat)
  const removeGuest = useChatStore((s) => s.removeGuestChat)
  const renameChat = useChatStore((s) => s.renameChat)
  const user = useAuthStore((s) => s.user)
  const isPremium = useAuthStore((s) => s.isPremium)
  const logout = useAuthStore((s) => s.logout)
  const toast = useUIStore((s) => s.toast)
  const closeSidebar = useUIStore((s) => s.setSidebarOpen)

  const [renamingId, setRenamingId] = useState<number | null>(null)
  const [renameValue, setRenameValue] = useState('')

  const handleNew = () => {
    if (user) createNew()
    else createGuest()
    closeSidebar(false)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Bu sohbeti silmek istediğinizden emin misiniz?')) return
    try {
      await removeChat(id)
      toast('Sohbet silindi', { variant: 'success' })
    } catch {
      toast('Silme işlemi başarısız', { variant: 'error' })
    }
  }

  const handleRename = async (id: number) => {
    const t = renameValue.trim()
    if (!t) {
      setRenamingId(null)
      return
    }
    try {
      await renameChat(id, t)
      toast('Sohbet yeniden adlandırıldı', { variant: 'success' })
    } catch {
      toast('İşlem başarısız', { variant: 'error' })
    } finally {
      setRenamingId(null)
    }
  }

  return (
    <div className="flex h-full w-full flex-col bg-[color:var(--color-bg-elevated)]">
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <Link to="/" className="flex items-center gap-2.5">
          <Logo size={22} />
        </Link>
        <button
          type="button"
          onClick={() => closeSidebar(false)}
          className="md:hidden inline-flex h-8 w-8 items-center justify-center rounded-md text-fg-muted hover:text-fg hover:bg-white/[0.05]"
          aria-label="Yan paneli kapat"
        >
          <ChevronsLeft className="h-4 w-4" />
        </button>
      </div>

      <div className="px-3">
        <Button full variant="outline" size="md" leftIcon={<Plus className="h-4 w-4" />} onClick={handleNew}>
          Yeni Sohbet
        </Button>
      </div>

      <div className="mt-4 flex-1 min-h-0 overflow-y-auto no-scrollbar px-2 pb-3">
        {!user ? (
          guestChats.length === 0 ? (
            <EmptyHint message="Henüz sohbetiniz yok. İlk mesajınızı gönderin." />
          ) : (
            <ul className="space-y-0.5">
              {guestChats.map((c) => (
                <li key={c.id}>
                  <SidebarItem
                    label={c.title}
                    active={guestActiveId === c.id}
                    onClick={() => {
                      selectGuest(c.id)
                      closeSidebar(false)
                    }}
                    onDelete={() => removeGuest(c.id)}
                  />
                </li>
              ))}
            </ul>
          )
        ) : chats.length === 0 ? (
          <EmptyHint message="Henüz sohbetiniz yok." />
        ) : (
          <ul className="space-y-0.5">
            {chats.map((c) => (
              <li key={c.id}>
                <SidebarItem
                  label={c.title}
                  active={activeChatId === c.id}
                  renaming={renamingId === c.id}
                  renameValue={renameValue}
                  onChangeRename={setRenameValue}
                  onClick={() => {
                    if (renamingId === c.id) return
                    void selectChat(c.id)
                    closeSidebar(false)
                  }}
                  onRename={() => {
                    setRenamingId(c.id)
                    setRenameValue(c.title)
                  }}
                  onConfirmRename={() => handleRename(c.id)}
                  onDelete={() => handleDelete(c.id)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="border-t border-[color:var(--color-border)] px-3 py-3 space-y-1">
        <SidebarButton icon={<Info className="h-4 w-4" />} onClick={onOpenModelInfo} label="Model bilgisi" />
        <SidebarButton icon={<Settings className="h-4 w-4" />} onClick={onOpenSettings} label="Kişiselleştirme" />
        <SidebarButton icon={<CreditCard className="h-4 w-4" />} onClick={onOpenSubscription} label="Abonelik" />
      </div>

      <div className="border-t border-[color:var(--color-border)] p-3">
        {user ? (
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[color:var(--color-brand)]/15 text-[color:var(--color-brand-hover)] text-[13px] font-medium">
              {getInitials(user.name)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-medium text-fg">{user.name || user.email}</p>
              <div className="flex items-center gap-1.5">
                <Badge variant={isPremium ? 'brand' : 'outline'} className="!text-[10px] !py-0 !px-1.5">
                  {isPremium ? 'Plus' : 'Ücretsiz'}
                </Badge>
              </div>
            </div>
            <button
              type="button"
              onClick={() => void logout()}
              aria-label="Çıkış"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-fg-muted hover:text-fg hover:bg-white/[0.05]"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <Link to="/giris">
            <Button full variant="primary" leftIcon={<LogIn className="h-4 w-4" />}>
              Giriş yap
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}

interface SidebarItemProps {
  label: string
  active?: boolean
  renaming?: boolean
  renameValue?: string
  onChangeRename?: (v: string) => void
  onClick: () => void
  onDelete: () => void
  onRename?: () => void
  onConfirmRename?: () => void
}

function SidebarItem({
  label,
  active,
  renaming,
  renameValue,
  onChangeRename,
  onClick,
  onDelete,
  onRename,
  onConfirmRename,
}: SidebarItemProps) {
  return (
    <div
      className={cn(
        'group flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors',
        active ? 'bg-white/[0.06] text-fg' : 'text-fg-muted hover:bg-white/[0.04] hover:text-fg',
      )}
    >
      <MessageSquare className="h-3.5 w-3.5 shrink-0 text-fg-dim" />
      {renaming ? (
        <input
          autoFocus
          value={renameValue ?? ''}
          onChange={(e) => onChangeRename?.(e.target.value)}
          onBlur={onConfirmRename}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onConfirmRename?.()
            if (e.key === 'Escape') onConfirmRename?.()
          }}
          className="flex-1 min-w-0 bg-transparent text-[13px] text-fg outline-none"
        />
      ) : (
        <button
          type="button"
          onClick={onClick}
          className="flex-1 min-w-0 text-left text-[13px] truncate"
        >
          {label}
        </button>
      )}
      <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
        {onRename && !renaming ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onRename()
            }}
            aria-label="Yeniden adlandır"
            className="inline-flex h-6 w-6 items-center justify-center rounded text-fg-dim hover:text-fg hover:bg-white/[0.06]"
          >
            <Pencil className="h-3 w-3" />
          </button>
        ) : null}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
          aria-label="Sohbeti sil"
          className="inline-flex h-6 w-6 items-center justify-center rounded text-fg-dim hover:text-[color:var(--color-danger)] hover:bg-white/[0.06]"
        >
          <Trash2 className="h-3 w-3" />
        </button>
      </div>
    </div>
  )
}

function SidebarButton({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-2.5 rounded-md px-2 py-2 text-[13px] text-fg-muted hover:bg-white/[0.04] hover:text-fg transition-colors"
    >
      <span className="text-fg-dim">{icon}</span>
      {label}
    </button>
  )
}

function EmptyHint({ message }: { message: string }) {
  return <p className="px-2 py-6 text-center text-[12.5px] text-fg-dim">{message}</p>
}
