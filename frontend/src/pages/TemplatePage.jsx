import React, { useState, useEffect, useCallback } from 'react'
import Navbar from '../components/Navbar'
import HeroBanner from '../components/HeroBanner'
import FilterBar from '../components/FilterBar'
import TemplateGrid from '../components/TemplateGrid'
import { fetchTemplates } from '../api/templates'
import './TemplatePage.css'

export default function TemplatePage() {
  const [hasPhoto, setHasPhoto]     = useState(true)
  const [category, setCategory]     = useState('elegant')
  const [templates, setTemplates]   = useState([])
  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState(null)

  const loadTemplates = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchTemplates({ hasPhoto, category })
      setTemplates(data)
    } catch (err) {
      console.error(err)
      setError('Gagal memuat template. Pastikan backend sudah berjalan.')
    } finally {
      setLoading(false)
    }
  }, [hasPhoto, category])

  // Fetch setiap kali filter berubah
  useEffect(() => {
    loadTemplates()
  }, [loadTemplates])

  return (
    <div className="template-page">
      <Navbar />

      <HeroBanner />

      {/* Section template */}
      <section id="template" className="template-section" aria-label="Pilih tema undangan">
        <div className="template-section__header">
          <h2 className="template-section__title">
            Pilih yang Cocok untuk<br />
            <em>Cerita Kalian Berdua</em>
          </h2>
          <p className="template-section__sub">
            Tema apa pun bebas kamu pilih. Daftar gratis, bayar pas undanganmu siap dibagikan.
          </p>
        </div>

        <FilterBar
          hasPhoto={hasPhoto}
          category={category}
          onHasPhotoChange={setHasPhoto}
          onCategoryChange={setCategory}
        />

        <TemplateGrid
          templates={templates}
          loading={loading}
          error={error}
        />
      </section>

      <footer className="footer">
        <p className="footer__text">
          © {new Date().getFullYear()} Seruni · Undangan Digital Pernikahan
        </p>
        <p className="footer__tagline">Dibuat dengan ✦ untuk setiap momen istimewa</p>
      </footer>
    </div>
  )
}
