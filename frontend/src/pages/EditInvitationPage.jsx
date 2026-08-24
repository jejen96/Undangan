import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchInvitation, createInvitation, updateInvitation, uploadPhoto, uploadGallery, deleteGalleryPhoto } from '../api/invitation'
import { fetchTemplates } from '../api/templates'
import ThemeRenderer from '../themes/ThemeRenderer'
import './EditInvitationPage.css'

const SECTIONS = [
  { key: 'mempelai', label: '💑 Mempelai' },
  { key: 'hero',     label: '🖼 Hero' },
  { key: 'acara',    label: '📅 Acara' },
  { key: 'lovestory',label: '❤️ Love Story' },
  { key: 'gallery',  label: '🖼️ Gallery' },
  { key: 'rsvp',     label: '✉️ RSVP' },
  { key: 'gift',     label: '🎁 Gift' },
  { key: 'wishes',   label: '💌 Wishes' },
  { key: 'musik',    label: '🎵 Musik' },
  { key: 'seo',      label: '🔍 SEO' },
  { key: 'tema',     label: '🎨 Tema' },
]

const EMPTY = {
  groom_name:'', groom_nickname:'', groom_father:'', groom_mother:'', groom_photo:null,
  bride_name:'', bride_nickname:'', bride_father:'', bride_mother:'', bride_photo:null,
  hero_bg_photo:null, hero_subtitle:'', opening_quote:'', cover_photo:null,
  akad_date:'', akad_time:'', akad_venue:'', akad_address:'', akad_maps_url:'',
  resepsi_date:'', resepsi_time:'', resepsi_venue:'', resepsi_address:'', resepsi_maps_url:'',
  countdown_date:'',
  love_story:'', love_stories:[],
  gallery_photos:[],
  rsvp_enabled:true, rsvp_limit:'',
  bank_accounts:[], qris_photo:null, gift_address:'',
  wishes_enabled:true,
  music_url:'', music_title:'', music_autoplay:true,
  seo_title:'', seo_description:'', seo_thumbnail:null,
  template_id:null, status:'draft',
}

