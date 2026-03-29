import { useNavigate, useLocation } from 'react-router-dom'
import { SignOut, House, ShieldCheck } from '@phosphor-icons/react'
import { supabase } from '../../lib/supabase'
import { useAppStore } from '../../store/useAppStore'

export function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, reset } = useAppStore()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    reset()
    navigate('/login')
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
          <div style={{ fontSize: '13px', color: '#B0C5D8', marginRight: '8px' }}>
            {user.full_name}
          </div>
        )}
        <button
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
            transition: 'background 0.15s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(176,197,216,0.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          <SignOut size={18} weight="fill" />
        </button>
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
      {label}
    </button>
  )
}
