import { useNavigate, useLocation } from 'react-router-dom'
import { SignOut, House, ShieldCheck, User, Lock, Eye, EyeSlash } from '@phosphor-icons/react'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useAppStore } from '../../store/useAppStore'

export function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, reset } = useAppStore()
  const [menuOpen, setMenuOpen] = useState(false)
  const [changingPassword, setChangingPassword] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [pwMsg, setPwMsg] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    reset()
    navigate('/login')
  }

  const handleChangePassword = async () => {
    if (newPassword.length < 6) {
      setPwMsg('Минимум 6 символов')
      return
    }
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) {
      setPwMsg('Ошибка: ' + error.message)
    } else {
      setPwMsg('Пароль изменён!')
      setNewPassword('')
      setTimeout(() => { setChangingPassword(false); setPwMsg(''); setMenuOpen(false) }, 1500)
    }
  }

  const isActive = (path: string) => location.pathname === path

  return (
    <header
      style={{
        background: '#1A2B4A',
        color: '#fff',
        padding: '0 24px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 12px rgba(26,43,74,0.15)',
      }}
    >
      {/* Логотип */}
      <div
        onClick={() => navigate('/dashboard')}
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: '#B0C5D8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Playfair Display, serif',
            fontWeight: 700,
            fontSize: '14px',
            color: '#1A2B4A',
          }}
        >
          EA
        </div>
        <span
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '16px',
            fontWeight: 600,
            letterSpacing: '0.02em',
          }}
        >
          EA-B.R MED
        </span>
      </div>

      {/* Навигация */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <NavBtn
          icon={<House size={20} weight="fill" />}
          label="Главная"
          active={isActive('/dashboard')}
          onClick={() => navigate('/dashboard')}
        />
        {user?.role === 'admin' && (
          <NavBtn
            icon={<ShieldCheck size={20} weight="fill" />}
            label="Админ"
            active={isActive('/admin')}
            onClick={() => navigate('/admin')}
          />
        )}
        <div style={{ width: '1px', height: '20px', background: 'rgba(176,197,216,0.3)', margin: '0 4px' }} />
        {user && (
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => { setMenuOpen(!menuOpen); setChangingPassword(false); setPwMsg('') }}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#B0C5D8',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13px',
                padding: '6px 10px',
                borderRadius: '6px',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(176,197,216,0.1)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
                      <User size={16} weight="fill" />
              <span className="header-user-name">{user.full_name}</span>
            </button>

            {menuOpen && (
              <div style={{
                position: 'absolute',
                right: 0,
                top: '42px',
                background: '#fff',
                borderRadius: '10px',
                boxShadow: '0 8px 24px rgba(26,43,74,0.15)',
                minWidth: '240px',
                zIndex: 200,
                overflow: 'hidden',
              }}>
                {!changingPassword ? (
                  <button
                    type="button"
                    onClick={() => setChangingPassword(true)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '13px',
                      color: '#1A2B4A',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    <Lock size={15} weight="fill" color="#607D8B" />
                    Сменить пароль
                  </button>
                ) : (
                  <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ position: 'relative' }}>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Новый пароль"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        style={{
                          padding: '8px 36px 8px 10px',
                          border: '1.5px solid #e0e7ef',
                          borderRadius: '6px',
                          fontSize: '13px',
                          fontFamily: 'Inter, sans-serif',
                          outline: 'none',
                          width: '100%',
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          position: 'absolute',
                          right: '8px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#607D8B',
                          padding: 0,
                          display: 'flex',
                        }}
                      >
                        {showPassword ? <EyeSlash size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {pwMsg && (
                      <p style={{ fontSize: '12px', color: pwMsg.includes('изменён') ? '#2E7D32' : '#C62828', margin: 0 }}>
                        {pwMsg}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={handleChangePassword}
                      style={{
                        background: '#1A2B4A',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '8px',
                        fontSize: '13px',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Сохранить
                    </button>
                  </div>
                )}
                <div style={{ borderTop: '1px solid #F4F7FB' }}>
                  <button
                    type="button"
                    onClick={handleLogout}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '13px',
                      color: '#C62828',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    <SignOut size={15} weight="fill" />
                    Выйти
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        {!user && (
          <button
            type="button"
            onClick={handleLogout}
            title="Выйти"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#B0C5D8',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              padding: '6px 10px',
              borderRadius: '6px',
            }}
          >
            <SignOut size={18} weight="fill" />
          </button>
        )}
      </nav>
    </header>
  )
}

function NavBtn({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      style={{
        background: active ? 'rgba(176,197,216,0.15)' : 'transparent',
        border: 'none',
        cursor: 'pointer',
        color: active ? '#fff' : '#B0C5D8',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '13px',
        padding: '6px 12px',
        borderRadius: '6px',
        fontFamily: 'Inter, sans-serif',
        transition: 'all 0.15s',
      }}
    >
      {icon}
      <span className="header-nav-label">{label}</span>
    </button>
  )
}
