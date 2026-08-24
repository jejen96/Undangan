import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { apiMe, apiLogout } from '../api/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true) // cek token saat pertama buka

  // Saat app pertama load — cek token di localStorage
  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      apiMe()
        .then(setUser)
        .catch(() => {
          localStorage.removeItem('auth_token')
          setUser(null)
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = useCallback((token, userData) => {
    localStorage.setItem('auth_token', token)
    setUser(userData)
  }, [])

  const logout = useCallback(async () => {
    try { await apiLogout() } catch (_) {}
    localStorage.removeItem('auth_token')
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth harus dipakai di dalam AuthProvider')
  return ctx
}
