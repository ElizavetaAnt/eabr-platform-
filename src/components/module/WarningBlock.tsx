import { Warning } from '@phosphor-icons/react'

export function WarningBlock({ content }: { content: string }) {
  return (
    <div
      style={{
        background: '#FFF8E1',
        borderRadius: '10px',
        borderLeft: '4px solid #E65100',
        padding: '16px 18px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
      }}
    >
      <Warning size={20} weight="fill" color="#E65100" style={{ flexShrink: 0, marginTop: '2px' }} />
      <p style={{ fontSize: '14px', color: '#1A2B4A', lineHeight: 1.7 }}>{content}</p>
    </div>
  )
}
