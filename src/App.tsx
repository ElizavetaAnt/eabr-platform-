import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { DashboardScreen } from './screens/DashboardScreen'
import { ModuleScreen } from './screens/ModuleScreen'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<DashboardScreen />} />
        <Route path="/module/:moduleId" element={<ModuleScreen />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
