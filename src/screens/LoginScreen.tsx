import { useState } from 'react'
import { EnvelopeSimple, LockSimple, ArrowRight } from '@phosphor-icons/react'
import { supabase } from '../lib/supabase'

export function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError('Неверный email или пароль. Обратитесь к администратору.')
      setLoading(false)
      return
    }

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

          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#607D8B', marginBottom: '6px', fontWeight: 500 }}>
              Пароль
            </label>
            <div style={{ position: 'relative' }}>
              <LockSimple
                size={18}
                weight="fill"
                color="#B0C5D8"
                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Введите пароль"
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
            {loading ? 'Входим...' : 'Войти'}
            {!loading && <ArrowRight size={18} weight="fill" />}
          </button>
        </form>

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
      </div>
    </div>
  )
}
