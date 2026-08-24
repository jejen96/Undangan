import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { apiLogin } from '../api/auth'
import './AuthPage.css'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate  = useNavigate()
  const location  = useLocation()
  const from      = location.state?.from?.pathname || '/'

  const [form, setForm]       = useState({ email: '', password: '' })
  const [errors, setErrors]   = useState({})
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors(prev => ({ ...prev, [e.target.name]: '' }))
    setApiError('')
  }

  const validate = () => {
    const errs = {}
    if (!form.email)    errs.email    = 'Email wajib diisi.'
    if (!form.password) errs.password = 'Password wajib diisi.'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    try {
      const data = await apiLogin(form)
      login(data.token, data.user)
      navigate(from, { replace: true })
    } catch (err) {
      const resp = err.response?.data
      if (resp?.errors) {
        setErrors({
          email:    resp.errors.email?.[0]    || '',
          password: resp.errors.password?.[0] || '',
        })
      } else {
        setApiError(resp?.message || 'Terjadi kesalahan. Coba lagi.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-layout">
      {/* Panel kiri — marketing */}
      <div className="auth-marketing">
        <div className="auth-marketing__inner">
          <a href="/" className="auth-brand">
            <span className="auth-brand__icon">✦</span>
            <span className="auth-brand__name">UndangTeman.id</span>
          </a>
          <h1 className="auth-marketing__title">
            Undangan Digital<br/>
            <em>yang Jadi Hari Ini</em>
          </h1>
          <p className="auth-marketing__lead">
            Coba dulu gratis, bayar pas yakin. Dapatkan harga diskon <strong>Rp 100rb</strong> untuk semua paket!
          </p>
          <ul className="auth-marketing__list">
            <li>✦ Edit sendiri tanpa antri admin</li>
            <li>✦ Sebar ke tamu via WhatsApp</li>
            <li>✦ RSVP & ucapan real-time</li>
            <li>✦ Aktif selamanya, sekali bayar</li>
          </ul>
          <div className="auth-marketing__badge">
            🎉 Daftar gratis sekarang · Diskon Rp 100rb menanti
          </div>
        </div>
      </div>

      {/* Panel kanan — form */}
      <div className="auth-form-side">
        <div className="auth-card">
          <div className="auth-card__header">
            <h2 className="auth-card__title">Masuk ke Akun</h2>
            <p className="auth-card__sub">Masuk untuk mulai edit undanganmu</p>
          </div>

          {apiError && (
            <div className="auth-alert auth-alert--error" role="alert">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="auth-field">
              <label className="auth-label" htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="nama@email.com"
                className={`auth-input ${errors.email ? 'auth-input--error' : ''}`}
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <span className="auth-field__error">{errors.email}</span>}
            </div>

            <div className="auth-field">
              <label className="auth-label" htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Password kamu"
                className={`auth-input ${errors.password ? 'auth-input--error' : ''}`}
                value={form.password}
                onChange={handleChange}
              />
              {errors.password && <span className="auth-field__error">{errors.password}</span>}
            </div>

            <button
              type="submit"
              className="auth-btn auth-btn--primary"
              disabled={loading}
            >
              {loading ? 'Memproses...' : 'Login'}
            </button>
          </form>

          <div className="auth-divider" />

          <div className="auth-links">
            <p className="auth-links__row">
              Belum punya akun?{' '}
              <Link to="/register" className="auth-link">Silakan Daftar</Link>
            </p>
            <p className="auth-links__row">
              Lupa password?{' '}
              <Link to="/forgot-password" className="auth-link">Klik Lupa Password</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
