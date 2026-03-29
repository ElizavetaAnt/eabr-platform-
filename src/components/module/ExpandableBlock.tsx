import { useState } from 'react'
import { CaretDown, CaretUp, Check } from '@phosphor-icons/react'

interface ExpandableBlockProps {
  title: string
  items: string[]
  defaultOpen?: boolean
}

export function ExpandableBlock({ title, items, defaultOpen = false }: ExpandableBlockProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(26,43,74,0.06)',
        overflow: 'hidden',
        marginBottom: '8px',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          padding: '18px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span style={{ fontSize: '15px', fontWeight: 600, color: '#1A2B4A', fontFamily: 'Inter, sans-serif' }}>
          {title}
        </span>
        {open
          ? <CaretUp size={18} weight="fill" color="#B0C5D8" />
          : <CaretDown size={18} weight="fill" color="#B0C5D8" />
        }
      </button>

      {open && (
        <div style={{ padding: '0 20px 20px', borderTop: '1px solid #F4F7FB' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '14px' }}>
            {items.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <Check size={16} weight="fill" color="#2E7D32" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span style={{ fontSize: '14px', color: '#1A2B4A', lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
