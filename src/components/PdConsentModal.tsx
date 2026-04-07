import { useState } from 'react'
import { CheckCircle, X, ShieldCheck } from '@phosphor-icons/react'

interface PdConsentModalProps {
  userName: string
  onAccept: () => void
  onDecline: () => void
}

export function PdConsentModal({ userName, onAccept, onDecline }: PdConsentModalProps) {
  const [agreed, setAgreed] = useState(false)

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(10,20,40,0.72)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px',
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '560px',
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: '0 8px 48px rgba(0,0,0,0.28)',
        }}
      >
        {/* Заголовок */}
        <div
          style={{
            background: '#1A2B4A',
            borderRadius: '16px 16px 0 0',
            padding: '24px 28px',
            color: '#fff',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ShieldCheck size={28} weight="fill" color="#60a5fa" style={{ flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: '12px', color: '#B0C5D8', letterSpacing: '0.08em', marginBottom: '4px' }}>
                В СООТВЕТСТВИИ С ФЗ-152
              </div>
              <h2 style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'Playfair Display, serif' }}>
                Согласие на обработку персональных данных
              </h2>
            </div>
          </div>
          <button
            onClick={onDecline}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#B0C5D8',
              padding: '4px',
              flexShrink: 0,
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Текст согласия */}
        <div style={{ padding: '24px 28px', fontSize: '14px', lineHeight: 1.8, color: '#1A2B4A' }}>
          <p style={{ marginBottom: '12px' }}>
            Я, <strong>{userName || 'Пользователь'}</strong>, в соответствии со ст. 9 Федерального
            закона № 152-ФЗ «О персональных данных», настоящим даю согласие{' '}
            <strong>Антошиной Елизавете Анатольевне</strong> (ИНН 773135593234, самозанятая) на
            обработку моих персональных данных.
          </p>

          <div
            style={{
              background: '#F4F7FB',
              borderRadius: '10px',
              padding: '16px 20px',
              marginBottom: '16px',
              fontSize: '13px',
              color: '#455A64',
            }}
          >
            <strong style={{ display: 'block', marginBottom: '8px', color: '#1A2B4A' }}>
              Состав обрабатываемых данных:
            </strong>
            <ul style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <li>Фамилия, имя, отчество</li>
              <li>Адрес электронной почты</li>
              <li>Дата и факт подписания договора</li>
            </ul>
          </div>

          <div
            style={{
              background: '#F4F7FB',
              borderRadius: '10px',
              padding: '16px 20px',
              marginBottom: '16px',
              fontSize: '13px',
              color: '#455A64',
            }}
          >
            <strong style={{ display: 'block', marginBottom: '8px', color: '#1A2B4A' }}>
              Цели обработки:
            </strong>
            <ul style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <li>Заключение и исполнение лицензионного договора</li>
              <li>Идентификация стороны договора</li>
              <li>Направление уведомлений об обучении</li>
            </ul>
          </div>

          <div
            style={{
              background: '#F4F7FB',
              borderRadius: '10px',
              padding: '16px 20px',
              marginBottom: '16px',
              fontSize: '13px',
              color: '#455A64',
            }}
          >
            <strong style={{ display: 'block', marginBottom: '8px', color: '#1A2B4A' }}>
              Условия обработки:
            </strong>
            <ul style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <li>Обработка без передачи третьим лицам</li>
              <li>Хранение на серверах в России (Supabase EU — уведомление РКН направлено)</li>
              <li>Срок: в течение действия договора + 3 года</li>
              <li>Право отозвать согласие: письменный запрос на ea-brmed.ru</li>
            </ul>
          </div>

          <p style={{ fontSize: '12px', color: '#90A4AE', lineHeight: 1.7 }}>
            Вы вправе отозвать настоящее согласие в любое время, направив запрос через форму обратной
            связи на сайте ea-brmed.ru. Обработка ПДн осуществляется в соответствии с ФЗ-152 «О
            персональных данных» (ред. 30.05.2025).
          </p>
        </div>

        {/* Чекбокс и кнопки */}
        <div
          style={{
            padding: '20px 28px 28px',
            borderTop: '1px solid #e0e7ef',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div
            onClick={() => setAgreed(!agreed)}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              cursor: 'pointer',
              padding: '14px',
              background: agreed ? '#F1F8E9' : '#F4F7FB',
              borderRadius: '10px',
              border: `1.5px solid ${agreed ? '#2E7D32' : '#e0e7ef'}`,
              transition: 'all 0.2s',
            }}
          >
            <CheckCircle
              size={22}
              weight="fill"
              color={agreed ? '#2E7D32' : '#B0C5D8'}
              style={{ flexShrink: 0, marginTop: '1px' }}
            />
            <span style={{ fontSize: '13px', lineHeight: 1.6, color: '#1A2B4A', userSelect: 'none' }}>
              Я, <strong>{userName}</strong>, подтверждаю своё согласие на обработку персональных
              данных в целях исполнения договора в соответствии с ФЗ-152.
            </span>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={onDecline}
              style={{
                flex: 1,
                background: '#F4F7FB',
                color: '#607D8B',
                border: '1.5px solid #e0e7ef',
                borderRadius: '10px',
                padding: '12px',
                fontSize: '14px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              Отказаться
            </button>
            <button
              onClick={onAccept}
              disabled={!agreed}
              style={{
                flex: 2,
                background: !agreed ? '#e0e7ef' : '#1A2B4A',
                color: !agreed ? '#90A4AE' : '#fff',
                border: 'none',
                borderRadius: '10px',
                padding: '12px',
                fontSize: '14px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                cursor: !agreed ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
              }}
            >
              Подтверждаю согласие и продолжаю
            </button>
          </div>
          <p style={{ fontSize: '11px', color: '#90A4AE', textAlign: 'center', lineHeight: 1.5 }}>
            <a href="/#/privacy-policy" style={{ color: '#90A4AE' }}>Политика обработки ПДн</a>
            {' · '}
            <a href="/#/terms" style={{ color: '#90A4AE' }}>Условия использования</a>
          </p>
        </div>
      </div>
    </div>
  )
}
