import { useEffect, useState } from 'react'
import { Users, CheckCircle, XCircle, ShieldCheck, Plus, Eye, Trash } from '@phosphor-icons/react'
import { supabase } from '../lib/supabase'
import { Header } from '../components/layout/Header'
import { useAppStore } from '../store/useAppStore'
import { useNavigate } from 'react-router-dom'
import { MODULES_META } from '../content/modules'

interface UserRow {
  id: string
  full_name: string
  role: string
  contract_signed_at: string | null
  created_at: string
  temp_password: string | null
}

interface QuizRow {
  user_id: string
  module_id: string
  passed: boolean
  score: number
}

interface NewUser {
  email: string
  password: string
  full_name: string
}

export function AdminScreen() {
  const navigate = useNavigate()
  const { user } = useAppStore()
  const [users, setUsers] = useState<UserRow[]>([])
  const [quizResults, setQuizResults] = useState<QuizRow[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newUser, setNewUser] = useState<NewUser>({ email: '', password: '', full_name: '' })
  const [addError, setAddError] = useState('')
  const [addSuccess, setAddSuccess] = useState('')

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/dashboard')
      return
    }
    loadData()
  }, [user])

  const loadData = async () => {
    setLoading(true)
    const [{ data: profiles }, { data: quiz }] = await Promise.all([
      supabase.from('profiles').select('*').order('created_at', { ascending: false }),
      supabase.from('quiz_results').select('user_id, module_id, passed, score'),
    ])
    if (profiles) setUsers(profiles)
    if (quiz) setQuizResults(quiz)
    setLoading(false)
  }

  const getUserQuiz = (userId: string) =>
    quizResults.filter((q) => q.user_id === userId)

  const getPassedCount = (userId: string) =>
    getUserQuiz(userId).filter((q) => q.passed).length

  const handleDeleteUser = async (userId: string, name: string) => {
    if (!confirm(`Удалить пользователя ${name}?`)) return
    const { data: { session } } = await supabase.auth.getSession()
    await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/delete-user`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.access_token}`,
          apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({ user_id: userId }),
      }
    )
    loadData()
  }

  const handleAddUser = async () => {
    setAddError('')
    setAddSuccess('')
    if (!newUser.email || !newUser.password || !newUser.full_name) {
      setAddError('Заполните все поля')
      return
    }

    const { data: { session } } = await supabase.auth.getSession()
    const res = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-user`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.access_token}`,
          apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({
          email: newUser.email,
          password: newUser.password,
          full_name: newUser.full_name,
        }),
      }
    )
    const json = await res.json()
    const error = json.error ? { message: json.error } : null

    if (error) {
      setAddError(error.message)
    } else {
      const userId = json.user?.id
      if (userId) {
        await supabase.from('profiles').update({
          temp_password: newUser.password,
        }).eq('id', userId)
      }
      setAddSuccess(`✓ ${newUser.full_name} создан | Email: ${newUser.email} | Пароль: ${newUser.password}`)
      setNewUser({ email: '', password: '', full_name: '' })
      loadData()
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F4F7FB' }}>
      <Header />
      <main style={{ maxWidth: '960px', margin: '0 auto', padding: '32px 20px' }}>
        {/* Заголовок */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldCheck size={26} weight="fill" color="#1A2B4A" />
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', color: '#1A2B4A' }}>
              Панель администратора
            </h1>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            style={{
              background: '#1A2B4A',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 18px',
              fontSize: '13px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Plus size={16} weight="fill" />
            Добавить врача
          </button>
        </div>

        {/* Форма добавления */}
        {showAddForm && (
          <div
            style={{
              background: '#fff',
              borderRadius: '14px',
              padding: '24px',
              marginBottom: '24px',
              boxShadow: '0 2px 12px rgba(26,43,74,0.06)',
            }}
          >
            <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#1A2B4A', marginBottom: '16px' }}>
              Новый пользователь
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '14px' }}>
              {(['full_name', 'email', 'password'] as const).map((field) => (
                <input
                  key={field}
                  type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
                  placeholder={field === 'full_name' ? 'ФИО' : field === 'email' ? 'Email' : 'Пароль'}
                  value={newUser[field]}
                  onChange={(e) => setNewUser((prev) => ({ ...prev, [field]: e.target.value }))}
                  style={{
                    padding: '10px 12px',
                    border: '1.5px solid #e0e7ef',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: 'Inter, sans-serif',
                    color: '#1A2B4A',
                    outline: 'none',
                  }}
                />
              ))}
            </div>
            {addError && (
              <p style={{ color: '#C62828', fontSize: '13px', marginBottom: '12px' }}>{addError}</p>
            )}
            {addSuccess && (
              <p style={{ color: '#2E7D32', fontSize: '13px', marginBottom: '12px' }}>{addSuccess}</p>
            )}
            <button
              onClick={handleAddUser}
              style={{
                background: '#1A2B4A',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 20px',
                fontSize: '14px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Создать аккаунт
            </button>
          </div>
        )}

        {/* Статистика */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          <StatCard icon={<Users size={22} weight="fill" color="#1A2B4A" />} label="Пользователей" value={users.length} />
          <StatCard
            icon={<CheckCircle size={22} weight="fill" color="#2E7D32" />}
            label="Подписали договор"
            value={users.filter((u) => u.contract_signed_at).length}
          />
          <StatCard
            icon={<ShieldCheck size={22} weight="fill" color="#B0C5D8" />}
            label="Модулей пройдено"
            value={quizResults.filter((q) => q.passed).length}
          />
        </div>

        {/* Таблица пользователей */}
        {loading ? (
          <p style={{ color: '#607D8B', textAlign: 'center' }}>Загружаем данные...</p>
        ) : (
          <div
            style={{
              background: '#fff',
              borderRadius: '14px',
              overflow: 'hidden',
              boxShadow: '0 2px 12px rgba(26,43,74,0.06)',
            }}
          >
            <div
              style={{
                padding: '16px 20px',
                borderBottom: '1px solid #F4F7FB',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Eye size={18} weight="fill" color="#607D8B" />
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#1A2B4A' }}>
                Пользователи ({users.length})
              </span>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#F4F7FB' }}>
                    {['ФИО', 'Пароль', 'Договор', 'Прогресс', 'Дата регистрации', ''].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: '10px 16px',
                          textAlign: 'left',
                          fontSize: '12px',
                          fontWeight: 700,
                          color: '#607D8B',
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, i) => (
                    <tr
                      key={u.id}
                      style={{
                        borderTop: i > 0 ? '1px solid #F4F7FB' : 'none',
                      }}
                    >
                      <td style={{ padding: '12px 16px', fontSize: '14px', color: '#1A2B4A', fontWeight: 500 }}>
                        {u.full_name}
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', color: '#1A2B4A', fontFamily: 'monospace' }}>
                        {u.temp_password ?? '—'}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        {u.contract_signed_at ? (
                          <CheckCircle size={18} weight="fill" color="#2E7D32" />
                        ) : (
                          <XCircle size={18} weight="fill" color="#C62828" />
                        )}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div
                            style={{
                              flex: 1,
                              height: '6px',
                              background: '#e0e7ef',
                              borderRadius: '3px',
                              overflow: 'hidden',
                              maxWidth: '120px',
                            }}
                          >
                            <div
                              style={{
                                height: '100%',
                                width: `${(getPassedCount(u.id) / MODULES_META.length) * 100}%`,
                                background: '#2E7D32',
                                borderRadius: '3px',
                              }}
                            />
                          </div>
                          <span style={{ fontSize: '12px', color: '#607D8B' }}>
                            {getPassedCount(u.id)}/{MODULES_META.length}
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', color: '#607D8B' }}>
                        {new Date(u.created_at).toLocaleDateString('ru-RU')}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <button
                          onClick={() => handleDeleteUser(u.id, u.full_name)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#C62828',
                            padding: '4px',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                          title="Удалить пользователя"
                        >
                          <Trash size={16} weight="fill" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: number
}) {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 2px 8px rgba(26,43,74,0.05)',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
      }}
    >
      {icon}
      <div>
        <p style={{ fontSize: '24px', fontWeight: 700, color: '#1A2B4A', lineHeight: 1 }}>{value}</p>
        <p style={{ fontSize: '12px', color: '#607D8B', marginTop: '4px' }}>{label}</p>
      </div>
    </div>
  )
}
