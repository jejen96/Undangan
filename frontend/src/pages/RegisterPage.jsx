import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apiRegister } from '../api/auth'
import './AuthPage.css'

export default function RegisterPage() {
  const navigate = useNavigate()

  const [form, setForm]         = useState({ full_name: '', email: '', whatsapp: '' })
  const [errors, setErrors]     = useState({})
  const [loading, setLoading]   = useState(false)
  const [success, setSuccess]   = useState('')
  const [apiError, setApiError] = useState('')

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors(prev => ({ ...prev, [e.target.name]: '' }))
    setApiError('')
  }

  const validate = () => {
    const errs = {}
    if (!form.full_name.trim()) errs.full_name = 'Nama lengkap wajib diisi.'
    if (!form.email.trim())     errs.email     = 'Email wajib diisi.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                                errs.email     = 'Format email tidak valid.'
    if (!form.whatsapp.trim())  errs.whatsapp  = 'Nomor WhatsApp wajib diisi.'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    try {
      await apiRegister(form)
      setSuccess('Registrasi berhasil! Cek email Anda untuk informasi akun.')
      setTimeout(() => navigate('/login'), 3000)
    } catch (err) {
      const resp = err.response?.data
      if (resp?.errors) {
        const mapped = {}
        Object.entries(resp.errors).forEach(([k, v]) => { mapped[k] = v[0] })
        setErrors(mapped)
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
            Gratis Daftar,<br/>
            <em>Bayar Pas Yakin</em>
          </h1>
          <p className="auth-marketing__lead">
            Daftar gratis dengan email, coba semua fitur tanpa batas.
            Bayar pas undanganmu siap disebar — dan dapatkan diskon <strong>Rp 100rb</strong>!
          </p>
          <ul className="auth-marketing__list">
            <li>✦ Gratis selamanya sampai siap bayar</li>
            <li>✦ Preview tanpa watermark saat coba</li>
            <li>✦ Password otomatis dikirim ke email</li>
            <li>✦ Garansi refund 3 hari</li>
          </ul>
          <div className="auth-marketing__badge">
            🎁 Daftar sekarang · Hemat Rp 100rb untuk 50 pendaftar pertama
          </div>
        </div>
      </div>

      {/* Panel kanan — form */}
      <div className="auth-form-side">
        <div className="auth-card">
          <div className="auth-card__header">
            <h2 className="auth-card__title">Buat Akun Gratis</h2>
            <p className="auth-card__sub">Password otomatis dikirim ke email kamu</p>
          </div>

          {success && (
            <div className="auth-alert auth-alert--success" role="alert">
              {success}
              <br/><small>Mengalihkan ke halaman login...</small>
            </div>
          )}

          {apiError && (
            <div className="auth-alert auth-alert--error" role="alert">
              {apiError}
            </div>
          )}

          {!success && (
            <form onSubmit={handleSubmit} noValidate>
              <div className="auth-field">
                <label className="auth-label" htmlFor="full_name">Nama Lengkap</label>
                <input
                  id="full_name"
                  name="full_name"
                  type="text"
                  autoComplete="name"
                  placeholder="Nama lengkap kamu"
                  className={`auth-input ${errors.full_name ? 'auth-input--error' : ''}`}
                  value={form.full_name}
                  onChange={handleChange}
                />
                {errors.full_name && <span className="auth-field__error">{errors.full_name}</span>}
              </div>

              <div className="auth-field">
                <label className="auth-label" htmlFor="reg-email">Email</label>
                <input
                  id="reg-email"
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
                <label className="auth-label" htmlFor="whatsapp">Nomor WhatsApp</label>
                <input
                  id="whatsapp"
                  name="whatsapp"
                  type="tel"
                  autoComplete="tel"
                  placeholder="08xxxxxxxxxx"
                  className={`auth-input ${errors.whatsapp ? 'auth-input--error' : ''}`}
                  value={form.whatsapp}
                  onChange={handleChange}
                />
                {errors.whatsapp && <span className="auth-field__error">{errors.whatsapp}</span>}
              </div>

              <p className="auth-note">
                🔒 Password akan digenerate otomatis dan dikirim ke email kamu.
              </p>

              <button
                type="submit"
                className="auth-btn auth-btn--primary"
                disabled={loading}
              >
                {loading ? 'Memproses...' : 'Daftar Gratis'}
              </button>
            </form>
          )}

          <div className="auth-divider" />

          <div className="auth-links">
            <p className="auth-links__row">
              Sudah punya akun?{' '}
              <Link to="/login" className="auth-link">Login di sini</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
