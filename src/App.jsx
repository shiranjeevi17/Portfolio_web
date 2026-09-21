import { Route, Routes } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { LanguageProvider } from './context/LanguageContext.jsx'
import { Home } from './pages/Home.jsx'
import { AdminDashboard } from './components/AdminDashboard.jsx'

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </LanguageProvider>
    </ThemeProvider>
  )
}
