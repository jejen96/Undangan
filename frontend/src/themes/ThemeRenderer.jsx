import React, { useEffect, useRef, useState, useMemo } from 'react'

// URL tema — sesuaikan jika port berubah
const SAKURA_URL = import.meta.env.VITE_SAKURA_URL || 'http://localhost:5174'

/**
 * ThemeRenderer — menampilkan preview undangan via iframe (themes/sakura).
 * Kirim data realtime ke iframe via postMessage setiap kali form berubah.
 */
export default function ThemeRenderer({ template, invitation = null, isFullPage = false }) {
  const iframeRef = useRef(null)
  const [ready, setReady]     = useState(false)
  const [offline, setOffline] = useState(false)

  const previewUrl = `${SAKURA_URL}/preview`

  // Data yang dikirim ke iframe — memoize agar tidak kirim berulang
  const payload = useMemo(() => JSON.stringify({
    type:       'INVITATION_UPDATE',
    invitation: invitation || null,
    template:   template   || null,
  }), [invitation, template])

  // Kirim data ke iframe setiap kali berubah
  useEffect(() => {
    if (!ready) return
    try {
      iframeRef.current?.contentWindow?.postMessage(
        JSON.parse(payload),
        SAKURA_URL
      )
    } catch (_) {}
  }, [payload, ready])

  const handleLoad = () => {
    setReady(true)
    setOffline(false)
    // Kirim data awal
    setTimeout(() => {
      try {
        iframeRef.current?.contentWindow?.postMessage(
          JSON.parse(payload),
          SAKURA_URL
        )
        // Auto-open preview
        iframeRef.current?.contentWindow?.postMessage(
          { type: 'PREVIEW_OPEN' },
          SAKURA_URL
        )
      } catch (_) {}
    }, 400)
  }

  const handleError = () => setOffline(true)

  // Fallback saat tema offline
  if (offline) {
    return (
      <div style={{
        width: '100%', height: '100%', minHeight: 300,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 12, background: '#F7F3EE', padding: 24, textAlign: 'center',
      }}>
        <span style={{ fontSize: 32 }}>🌸</span>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: '#C8956C', fontWeight: 600 }}>
          Preview Tema Sakura
        </p>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: '#aaa', lineHeight: 1.6 }}>
          Jalankan tema terlebih dulu:
        </p>
        <code style={{ background: '#fff', border: '1px solid #E0D9D2', borderRadius: 6, padding: '6px 12px', fontSize: 11, color: '#555' }}>
          cd themes/sakura &amp;&amp; npm run dev
        </code>
        <button
          onClick={() => { setOffline(false); setReady(false) }}
          style={{ marginTop: 8, padding: '8px 16px', background: '#C8956C', color: '#fff', border: 'none', borderRadius: 999, fontSize: 12, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}
        >
          Coba Lagi
        </button>
      </div>
    )
  }

  const iframeStyle = {
    width: '100%',
    height: isFullPage ? '100vh' : '100%',
    border: 'none',
    opacity: ready ? 1 : 0,
    transition: 'opacity .4s ease',
    minHeight: isFullPage ? '100vh' : 300,
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Skeleton loader */}
      {!ready && (
        <div style={{
          position: 'absolute', inset: 0, minHeight: 300,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: 12, background: '#F7F3EE',
        }}>
          <div className="tgrid__spinner" style={{ width: 36, height: 36 }} />
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: '#aaa' }}>
            Memuat preview tema...
          </p>
        </div>
      )}

      <iframe
        ref={iframeRef}
        src={previewUrl}
        onLoad={handleLoad}
        onError={handleError}
        title="Preview Undangan Digital"
        style={iframeStyle}
        allow="autoplay"
        sandbox="allow-scripts allow-same-origin allow-forms"
      />
    </div>
  )
}
