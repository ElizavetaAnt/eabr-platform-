import { Lightbulb } from '@phosphor-icons/react'

export function KeyInsightBlock({ content }: { content: string }) {
  return (
    <div
      style={{
        background: '#EEF2F7',
        borderRadius: '12px',
        padding: '20px 22px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '14px',
        borderLeft: '4px solid #1A2B4A',
      }}
    >
      <Lightbulb size={22} weight="fill" color="#1A2B4A" style={{ flexShrink: 0, marginTop: '2px' }} />
      <p style={{ fontSize: '15px', fontWeight: 500, color: '#1A2B4A', lineHeight: 1.7 }}>{content}</p>
    </div>
  )
}
