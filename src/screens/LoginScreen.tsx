import { useState } from 'react'
import { EnvelopeSimple, ArrowRight, CheckCircle } from '@phosphor-icons/react'
import { supabase } from '../lib/supabase'

export function LoginScreen() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error: authError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    })

    if (authError) {
      setError('Не удалось отправить письмо. Проверьте email или обратитесь к администратору.')
      setLoading(false)
      return
    }

    setSent(true)
    setLoading(false)
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#F4F7FB',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '48px 40px',
          width: '100%',
          maxWidth: '420px',
          boxShadow: '0 4px 32px rgba(26,43,74,0.10)',
        }}
      >
        {/* Логотип */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: '#1A2B4A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              fontFamily: 'Playfair Display, serif',
              fontWeight: 700,
              fontSize: '22px',
              color: '#B0C5D8',
            }}
          >
            EA
          </div>
          <h1
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '24px',
              color: '#1A2B4A',
              marginBottom: '6px',
            }}
          >
            EA-B.R MED
          </h1>
          <p style={{ fontSize: '14px', color: '#607D8B' }}>
            Образовательная платформа для специалистов
          </p>
        </div>

        {sent ? (
          /* Состояние "письмо отправлено" */
          <div style={{ textAlign: 'center' }}>
            <CheckCircle
              size={56}
              weight="fill"
              color="#4CAF50"
              style={{ margin: '0 auto 16px', display: 'block' }}
            />
            <h2
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '20px',
                color: '#1A2B4A',
                marginBottom: '12px',
              }}
            >
              Проверьте почту
            </h2>
            <p style={{ fontSize: '14px', color: '#607D8B', lineHeight: 1.6 }}>
              Мы отправили ссылку для входа на{' '}
              <strong style={{ color: '#1A2B4A' }}>{email}</strong>.
              <br />
              Нажмите на ссылку в письме — и вы войдёте автоматически.
            </p>
            <p style={{ fontSize: '12px', color: '#B0C5D8', marginTop: '16px' }}>
              Письмо не пришло? Проверьте папку «Спам»
              <br />
              или{' '}
              <span
                onClick={() => setSent(false)}
                style={{ color: '#1A2B4A', cursor: 'pointer', textDecoration: 'underline' }}
              >
                попробуйте снова
              </span>
            </p>
          </div>
        ) : (
          /* Форма */
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#607D8B', marginBottom: '6px', fontWeight: 500 }}>
                Email
              </label>
              <div style={{ position: 'relative' }}>
                <EnvelopeSimple
                  size={18}
                  weight="fill"
                  color="#B0C5D8"
                  style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="ваш@email.ru"
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 38px',
                    border: '1.5px solid #e0e7ef',
                    borderRadius: '8px',
                    fontSize: '15px',
                    fontFamily: 'Inter, sans-serif',
                    outline: 'none',
                    color: '#1A2B4A',
                    background: '#F4F7FB',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            {error && (
              <div
                style={{
                  padding: '10px 14px',
                  background: '#FFEBEE',
                  borderRadius: '8px',
                  color: '#C62828',
                  fontSize: '13px',
                  borderLeft: '3px solid #C62828',
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                background: loading ? '#B0C5D8' : '#1A2B4A',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 24px',
                fontSize: '15px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'background 0.15s',
                marginTop: '4px',
              }}
            >
              {loading ? 'Отправляем...' : 'Войти без пароля'}
              {!loading && <ArrowRight size={18} weight="fill" />}
            </button>
          </form>
        )}

        {!sent && (
          <p
            style={{
              textAlign: 'center',
              fontSize: '12px',
              color: '#607D8B',
              marginTop: '24px',
              lineHeight: 1.5,
            }}
          >
            Доступ предоставляется администратором.
            <br />
            По вопросам: ea-brmed.ru
          </p>
        )}
      </div>
    </div>
  )
}
