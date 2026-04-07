import { useState } from 'react'
import { CheckCircle, XCircle, ArrowRight, Trophy, ShieldCheck } from '@phosphor-icons/react'
import type { QuizQuestion } from '../../types'

interface QuizBlockProps {
  questions: QuizQuestion[]
  onComplete: (score: number, passed: boolean) => void
}

export function QuizBlock({ questions, onComplete }: QuizBlockProps) {
  const [consentGiven, setConsentGiven] = useState(false)
  const [consentChecked, setConsentChecked] = useState(false)
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [selected, setSelected] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [finished, setFinished] = useState(false)

  if (!consentGiven) {
    return (
      <div
        style={{
          background: '#fff',
          borderRadius: '14px',
          padding: '28px 24px',
          boxShadow: '0 2px 12px rgba(26,43,74,0.06)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ShieldCheck size={24} weight="fill" color="#1A2B4A" />
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1A2B4A', fontFamily: 'Inter, sans-serif' }}>
            Перед началом теста
          </h3>
        </div>
        <p style={{ fontSize: '14px', color: '#607D8B', lineHeight: 1.7 }}>
          Результаты теста обрабатываются анонимно: фиксируются только набранные баллы и модуль.
          Личные данные не сохраняются.
        </p>
        <div
          onClick={() => setConsentChecked(!consentChecked)}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            cursor: 'pointer',
            padding: '14px',
            background: consentChecked ? '#F1F8E9' : '#F4F7FB',
            borderRadius: '10px',
            border: `1.5px solid ${consentChecked ? '#2E7D32' : '#e0e7ef'}`,
            transition: 'all 0.2s',
          }}
        >
          <CheckCircle
            size={20}
            weight="fill"
            color={consentChecked ? '#2E7D32' : '#B0C5D8'}
            style={{ flexShrink: 0, marginTop: '2px' }}
          />
          <span style={{ fontSize: '13px', lineHeight: 1.6, color: '#1A2B4A', userSelect: 'none' }}>
            Я ознакомлен(а) с{' '}
            <a href="/#/privacy-policy" style={{ color: '#1A2B4A' }}>Политикой обработки персональных данных</a>
            {' '}и даю согласие на анонимную обработку результатов теста в целях обучения.
          </span>
        </div>
        <button
          type="button"
          onClick={() => setConsentGiven(true)}
          disabled={!consentChecked}
          style={{
            background: !consentChecked ? '#e0e7ef' : '#1A2B4A',
            color: !consentChecked ? '#90A4AE' : '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 24px',
            fontSize: '14px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            cursor: !consentChecked ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
          }}
        >
          Начать тест
        </button>
      </div>
    )
  }

  const q = questions[current]
  const totalQ = questions.length
  const isLast = current === totalQ - 1

  const handleSelect = (idx: number) => {
    if (selected !== null) return
    setSelected(idx)
    setShowResult(true)
    setAnswers((prev) => ({ ...prev, [current]: idx }))
  }

  const handleNext = () => {
    if (isLast) {
      const correct = Object.entries(answers).filter(
        ([qi, ans]) => questions[Number(qi)].correctIndex === ans
      ).length
      const score = Math.round((correct / totalQ) * 100)
      const passed = score >= 70
      setFinished(true)
      onComplete(score, passed)
    } else {
      setCurrent((c) => c + 1)
      setSelected(null)
      setShowResult(false)
    }
  }

  if (finished) {
    const correct = Object.entries(answers).filter(
      ([qi, ans]) => questions[Number(qi)].correctIndex === ans
    ).length
    const score = Math.round((correct / totalQ) * 100)
    const passed = score >= 70

    return (
      <div
        style={{
          background: '#fff',
          borderRadius: '14px',
          padding: '32px',
          textAlign: 'center',
          boxShadow: '0 2px 12px rgba(26,43,74,0.06)',
        }}
      >
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>
          {passed ? <Trophy size={56} weight="fill" color="#2E7D32" style={{ margin: '0 auto' }} /> : '📖'}
        </div>
        <h3
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '22px',
            color: '#1A2B4A',
            marginBottom: '8px',
          }}
        >
          {passed ? 'Отличный результат!' : 'Рекомендуем повторить'}
        </h3>
        <p style={{ fontSize: '32px', fontWeight: 700, color: passed ? '#2E7D32' : '#E65100', marginBottom: '8px' }}>
          {score}%
        </p>
        <p style={{ fontSize: '14px', color: '#607D8B', marginBottom: '24px' }}>
          {correct} из {totalQ} вопросов верно
        </p>
        {passed ? (
          <div
            style={{
              padding: '14px 18px',
              background: '#F1F8E9',
              borderRadius: '10px',
              fontSize: '14px',
              color: '#2E7D32',
              fontWeight: 500,
            }}
          >
            Следующий модуль разблокирован
          </div>
        ) : (
          <button
            onClick={() => {
              setCurrent(0)
              setAnswers({})
              setSelected(null)
              setShowResult(false)
              setFinished(false)
            }}
            style={{
              background: '#1A2B4A',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '14px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Пройти ещё раз
          </button>
        )}
      </div>
    )
  }

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '14px',
        overflow: 'hidden',
        boxShadow: '0 2px 12px rgba(26,43,74,0.06)',
      }}
    >
      {/* Прогресс */}
      <div style={{ background: '#F4F7FB', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '13px', color: '#607D8B', fontWeight: 500, flexShrink: 0 }}>
          {current + 1} / {totalQ}
        </span>
        <div style={{ flex: 1, height: '4px', background: '#e0e7ef', borderRadius: '2px', overflow: 'hidden' }}>
          <div
            style={{
              height: '100%',
              width: `${((current + 1) / totalQ) * 100}%`,
              background: '#1A2B4A',
              borderRadius: '2px',
              transition: 'width 0.3s ease',
            }}
          />
        </div>
      </div>

      <div style={{ padding: '24px' }}>
        {/* Вопрос */}
        <h3
          style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#1A2B4A',
            lineHeight: 1.6,
            marginBottom: '20px',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {q.question}
        </h3>

        {/* Варианты */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
          {q.options.map((opt, idx) => {
            const isChosen = selected === idx
            const isCorrect = idx === q.correctIndex
            let bg = '#F4F7FB'
            let border = '#e0e7ef'

            if (showResult) {
              if (isCorrect) { bg = '#F1F8E9'; border = '#2E7D32' }
              else if (isChosen) { bg = '#FFEBEE'; border = '#C62828' }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={showResult}
                style={{
                  background: bg,
                  border: `1.5px solid ${border}`,
                  borderRadius: '8px',
                  padding: '12px 14px',
                  cursor: showResult ? 'default' : 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontFamily: 'Inter, sans-serif',
                  transition: 'all 0.15s',
                }}
              >
                {showResult && isCorrect && <CheckCircle size={18} weight="fill" color="#2E7D32" />}
                {showResult && isChosen && !isCorrect && <XCircle size={18} weight="fill" color="#C62828" />}
                {!showResult && (
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      border: '1.5px solid #B0C5D8',
                      flexShrink: 0,
                    }}
                  />
                )}
                <span style={{ fontSize: '14px', color: '#1A2B4A', lineHeight: 1.5 }}>{opt}</span>
              </button>
            )
          })}
        </div>

        {/* Кнопка Далее */}
        {showResult && (
          <button
            onClick={handleNext}
            style={{
              background: '#1A2B4A',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '14px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            {isLast ? 'Завершить тест' : 'Следующий вопрос'}
            <ArrowRight size={16} weight="fill" />
          </button>
        )}
      </div>
    </div>
  )
}
