import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { apiForgotPassword } from '../api/auth'
import './AuthPage.css'

export default function ForgotPasswordPage() {
  const [email, setEmail]       = useState('')
  const [emailErr, setEmailErr] = useState('')
  const [loading, setLoading]   = useState(false)
  const [message, setMessage]   = useState('')
  const [isError, setIsError]   = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim()) { setEmailErr('Email wajib diisi.'); return }

    setLoading(true)
    setMessage('')
    try {
      const data = await apiForgotPassword({ email })
      setMessage(data.message)
      setIsError(false)
    } catch (err) {
      const msg = err.response?.data?.message || 'Terjadi kesalahan. Coba lagi.'
      setMessage(msg)
      setIsError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-layout auth-layout--center">
      <div className="auth-form-side auth-form-side--full">
        <div className="auth-card auth-card--narrow">
          <a href="/" className="auth-brand auth-brand--center">
            <span className="auth-brand__icon">✦</span>
            <span className="auth-brand__name">UndangTeman.id</span>
          </a>

          <div className="auth-card__header">
            <h2 className="auth-card__title">Lupa Password?</h2>
            <p className="auth-card__sub">
              Masukkan email kamu dan kami akan kirim password baru.
            </p>
          </div>

          {message && (
            <div className={`auth-alert ${isError ? 'auth-alert--error' : 'auth-alert--success'}`} role="alert">
              {message}
            </div>
          )}

          {!message || isError ? (
            <form onSubmit={handleSubmit} noValidate>
              <div className="auth-field">
                <label className="auth-label" htmlFor="fp-email">Email</label>
                <input
                  id="fp-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="nama@email.com"
                  className={`auth-input ${emailErr ? 'auth-input--error' : ''}`}
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setEmailErr('') }}
                />
                {emailErr && <span className="auth-field__error">{emailErr}</span>}
              </div>

              <button
                type="submit"
                className="auth-btn auth-btn--primary"
                disabled={loading}
              >
                {loading ? 'Mengirim...' : 'Kirim Password Baru'}
              </button>
            </form>
          ) : (
            <p className="auth-note auth-note--center">
              Cek folder inbox atau spam di email kamu.
            </p>
          )}

          <div className="auth-divider" />

          <div className="auth-links">
            <p className="auth-links__row">
              <Link to="/login" className="auth-link">← Kembali ke Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
