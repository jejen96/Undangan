import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './TemplateCard.css'

export default function TemplateCard({ template }) {
  const [imgError, setImgError] = useState(false)
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()

  const handleEdit = async () => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: { pathname: `/invitation/new/edit` } } })
      return
    }
    // Buat invitation baru dengan template ini, lalu ke halaman edit
    try {
      const { createInvitation } = await import('../api/invitation')
      const inv = await createInvitation(template.id)
      navigate(`/invitation/${inv.slug}/edit`)
    } catch {
      navigate(`/invitation/new/edit`)
    }
  }

  const handlePreview = () => {
    // Routing dinamis berdasarkan slug tema
    const slug = template.slug || template.name.toLowerCase().replace(/\s+/g, '-')
    navigate(`/preview/${slug}`)
  }

  return (
    <div className="tcard">
      {/* Mockup image */}
      <div className="tcard__img-wrap">
        {!imgError ? (
          <img
            src={template.preview_image}
            alt={`Preview template ${template.name}`}
            className="tcard__img"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="tcard__img-placeholder">
            <span>✦</span>
            <p>{template.name}</p>
          </div>
        )}

        {/* Overlay mockup frame */}
        <div className="tcard__mockup-overlay" aria-hidden="true">
          <MockupFrame />
        </div>
      </div>

      {/* Info */}
      <div className="tcard__body">
        <h3 className="tcard__name">{template.name}</h3>
        <div className="tcard__actions">
          <button className="tcard__btn tcard__btn--preview" onClick={handlePreview}>
            <span className="tcard__btn-icon" aria-hidden="true">👁</span>
            Preview
          </button>
          <button className="tcard__btn tcard__btn--edit" onClick={handleEdit}>
            Silahkan Edit
          </button>
        </div>
      </div>
    </div>
  )
}

/** SVG mockup sederhana laptop + phone */
function MockupFrame() {
  return (
    <svg
      className="tcard__frame"
      viewBox="0 0 360 240"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Laptop body */}
      <rect x="20" y="10" width="240" height="165" rx="8" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="3"/>
      {/* Laptop base */}
      <rect x="0" y="175" width="280" height="12" rx="4" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
      {/* Phone */}
      <rect x="270" y="40" width="78" height="155" rx="10" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="3"/>
      {/* Phone notch */}
      <rect x="298" y="44" width="22" height="5" rx="3" fill="rgba(255,255,255,0.3)"/>
    </svg>
  )
}
