
import { useState } from 'react'
import { motion } from 'framer-motion'
import { staggerContainer, fadeInUp, scaleIn, VIEWPORT } from '@/config/animationConfig'

const ATTENDANCE = [
  { value: 'hadir', label: 'Hadir dengan bahagia 🎉' },
  { value: 'tidak', label: 'Tidak dapat hadir 😊' },
  { value: 'ragu',  label: 'Masih belum pasti' },
]

export default function RSVPSection({ rsvp }) {
  const [form, setForm]     = useState({ name: '', attendance: '', guests: '1', message: '' })
  const [status, setStatus] = useState(null) // null | 'loading' | 'success' | 'error'

  if (!rsvp?.enabled) return null

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.attendance) return
    setStatus('loading')
    await new Promise(r => setTimeout(r, 1200)) // mock API
    setStatus('success')
  }

  const inputCls = 'w-full px-4 py-3 rounded-2xl border border-sakura-primary/60 bg-white/70 focus:outline-none focus:ring-2 focus:ring-sakura-accent/40 font-body text-sm text-sakura-dark placeholder:text-sakura-muted transition'

  return (
    <section id="rsvp" className="section-wrap bg-sakura-gradient">
      <div className="section-inner">
        <motion.div variants={staggerContainer()} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
          <motion.span variants={fadeInUp} className="section-label">Konfirmasi Kehadiran</motion.span>
          <motion.h2 variants={fadeInUp} className="section-title mt-1">RSVP</motion.h2>
          <motion.p variants={fadeInUp} className="section-sub max-w-xs mx-auto">
            Mohon konfirmasi kehadiran Anda paling lambat 7 hari sebelum acara.
          </motion.p>
          <motion.div variants={fadeInUp} className="sakura-divider"><span className="text-sakura-accent">🌸</span></motion.div>
        </motion.div>

        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass max-w-sm mx-auto mt-8 p-8 rounded-3xl text-center"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1, repeat: 3 }}
              className="text-5xl mb-4"
            >🌸</motion.div>
            <h3 className="font-serif text-2xl text-sakura-dark mb-2">Terima Kasih!</h3>
            <p className="font-body text-sm text-sakura-muted">Konfirmasi kehadiran Anda telah kami terima. Sampai jumpa di hari bahagia kami! 💕</p>
          </motion.div>
        ) : (
          <motion.form
            variants={scaleIn} initial="hidden" whileInView="visible" viewport={VIEWPORT}
            onSubmit={handleSubmit}
            className="glass max-w-sm mx-auto mt-8 p-6 sm:p-8 rounded-3xl flex flex-col gap-4"
          >
            <input className={inputCls} placeholder="Nama lengkap Anda" value={form.name} onChange={e => set('name', e.target.value)} required />

            <div className="flex flex-col gap-2">
              <p className="font-button text-xs text-sakura-muted tracking-wide">Konfirmasi Kehadiran</p>
              {ATTENDANCE.map(a => (
                <label key={a.value} className={`flex items-center gap-3 px-4 py-3 rounded-2xl border cursor-pointer transition ${form.attendance === a.value ? 'border-sakura-accent bg-sakura-primary/30' : 'border-sakura-primary/40 bg-white/50'}`}>
                  <input type="radio" name="attendance" value={a.value} checked={form.attendance === a.value} onChange={() => set('attendance', a.value)} className="accent-sakura-accent" />
                  <span className="font-body text-sm text-sakura-dark">{a.label}</span>
                </label>
              ))}
            </div>

            <div>
              <p className="font-button text-xs text-sakura-muted tracking-wide mb-2">Jumlah Tamu</p>
              <select className={inputCls} value={form.guests} onChange={e => set('guests', e.target.value)}>
                {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} orang</option>)}
              </select>
            </div>

            <textarea className={`${inputCls} resize-none`} rows={3} placeholder="Ucapan untuk mempelai (opsional)" value={form.message} onChange={e => set('message', e.target.value)} />

            <button type="submit" disabled={status === 'loading'} className="btn-primary justify-center">
              {status === 'loading' ? (
                <><span className="animate-spin">⏳</span> Mengirim...</>
              ) : (
                <><span>Kirim Konfirmasi</span><span>✉️</span></>
              )}
            </button>
          </motion.form>
        )}
      </div>
    </section>
  )
}
