import type {
  ForumMe,
  ForumPostDetail,
  ForumPostSummary,
  ForumReply,
} from '@/lib/api'

export const PREVIEW_ME: ForumMe = {
  hasProfile: true,
  username: 'ahmet_karakus',
  isBanned: false,
  banReason: null,
  acceptedRules: true,
  isAdmin: true,
}

const T = (h: number) => new Date(Date.now() - h * 3600 * 1000).toISOString()

export const PREVIEW_PINNED: ForumPostSummary[] = [
  {
    id: 1001,
    title: 'Marul V8 yayında: daha hızlı ve daha doğru Türkçe',
    excerpt:
      'Yeni sürümde tokenizer iyileştirildi, yanıt süresi ortalama %18 azaldı ve uzun bağlam desteği geldi. Detaylar ve geri bildirim için yorumları bekliyoruz.',
    category: 'duyuru',
    imageId: null,
    isPinned: true,
    createdAt: T(5),
    author: { username: 'ahmet_karakus', verified: true },
    likeCount: 42,
    replyCount: 7,
    likedByMe: false,
    isMine: true,
  },
]

export const PREVIEW_POSTS: ForumPostSummary[] = [
  {
    id: 1002,
    title: 'Uzun sohbetlerde model bazen önceki mesajı unutuyor',
    excerpt:
      '20 mesajdan sonra bağlamı kaçırıyor gibi. Aynı sohbette önceki talimatı tekrar hatırlatmak gerekiyor. Sizde de oluyor mu?',
    category: 'sorun',
    imageId: null,
    isPinned: false,
    createdAt: T(9),
    author: { username: 'deniz_y', verified: false },
    likeCount: 12,
    replyCount: 4,
    likedByMe: true,
    isMine: false,
  },
  {
    id: 1003,
    title: 'Öneri: sohbetleri klasörlere ayırabilelim',
    excerpt:
      'İş ve kişisel sohbetleri ayırmak için basit bir klasör/etiket sistemi çok işime yarardı. Arama da eklenebilir.',
    category: 'oneri',
    imageId: null,
    isPinned: false,
    createdAt: T(26),
    author: { username: 'mert_dev', verified: false },
    likeCount: 28,
    replyCount: 9,
    likedByMe: false,
    isMine: false,
  },
  {
    id: 1004,
    title: 'Kod yazdırırken biçimlendirme gerçekten temiz',
    excerpt:
      'Markdown ve kod blokları çok düzgün geliyor, kopyala butonu da pratik. Emeğinize sağlık.',
    category: 'genel',
    imageId: null,
    isPinned: false,
    createdAt: T(50),
    author: { username: 'ayse', verified: false },
    likeCount: 19,
    replyCount: 2,
    likedByMe: false,
    isMine: false,
  },
]

const DETAILS: Record<number, { post: ForumPostDetail; replies: ForumReply[] }> = {
  1001: {
    post: {
      id: 1001,
      title: 'Marul V8 yayında: daha hızlı ve daha doğru Türkçe',
      body: '## Neler değişti?\n\n- **Tokenizer** baştan eğitildi, Türkçe ekler daha tutarlı işleniyor.\n- Ortalama yanıt süresi **%18** azaldı.\n- Uzun bağlam desteği: artık daha fazla mesajı akılda tutuyor.\n\n> Geri bildirimleriniz bizim için değerli. Aşağıya yorum bırakabilirsiniz.\n\n```py\nprint("Merhaba Marul V8")\n```',
      category: 'duyuru',
      imageId: null,
      isPinned: true,
      createdAt: T(5),
      author: { username: 'ahmet_karakus', verified: true },
      likeCount: 42,
      replyCount: 7,
      likedByMe: false,
      isMine: true,
    },
    replies: [
      {
        id: 9001,
        body: 'Hız farkını **hemen** hissettim, eline sağlık.',
        createdAt: T(4),
        author: { username: 'deniz_y', verified: false },
        likeCount: 6,
        likedByMe: false,
        isMine: false,
      },
      {
        id: 9002,
        body: 'Uzun bağlam desteği harika olmuş. Bir de ses girişi gelse tam olur.',
        createdAt: T(3),
        author: { username: 'mert_dev', verified: false },
        likeCount: 3,
        likedByMe: true,
        isMine: false,
      },
    ],
  },
  1002: {
    post: {
      id: 1002,
      title: 'Uzun sohbetlerde model bazen önceki mesajı unutuyor',
      body: '20 mesajdan sonra bağlamı kaçırıyor gibi.\n\nAynı sohbette önceki talimatı tekrar hatırlatmak gerekiyor. Adımlar:\n\n1. Uzun bir sohbet başlat\n2. 20+ mesaj gönder\n3. İlk talimata atıfta bulun\n\nSizde de oluyor mu?',
      category: 'sorun',
      imageId: null,
      isPinned: false,
      createdAt: T(9),
      author: { username: 'deniz_y', verified: false },
      likeCount: 12,
      replyCount: 4,
      likedByMe: true,
      isMine: false,
    },
    replies: [
      {
        id: 9101,
        body: 'Bizde de benzer bir durum vardı, son sürümde **düzeldi** gibi. Tekrar dener misin?',
        createdAt: T(8),
        author: { username: 'ahmet_karakus', verified: true },
        likeCount: 9,
        likedByMe: false,
        isMine: true,
      },
    ],
  },
}

export function previewDetail(id: number): { post: ForumPostDetail; replies: ForumReply[] } | null {
  if (DETAILS[id]) return DETAILS[id]
  const summary = [...PREVIEW_PINNED, ...PREVIEW_POSTS].find((p) => p.id === id)
  if (!summary) return null
  const { excerpt, ...rest } = summary
  return { post: { ...rest, body: excerpt }, replies: [] }
}
