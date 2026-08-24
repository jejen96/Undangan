
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { staggerContainer, fadeInUp, scaleIn, VIEWPORT } from '@/config/animationConfig'

const INITIAL_WISHES = [
  { id: 1, name: 'Rizky P.',   msg: 'Selamat menempuh hidup baru! Semoga selalu bahagia dan diberikan keberkahan. 💕', time: '2 jam lalu' },
  { id: 2, name: 'Dewi S.',    msg: 'Sakinah mawaddah warahmah. Bahagia selalu ya! 🌸', time: '4 jam lalu' },
  { id: 3, name: 'Ahmad F.',   msg: 'Congrats! Semoga jadi keluarga yang harmonis dan penuh cinta.', time: '6 jam lalu' },
]

export default function WishSection() {
  const [wishes, setWishes]   = useState(INITIAL_WISHES)
  const [form, setForm]       = useState({ name: '', msg: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent]       = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.msg.trim()) return
    setSending(true)
    await new Promise(r => setTimeout(r, 800))
    setWishes(p => [{ id: Date.now(), name: form.name, msg: form.msg, time: 'Baru saja' }, ...p])
    setForm({ name: '', msg: '' })
    setSending(false)
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  const inputCls = 'w-full px-4 py-3 rounded-2xl border border-sakura-primary/60 bg-white/70 focus:outline-none focus:ring-2 focus:ring-sakura-accent/40 font-body text-sm text-sakura-dark placeholder:text-sakura-muted transition'

  return (
    <section className="section-wrap bg-sakura-secondary/20">
      <div className="section-inner">
        <motion.div variants={staggerContainer()} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
          <motion.span variants={fadeInUp} className="section-label">Ucapan &amp; Doa</motion.span>
          <motion.h2 variants={fadeInUp} className="section-title mt-1">Buku Tamu</motion.h2>
          <motion.div variants={fadeInUp} className="sakura-divider"><span className="text-sakura-accent">🌸</span></motion.div>
        </motion.div>

        {/* Form */}
        <motion.form
          variants={scaleIn} initial="hidden" whileInView="visible" viewport={VIEWPORT}
          onSubmit={handleSubmit}
          className="glass max-w-sm mx-auto mt-8 p-6 rounded-3xl flex flex-col gap-3"
        >
          <input className={inputCls} placeholder="Nama Anda" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required />
          <textarea className={`${inputCls} resize-none`} rows={3} placeholder="Tuliskan ucapan &amp; doa untuk mempelai..." value={form.msg} onChange={e => setForm(p => ({ ...p, msg: e.target.value }))} required />
          <button type="submit" disabled={sending} className="btn-primary justify-center">
            {sending ? <><span className="animate-spin">⏳</span> Mengirim...</> : <><span>Kirim Ucapan</span><span>💌</span></>}
          </button>
          <AnimatePresence>
            {sent && <motion.p initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }} className="text-center text-xs text-sakura-accent font-body">Ucapan terkirim! 🌸</motion.p>}
          </AnimatePresence>
        </motion.form>

        {/* Wishes list */}
        <div className="max-w-sm mx-auto mt-6 flex flex-col gap-3">
          <AnimatePresence initial={false}>
            {wishes.map((w, i) => (
              <motion.div
                key={w.id}
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0, transition: { delay: i < 3 ? i * 0.08 : 0 } }}
                exit={{ opacity: 0, height: 0 }}
                className="glass p-4 rounded-2xl flex gap-3 items-start text-left"
              >
                <div className="w-9 h-9 rounded-full bg-sakura-primary flex-shrink-0 flex items-center justify-center font-serif text-base font-semibold text-sakura-accent">
                  {w.name[0]?.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="font-body font-semibold text-sm text-sakura-dark truncate">{w.name}</p>
                    <span className="font-body text-[10px] text-sakura-muted flex-shrink-0">{w.time}</span>
                  </div>
                  <p className="font-body text-sm text-sakura-muted leading-relaxed">{w.msg}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
