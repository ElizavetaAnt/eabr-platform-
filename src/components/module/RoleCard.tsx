interface RoleCardProps {
  title: string
  subtitle: string
  description: string
  keyPhrase: string
  icon: React.ReactNode
}

export function RoleCard({ title, subtitle, description, keyPhrase, icon }: RoleCardProps) {
  return (
    <div
      className="role-card-box"
      style={{
        background: 'linear-gradient(135deg, #1A2B4A 0%, #2a3f6a 100%)',
        borderRadius: '16px',
        padding: '32px',
        color: '#fff',
        marginBottom: '8px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '20px' }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: '14px',
            background: 'rgba(176,197,216,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <div>
          <h2
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '26px',
              fontWeight: 700,
              marginBottom: '4px',
            }}
          >
            {title}
          </h2>
          <p style={{ fontSize: '14px', color: '#B0C5D8' }}>{subtitle}</p>
        </div>
      </div>

      <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'rgba(255,255,255,0.85)', marginBottom: '20px' }}>
        {description}
      </p>

      <div
        style={{
          background: 'rgba(176,197,216,0.12)',
          borderRadius: '10px',
          padding: '14px 18px',
          borderLeft: '3px solid #B0C5D8',
        }}
      >
        <p style={{ fontSize: '14px', fontStyle: 'italic', color: '#B0C5D8', lineHeight: 1.6 }}>
          «{keyPhrase}»
        </p>
      </div>
    </div>
  )
}
