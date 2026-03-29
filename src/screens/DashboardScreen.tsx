import { useNavigate } from 'react-router-dom'
import {
  UserCircle, GraduationCap, Phone, ChartBar, Newspaper,
  InstagramLogo, Users, Calculator, Crown, UsersThree,
  LockSimple, CheckCircle, BookOpen, Timer, Trophy,
  Gift, TelegramLogo, Envelope, Globe,
} from '@phosphor-icons/react'
import { useAppStore } from '../store/useAppStore'
import { Header } from '../components/layout/Header'
import { Watermark } from '../components/layout/Watermark'
import { MODULES_META } from '../content/modules'

const ICON_MAP: Record<string, React.ElementType> = {
  UserCircle, GraduationCap, Phone, ChartBar, Newspaper,
  InstagramLogo, Users, Calculator, Crown, UsersThree,
}

export function DashboardScreen() {
  const navigate = useNavigate()
  const { user, progress, isModuleUnlocked } = useAppStore()

  const totalModules = MODULES_META.length
  const completedCount = Object.values(progress).filter((p) => p.quizPassed).length
  const progressPct = Math.round((completedCount / totalModules) * 100)

  return (
    <div style={{ minHeight: '100vh', background: '#F4F7FB' }}>
      <Watermark />
      <Header />

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 20px' }}>
        {/* Приветствие */}
        <div
          style={{
            background: 'linear-gradient(135deg, #1A2B4A 0%, #2a3f6a 100%)',
            borderRadius: '16px',
            padding: '32px',
            color: '#fff',
            marginBottom: '32px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ fontSize: '13px', color: '#B0C5D8', marginBottom: '6px', fontWeight: 500, letterSpacing: '0.06em' }}>
              ДОБРО ПОЖАЛОВАТЬ
            </p>
            <h1
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '28px',
                fontWeight: 700,
                marginBottom: '16px',
              }}
            >
              {user?.full_name}
            </h1>

            {/* Прогресс */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '13px', color: '#B0C5D8' }}>Прогресс обучения</span>
                  <span style={{ fontSize: '13px', color: '#fff', fontWeight: 600 }}>
                    {completedCount} / {totalModules}
                  </span>
                </div>
                <div style={{ height: '8px', background: 'rgba(176,197,216,0.2)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${progressPct}%`,
                      background: '#B0C5D8',
                      borderRadius: '4px',
                      transition: 'width 0.5s ease',
                    }}
                  />
                </div>
              </div>
              {completedCount === totalModules && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#B0C5D8' }}>
                  <Trophy size={20} weight="fill" />
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>Программа завершена!</span>
                </div>
              )}
            </div>
          </div>

          {/* Декоративный элемент */}
          <div
            style={{
              position: 'absolute',
              right: -20,
              top: -20,
              width: 140,
              height: 140,
              borderRadius: '50%',
              background: 'rgba(176,197,216,0.08)',
            }}
          />
        </div>

        {/* Заголовок раздела */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <BookOpen size={22} weight="fill" color="#1A2B4A" />
          <h2
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '20px',
              color: '#1A2B4A',
            }}
          >
            Маршрут обучения
          </h2>
        </div>

        {/* Сетка модулей */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '16px',
          }}
        >
          {MODULES_META.map((mod) => {
            const unlocked = isModuleUnlocked(mod.order)
            const prog = progress[mod.id]
            const passed = prog?.quizPassed ?? false
            const IconComponent = ICON_MAP[mod.icon] ?? UserCircle

            return (
              <ModuleCard
                key={mod.id}
                order={mod.order}
                title={mod.title}
                subtitle={mod.subtitle}
                icon={<IconComponent size={28} weight="fill" color={unlocked ? '#fff' : '#B0C5D8'} />}
                unlocked={unlocked}
                passed={passed}
                readTime={8}
                onClick={() => unlocked && navigate(`/module/${mod.id}`)}
              />
            )
          })}
        </div>

        {/* Подсказка */}
        {completedCount === 0 && (
          <div
            style={{
              marginTop: '24px',
              padding: '16px 20px',
              background: '#fff',
              borderRadius: '10px',
              borderLeft: '3px solid #B0C5D8',
              fontSize: '14px',
              color: '#607D8B',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <BookOpen size={18} weight="fill" color="#B0C5D8" />
            Начните с первого модуля — «Администратор». Каждый следующий открывается после прохождения теста.
          </div>
        )}

        {/* Блок после завершения */}
        {completedCount === totalModules && (
          <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div
              style={{
                background: 'linear-gradient(135deg, #1A2B4A 0%, #2a3f6a 100%)',
                borderRadius: '14px',
                padding: '28px 32px',
                color: '#fff',
              }}
            >
              <p style={{ fontSize: '13px', color: '#B0C5D8', fontWeight: 500, letterSpacing: '0.06em', marginBottom: '8px' }}>
                ЧТО ДАЛЬШЕ
              </p>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', fontWeight: 700, marginBottom: '20px' }}>
                Продолжайте развиваться
              </h3>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a
                  href="https://ea-brmed.ru"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: 'rgba(176,197,216,0.15)',
                    border: '1.5px solid rgba(176,197,216,0.3)',
                    borderRadius: '10px',
                    padding: '14px 20px',
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'background 0.15s',
                  }}
                >
                  <GraduationCap size={18} weight="fill" />
                  Сайт EA-B.R MED
                </a>
                <a
                  href="https://elizavetaant.github.io/medznania323/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: 'rgba(46,125,50,0.85)',
                    border: '1.5px solid rgba(46,125,50,0.6)',
                    borderRadius: '10px',
                    padding: '14px 20px',
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'background 0.15s',
                  }}
                >
                  <ChartBar size={18} weight="fill" />
                  Проверь правовые знания: медицина и закон
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Подарок после завершения */}
        {true && (
          <div
            style={{
              marginTop: '16px',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 4px 24px rgba(26,43,74,0.12)',
            }}
          >
            {/* Шапка подарка */}
            <div
              style={{
                background: 'linear-gradient(135deg, #1A2B4A 0%, #2a3f6a 100%)',
                padding: '20px 28px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <Gift size={28} weight="fill" color="#B0C5D8" />
              <div>
                <p style={{ fontSize: '11px', fontWeight: 700, color: '#B0C5D8', letterSpacing: '0.1em' }}>
                  ВАШ ПОДАРОК ЗА ПРОХОЖДЕНИЕ КУРСА
                </p>
                <p style={{ fontSize: '17px', fontWeight: 700, color: '#fff', fontFamily: 'Playfair Display, serif' }}>
                  Правовой брелок + Гайд для врача
                </p>
              </div>
            </div>

            {/* Тело карточки */}
            <div style={{ background: '#fff', padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

              {/* Ключевые законы */}
              <div>
                <p style={{ fontSize: '11px', fontWeight: 700, color: '#B0C5D8', letterSpacing: '0.08em', marginBottom: '12px' }}>
                  КЛЮЧЕВЫЕ ЗАКОНЫ НА БРЕЛОКЕ
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {[
                    'ФЗ-323 — Основы охраны здоровья',
                    'Ст. 72 — Права медработника',
                    'ФЗ-152 — Персональные данные',
                    'Ст. 152 ГК — Защита чести',
                    'ЗоЗПП Ст. 32 — Возврат средств',
                    'Ст. 196 ТК — Право на обучение',
                  ].map((law) => (
                    <span
                      key={law}
                      style={{
                        background: '#F4F7FB',
                        border: '1px solid #e0e7ef',
                        borderRadius: '20px',
                        padding: '5px 12px',
                        fontSize: '12px',
                        color: '#1A2B4A',
                        fontWeight: 500,
                      }}
                    >
                      {law}
                    </span>
                  ))}
                </div>
              </div>

              {/* Контакты */}
              <div>
                <p style={{ fontSize: '11px', fontWeight: 700, color: '#B0C5D8', letterSpacing: '0.08em', marginBottom: '12px' }}>
                  КОНТАКТЫ АНТОШИНОЙ ЕЛИЗАВЕТЫ
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
                  {[
                    { icon: <TelegramLogo size={16} weight="fill" color="#1A2B4A" />, label: 'Telegram', value: '@ElizavetaAnt', href: 'https://t.me/ElizavetaAnt' },
                    { icon: <Phone size={16} weight="fill" color="#1A2B4A" />, label: 'Телефон', value: '+7 (495) 728-69-16', href: 'tel:+74957286916' },
                    { icon: <Envelope size={16} weight="fill" color="#1A2B4A" />, label: 'Email', value: 'ant.elizaveta.a@gmail.com', href: 'mailto:ant.elizaveta.a@gmail.com' },
                    { icon: <Globe size={16} weight="fill" color="#1A2B4A" />, label: 'Сайт', value: 'ea-brmed.ru', href: 'https://ea-brmed.ru' },
                  ].map((contact) => (
                    <a
                      key={contact.label}
                      href={contact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 14px',
                        background: '#F4F7FB',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        border: '1px solid #e0e7ef',
                      }}
                    >
                      {contact.icon}
                      <div>
                        <p style={{ fontSize: '10px', color: '#607D8B', fontWeight: 500 }}>{contact.label}</p>
                        <p style={{ fontSize: '12px', color: '#1A2B4A', fontWeight: 600 }}>{contact.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <p style={{ fontSize: '12px', color: '#607D8B', lineHeight: 1.6, borderTop: '1px solid #e0e7ef', paddingTop: '16px' }}>
                Физический брелок с ключевыми статьями закона будет передан вам лично. По вопросам получения свяжитесь через Telegram или WhatsApp.
              </p>
            </div>
          </div>
        )}

        {/* Контакты */}
        <div
          style={{
            marginTop: '40px',
            padding: '20px 24px',
            background: '#fff',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            boxShadow: '0 2px 12px rgba(26,43,74,0.06)',
          }}
        >
          <div>
            <p style={{ fontSize: '13px', fontWeight: 600, color: '#1A2B4A', marginBottom: '2px' }}>EA-B.R MED</p>
            <p style={{ fontSize: '12px', color: '#607D8B' }}>Образовательная платформа для стоматологов</p>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
            <a href="https://ea-brmed.ru" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: '13px', color: '#1A2B4A', textDecoration: 'none', fontWeight: 500 }}>
              ea-brmed.ru
            </a>
            <a href="https://elizavetaant.github.io/eabr-med/#" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: '13px', color: '#607D8B', textDecoration: 'none' }}>
              elizavetaant.github.io/eabr-med
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}

function ModuleCard({
  order, title, subtitle, icon, unlocked, passed, readTime, onClick,
}: {
  order: number
  title: string
  subtitle: string
  icon: React.ReactNode
  unlocked: boolean
  passed: boolean
  readTime: number
  onClick: () => void
}) {
  return (
    <div
      onClick={onClick}
      style={{
        background: '#fff',
        borderRadius: '14px',
        padding: '20px',
        cursor: unlocked ? 'pointer' : 'not-allowed',
        opacity: unlocked ? 1 : 0.6,
        boxShadow: '0 2px 12px rgba(26,43,74,0.06)',
        transition: 'transform 0.15s, box-shadow 0.15s',
        border: passed ? '2px solid #2E7D32' : '2px solid transparent',
        position: 'relative',
      }}
      onMouseEnter={(e) => {
        if (unlocked) {
          e.currentTarget.style.transform = 'translateY(-2px)'
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(26,43,74,0.12)'
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 2px 12px rgba(26,43,74,0.06)'
      }}
    >
      {/* Иконка */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: '12px',
            background: unlocked ? '#1A2B4A' : '#e0e7ef',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {unlocked ? icon : <LockSimple size={22} weight="fill" color="#607D8B" />}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#B0C5D8', letterSpacing: '0.05em' }}>
            {String(order).padStart(2, '0')}
          </span>
          {passed && (
            <CheckCircle size={20} weight="fill" color="#2E7D32" />
          )}
        </div>
      </div>

      {/* Текст */}
      <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1A2B4A', marginBottom: '4px', fontFamily: 'Inter, sans-serif' }}>
        {title}
      </h3>
      <p style={{ fontSize: '13px', color: '#607D8B', lineHeight: 1.4, marginBottom: '12px' }}>
        {subtitle}
      </p>

      {/* Нижняя строка */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <Timer size={14} weight="fill" color="#B0C5D8" />
        <span style={{ fontSize: '12px', color: '#B0C5D8' }}>{readTime} мин</span>
        {passed && (
          <span
            style={{
              marginLeft: 'auto',
              fontSize: '11px',
              fontWeight: 600,
              color: '#2E7D32',
              background: '#F1F8E9',
              padding: '2px 8px',
              borderRadius: '10px',
            }}
          >
            Пройден
          </span>
        )}
        {unlocked && !passed && (
          <span
            style={{
              marginLeft: 'auto',
              fontSize: '11px',
              fontWeight: 600,
              color: '#1A2B4A',
              background: '#F4F7FB',
              padding: '2px 8px',
              borderRadius: '10px',
            }}
          >
            Начать
          </span>
        )}
      </div>
    </div>
  )
}
