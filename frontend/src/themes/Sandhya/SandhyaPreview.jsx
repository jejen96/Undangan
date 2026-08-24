import React, { useState, useEffect, useRef } from 'react'
import './SandhyaPreview.css'

/* ── Helpers ── */
const fmtDate = (d) => {
  if (!d) return ''
  try { return new Date(d).toLocaleDateString('id-ID', { weekday:'long', day:'numeric', month:'long', year:'numeric' }) }
  catch { return d }
}
const fmtDateShort = (d) => {
  if (!d) return ''
  try { return new Date(d).toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric' }) }
  catch { return d }
}

/* ── Intersection Observer hook for animations ── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

/* ── Countdown hook ── */
function useCountdown(targetDate) {
  const calc = () => {
    const diff = new Date(targetDate) - new Date()
    if (!targetDate || diff <= 0) return { d:0, h:0, m:0, s:0 }
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    }
  }
  const [time, setTime] = useState(calc)
  useEffect(() => {
    if (!targetDate) return
    const t = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(t)
  }, [targetDate])
  return time
}

/* ── Reveal wrapper ── */
function Reveal({ children, cls = '', delay = 0 }) {
  const [ref, vis] = useReveal()
  return (
    <div ref={ref} className={`sdh-reveal ${vis ? 'sdh-reveal--in' : ''} ${cls}`}
      style={delay ? { transitionDelay: `${delay}ms` } : {}}>
      {children}
    </div>
  )
}

