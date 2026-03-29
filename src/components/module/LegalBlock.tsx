import { FileText } from '@phosphor-icons/react'

export function LegalBlock({ law, content }: { law: string; content: string }) {
  return (
    <div
      style={{
        background: '#ECEFF1',
        borderRadius: '10px',
        padding: '16px 18px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
      }}
    >
      <FileText size={18} weight="fill" color="#455A64" style={{ flexShrink: 0, marginTop: '2px' }} />
      <div>
        <span
          style={{
            display: 'inline-block',
            fontSize: '11px',
            fontWeight: 700,
            color: '#455A64',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '6px',
          }}
        >
          {law}
        </span>
        <p style={{ fontSize: '13px', color: '#455A64', lineHeight: 1.7 }}>{content}</p>
      </div>
    </div>
  )
}
