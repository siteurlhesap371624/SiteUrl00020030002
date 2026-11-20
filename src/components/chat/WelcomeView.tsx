import { Logo } from '@/components/ui/Logo'

export function WelcomeView() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-4 py-16 text-center md:py-24">
      <Logo size={56} showText={false} />
      <h2 className="mt-8 text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-[-0.02em]">
        Nasıl yardımcı olabilirim?
      </h2>
      <p className="mt-2 text-[14.5px] text-fg-muted">
        Sorularınızı yanıtlamak, analiz yapmak veya kod yazmak için buradayım.
      </p>
    </div>
  )
}
