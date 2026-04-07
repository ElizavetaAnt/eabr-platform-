import { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import {
  UserCircle, GraduationCap, Phone, ChartBar, Newspaper,
  InstagramLogo, Users, Calculator, Crown, UsersThree,
  ArrowLeft, ArrowRight, BookOpen,
} from '@phosphor-icons/react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { Watermark } from '../components/layout/Watermark'
import { RoleCard } from '../components/module/RoleCard'
import { ExpandableBlock } from '../components/module/ExpandableBlock'
import { ComparisonBlock } from '../components/module/ComparisonBlock'
import { WarningBlock } from '../components/module/WarningBlock'
import { LegalBlock } from '../components/module/LegalBlock'
import { KeyInsightBlock } from '../components/module/KeyInsightBlock'
import { ScenarioBlock } from '../components/module/ScenarioBlock'
import { QuizBlock } from '../components/module/QuizBlock'
import { useAppStore } from '../store/useAppStore'
import { supabase } from '../lib/supabase'
import { MODULES_META, getModuleById } from '../content/modules'
import type { ModuleContent } from '../types'

const ICON_MAP: Record<string, React.ElementType> = {
  UserCircle, GraduationCap, Phone, ChartBar, Newspaper,
  InstagramLogo, Users, Calculator, Crown, UsersThree,
}

export function ModuleScreen() {
  const { moduleId } = useParams<{ moduleId: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const { user, setModuleCompleted, setQuizResult } = useAppStore()
  const [module, setModule] = useState<ModuleContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [quizStarted, setQuizStarted] = useState(false)

  const meta = MODULES_META.find((m) => m.id === moduleId)
  const currentIdx = MODULES_META.findIndex((m) => m.id === moduleId)
  const prevMeta = currentIdx > 0 ? MODULES_META[currentIdx - 1] : null
  const nextMeta = currentIdx < MODULES_META.length - 1 ? MODULES_META[currentIdx + 1] : null

  useEffect(() => {
    if (!moduleId) return
    setLoading(true)
    getModuleById(moduleId).then((data) => {
      setModule(data)
      setLoading(false)
    })
    // Защита: запрет копирования
    const onCopy = (e: ClipboardEvent) => {
      e.preventDefault()
      alert('Копирование материалов запрещено. Договор № 118.')
    }
    document.addEventListener('copy', onCopy)
    return () => document.removeEventListener('copy', onCopy)
  }, [moduleId])

  const handleQuizComplete = async (score: number, passed: boolean) => {
    if (!moduleId || !user) return
    setQuizResult(moduleId, score, passed)
    if (passed) setModuleCompleted(moduleId)

    await supabase.from('quiz_results').insert({
      user_id: user.id,
      module_id: moduleId,
      score,
      passed,
      attempt_number: 1,
    })

    if (passed) {
      await supabase.from('module_progress').upsert({
        user_id: user.id,
        module_id: moduleId,
      })
    }
  }

  const IconComponent = meta ? (ICON_MAP[meta.icon] ?? UserCircle) : UserCircle

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#F4F7FB' }}>
        <Header />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
          <p style={{ color: '#607D8B', fontSize: '15px' }}>Загружаем модуль...</p>
        </div>
      </div>
    )
  }

  if (!module) {
    return (
      <div style={{ minHeight: '100vh', background: '#F4F7FB' }}>
        <Header />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
          <p style={{ color: '#C62828', fontSize: '15px' }}>Модуль не найден</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F4F7FB' }} className="protected-content">
      <Watermark />
      <Header />

      <main className="module-main" style={{ maxWidth: '760px', margin: '0 auto', padding: '32px 20px' }}>
        {/* Навигация */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#607D8B',
              fontSize: '13px',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            <ArrowLeft size={16} weight="fill" />
            Все модули
          </button>
          <div style={{ display: 'flex', gap: '8px' }}>
            {prevMeta && (
              <NavBtn label={prevMeta.title} direction="prev" onClick={() => navigate(`/module/${prevMeta.id}`)} />
            )}
            {nextMeta && (
              <NavBtn label={nextMeta.title} direction="next" onClick={() => navigate(`/module/${nextMeta.id}`)} />
            )}
          </div>
        </div>

        {/* Контент модуля */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {module.sections.map((section) => {
            switch (section.type) {
              case 'role-card':
                return (
                  <RoleCard
                    key={section.id}
                    title={module.title}
                    subtitle={module.subtitle}
                    description={section.content.description}
                    keyPhrase={section.content.keyPhrase}
                    icon={<IconComponent size={28} weight="fill" color="#B0C5D8" />}
                  />
                )
              case 'expandable':
                return (
                  <ExpandableBlock
                    key={section.id}
                    title={section.title}
                    items={section.items}
                  />
                )
              case 'comparison':
                return (
                  <ComparisonBlock
                    key={section.id}
                    included={section.included}
                    excluded={section.excluded}
                  />
                )
              case 'warning':
                return <WarningBlock key={section.id} content={section.content} />
              case 'legal':
                return <LegalBlock key={section.id} law={section.law} content={section.content} />
              case 'key-insight':
                return <KeyInsightBlock key={section.id} content={section.content} />
              case 'scenario':
                return (
                  <ScenarioBlock
                    key={`${location.key}-${moduleId}-${section.id}`}
                    situation={section.situation}
                    options={section.options}
                  />
                )
              case 'text':
                return (
                  <div
                    key={section.id}
                    style={{
                      background: '#fff',
                      borderRadius: '12px',
                      padding: '20px 24px',
                      fontSize: '15px',
                      lineHeight: 1.8,
                      color: '#1A2B4A',
                      boxShadow: '0 2px 8px rgba(26,43,74,0.05)',
                    }}
                  >
                    {section.content}
                  </div>
                )
              default:
                return null
            }
          })}

          {/* Нижняя навигация */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', gap: '8px' }}>
            <button
              onClick={() => prevMeta ? navigate(`/module/${prevMeta.id}`) : navigate('/dashboard')}
              style={{
                background: '#fff',
                border: '1.5px solid #e0e7ef',
                borderRadius: '8px',
                padding: '10px 18px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13px',
                color: '#607D8B',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              <ArrowLeft size={14} weight="fill" />
              {prevMeta ? prevMeta.title : 'Все модули'}
            </button>

            <button
              onClick={() => navigate('/dashboard')}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '13px',
                color: '#B0C5D8',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Все модули
            </button>

            {nextMeta && (
              <button
                onClick={() => navigate(`/module/${nextMeta.id}`)}
                style={{
                  background: '#1A2B4A',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 18px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '13px',
                  color: '#fff',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                }}
              >
                {nextMeta.title}
                <ArrowRight size={14} weight="fill" />
              </button>
            )}
          </div>

          {/* Тест */}
          {!quizStarted ? (
            <div
              style={{
                background: '#fff',
                borderRadius: '14px',
                padding: '28px',
                textAlign: 'center',
                boxShadow: '0 2px 12px rgba(26,43,74,0.06)',
                borderTop: '3px solid #1A2B4A',
              }}
            >
              <BookOpen size={32} weight="fill" color="#1A2B4A" style={{ margin: '0 auto 12px' }} />
              <h3
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '20px',
                  color: '#1A2B4A',
                  marginBottom: '8px',
                }}
              >
                Мини-тест по модулю
              </h3>
              <p style={{ fontSize: '14px', color: '#607D8B', marginBottom: '20px' }}>
                {module.quiz.length} вопросов · для перехода нужно набрать ≥70%
              </p>
              <button
                onClick={() => setQuizStarted(true)}
                style={{
                  background: '#1A2B4A',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 32px',
                  fontSize: '15px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                Начать тест
                <ArrowRight size={16} weight="fill" />
              </button>
            </div>
          ) : (
            <QuizBlock questions={module.quiz} onComplete={handleQuizComplete} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

function NavBtn({
  label,
  direction,
  onClick,
}: {
  label: string
  direction: 'prev' | 'next'
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      style={{
        background: '#fff',
        border: '1.5px solid #e0e7ef',
        borderRadius: '8px',
        padding: '6px 14px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '13px',
        color: '#1A2B4A',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {direction === 'prev' && <ArrowLeft size={14} weight="fill" />}
      {label}
      {direction === 'next' && <ArrowRight size={14} weight="fill" />}
    </button>
  )
}
