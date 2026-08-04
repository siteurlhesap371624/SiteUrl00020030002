export function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-1 py-2" aria-label="Yanıt yazılıyor">
      <span className="h-1.5 w-1.5 rounded-full bg-fg-muted animate-typing-dot" style={{ animationDelay: '0ms' }} />
      <span className="h-1.5 w-1.5 rounded-full bg-fg-muted animate-typing-dot" style={{ animationDelay: '120ms' }} />
      <span className="h-1.5 w-1.5 rounded-full bg-fg-muted animate-typing-dot" style={{ animationDelay: '240ms' }} />
    </div>
  )
}