export default function EditInvitationPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [form, setForm]             = useState(EMPTY)
  const [invitation, setInvitation] = useState(null)
  const [templates, setTemplates]   = useState([])
  const [currentTemplate, setCurrentTemplate] = useState(null)  // template aktif untuk preview
  const [activeSection, setSection] = useState('mempelai')
  const [saving, setSaving]         = useState(false)
  const [loading, setLoading]       = useState(true)
  const [toast, setToast]           = useState(null)
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const [inv, tpls] = await Promise.all([
          fetchInvitation(slug).catch(() => null),
          fetchTemplates(),
        ])
        setTemplates(tpls)
        if (inv) {
          setInvitation(inv)
          setForm({ ...EMPTY, ...inv })
          // Load template berdasarkan template_id dari invitation
          if (inv.template_id) {
            const tpl = tpls.find(t => t.id === inv.template_id)
            if (tpl) setCurrentTemplate(tpl)
          }
        }
        // Jika tidak ada template terpilih, pakai template pertama dari list
        if (!inv?.template_id && tpls.length > 0) {
          setCurrentTemplate(tpls[0])
        }
      } catch { showToast('Gagal memuat data.', 'error') }
      finally  { setLoading(false) }
    }
    load()
  }, [slug])

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3500)
  }

  const set = (name, value) => setForm(p => ({ ...p, [name]: value }))
  const handleChange = (e) => {
    const { name, value, type: t, checked } = e.target
    set(name, t === 'checkbox' ? checked : value)
  }

  const handleUpload = useCallback(async (file, type) => {
    if (!invitation) { showToast('Simpan dulu sebelum upload foto.', 'info'); return }
    try {
      const res = await uploadPhoto(invitation.slug, file, type)
      set(type, res.url)
      showToast('Foto berhasil diupload ✓')
    } catch { showToast('Upload gagal.', 'error') }
  }, [invitation])

  const handleGalleryUpload = useCallback(async (files) => {
    if (!invitation) { showToast('Simpan dulu sebelum upload gallery.', 'info'); return }
    try {
      const res = await uploadGallery(invitation.slug, Array.from(files))
      set('gallery_photos', res.gallery_photos)
      showToast('Gallery diupload ✓')
    } catch { showToast('Upload gallery gagal.', 'error') }
  }, [invitation])

  const handleGalleryDelete = useCallback(async (url) => {
    if (!invitation) return
    try {
      const res = await deleteGalleryPhoto(invitation.slug, url)
      set('gallery_photos', res.gallery_photos)
    } catch { showToast('Hapus gagal.', 'error') }
  }, [invitation])

  const handleSave = useCallback(async () => {
    setSaving(true)
    try {
      let activeInvitation = invitation
      let activeSlug       = invitation ? invitation.slug : null

      // ── CASE 1: Invitation belum ada → buat baru dulu ──
      if (!activeInvitation) {
        const created = await createInvitation(form.template_id)
        activeInvitation = created
        activeSlug       = created.slug
        setInvitation(created)
        // Update URL tanpa reload — tidak menunggu navigate selesai
        window.history.replaceState(null, '', `/invitation/${activeSlug}/edit`)
      }

      // ── CASE 2: Update invitation yang sudah ada ──
      // Kirim hanya field yang ada di fillable, filter null/undefined fields
      // agar tidak overwrite data yang sudah tersimpan dengan null
      const payload = Object.fromEntries(
        Object.entries(form).filter(([key, val]) => {
          // Selalu kirim fields ini meski kosong
          const alwaysSend = ['rsvp_enabled', 'wishes_enabled', 'music_autoplay', 'status', 'template_id']
          if (alwaysSend.includes(key)) return true
          // Skip null/undefined untuk string fields
          if (val === null || val === undefined) return false
          return true
        })
      )

      const result = await updateInvitation(activeSlug, payload)

      // Backend mengembalikan { message, invitation }
      const updatedInv = result.invitation ?? result.data ?? result
      setInvitation(updatedInv)
      setForm(prev => ({ ...prev, ...updatedInv }))

      showToast('Tersimpan ✓')
    } catch (err) {
      // Tampilkan pesan error yang spesifik
      const status = err?.response?.status
      if (status === 401) {
        showToast('Sesi habis. Silakan login kembali.', 'error')
      } else if (status === 403) {
        showToast('Anda tidak memiliki akses ke undangan ini.', 'error')
      } else if (status === 422) {
        const errors = err?.response?.data?.errors
        const firstError = errors ? Object.values(errors)[0]?.[0] : null
        showToast(firstError || 'Data tidak valid. Periksa kembali form.', 'error')
      } else {
        showToast('Gagal menyimpan. Coba lagi.', 'error')
      }
    } finally {
      setSaving(false)
    }
  }, [invitation, form])

  const handlePublish = async () => {
    // Langsung update form dengan status published lalu save
    // Tidak bisa hanya set() karena setState async
    setForm(prev => {
      const updated = { ...prev, status: 'published' }
      // Simpan dengan form yang sudah diupdate
      setTimeout(async () => {
        setSaving(true)
        try {
          let activeInvitation = invitation
          let activeSlug       = invitation ? invitation.slug : null
          if (!activeInvitation) {
            const created = await createInvitation(updated.template_id)
            activeInvitation = created
            activeSlug       = created.slug
            setInvitation(created)
            window.history.replaceState(null, '', `/invitation/${activeSlug}/edit`)
          }
          const result = await updateInvitation(activeSlug, updated)
          const updatedInv = result.invitation ?? result.data ?? result
          setInvitation(updatedInv)
          showToast('Dipublish ✓')
        } catch { showToast('Gagal publish.', 'error') }
        finally { setSaving(false) }
      }, 0)
      return updated
    })
  }

  if (loading) return (
    <div className="edit-loading">
      <div className="tgrid__spinner" />
      <p>Memuat editor...</p>
    </div>
  )

  const sharedProps = { form, set, handleChange, handleUpload, handleGalleryUpload, handleGalleryDelete, invitation, templates }

  return (
    <div className="edit-page">
      {toast && <div className={`edit-toast edit-toast--${toast.type}`}>{toast.msg}</div>}

      {/* Topbar */}
      <header className="edit-topbar">
        <button className="edit-topbar__back" onClick={() => navigate('/')}>← Kembali</button>
        <div className="edit-topbar__title">
          <span style={{color:'#C8956C'}}>✦</span>
          <span className="edit-topbar__title-text">
            {form.groom_nickname && form.bride_nickname
              ? `${form.groom_nickname} & ${form.bride_nickname}`
              : 'Edit Undangan'}
          </span>
          <span className={`edit-topbar__badge edit-topbar__badge--${form.status}`}>
            {form.status === 'published' ? '● Live' : 'Draft'}
          </span>
        </div>
        <div className="edit-topbar__actions">
          <button className="edit-btn edit-btn--ghost" onClick={() => setShowPreview(p => !p)}>
            {showPreview ? '✏️ Editor' : '📱 Preview'}
          </button>
          <button className="edit-btn edit-btn--outline" onClick={handleSave} disabled={saving}>
            {saving ? '...' : '💾 Simpan'}
          </button>
          <button className="edit-btn edit-btn--primary" onClick={handlePublish} disabled={saving}>
            🚀 Publish
          </button>
        </div>
      </header>

      {/* Preview full (mobile toggle) */}
      {showPreview ? (
        <div className="edit-preview-full">
          <ThemeRenderer
            template={currentTemplate}
            invitation={form}
            isFullPage={true}
          />
        </div>
      ) : (
        <div className="edit-body">
          {/* Sidebar */}
          <aside className="edit-sidebar">
            <nav className="edit-nav">
              {SECTIONS.map(s => (
                <button key={s.key}
                  className={`edit-nav__item ${activeSection === s.key ? 'edit-nav__item--active' : ''}`}
                  onClick={() => setSection(s.key)}>
                  {s.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Form */}
          <main className="edit-form-panel">
            {activeSection === 'mempelai'  && <SecMempelai  {...sharedProps} />}
            {activeSection === 'hero'      && <SecHero      {...sharedProps} />}
            {activeSection === 'acara'     && <SecAcara     {...sharedProps} />}
            {activeSection === 'lovestory' && <SecLoveStory {...sharedProps} />}
            {activeSection === 'gallery'   && <SecGallery   {...sharedProps} />}
            {activeSection === 'rsvp'      && <SecRsvp      {...sharedProps} />}
            {activeSection === 'gift'      && <SecGift      {...sharedProps} />}
            {activeSection === 'wishes'    && <SecWishes    {...sharedProps} />}
            {activeSection === 'musik'     && <SecMusik     {...sharedProps} />}
            {activeSection === 'seo'       && <SecSeo       {...sharedProps} />}
            {activeSection === 'tema'      && (
              <SecTema
                form={form}
                set={set}
                templates={templates}
                onSelectTemplate={setCurrentTemplate}
              />
            )}
            <div className="edit-form-panel__footer">
              <button className="edit-btn edit-btn--primary edit-btn--full" onClick={handleSave} disabled={saving}>
                {saving ? 'Menyimpan...' : '💾 Simpan Perubahan'}
              </button>
            </div>
          </main>

          {/* Live preview — pakai ThemeRenderer sama dengan halaman preview */}
          <aside className="edit-preview-panel">
            <div className="edit-preview-panel__header">
              📱 PREVIEW LIVE
              {currentTemplate && (
                <span style={{marginLeft:8, fontSize:10, opacity:.6}}>
                  — {currentTemplate.name}
                </span>
              )}
            </div>
            <div className="edit-preview-panel__frame">
              <ThemeRenderer
                template={currentTemplate}
                invitation={form}
                isFullPage={true}
              />
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}

/* ── Reusable ── */
function Field({ label, name, value, onChange, placeholder, type='text', as='input', rows=3 }) {
  return (
    <div className="edit-field">
      <label className="edit-label" htmlFor={name}>{label}</label>
      {as === 'textarea'
        ? <textarea id={name} name={name} value={value??''} onChange={onChange} placeholder={placeholder} rows={rows} className="edit-input edit-input--textarea" />
        : <input id={name} name={name} type={type} value={value??''} onChange={onChange} placeholder={placeholder} className="edit-input" />
      }
    </div>
  )
}

function PhotoUpload({ label, value, onUpload, type }) {
  const ref = useRef(null)
  return (
    <div className="edit-field">
      <label className="edit-label">{label}</label>
      <div className="edit-photo-upload" onClick={() => ref.current?.click()}>
        {value
          ? <img src={value} alt={label} className="edit-photo-upload__img" />
          : <span className="edit-photo-upload__placeholder">📷 Klik untuk pilih foto</span>
        }
      </div>
      <input ref={ref} type="file" accept="image/*" hidden
        onChange={e => { const f = e.target.files?.[0]; if (f) onUpload(f, type) }} />
      {value && <button className="edit-btn edit-btn--outline edit-btn--sm" style={{marginTop:6}}
        onClick={() => ref.current?.click()}>🔄 Ganti Foto</button>}
    </div>
  )
}

function Toggle({ label, name, value, onChange, desc }) {
  return (
    <div className="edit-toggle-row">
      <div>
        <p className="edit-label" style={{marginBottom:2}}>{label}</p>
        {desc && <p style={{fontSize:12,color:'#888'}}>{desc}</p>}
      </div>
      <label className="edit-toggle">
        <input type="checkbox" name={name} checked={!!value} onChange={onChange} />
        <span className="edit-toggle__track"><span className="edit-toggle__thumb" /></span>
      </label>
    </div>
  )
}

/* ================================================================
   SECTIONS
================================================================ */
function SecMempelai({ form, handleChange, handleUpload }) {
  return (
    <div className="edit-section">
      <h2 className="edit-section__title">💑 Data Mempelai</h2>
      <div className="edit-group">
        <h3 className="edit-group__title">Mempelai Pria</h3>
        <PhotoUpload label="Foto Mempelai Pria" value={form.groom_photo} onUpload={handleUpload} type="groom_photo" />
        <div className="edit-row">
          <Field label="Nama Lengkap" name="groom_name" value={form.groom_name} onChange={handleChange} placeholder="Nama lengkap" />
          <Field label="Nama Panggilan" name="groom_nickname" value={form.groom_nickname} onChange={handleChange} placeholder="Panggilan" />
        </div>
        <div className="edit-row">
          <Field label="Nama Ayah" name="groom_father" value={form.groom_father} onChange={handleChange} placeholder="Nama ayah" />
          <Field label="Nama Ibu" name="groom_mother" value={form.groom_mother} onChange={handleChange} placeholder="Nama ibu" />
        </div>
      </div>
      <div className="edit-group">
        <h3 className="edit-group__title">Mempelai Wanita</h3>
        <PhotoUpload label="Foto Mempelai Wanita" value={form.bride_photo} onUpload={handleUpload} type="bride_photo" />
        <div className="edit-row">
          <Field label="Nama Lengkap" name="bride_name" value={form.bride_name} onChange={handleChange} placeholder="Nama lengkap" />
          <Field label="Nama Panggilan" name="bride_nickname" value={form.bride_nickname} onChange={handleChange} placeholder="Panggilan" />
        </div>
        <div className="edit-row">
          <Field label="Nama Ayah" name="bride_father" value={form.bride_father} onChange={handleChange} placeholder="Nama ayah" />
          <Field label="Nama Ibu" name="bride_mother" value={form.bride_mother} onChange={handleChange} placeholder="Nama ibu" />
        </div>
      </div>
    </div>
  )
}

function SecHero({ form, handleChange, handleUpload }) {
  return (
    <div className="edit-section">
      <h2 className="edit-section__title">🖼 Hero / Cover</h2>
      <div className="edit-group">
        <PhotoUpload label="Foto Background Hero" value={form.hero_bg_photo} onUpload={handleUpload} type="hero_bg_photo" />
        <Field label="Subtitle / Tagline" name="hero_subtitle" value={form.hero_subtitle} onChange={handleChange} placeholder="Contoh: Sabtu, 14 Februari 2026 · Bandung" />
        <Field label="Kata Pembuka / Quote" name="opening_quote" value={form.opening_quote} onChange={handleChange}
          as="textarea" rows={3} placeholder="Contoh: Dan di antara tanda-tanda kekuasaan-Nya..." />
      </div>
    </div>
  )
}

function SecAcara({ form, handleChange }) {
  return (
    <div className="edit-section">
      <h2 className="edit-section__title">📅 Detail Acara</h2>
      <div className="edit-group">
        <h3 className="edit-group__title">Countdown</h3>
        <Field label="Tanggal Hitung Mundur" name="countdown_date" type="date" value={form.countdown_date} onChange={handleChange} />
        <p style={{fontSize:12,color:'#888',marginTop:4}}>Kosongkan untuk menggunakan tanggal akad secara otomatis.</p>
      </div>
      <div className="edit-group">
        <h3 className="edit-group__title">Akad Nikah</h3>
        <div className="edit-row">
          <Field label="Tanggal" name="akad_date" type="date" value={form.akad_date} onChange={handleChange} />
          <Field label="Waktu" name="akad_time" type="time" value={form.akad_time} onChange={handleChange} />
        </div>
        <Field label="Nama Tempat" name="akad_venue" value={form.akad_venue} onChange={handleChange} placeholder="Masjid Al-Ikhlas" />
        <Field label="Alamat Lengkap" name="akad_address" value={form.akad_address} onChange={handleChange} as="textarea" placeholder="Jl. ..." />
        <Field label="Link Google Maps" name="akad_maps_url" value={form.akad_maps_url} onChange={handleChange} placeholder="https://maps.google.com/..." />
      </div>
      <div className="edit-group">
        <h3 className="edit-group__title">Resepsi</h3>
        <div className="edit-row">
          <Field label="Tanggal" name="resepsi_date" type="date" value={form.resepsi_date} onChange={handleChange} />
          <Field label="Waktu" name="resepsi_time" type="time" value={form.resepsi_time} onChange={handleChange} />
        </div>
        <Field label="Nama Tempat" name="resepsi_venue" value={form.resepsi_venue} onChange={handleChange} placeholder="Grand Ballroom Hotel" />
        <Field label="Alamat Lengkap" name="resepsi_address" value={form.resepsi_address} onChange={handleChange} as="textarea" placeholder="Jl. ..." />
        <Field label="Link Google Maps" name="resepsi_maps_url" value={form.resepsi_maps_url} onChange={handleChange} placeholder="https://maps.google.com/..." />
      </div>
    </div>
  )
}

function SecLoveStory({ form, set }) {
  const stories = form.love_stories ?? []
  const add = () => set('love_stories', [...stories, { title:'', date:'', desc:'', photo:'' }])
  const upd = (i, key, val) => {
    const next = stories.map((s, idx) => idx === i ? { ...s, [key]: val } : s)
    set('love_stories', next)
  }
  const del = (i) => set('love_stories', stories.filter((_, idx) => idx !== i))

  return (
    <div className="edit-section">
      <h2 className="edit-section__title">❤️ Love Story</h2>
      <div className="edit-group">
        <h3 className="edit-group__title">Cerita Singkat</h3>
        <textarea className="edit-input edit-input--textarea" rows={4}
          value={form.love_story??''} onChange={e => set('love_story', e.target.value)}
          placeholder="Tulis cerita singkat perjalanan cinta kalian..." />
      </div>
      <div className="edit-group">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
          <h3 className="edit-group__title" style={{marginBottom:0}}>Timeline Cerita</h3>
          <button className="edit-btn edit-btn--outline edit-btn--sm" onClick={add}>+ Tambah Momen</button>
        </div>
        {stories.map((s, i) => (
          <div key={i} className="edit-love-item">
            <div className="edit-love-item__header">
              <span style={{fontWeight:600,fontSize:13}}>Momen {i+1}</span>
              <button className="edit-btn-del" onClick={() => del(i)}>✕</button>
            </div>
            <div className="edit-row">
              <div className="edit-field"><label className="edit-label">Judul</label>
                <input className="edit-input" value={s.title??''} onChange={e => upd(i,'title',e.target.value)} placeholder="Pertama Bertemu" /></div>
              <div className="edit-field"><label className="edit-label">Tanggal</label>
                <input className="edit-input" type="date" value={s.date??''} onChange={e => upd(i,'date',e.target.value)} /></div>
            </div>
            <div className="edit-field"><label className="edit-label">Deskripsi</label>
              <textarea className="edit-input edit-input--textarea" rows={2} value={s.desc??''} onChange={e => upd(i,'desc',e.target.value)} placeholder="Ceritakan..." /></div>
          </div>
        ))}
        {stories.length === 0 && <p style={{fontSize:13,color:'#aaa',textAlign:'center',padding:'16px 0'}}>Belum ada momen. Klik "Tambah Momen" untuk mulai.</p>}
      </div>
    </div>
  )
}

function SecGallery({ form, invitation, handleGalleryUpload, handleGalleryDelete }) {
  const ref = useRef(null)
  const photos = form.gallery_photos ?? []
  return (
    <div className="edit-section">
      <h2 className="edit-section__title">🖼️ Galeri Foto</h2>
      <div className="edit-group">
        <p style={{fontSize:13,color:'#666',marginBottom:16}}>Upload hingga 20 foto. Klik ✕ untuk hapus foto.</p>
        <div className="edit-gallery-grid">
          {photos.map((url, i) => (
            <div key={i} className="edit-gallery-item">
              <img src={url} alt={`Gallery ${i+1}`} />
              <button className="edit-gallery-item__del" onClick={() => handleGalleryDelete(url)}>✕</button>
            </div>
          ))}
          <div className="edit-gallery-add" onClick={() => ref.current?.click()}>
            <span>+</span><small>Tambah Foto</small>
          </div>
        </div>
        <input ref={ref} type="file" accept="image/*" multiple hidden
          onChange={e => handleGalleryUpload(e.target.files)} />
        <button className="edit-btn edit-btn--outline edit-btn--sm" style={{marginTop:12}}
          onClick={() => ref.current?.click()}>📷 Upload Foto Gallery</button>
      </div>
    </div>
  )
}

function SecRsvp({ form, set, handleChange }) {
  return (
    <div className="edit-section">
      <h2 className="edit-section__title">✉️ RSVP</h2>
      <div className="edit-group">
        <Toggle label="Aktifkan RSVP" name="rsvp_enabled" value={form.rsvp_enabled} onChange={handleChange}
          desc="Tamu dapat mengkonfirmasi kehadiran" />
        {form.rsvp_enabled && (
          <Field label="Batas Jumlah Tamu (opsional)" name="rsvp_limit" type="number"
            value={form.rsvp_limit} onChange={handleChange} placeholder="Kosongkan jika tidak dibatasi" />
        )}
      </div>
    </div>
  )
}

function SecGift({ form, set, handleChange, handleUpload }) {
  const banks = form.bank_accounts ?? []
  const addBank = () => set('bank_accounts', [...banks, { bank_name:'', account_number:'', account_name:'' }])
  const updBank = (i, key, val) => set('bank_accounts', banks.map((b, idx) => idx === i ? { ...b, [key]: val } : b))
  const delBank = (i) => set('bank_accounts', banks.filter((_, idx) => idx !== i))

  return (
    <div className="edit-section">
      <h2 className="edit-section__title">🎁 Wedding Gift</h2>
      <div className="edit-group">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
          <h3 className="edit-group__title" style={{marginBottom:0}}>Rekening Bank</h3>
          <button className="edit-btn edit-btn--outline edit-btn--sm" onClick={addBank}>+ Tambah Rekening</button>
        </div>
        {banks.map((b, i) => (
          <div key={i} className="edit-love-item">
            <div className="edit-love-item__header">
              <span style={{fontWeight:600,fontSize:13}}>Rekening {i+1}</span>
              <button className="edit-btn-del" onClick={() => delBank(i)}>✕</button>
            </div>
            <Field label="Nama Bank" name={`bank_name_${i}`} value={b.bank_name}
              onChange={e => updBank(i,'bank_name',e.target.value)} placeholder="BCA / BNI / Mandiri" />
            <Field label="Nomor Rekening" name={`acc_num_${i}`} value={b.account_number}
              onChange={e => updBank(i,'account_number',e.target.value)} placeholder="1234567890" />
            <Field label="Nama Pemilik" name={`acc_name_${i}`} value={b.account_name}
              onChange={e => updBank(i,'account_name',e.target.value)} placeholder="Nama pemilik rekening" />
          </div>
        ))}
      </div>
      <div className="edit-group">
        <h3 className="edit-group__title">QRIS</h3>
        <PhotoUpload label="Foto QRIS" value={form.qris_photo} onUpload={handleUpload} type="qris_photo" />
      </div>
      <div className="edit-group">
        <h3 className="edit-group__title">Alamat Pengiriman Hadiah</h3>
        <Field label="Alamat" name="gift_address" value={form.gift_address} onChange={handleChange}
          as="textarea" placeholder="Alamat lengkap untuk kirim hadiah fisik..." />
      </div>
    </div>
  )
}

function SecWishes({ form, handleChange }) {
  return (
    <div className="edit-section">
      <h2 className="edit-section__title">💌 Ucapan & Doa</h2>
      <div className="edit-group">
        <Toggle label="Aktifkan Kolom Ucapan" name="wishes_enabled" value={form.wishes_enabled} onChange={handleChange}
          desc="Tamu dapat mengirim ucapan dan doa" />
      </div>
    </div>
  )
}

function SecMusik({ form, set, handleChange }) {
  return (
    <div className="edit-section">
      <h2 className="edit-section__title">🎵 Musik Latar</h2>
      <div className="edit-group">
        <Field label="URL Musik (MP3 / YouTube)" name="music_url" value={form.music_url} onChange={handleChange} placeholder="https://..." />
        <Field label="Judul Lagu" name="music_title" value={form.music_title} onChange={handleChange} placeholder="Nama lagu" />
        <Toggle label="Autoplay Musik" name="music_autoplay" value={form.music_autoplay} onChange={handleChange}
          desc="Musik otomatis putar saat undangan dibuka (tergantung browser)" />
      </div>
    </div>
  )
}

function SecSeo({ form, handleChange, handleUpload }) {
  return (
    <div className="edit-section">
      <h2 className="edit-section__title">🔍 SEO & Sharing</h2>
      <div className="edit-group">
        <Field label="Judul Halaman" name="seo_title" value={form.seo_title} onChange={handleChange} placeholder="Undangan Pernikahan Budi & Sari" />
        <Field label="Deskripsi" name="seo_description" value={form.seo_description} onChange={handleChange}
          as="textarea" rows={2} placeholder="Deskripsi singkat untuk WhatsApp preview..." />
        <PhotoUpload label="Thumbnail (Foto OG)" value={form.seo_thumbnail} onUpload={handleUpload} type="seo_thumbnail" />
      </div>
    </div>
  )
}

function SecTema({ form, set, templates, onSelectTemplate }) {
  return (
    <div className="edit-section">
      <h2 className="edit-section__title">🎨 Pilih Tema</h2>
      <p className="edit-section__desc">Tema bisa diganti kapan saja tanpa kehilangan data.</p>
      <div className="edit-theme-grid">
        {templates.map(tpl => (
          <button key={tpl.id}
            className={`edit-theme-card ${form.template_id === tpl.id ? 'edit-theme-card--active' : ''}`}
            onClick={() => { set('template_id', tpl.id); onSelectTemplate(tpl) }}>
            <img src={tpl.preview_image} alt={tpl.name} className="edit-theme-card__img"
              onError={e => { e.target.style.display='none' }} />
            <div className="edit-theme-card__body">
              <span className="edit-theme-card__name">{tpl.name}</span>
              <span className={`edit-theme-card__cat edit-theme-card__cat--${tpl.category}`}>{tpl.category}</span>
            </div>
            {form.template_id === tpl.id && <div className="edit-theme-card__check">✓ Dipilih</div>}
          </button>
        ))}
      </div>
    </div>
  )
}
