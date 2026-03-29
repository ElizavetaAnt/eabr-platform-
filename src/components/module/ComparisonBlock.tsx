import { Check, X } from '@phosphor-icons/react'

interface ComparisonBlockProps {
  included: string[]
  excluded: string[]
}

export function ComparisonBlock({ included, excluded }: ComparisonBlockProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
        background: '#fff',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(26,43,74,0.06)',
      }}
    >
      {/* Входит */}
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <Check size={18} weight="fill" color="#2E7D32" />
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#2E7D32', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Входит в зону ответственности
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {included.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#2E7D32',
                  flexShrink: 0,
                  marginTop: '7px',
                }}
              />
              <span style={{ fontSize: '13px', color: '#1A2B4A', lineHeight: 1.6 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Не входит */}
      <div style={{ padding: '20px', background: '#FFEBEE', borderLeft: '1px solid #FFCDD2' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <X size={18} weight="fill" color="#C62828" />
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#C62828', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Не входит
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {excluded.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#C62828',
                  flexShrink: 0,
                  marginTop: '7px',
                }}
              />
              <span style={{ fontSize: '13px', color: '#C62828', lineHeight: 1.6 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
