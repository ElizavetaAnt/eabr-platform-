import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, Warning, FileText, ArrowRight } from '@phosphor-icons/react'
import { supabase } from '../lib/supabase'
import { useAppStore } from '../store/useAppStore'
import { PdConsentModal } from '../components/PdConsentModal'

export function ContractScreen() {
  const navigate = useNavigate()
  const { user, setUser } = useAppStore()
  const [pdConsentAccepted, setPdConsentAccepted] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)
  const contractNumber = user?.contract_number ?? 118

  const handleSign = async () => {
    if (!user || !agreed) return
    setLoading(true)

    const now = new Date().toISOString()
    const { error } = await supabase
      .from('profiles')
      .update({ contract_signed_at: now })
      .eq('id', user.id)

    if (!error) {
      setUser({ ...user, contract_signed_at: now })
      navigate('/dashboard')
    }

    setLoading(false)
  }

  if (!pdConsentAccepted) {
    return (
      <PdConsentModal
        userName={user?.full_name ?? ''}
        onAccept={() => setPdConsentAccepted(true)}
        onDecline={() => navigate('/login')}
      />
    )
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#F4F7FB',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '32px 20px',
      }}
    >
      <div style={{ width: '100%', maxWidth: '720px' }}>
        {/* Заголовок */}
        <div
          className="contract-header"
          style={{
            background: '#1A2B4A',
            borderRadius: '16px 16px 0 0',
            padding: '32px 40px',
            color: '#fff',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <FileText size={28} weight="fill" color="#B0C5D8" />
            <span style={{ fontSize: '13px', color: '#B0C5D8', fontWeight: 500, letterSpacing: '0.08em' }}>
              ЛИЦЕНЗИОННЫЙ ДОГОВОР № {contractNumber}
            </span>
          </div>
          <h1
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '26px',
              fontWeight: 700,
              marginBottom: '8px',
            }}
          >
            Условия использования материалов
          </h1>
          <p style={{ fontSize: '14px', color: '#B0C5D8', lineHeight: 1.6 }}>
            Перед началом обучения необходимо ознакомиться с договором и подтвердить согласие
          </p>
        </div>

        {/* Тело договора */}
        <div
          style={{
            background: '#fff',
            padding: '24px 20px',
            fontSize: '14px',
            lineHeight: 1.8,
            color: '#1A2B4A',
          }}
        >
          <ContractText userName={user?.full_name ?? ''} />
        </div>

        {/* Подтверждение */}
        <div
          className="contract-footer"
          style={{
            background: '#fff',
            borderTop: '1px solid #e0e7ef',
            borderRadius: '0 0 16px 16px',
            padding: '28px 40px',
            boxShadow: '0 4px 24px rgba(26,43,74,0.08)',
          }}
        >
          <div
            onClick={() => setAgreed(!agreed)}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              cursor: 'pointer',
              marginBottom: '20px',
              padding: '16px',
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
            <span style={{ fontSize: '14px', lineHeight: 1.6, color: '#1A2B4A', userSelect: 'none' }}>
              Я, <strong>{user?.full_name}</strong>, ознакомился(-ась) с условиями Лицензионного
              договора № {contractNumber} и полностью принимаю их. Я понимаю, что несанкционированное
              распространение материалов влечёт штраф в размере <strong>5 000 000 рублей</strong>.
            </span>
          </div>

          {/* Предупреждение */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              padding: '12px 16px',
              background: '#FFF8E1',
              borderRadius: '8px',
              borderLeft: '3px solid #E65100',
              marginBottom: '20px',
            }}
          >
            <Warning size={18} weight="fill" color="#E65100" style={{ flexShrink: 0, marginTop: '2px' }} />
            <p style={{ fontSize: '13px', color: '#E65100', lineHeight: 1.5 }}>
              Дата и время подписания фиксируются автоматически и являются юридически значимыми.
            </p>
          </div>

          <button
            onClick={handleSign}
            disabled={!agreed || loading}
            style={{
              width: '100%',
              background: !agreed ? '#e0e7ef' : '#1A2B4A',
              color: !agreed ? '#607D8B' : '#fff',
              border: 'none',
              borderRadius: '10px',
              padding: '14px 24px',
              fontSize: '15px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              cursor: !agreed ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.2s',
            }}
          >
            {loading ? 'Сохраняем...' : 'Подтвердить и начать обучение'}
            {!loading && <ArrowRight size={18} weight="fill" />}
          </button>
        </div>
      </div>
    </div>
  )
}

function formatDate(date: Date): string {
  const day = date.getDate()
  const months = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря']
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  return `«${day}» ${month} ${year}г.`
}

