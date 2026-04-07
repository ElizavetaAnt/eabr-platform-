import { useEffect, useState } from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { supabase } from './lib/supabase'
import { useAppStore } from './store/useAppStore'
import { LoginScreen } from './screens/LoginScreen'
import { ContractScreen } from './screens/ContractScreen'
import { DashboardScreen } from './screens/DashboardScreen'
import { ModuleScreen } from './screens/ModuleScreen'
import { AdminScreen } from './screens/AdminScreen'
import { PrivacyPolicyScreen } from './screens/PrivacyPolicyScreen'
import { TermsScreen } from './screens/TermsScreen'
import type { UserProfile } from './types'

function App() {
  const { user, setUser, setQuizResult } = useAppStore()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const [{ data: profile }, { data: quizResults }] = await Promise.all([
          supabase.from('profiles').select('*').eq('id', session.user.id).single(),
          supabase.from('quiz_results').select('module_id, score, passed').eq('user_id', session.user.id),
        ])
        if (profile) setUser(profile as UserProfile)
        if (quizResults) {
          quizResults.forEach((q) => setQuizResult(q.module_id, q.score, q.passed))
        }
      }
      setChecking(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT') {
          setUser(null)
        } else if (session?.user && !user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()
          if (profile) setUser(profile as UserProfile)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  if (checking) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F4F7FB',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: '#1A2B4A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px',
              fontFamily: 'Playfair Display, serif',
              fontWeight: 700,
              fontSize: '18px',
              color: '#B0C5D8',
            }}
          >
            EA
          </div>
          <p style={{ color: '#607D8B', fontSize: '14px' }}>Загрузка...</p>
        </div>
      </div>
    )
  }

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to={user.contract_signed_at ? '/dashboard' : '/contract'} replace /> : <LoginScreen />}
        />
        <Route
          path="/contract"
          element={!user ? <Navigate to="/login" replace /> : <ContractScreen />}
        />
        <Route
          path="/dashboard"
          element={
            !user ? <Navigate to="/login" replace /> :
            !user.contract_signed_at ? <Navigate to="/contract" replace /> :
            <DashboardScreen />
          }
        />
        <Route
          path="/module/:moduleId"
          element={
            !user ? <Navigate to="/login" replace /> :
            !user.contract_signed_at ? <Navigate to="/contract" replace /> :
            <ModuleScreen />
          }
        />
        <Route
          path="/admin"
          element={
            !user ? <Navigate to="/login" replace /> :
            user.role !== 'admin' ? <Navigate to="/dashboard" replace /> :
            <AdminScreen />
          }
        />
        <Route path="/privacy-policy" element={<PrivacyPolicyScreen />} />
        <Route path="/terms" element={<TermsScreen />} />
        <Route path="*" element={<Navigate to={user ? '/dashboard' : '/login'} replace />} />
      </Routes>
    </HashRouter>
  )
}

export default App
