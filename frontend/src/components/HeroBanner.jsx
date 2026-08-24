import React from 'react'
import './HeroBanner.css'

export default function HeroBanner() {
  return (
    <section className="hero" aria-label="Hero section">
      <div className="hero__inner">
        <span className="hero__badge">✦ Undangan Digital Pernikahan</span>
        <h1 className="hero__title">
          Pilih Tema,<br />
          <em>Langsung Jadi Malam Ini</em>
        </h1>
        <p className="hero__subtitle">
          Edit sendiri tanpa antri admin. Pilih tema favoritmu,
          isi data, dan undangan siap disebar dalam hitungan menit.
        </p>
        <a href="#template" className="hero__cta">
          Lihat Semua Tema
          <span aria-hidden="true">↓</span>
        </a>
      </div>

      {/* Decorative elements */}
      <div className="hero__deco hero__deco--1" aria-hidden="true">✦</div>
      <div className="hero__deco hero__deco--2" aria-hidden="true">✦</div>
      <div className="hero__deco hero__deco--3" aria-hidden="true">◇</div>
    </section>
  )
}