function ContractText({ userName }: { userName: string }) {
  const today = formatDate(new Date())
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Личное письмо */}
      <div
        style={{
          background: '#F4F7FB',
          borderRadius: '10px',
          padding: '20px 24px',
          fontSize: '14px',
          color: '#1A2B4A',
          lineHeight: 1.8,
          borderLeft: '3px solid #B0C5D8',
        }}
      >
        <p style={{ marginBottom: '12px' }}>
          Как врачи, вы меня поймете: когда ты несколько лет делаешь свою работу с одним пациентом, добиваешься нереальных результатов, а потом твой труд присваивает себе другой врач. Выдает за свой и начинает на этом зарабатывать деньги. Что ты чувствуешь? Поэтому мы подписываем договор о том, что данный материал предоставляется только одному человеку.
        </p>
        <p>
          Я заинтересована в обучении и поддержке своих студентов. Я специально сделала минимальную цену за это обучение, чтобы каждый врач в РФ мог себе это позволить, хотя это очень дорогое и ценное обучение. Вместо того чтобы противозаконно передавать материал третьему лицу, я предлагаю другое: за рекомендацию к покупке курса по твоим ФИО я отдаю 15% от стоимости курса тебе либо могу сделать скидку на эту сумму тому, кого ты порекомендовал.
        </p>
      </div>

      <div
        style={{
          background: '#F4F7FB',
          borderRadius: '8px',
          padding: '12px 16px',
          fontSize: '13px',
          color: '#607D8B',
        }}
      >
        г. Москва &nbsp;{today} &nbsp;|&nbsp; ИНН: 773135593234 &nbsp;|&nbsp; Самозанятая
      </div>

      <div style={{ fontSize: '14px', color: '#1A2B4A', lineHeight: 1.8 }}>
        Антошина Елизавета Анатольевна, применяющая специальный налоговый режим «Налог на профессиональный доход» (самозанятая), ИНН 773135593234, именуемая в дальнейшем «Исполнитель», с одной стороны, и{' '}
        <strong>{userName || 'Пользователь'}</strong>, именуемый(ая) в дальнейшем «Заказчик», с другой стороны, заключили настоящий Договор о нижеследующем:
      </div>

      <Section title="1. Предмет договора">
        <p>1.1. Исполнитель предоставляет Заказчику доступ к авторским обучающим материалам проекта https://ea-brmed.ru (далее — «Материалы»).</p>
        <p>1.2. Материалы предоставляются Заказчику исключительно для личного изучения.</p>
        <p>1.3. Доступ к Материалам предоставляется Исполнителем в течение 24 часов с момента исполнения Заказчиком обязанности по оплате.</p>
      </Section>

      <Section title="2. Интеллектуальная собственность">
        <p>2.1. Все Материалы являются объектом авторского права. Исключительные права принадлежат Исполнителю.</p>
        <p>2.2. Заказчику предоставляется простая (неисключительная) лицензия без права передачи третьим лицам.</p>
        <p style={{ marginTop: '8px' }}>2.3. Заказчику запрещается:</p>
        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '6px' }}>
          <li>пересылать Материалы полностью или частично третьим лицам;</li>
          <li>передавать Материалы через мессенджеры (Telegram, WhatsApp и др.);</li>
          <li>публиковать Материалы в социальных сетях, на сайтах, форумах;</li>
          <li>загружать Материалы в облачные хранилища (Google Drive, Яндекс.Диск и др.);</li>
          <li>участвовать в складчинах и коллективных покупках;</li>
          <li>использовать Материалы в коммерческих целях.</li>
        </ul>
      </Section>

      <Section title="3. Ответственность">
        <p>3.1. Материалы могут содержать цифровые метки для идентификации получателя.</p>
        <p>3.2. В соответствии со ст. 1252, 1253 и 1301 ГК РФ незаконное использование Материалов влечет ответственность.</p>
        <p>3.3. За каждый установленный факт незаконной передачи или распространения Материалов Заказчик обязуется выплатить Исполнителю компенсацию в размере <strong>5 000 000 (Пять миллионов) рублей</strong>. Стороны признают данный размер компенсации соразмерным ценности интеллектуальной собственности Исполнителя.</p>
      </Section>

      <Section title="4. Персональные данные">
        <p>4.1. Подписывая настоящий Договор, Заказчик дает согласие Исполнителю на обработку своих персональных данных (ФИО, ИНН, контактные данные) в целях исполнения обязательств по Договору в соответствии с ФЗ-152 «О персональных данных».</p>
      </Section>

      <Section title="5. Условия возврата">
        <p>5.1. Поскольку доступ к Материалам предоставляется в цифровом виде, возврат денежных средств после предоставления доступа не производится, так как услуга считается оказанной в полном объеме (в соответствии со ст. 32 Закона «О защите прав потребителей»).</p>
      </Section>

      <Section title="6. Партнёрская программа">
        <p>6.1. При рекомендации Материалов третьим лицам, Заказчик имеет право на вознаграждение в размере <strong>15%</strong> от стоимости, оплаченной новым клиентом, при условии указания ФИО Заказчика в качестве рекомендателя.</p>
      </Section>

      <Section title="7. Заключительные положения">
        <p>7.1. Договор вступает в силу с момента оплаты Материалов.</p>
        <p>7.2. Споры разрешаются в соответствии с законодательством РФ.</p>
      </Section>

      <div
        style={{
          background: '#F4F7FB',
          borderRadius: '8px',
          padding: '16px',
          fontSize: '13px',
          color: '#607D8B',
          lineHeight: 1.7,
        }}
      >
        <strong style={{ color: '#1A2B4A' }}>ИСПОЛНИТЕЛЬ:</strong><br />
        Антошина Елизавета Анатольевна<br />
        ИНН: 773135593234<br />
        <br />
        <strong style={{ color: '#1A2B4A' }}>ЗАКАЗЧИК:</strong><br />
        {userName}
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3
        style={{
          fontSize: '13px',
          fontWeight: 700,
          color: '#455A64',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: '8px',
        }}
      >
        {title}
      </h3>
      <div style={{ fontSize: '14px', color: '#1A2B4A', lineHeight: 1.8 }}>{children}</div>
    </div>
  )
}
