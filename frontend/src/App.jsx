import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import RequireAuth from './components/RequireAuth'
import TemplatePage from './pages/TemplatePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import EditInvitationPage from './pages/EditInvitationPage'
import PreviewPage from './pages/PreviewPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public */}
          <Route path="/"                 element={<TemplatePage />} />
          <Route path="/login"            element={<LoginPage />} />
          <Route path="/register"         element={<RegisterPage />} />
          <Route path="/forgot-password"  element={<ForgotPasswordPage />} />

          {/* Preview tema — public, tidak perlu login */}
          <Route path="/preview/:slug"    element={<PreviewPage />} />

          {/* Protected — halaman edit undangan */}
          <Route
            path="/invitation/:slug/edit"
            element={
              <RequireAuth>
                <EditInvitationPage />
              </RequireAuth>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
