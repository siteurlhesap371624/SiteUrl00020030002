import { Sparkles, Code2, FileText, Globe } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'

const prompts = [
  { icon: Sparkles, title: 'Bir e-posta yaz', sub: 'Toplantı erteleme için resmi bir e-posta.' },
  { icon: FileText, title: 'Metni özetle', sub: 'Uzun bir makaleyi 5 maddede özetle.' },
  { icon: Code2, title: 'Kod açıkla', sub: 'Şu Python fonksiyonunun ne yaptığını anlat.' },
  { icon: Globe, title: 'Türkçeye çevir', sub: 'İngilizce metni doğal Türkçeye çevir.' },
]

interface WelcomeViewProps {
  userName?: string | null
  onPrompt: (text: string) => void
}

export function WelcomeView({ userName, onPrompt }: WelcomeViewProps) {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10 md:py-20">
      <div className="flex flex-col items-center text-center">
        <Logo size={40} showText={false} />
        <h2 className="mt-6 text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-[-0.02em]">
          {userName ? `Tekrar hoş geldin, ${userName.split(' ')[0]}.` : 'Nasıl yardımcı olabilirim?'}
        </h2>
        <p className="mt-2 text-[14.5px] text-fg-muted">
          Sorularınızı yanıtlamak, analiz yapmak veya kod yazmak için buradayım.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {prompts.map((p) => {
          const Icon = p.icon
          return (
            <button
              key={p.title}
              type="button"
              onClick={() => onPrompt(`${p.title}: ${p.sub}`)}
              className="group flex items-start gap-3 rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-4 text-left transition-colors hover:border-[color:var(--color-border-bright)] hover:bg-[color:var(--color-surface-2)]"
            >
              <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-md bg-white/[0.04] text-fg-muted group-hover:text-fg">
                <Icon className="h-3.5 w-3.5" />
              </span>
              <span className="min-w-0">
                <span className="block text-[13.5px] font-medium text-fg">{p.title}</span>
                <span className="block text-[12.5px] text-fg-dim mt-0.5">{p.sub}</span>
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
