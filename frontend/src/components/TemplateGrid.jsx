import React from 'react'
import TemplateCard from './TemplateCard'
import './TemplateGrid.css'

export default function TemplateGrid({ templates, loading, error }) {
  if (loading) {
    return (
      <div className="tgrid__state">
        <div className="tgrid__spinner" aria-label="Memuat template..." />
        <p>Memuat template...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="tgrid__state tgrid__state--error">
        <span aria-hidden="true">⚠️</span>
        <p>{error}</p>
      </div>
    )
  }

  if (!templates || templates.length === 0) {
    return (
      <div className="tgrid__state">
        <span className="tgrid__empty-icon" aria-hidden="true">✦</span>
        <p>Belum ada template untuk filter ini.</p>
      </div>
    )
  }

  return (
    <div className="tgrid" role="list" aria-label="Daftar template undangan">
      {templates.map(tpl => (
        <div key={tpl.id} role="listitem">
          <TemplateCard template={tpl} />
        </div>
      ))}
    </div>
  )
}
