import { useState } from 'react'
import { CheckCircle, XCircle, ChatCircle } from '@phosphor-icons/react'
import type { ScenarioOption } from '../../types'

interface ScenarioBlockProps {
  situation: string
  options: ScenarioOption[]
}

export function ScenarioBlock({ situation, options }: ScenarioBlockProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const chosen = options.find((o) => o.id === selected)

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '14px',
        overflow: 'hidden',
        boxShadow: '0 2px 12px rgba(26,43,74,0.06)',
      }}
    >
      {/* Заголовок */}
      <div
        style={{
          background: '#1A2B4A',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <ChatCircle size={20} weight="fill" color="#B0C5D8" />
        <span style={{ fontSize: '13px', fontWeight: 600, color: '#B0C5D8', letterSpacing: '0.06em' }}>
          РАЗБОР СИТУАЦИИ
        </span>
      </div>

      <div style={{ padding: '20px' }}>
        {/* Ситуация */}
        <div
          style={{
            background: '#F4F7FB',
            borderRadius: '10px',
            padding: '14px 16px',
            marginBottom: '16px',
            fontSize: '14px',
            color: '#1A2B4A',
            lineHeight: 1.7,
            fontStyle: 'italic',
          }}
        >
          {situation}
        </div>

        {/* Варианты */}
        <p style={{ fontSize: '13px', color: '#607D8B', marginBottom: '12px', fontWeight: 500 }}>
          Как лучше поступить?
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {options.map((option) => {
            const isSelected = selected === option.id
            const showResult = !!selected

            let bg = '#F4F7FB'
            let border = '#e0e7ef'
            let textColor = '#1A2B4A'

            if (showResult && isSelected) {
              bg = option.isCorrect ? '#F1F8E9' : '#FFEBEE'
              border = option.isCorrect ? '#2E7D32' : '#C62828'
            } else if (showResult && option.isCorrect) {
              bg = '#F1F8E9'
              border = '#2E7D32'
            }

            return (
              <button
                key={option.id}
                onClick={() => !selected && setSelected(option.id)}
                disabled={!!selected}
                style={{
                  background: bg,
                  border: `1.5px solid ${border}`,
                  borderRadius: '8px',
                  padding: '12px 14px',
                  cursor: selected ? 'default' : 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  transition: 'all 0.2s',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {showResult && option.isCorrect && (
                  <CheckCircle size={18} weight="fill" color="#2E7D32" style={{ flexShrink: 0, marginTop: '1px' }} />
                )}
                {showResult && isSelected && !option.isCorrect && (
                  <XCircle size={18} weight="fill" color="#C62828" style={{ flexShrink: 0, marginTop: '1px' }} />
                )}
                {(!showResult || (!isSelected && !option.isCorrect)) && (
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      border: '1.5px solid #B0C5D8',
                      flexShrink: 0,
                      marginTop: '2px',
                    }}
                  />
                )}
                <span style={{ fontSize: '14px', color: textColor, lineHeight: 1.5 }}>{option.text}</span>
              </button>
            )
          })}
        </div>

        {/* Фидбек */}
        {chosen && (
          <div
            style={{
              marginTop: '14px',
              padding: '14px 16px',
              background: chosen.isCorrect ? '#F1F8E9' : '#FFF8E1',
              borderRadius: '10px',
              borderLeft: `3px solid ${chosen.isCorrect ? '#2E7D32' : '#E65100'}`,
              fontSize: '14px',
              color: '#1A2B4A',
              lineHeight: 1.7,
            }}
          >
            {chosen.feedback}
          </div>
        )}
      </div>
    </div>
  )
}
