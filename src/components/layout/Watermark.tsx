import { useAppStore } from '../../store/useAppStore'

export function Watermark() {
  const user = useAppStore((s) => s.user)
  const name = user?.full_name ?? 'EA-B.R MED'

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        overflow: 'hidden',
      }}
    >
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${(i % 4) * 26}%`,
            top: `${Math.floor(i / 4) * 22}%`,
            transform: 'rotate(-20deg)',
            opacity: 0.04,
            fontSize: '14px',
            fontFamily: 'Inter, sans-serif',
            color: '#1A2B4A',
            whiteSpace: 'nowrap',
            fontWeight: 500,
            letterSpacing: '0.05em',
          }}
        >
          {name} · EA-B.R MED
        </div>
      ))}
    </div>
  )
}