/* ================================================================
   MAIN PREVIEW
================================================================ */
export default function SandhyaPreview({ form = {}, isFullPage = false }) {
  const [opened, setOpened] = useState(isFullPage)
  const [wishes, setWishes] = useState([
    { name: 'Rizky Pratama', msg: 'Selamat ya! Semoga jadi keluarga yang sakinah mawaddah warahmah 💕', time: '2 jam lalu' },
    { name: 'Dewi Sartika',  msg: 'Bahagia selalu untuk kalian berdua, aamiin!', time: '5 jam lalu' },
  ])
  const [wishForm, setWishForm] = useState({ name: '', msg: '' })
  const audioRef = useRef(null)

  // Opening cover click
  const handleOpen = () => setOpened(true)

  // Autoplay music setelah open
  useEffect(() => {
    if (opened && form.music_url && audioRef.current && form.music_autoplay !== false) {
      audioRef.current.play().catch(() => {})
    }
  }, [opened])

  const groom  = form.groom_nickname  || 'Mempelai Pria'
  const bride  = form.bride_nickname  || 'Mempelai Wanita'
  const hasAkad    = form.akad_date || form.akad_venue
  const hasResepsi = form.resepsi_date || form.resepsi_venue
  const hasBanks   = form.bank_accounts?.length > 0
  const countdownTarget = form.countdown_date || form.akad_date || form.resepsi_date

  return (
    <div className={`sdh ${isFullPage ? 'sdh--full' : 'sdh--preview'}`}>

      {/* ── Audio ── */}
      {form.music_url && (
        <audio ref={audioRef} loop src={form.music_url} className="sdh-audio" />
      )}

      {/* ================================================================
          OPENING COVER — klik untuk buka
      ================================================================ */}
      {!opened && (
        <div className="sdh-cover" onClick={handleOpen}
          style={{ backgroundImage: form.hero_bg_photo ? `url(${form.hero_bg_photo})` : 'none' }}>
          <div className="sdh-cover__overlay" />
          <div className="sdh-cover__floats" aria-hidden="true">
            <span className="sdh-float sdh-float--1">✦</span>
            <span className="sdh-float sdh-float--2">◇</span>
            <span className="sdh-float sdh-float--3">✦</span>
          </div>
          <div className="sdh-cover__inner">
            <p className="sdh-cover__label">Undangan Pernikahan</p>
            <h1 className="sdh-cover__names">{groom}<em>&</em>{bride}</h1>
            {form.akad_date && <p className="sdh-cover__date">{fmtDateShort(form.akad_date)}</p>}
            <button className="sdh-cover__open-btn">
              <span>Buka Undangan</span>
              <span className="sdh-cover__open-icon">↓</span>
            </button>
          </div>
        </div>
      )}

      {/* ================================================================
          CONTENT (visible setelah opened)
      ================================================================ */}
      {opened && (
        <div className="sdh-content">

          {/* ── 1. HERO ── */}
          <section className="sdh-hero"
            style={{ backgroundImage: form.hero_bg_photo ? `url(${form.hero_bg_photo})` : 'none' }}>
            <div className="sdh-hero__overlay" />
            <div className="sdh-hero__floats" aria-hidden="true">
              <span className="sdh-float sdh-float--1">✦</span>
              <span className="sdh-float sdh-float--2">◇</span>
            </div>
            <div className="sdh-hero__inner">
              <Reveal>
                <p className="sdh-hero__label">The Wedding of</p>
              </Reveal>
              <Reveal delay={150}>
                <h1 className="sdh-hero__names">
                  <span>{groom}</span>
                  <em className="sdh-hero__amp">&</em>
                  <span>{bride}</span>
                </h1>
              </Reveal>
              {form.hero_subtitle && (
                <Reveal delay={300}>
                  <p className="sdh-hero__subtitle">{form.hero_subtitle}</p>
                </Reveal>
              )}
              {form.akad_date && (
                <Reveal delay={450}>
                  <p className="sdh-hero__date">{fmtDate(form.akad_date)}</p>
                </Reveal>
              )}
            </div>
            <div className="sdh-hero__scroll" aria-hidden="true">↓</div>
          </section>

          {/* ── 2. OPENING QUOTE ── */}
          {form.opening_quote && (
            <section className="sdh-quote">
              <Reveal>
                <div className="sdh-quote__ornament" aria-hidden="true">✦</div>
                <blockquote className="sdh-quote__text">"{form.opening_quote}"</blockquote>
              </Reveal>
            </section>
          )}

          {/* ── 3. MEMPELAI ── */}
          <section className="sdh-couple">
            <Reveal>
              <p className="sdh-section-label">Mempelai</p>
              <h2 className="sdh-section-title">Bismillahirrahmanirrahim</h2>
            </Reveal>
            <div className="sdh-couple__grid">
              {/* Pria */}
              <Reveal delay={100}>
                <div className="sdh-person">
                  <div className="sdh-person__photo-wrap">
                    {form.groom_photo
                      ? <img src={form.groom_photo} alt={form.groom_name} className="sdh-person__photo" />
                      : <div className="sdh-person__photo-placeholder"><span>♂</span></div>
                    }
                    <div className="sdh-person__photo-ring" aria-hidden="true" />
                  </div>
                  <h3 className="sdh-person__name">{form.groom_name || 'Nama Mempelai Pria'}</h3>
                  <p className="sdh-person__nick">{form.groom_nickname && `(${form.groom_nickname})`}</p>
                  {(form.groom_father || form.groom_mother) && (
                    <p className="sdh-person__parents">
                      Putra dari<br/>
                      <strong>{form.groom_father || '...'}</strong><br/>
                      &amp; <strong>{form.groom_mother || '...'}</strong>
                    </p>
                  )}
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div className="sdh-couple__sep">
                  <span>✦</span>
                  <span className="sdh-couple__amp">&</span>
                  <span>✦</span>
                </div>
              </Reveal>

              {/* Wanita */}
              <Reveal delay={100}>
                <div className="sdh-person">
                  <div className="sdh-person__photo-wrap">
                    {form.bride_photo
                      ? <img src={form.bride_photo} alt={form.bride_name} className="sdh-person__photo" />
                      : <div className="sdh-person__photo-placeholder"><span>♀</span></div>
                    }
                    <div className="sdh-person__photo-ring" aria-hidden="true" />
                  </div>
                  <h3 className="sdh-person__name">{form.bride_name || 'Nama Mempelai Wanita'}</h3>
                  <p className="sdh-person__nick">{form.bride_nickname && `(${form.bride_nickname})`}</p>
                  {(form.bride_father || form.bride_mother) && (
                    <p className="sdh-person__parents">
                      Putri dari<br/>
                      <strong>{form.bride_father || '...'}</strong><br/>
                      &amp; <strong>{form.bride_mother || '...'}</strong>
                    </p>
                  )}
                </div>
              </Reveal>
            </div>
          </section>

          {/* ── 4. COUNTDOWN ── */}
          {countdownTarget && <CountdownSection target={countdownTarget} />}

          {/* ── 5. DETAIL ACARA ── */}
          {(hasAkad || hasResepsi) && (
            <section className="sdh-events">
              <Reveal>
                <p className="sdh-section-label">Acara</p>
                <h2 className="sdh-section-title">Turut Mengundang</h2>
              </Reveal>

              <div className="sdh-events__grid">
                {hasAkad && (
                  <Reveal delay={100}>
                    <div className="sdh-event-card">
                      <div className="sdh-event-card__icon">🕌</div>
                      <h3 className="sdh-event-card__type">Akad Nikah</h3>
                      <p className="sdh-event-card__date">{fmtDate(form.akad_date)}</p>
                      {form.akad_time && <p className="sdh-event-card__time">Pukul {form.akad_time} WIB</p>}
                      {form.akad_venue && <p className="sdh-event-card__venue">{form.akad_venue}</p>}
                      {form.akad_address && <p className="sdh-event-card__addr">{form.akad_address}</p>}
                      {form.akad_maps_url && (
                        <a href={form.akad_maps_url} target="_blank" rel="noopener noreferrer"
                          className="sdh-maps-btn">📍 Lihat Peta</a>
                      )}
                    </div>
                  </Reveal>
                )}
                {hasResepsi && (
                  <Reveal delay={200}>
                    <div className="sdh-event-card">
                      <div className="sdh-event-card__icon">🎊</div>
                      <h3 className="sdh-event-card__type">Resepsi</h3>
                      <p className="sdh-event-card__date">{fmtDate(form.resepsi_date)}</p>
                      {form.resepsi_time && <p className="sdh-event-card__time">Pukul {form.resepsi_time} WIB</p>}
                      {form.resepsi_venue && <p className="sdh-event-card__venue">{form.resepsi_venue}</p>}
                      {form.resepsi_address && <p className="sdh-event-card__addr">{form.resepsi_address}</p>}
                      {form.resepsi_maps_url && (
                        <a href={form.resepsi_maps_url} target="_blank" rel="noopener noreferrer"
                          className="sdh-maps-btn">📍 Lihat Peta</a>
                      )}
                    </div>
                  </Reveal>
                )}
              </div>
            </section>
          )}

          {/* ── 6. LOVE STORY ── */}
          {(form.love_stories?.length > 0 || form.love_story) && (
            <section className="sdh-love">
              <Reveal>
                <p className="sdh-section-label">Perjalanan Kami</p>
                <h2 className="sdh-section-title">Love Story</h2>
              </Reveal>
              <div className="sdh-love__timeline">
                {(form.love_stories?.length > 0
                  ? form.love_stories
                  : [{ title: 'Kisah Kami', date: '', desc: form.love_story }]
                ).map((story, i) => (
                  <Reveal key={i} delay={i * 100}>
                    <div className="sdh-love__item">
                      <div className="sdh-love__dot" aria-hidden="true" />
                      {story.photo && <img src={story.photo} alt={story.title} className="sdh-love__photo" />}
                      <div className="sdh-love__body">
                        {story.date && <p className="sdh-love__date">{fmtDateShort(story.date)}</p>}
                        {story.title && <h3 className="sdh-love__title">{story.title}</h3>}
                        {story.desc && <p className="sdh-love__desc">{story.desc}</p>}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>
          )}

          {/* ── 7. GALLERY ── */}
          {form.gallery_photos?.length > 0 && (
            <section className="sdh-gallery">
              <Reveal>
                <p className="sdh-section-label">Galeri</p>
                <h2 className="sdh-section-title">Momen Bersama</h2>
              </Reveal>
              <div className="sdh-gallery__grid">
                {form.gallery_photos.map((url, i) => (
                  <Reveal key={i} delay={i * 50}>
                    <div className="sdh-gallery__item">
                      <img src={url} alt={`Gallery ${i+1}`} loading="lazy" />
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>
          )}

          {/* ── 8. RSVP ── */}
          {form.rsvp_enabled !== false && (
            <section className="sdh-rsvp">
              <Reveal>
                <p className="sdh-section-label">Konfirmasi Kehadiran</p>
                <h2 className="sdh-section-title">RSVP</h2>
                <p className="sdh-rsvp__desc">Mohon konfirmasi kehadiran Anda untuk membantu persiapan kami.</p>
              </Reveal>
              <Reveal delay={150}>
                <form className="sdh-rsvp__form" onSubmit={e => e.preventDefault()}>
                  <input className="sdh-rsvp__input" placeholder="Nama Anda" required />
                  <select className="sdh-rsvp__input">
                    <option value="">-- Pilih Acara --</option>
                    {hasAkad    && <option value="akad">Akad Nikah</option>}
                    {hasResepsi && <option value="resepsi">Resepsi</option>}
                    {hasAkad && hasResepsi && <option value="both">Keduanya</option>}
                  </select>
                  <select className="sdh-rsvp__input">
                    <option value="">-- Konfirmasi Kehadiran --</option>
                    <option value="hadir">Hadir</option>
                    <option value="tidak">Tidak Hadir</option>
                    <option value="ragu">Masih Ragu</option>
                  </select>
                  <button type="submit" className="sdh-rsvp__btn">Kirim Konfirmasi</button>
                </form>
              </Reveal>
            </section>
          )}

          {/* ── 9. WEDDING GIFT ── */}
          {(hasBanks || form.qris_photo || form.gift_address) && (
            <section className="sdh-gift">
              <Reveal>
                <p className="sdh-section-label">Hadiah</p>
                <h2 className="sdh-section-title">Wedding Gift</h2>
                <p className="sdh-gift__desc">Doa dan kehadiran Anda adalah hadiah terbaik. Namun jika ingin memberikan tanda kasih:</p>
              </Reveal>

              {hasBanks && (
                <div className="sdh-gift__banks">
                  {form.bank_accounts.map((b, i) => (
                    <Reveal key={i} delay={i * 100}>
                      <div className="sdh-bank-card">
                        <p className="sdh-bank-card__bank">{b.bank_name}</p>
                        <p className="sdh-bank-card__number">{b.account_number}</p>
                        <p className="sdh-bank-card__name">{b.account_name}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              )}

              {form.qris_photo && (
                <Reveal delay={200}>
                  <div className="sdh-gift__qris">
                    <p className="sdh-gift__qris-label">QRIS</p>
                    <img src={form.qris_photo} alt="QRIS" className="sdh-gift__qris-img" />
                  </div>
                </Reveal>
              )}

              {form.gift_address && (
                <Reveal delay={300}>
                  <div className="sdh-gift__addr">
                    <p className="sdh-gift__addr-label">📦 Alamat Pengiriman</p>
                    <p className="sdh-gift__addr-text">{form.gift_address}</p>
                  </div>
                </Reveal>
              )}
            </section>
          )}

          {/* ── 10. WISHES ── */}
          {form.wishes_enabled !== false && (
            <section className="sdh-wishes">
              <Reveal>
                <p className="sdh-section-label">Ucapan & Doa</p>
                <h2 className="sdh-section-title">Wishes</h2>
              </Reveal>

              <Reveal delay={100}>
                <form className="sdh-wishes__form" onSubmit={(e) => {
                  e.preventDefault()
                  if (!wishForm.name || !wishForm.msg) return
                  setWishes(prev => [{ name: wishForm.name, msg: wishForm.msg, time: 'Baru saja' }, ...prev])
                  setWishForm({ name: '', msg: '' })
                }}>
                  <input className="sdh-wishes__input" placeholder="Nama Anda"
                    value={wishForm.name} onChange={e => setWishForm(p => ({ ...p, name: e.target.value }))} required />
                  <textarea className="sdh-wishes__textarea" placeholder="Tulis ucapan & doa untuk mempelai..."
                    value={wishForm.msg} onChange={e => setWishForm(p => ({ ...p, msg: e.target.value }))} rows={3} required />
                  <button type="submit" className="sdh-wishes__btn">Kirim Ucapan 💌</button>
                </form>
              </Reveal>

              <div className="sdh-wishes__list">
                {wishes.map((w, i) => (
                  <Reveal key={i} delay={i * 80}>
                    <div className="sdh-wish-item">
                      <div className="sdh-wish-item__avatar">{w.name[0]?.toUpperCase()}</div>
                      <div className="sdh-wish-item__body">
                        <p className="sdh-wish-item__name">{w.name}</p>
                        <p className="sdh-wish-item__msg">{w.msg}</p>
                        <p className="sdh-wish-item__time">{w.time}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>
          )}

          {/* ── 11. PENUTUP ── */}
          <section className="sdh-closing"
            style={{ backgroundImage: form.hero_bg_photo ? `url(${form.hero_bg_photo})` : 'none' }}>
            <div className="sdh-closing__overlay" />
            <Reveal>
              <div className="sdh-closing__inner">
                <div className="sdh-closing__ornament" aria-hidden="true">✦</div>
                <h2 className="sdh-closing__names">{groom} &amp; {bride}</h2>
                <p className="sdh-closing__text">
                  Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i
                  berkenan hadir untuk memberikan doa restu kepada kami.
                </p>
                <p className="sdh-closing__sign">Wassalamu'alaikum Warahmatullahi Wabarakatuh</p>
              </div>
            </Reveal>
          </section>

          {/* ── Footer ── */}
          <footer className="sdh-footer">
            <p>Made with ✦ <strong>UndangTeman.id</strong></p>
          </footer>

        </div>
      )}
    </div>
  )
}

/* ── Countdown Section ── */
function CountdownSection({ target }) {
  const { d, h, m, s } = useCountdown(target)
  const [ref, vis] = useReveal()
  return (
    <section className="sdh-countdown" ref={ref}>
      <div className={`sdh-reveal ${vis ? 'sdh-reveal--in' : ''}`}>
        <p className="sdh-section-label">Menuju Hari Bahagia</p>
        <h2 className="sdh-section-title">Hitung Mundur</h2>
      </div>
      <div className={`sdh-countdown__grid sdh-reveal ${vis ? 'sdh-reveal--in' : ''}`} style={{ transitionDelay: '150ms' }}>
        {[['Hari', d], ['Jam', h], ['Menit', m], ['Detik', s]].map(([label, val]) => (
          <div key={label} className="sdh-countdown__unit">
            <span className="sdh-countdown__num">{String(val).padStart(2, '0')}</span>
            <span className="sdh-countdown__label">{label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
