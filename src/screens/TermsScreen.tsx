import { useNavigate } from 'react-router-dom'
import { ArrowLeft, FileText } from '@phosphor-icons/react'
import { Footer } from '../components/layout/Footer'

export function TermsScreen() {
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
          <FileText size={32} weight="fill" color="#B0C5D8" style={{ flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: '11px', color: '#B0C5D8', letterSpacing: '0.1em', marginBottom: '4px' }}>
              ПЛАТФОРМА EA-BRMED.RU
            </div>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', fontWeight: 700 }}>
              Условия использования
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
              1. Общие положения
            </h2>
            <p>
              Настоящие Условия регулируют использование образовательной платформы EA-BRMED.RU и
              правового тренажёра «МедЗнания», разработанных Антошиной Елизаветой Анатольевной
              (ИНН 773135593234, самозанятая). Используя платформу, вы принимаете настоящие Условия.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '13px', fontWeight: 700, color: '#455A64', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
              2. Доступ к платформе
            </h2>
            <p>
              Доступ к обучающим материалам предоставляется на основании лицензионного договора
              после оплаты. Доступ к правовому тренажёру предоставляется по коду и предназначен
              исключительно для личного использования.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '13px', fontWeight: 700, color: '#455A64', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
              3. Интеллектуальная собственность
            </h2>
            <p>
              Все материалы платформы (тексты, сценарии, вопросы, разборы) являются объектами
              авторского права и принадлежат Антошиной Елизавете Анатольевне. Запрещается копирование,
              распространение и передача материалов третьим лицам без письменного согласия
              правообладателя.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '13px', fontWeight: 700, color: '#455A64', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
              4. Использование результатов тестов
            </h2>
            <p>
              Результаты прохождения тренажёров обрабатываются анонимно и используются исключительно
              для улучшения учебных программ. Платформа не передаёт результаты работодателям,
              медицинским организациям или государственным органам без явного письменного согласия
              пользователя.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '13px', fontWeight: 700, color: '#455A64', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
              5. Ограничение ответственности
            </h2>
            <p>
              Материалы платформы носят информационно-образовательный характер и не являются
              юридической консультацией. Актуальность нормативных актов проверяется на дату
              обновления модуля. Оператор не несёт ответственности за изменения законодательства,
              произошедшие после даты публикации.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '13px', fontWeight: 700, color: '#455A64', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
              6. Обратная связь и споры
            </h2>
            <p>
              По вопросам использования платформы:{' '}
              <a href="https://t.me/eabrmed" target="_blank" rel="noopener" style={{ color: '#1A2B4A' }}>
                Telegram @eabrmed
              </a>{' '}
              или форма обратной связи на ea-brmed.ru. Споры разрешаются в соответствии с
              законодательством Российской Федерации.
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
            Редакция от 07.04.2026.
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
