import { motion } from 'framer-motion'
import { staggerContainer, fadeInUp, scaleIn, VIEWPORT } from '@/config/animationConfig'

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
}

function EventCard({ event }) {
  const addToCalendar = () => {
    const start = event.date.replace(/-/g, '') + 'T' + (event.time || '08:00').replace(':', '') + '00'
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.name)}&dates=${start}/${start}&details=${encodeURIComponent(event.venue)}&location=${encodeURIComponent(event.address)}`
    window.open(url, '_blank')
  }

  return (
    <motion.div variants={scaleIn} className="glass p-6 sm:p-8 rounded-3xl text-center flex-1 min-w-[260px] max-w-sm">
      {/* Icon */}
      <div className="w-14 h-14 rounded-full bg-sakura-primary/60 flex items-center justify-center text-2xl mx-auto mb-4">
        {event.id === 'akad' ? '🕌' : '🎊'}
      </div>

      {/* Name */}
      <span className="section-label">{event.name}</span>

      {/* Date */}
      <h3 className="font-serif text-xl font-light text-sakura-dark mt-1 mb-1">
        {formatDate(event.date)}
      </h3>

      {/* Time */}
      <p className="font-button text-sm text-sakura-accent mb-4">
        {event.time} – {event.endTime} {event.timezone}
      </p>

      <div className="w-12 h-px bg-sakura-primary mx-auto mb-4" />

      {/* Venue */}
      <p className="font-body font-semibold text-sakura-dark text-sm mb-1">{event.venue}</p>
      <p className="font-body text-xs text-sakura-muted leading-relaxed mb-6">{event.address}</p>

      {/* Actions */}
      <div className="flex flex-col gap-2">
        {event.mapsUrl && (
          <a
            href={event.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-xs py-2.5"
          >
            📍 Lihat Peta
          </a>
        )}
        <button onClick={addToCalendar} className="btn-primary text-xs py-2.5">
          📅 Tambah ke Kalender
        </button>
      </div>
    </motion.div>
  )
}

export default function EventSection({ events }) {
  if (!events?.length) return null

  return (
    <section id="event" className="section-wrap bg-sakura-gradient">
      <div className="section-inner">
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          <motion.span variants={fadeInUp} className="section-label">Acara Pernikahan</motion.span>
          <motion.h2 variants={fadeInUp} className="section-title mt-1">Turut Mengundang</motion.h2>
          <motion.div variants={fadeInUp} className="sakura-divider">
            <span className="text-sakura-accent">🌸</span>
          </motion.div>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.18)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="flex flex-col sm:flex-row gap-5 justify-center mt-10"
        >
          {events.map(ev => <EventCard key={ev.id} event={ev} />)}
        </motion.div>

        {/* Maps Embed */}
        {events[0]?.mapsEmbed && (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="mt-10 rounded-3xl overflow-hidden shadow-lg"
          >
            <iframe
              src={events[0].mapsEmbed}
              width="100%" height="280"
              style={{ border: 0 }}
              allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Pernikahan"
            />
          </motion.div>
        )}
      </div>
    </section>
  )
}
