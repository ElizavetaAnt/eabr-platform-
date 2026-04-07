import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ShieldCheck } from '@phosphor-icons/react'
import { Footer } from '../components/layout/Footer'

export function PrivacyPolicyScreen() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', background: '#F4F7FB', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, maxWidth: '760px', width: '100%', margin: '0 auto', padding: '32px 20px' }}>
        <button
          type="button"
          onClick={() => navigate(-1)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#607D8B',
            fontSize: '14px',
            fontFamily: 'Inter, sans-serif',
            marginBottom: '24px',
            padding: 0,
          }}
        >
          <ArrowLeft size={16} />
          Назад
        </button>

        <div
          style={{
            background: '#1A2B4A',
            borderRadius: '16px 16px 0 0',
            padding: '28px 32px',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
          }}
        >
          <ShieldCheck size={32} weight="fill" color="#60a5fa" style={{ flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: '11px', color: '#B0C5D8', letterSpacing: '0.1em', marginBottom: '4px' }}>
              В СООТВЕТСТВИИ С ФЗ-152 «О ПЕРСОНАЛЬНЫХ ДАННЫХ»
            </div>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', fontWeight: 700 }}>
              Политика обработки персональных данных
            </h1>
          </div>
        </div>

        <div
          style={{
            background: '#fff',
            padding: '32px',
            fontSize: '14px',
            lineHeight: 1.9,
            color: '#1A2B4A',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            borderRadius: '0 0 16px 16px',
            boxShadow: '0 4px 24px rgba(26,43,74,0.08)',
          }}
        >
          <section>
            <h2 style={{ fontSize: '13px', fontWeight: 700, color: '#455A64', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
              1. Оператор персональных данных
            </h2>
            <p>
              Антошина Елизавета Анатольевна, применяющая специальный налоговый режим «Налог на
              профессиональный доход» (самозанятая), ИНН 773135593234, сайт: ea-brmed.ru
              (далее — Оператор).
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '13px', fontWeight: 700, color: '#455A64', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
              2. Состав обрабатываемых данных
            </h2>
            <p style={{ marginBottom: '8px' }}>
              <strong>При заключении договора:</strong> ФИО, адрес электронной почты, дата и факт
              подписания договора.
            </p>
            <p>
              <strong>При прохождении тестов и тренажёров:</strong> только роль специалиста
              (врач / медсестра / руководитель / студент) и результаты теста в процентах.
              Имя, email, IP-адрес и любые идентификаторы личности <strong>не собираются и не
              передаются.</strong>
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '13px', fontWeight: 700, color: '#455A64', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
              3. Цели обработки
            </h2>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>Заключение и исполнение лицензионного договора (ст. 6 ч. 1 п. 5 ФЗ-152)</li>
              <li>Идентификация стороны договора</li>
              <li>Направление уведомлений об обучении</li>
              <li>Анонимная аналитика результатов обучения (улучшение программ)</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '13px', fontWeight: 700, color: '#455A64', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
              4. Передача данных третьим лицам
            </h2>
            <p>
              Персональные данные не передаются третьим лицам, не продаются и не используются в
              маркетинговых целях. Анонимные агрегированные результаты тестов могут использоваться
              для улучшения учебных программ.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '13px', fontWeight: 700, color: '#455A64', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
              5. Аналитика и внешние сервисы
            </h2>
            <p>
              Платформа <strong>не использует</strong> Google Analytics, Facebook Pixel или иные
              западные трекеры. Для агрегированной статистики посещаемости сайта используется{' '}
              <strong>Яндекс.Метрика</strong> (российский сервис). Результаты тестов хранятся
              анонимно в базе данных.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '13px', fontWeight: 700, color: '#455A64', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
              6. Хранение данных
            </h2>
            <p>
              Данные хранятся в защищённой базе данных в течение срока действия договора и 3 лет
              после его окончания в соответствии с требованиями гражданского законодательства.
              Уведомление об операторе направлено в Роскомнадзор.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '13px', fontWeight: 700, color: '#455A64', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
              7. Права субъекта персональных данных
            </h2>
            <p style={{ marginBottom: '8px' }}>
              В соответствии со ст. 14–17 ФЗ-152 вы вправе:
            </p>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>получить сведения об обработке своих ПДн;</li>
              <li>потребовать уточнения, блокировки или уничтожения данных;</li>
              <li>отозвать согласие на обработку в любое время;</li>
              <li>обратиться с жалобой в Роскомнадзор (rkn.gov.ru).</li>
            </ul>
            <p style={{ marginTop: '10px' }}>
              Для реализации прав: форма обратной связи на{' '}
              <a href="https://ea-brmed.ru" target="_blank" rel="noopener" style={{ color: '#1A2B4A' }}>
                ea-brmed.ru
              </a>
              {' '}или Telegram{' '}
              <a href="https://t.me/eabrmed" target="_blank" rel="noopener" style={{ color: '#1A2B4A' }}>
                @eabrmed
              </a>.
            </p>
          </section>

          <div
            style={{
              background: '#F4F7FB',
              borderRadius: '10px',
              padding: '16px 20px',
              fontSize: '12px',
              color: '#90A4AE',
            }}
          >
            Редакция от 07.04.2026. Оператор вправе изменять настоящую Политику. Актуальная версия
            всегда доступна на странице ea-brmed.ru/privacy-policy.
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
