import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { fetchTemplateBySlug } from '../api/templates'
import ThemeRenderer from '../themes/ThemeRenderer'
import './PreviewPage.css'

export default function PreviewPage() {
  const { slug }    = useParams()
  const navigate    = useNavigate()
  const [template, setTemplate] = useState(null)
  const [loading, setLoading]   = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    setLoading(true)
    setNotFound(false)
    fetchTemplateBySlug(slug)
      .then(setTemplate)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <LoadingScreen />
  if (notFound) return <NotFoundScreen slug={slug} navigate={navigate} />

  return (
    <div className="preview-page">
      {/* Top bar */}
      <div className="preview-topbar">
        <button className="preview-topbar__back" onClick={() => navigate(-1)}>
          ← Kembali
        </button>
        <div className="preview-topbar__info">
          <span className="preview-topbar__name">{template.name}</span>
          <span className={`preview-topbar__badge preview-topbar__badge--${template.category}`}>
            {template.category}
          </span>
        </div>
        <button
          className="preview-topbar__cta"
          onClick={() => navigate('/', { state: { selectTemplate: template.id } })}
        >
          Pilih Tema Ini →
        </button>
      </div>

      {/* Device switcher */}
      <DeviceFrame template={template} />
    </div>
  )
}

/* ── Device frame dengan switcher mobile/tablet/desktop ── */
function DeviceFrame({ template }) {
  const [device, setDevice] = useState('mobile')
  const [opened, setOpened] = useState(false)

  const widths = { mobile: 390, tablet: 768, desktop: '100%' }

  return (
    <div className="preview-device-wrapper">
      {/* Switcher */}
      <div className="preview-switcher" role="tablist">
        {['mobile', 'tablet', 'desktop'].map(d => (
          <button
            key={d}
            role="tab"
            aria-selected={device === d}
            className={`preview-switcher__btn ${device === d ? 'preview-switcher__btn--active' : ''}`}
            onClick={() => setDevice(d)}
          >
            {d === 'mobile'  && '📱 Mobile'}
            {d === 'tablet'  && '📟 Tablet'}
            {d === 'desktop' && '🖥 Desktop'}
          </button>
        ))}
      </div>

      {/* Frame */}
      <div className="preview-frame-outer">
        <div
          className={`preview-frame preview-frame--${device}`}
          style={{ width: widths[device] }}
        >
          {device === 'mobile' && <div className="preview-frame__notch" aria-hidden="true" />}
          <div className="preview-frame__screen">
            <ThemeRenderer
              template={template}
              invitation={null}
              isFullPage={true}
              onOpen={() => setOpened(true)}
            />
          </div>
          {device === 'mobile' && <div className="preview-frame__home" aria-hidden="true" />}
        </div>
      </div>

      {/* CTA bawah */}
      <div className="preview-bottom-cta">
        <p className="preview-bottom-cta__desc">
          Suka dengan tema <strong>{template.name}</strong>? Daftar gratis dan mulai edit undanganmu sekarang.
        </p>
        <div className="preview-bottom-cta__actions">
          <Link to="/register" className="preview-btn preview-btn--primary">
            Coba Gratis Sekarang
          </Link>
          <Link to="/" className="preview-btn preview-btn--outline">
            Lihat Tema Lain
          </Link>
        </div>
      </div>
    </div>
  )
}

function LoadingScreen() {
  return (
    <div className="preview-state">
      <div className="tgrid__spinner" style={{ width: 40, height: 40 }} />
      <p>Memuat preview tema...</p>
    </div>
  )
}

function NotFoundScreen({ slug, navigate }) {
  return (
    <div className="preview-state preview-state--404">
      <div className="preview-state__icon">🔍</div>
      <h2 className="preview-state__title">Tema tidak ditemukan</h2>
      <p className="preview-state__desc">
        Tema dengan slug <code>{slug}</code> tidak tersedia.
      </p>
      <button className="preview-btn preview-btn--primary" onClick={() => navigate('/')}>
        ← Kembali ke Halaman Utama
      </button>
    </div>
  )
}
