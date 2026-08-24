import React from 'react'
import './InvitationPreview.css'

function fmt(dateStr) {
  if (!dateStr) return ''
  try {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    })
  } catch { return dateStr }
}

export default function InvitationPreview({ form, coverPreview }) {
  const hasNames  = form.groom_nickname || form.bride_nickname
  const hasAkad   = form.akad_date || form.akad_venue
  const hasResepsi= form.resepsi_date || form.resepsi_venue
  const hasEvents = hasAkad || hasResepsi

  return (
    <div className="prev">
      {/* Cover */}
      <div className="prev__cover" style={{
        backgroundImage: coverPreview ? `url(${coverPreview})` : 'none',
        background: coverPreview ? undefined : 'linear-gradient(160deg,#1C2B4A,#3D3060)',
      }}>
        <div className="prev__cover-overlay" />

        {form.opening_quote && (
          <p className="prev__quote">"{form.opening_quote}"</p>
        )}

        <div className="prev__names">
          <h1 className="prev__groom">{form.groom_nickname || 'Mempelai Pria'}</h1>
          <span className="prev__amp">&</span>
          <h1 className="prev__bride">{form.bride_nickname || 'Mempelai Wanita'}</h1>
        </div>

        {hasAkad && (
          <p className="prev__date-chip">{fmt(form.akad_date)}</p>
        )}
      </div>

      {/* Mempelai detail */}
      {hasNames && (
        <section className="prev__section">
          <p className="prev__section-label">Bismillahirrahmanirrahim</p>
          <h2 className="prev__section-title">Mempelai</h2>
          <div className="prev__couple">
            <div className="prev__person">
              <p className="prev__person-name">{form.groom_name || form.groom_nickname || '—'}</p>
              {(form.groom_father || form.groom_mother) && (
                <p className="prev__person-parents">
                  Putra dari {form.groom_father || '...'} & {form.groom_mother || '...'}
                </p>
              )}
            </div>
            <div className="prev__couple-sep">✦</div>
            <div className="prev__person">
              <p className="prev__person-name">{form.bride_name || form.bride_nickname || '—'}</p>
              {(form.bride_father || form.bride_mother) && (
                <p className="prev__person-parents">
                  Putri dari {form.bride_father || '...'} & {form.bride_mother || '...'}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Acara */}
      {hasEvents && (
        <section className="prev__section prev__section--dark">
          <h2 className="prev__section-title prev__section-title--light">Acara</h2>

          {hasAkad && (
            <div className="prev__event">
              <p className="prev__event-label">Akad Nikah</p>
              <p className="prev__event-date">{fmt(form.akad_date)}</p>
              {form.akad_time && <p className="prev__event-time">Pukul {form.akad_time} WIB</p>}
              {form.akad_venue && <p className="prev__event-venue">{form.akad_venue}</p>}
              {form.akad_address && <p className="prev__event-addr">{form.akad_address}</p>}
              {form.akad_maps_url && (
                <a href={form.akad_maps_url} target="_blank" rel="noopener noreferrer"
                  className="prev__maps-btn">📍 Lihat Peta</a>
              )}
            </div>
          )}

          {hasAkad && hasResepsi && <div className="prev__event-sep" />}

          {hasResepsi && (
            <div className="prev__event">
              <p className="prev__event-label">Resepsi</p>
              <p className="prev__event-date">{fmt(form.resepsi_date)}</p>
              {form.resepsi_time && <p className="prev__event-time">Pukul {form.resepsi_time} WIB</p>}
              {form.resepsi_venue && <p className="prev__event-venue">{form.resepsi_venue}</p>}
              {form.resepsi_address && <p className="prev__event-addr">{form.resepsi_address}</p>}
              {form.resepsi_maps_url && (
                <a href={form.resepsi_maps_url} target="_blank" rel="noopener noreferrer"
                  className="prev__maps-btn">📍 Lihat Peta</a>
              )}
            </div>
          )}
        </section>
      )}

      {/* Love story */}
      {form.love_story && (
        <section className="prev__section">
          <h2 className="prev__section-title">Love Story</h2>
          <p className="prev__love-story">{form.love_story}</p>
        </section>
      )}

      {/* Footer */}
      <div className="prev__footer">
        <p>Made with ✦ UndangTeman.id</p>
      </div>
    </div>
  )
}
