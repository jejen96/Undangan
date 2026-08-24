import React from 'react'
import './FilterBar.css'

const PHOTO_OPTIONS = [
  { label: 'Dengan Foto', value: true },
  { label: 'Tanpa Foto',  value: false },
]

const CATEGORY_OPTIONS = [
  { label: 'Elegant',       value: 'elegant',    desc: 'Klasik, bersih, dan timeless.' },
  { label: '3D Immersive',  value: 'immersive',  desc: 'Sinematik, dramatis, dan memukau.' },
  { label: 'Spesial',       value: 'spesial',    desc: 'Islami, adat, dan penuh makna.' },
]

export default function FilterBar({ hasPhoto, category, onHasPhotoChange, onCategoryChange }) {
  const currentDesc = CATEGORY_OPTIONS.find(c => c.value === category)?.desc || ''

  return (
    <div className="filterbar">
      {/* Toggle: Dengan Foto / Tanpa Foto */}
      <div className="filterbar__photo-toggle">
        {PHOTO_OPTIONS.map(opt => (
          <button
            key={String(opt.value)}
            className={`filterbar__photo-btn ${hasPhoto === opt.value ? 'filterbar__photo-btn--active' : ''}`}
            onClick={() => onHasPhotoChange(opt.value)}
            aria-pressed={hasPhoto === opt.value}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Pill kategori */}
      <div className="filterbar__category" role="tablist" aria-label="Pilih kategori tema">
        {CATEGORY_OPTIONS.map(opt => (
          <button
            key={opt.value}
            role="tab"
            aria-selected={category === opt.value}
            className={`filterbar__cat-btn ${category === opt.value ? 'filterbar__cat-btn--active' : ''}`}
            onClick={() => onCategoryChange(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Deskripsi kategori */}
      {currentDesc && (
        <p className="filterbar__desc">{currentDesc}</p>
      )}
    </div>
  )
}
