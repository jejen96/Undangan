import { motion } from 'framer-motion'
import { fadeInUp, fadeIn, staggerContainer, scaleIn, VIEWPORT } from '@/config/animationConfig'

function PersonCard({ person, role }) {
  return (
    <motion.div variants={scaleIn} className="flex flex-col items-center text-center px-4">
      {/* Photo */}
      <div className="relative mb-5">
        <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden ring-4 ring-sakura-primary ring-offset-4 ring-offset-sakura-bg shadow-xl">
          {person?.photo ? (
            <img src={person.photo} alt={person.name} className="w-full h-full object-cover" loading="lazy" />
          ) : (
            <div className="w-full h-full bg-sakura-primary flex items-center justify-center text-4xl">
              {role === 'groom' ? '♂' : '♀'}
            </div>
          )}
        </div>
        {/* Floating petal */}
        <motion.span
          animate={{ rotate: [0, 15, -15, 0], y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-1 -right-1 text-2xl"
          aria-hidden="true"
        >🌸</motion.span>
      </div>

      {/* Role label */}
      <span className="section-label mb-1">{role === 'groom' ? 'Mempelai Pria' : 'Mempelai Wanita'}</span>

      {/* Name */}
      <h3 className="font-serif text-2xl sm:text-3xl font-light text-sakura-dark mb-1">
        {person?.name || '-'}
      </h3>

      {/* Parents */}
      {(person?.father || person?.mother) && (
        <p className="font-body text-sm text-sakura-muted leading-relaxed mt-2 max-w-[200px]">
          Putra/Putri dari<br />
          <span className="font-medium text-sakura-dark/80">{person?.father}</span>
          {person?.father && person?.mother && ' & '}
          <span className="font-medium text-sakura-dark/80">{person?.mother}</span>
        </p>
      )}

      {/* Instagram */}
      {person?.instagram && (
        <p className="mt-2 text-xs text-sakura-accent font-button">{person.instagram}</p>
      )}
    </motion.div>
  )
}

export default function CoupleSection({ couple, quote }) {
  return (
    <section id="couple" className="section-wrap bg-sakura-gradient">
      <div className="section-inner">
        {/* Header */}
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          <motion.span variants={fadeInUp} className="section-label">Mempelai</motion.span>
          <motion.h2 variants={fadeInUp} className="section-title mt-1">
            Bismillahirrahmanirrahim
          </motion.h2>
          <motion.div variants={fadeInUp} className="sakura-divider">
            <span className="text-sakura-accent">🌸</span>
          </motion.div>
        </motion.div>

        {/* Couple Cards */}
        <motion.div
          variants={staggerContainer(0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-6 mt-10"
        >
          <PersonCard person={couple?.groom} role="groom" />

          {/* And separator */}
          <motion.div variants={fadeIn} className="flex flex-col items-center gap-2">
            <div className="w-px h-8 bg-sakura-primary sm:hidden" />
            <p className="font-serif text-5xl text-sakura-accent italic">&amp;</p>
            <div className="w-px h-8 bg-sakura-primary sm:hidden" />
          </motion.div>

          <PersonCard person={couple?.bride} role="bride" />
        </motion.div>

        {/* Quote */}
        {quote && (
          <motion.div
            variants={staggerContainer()}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="mt-14"
          >
            <motion.div variants={scaleIn} className="glass max-w-lg mx-auto p-7 rounded-3xl">
              {quote.arabic && (
                <p className="font-serif text-xl text-sakura-dark/80 mb-3 leading-loose text-right" dir="rtl">
                  {quote.arabic}
                </p>
              )}
              <div className="sakura-divider my-3">
                <span className="text-sakura-accent text-sm">✦</span>
              </div>
              <p className="font-body text-sm text-sakura-muted leading-relaxed italic">
                "{quote.text}"
              </p>
              {quote.source && (
                <p className="mt-3 font-button text-xs text-sakura-accent text-right">
                  — {quote.source}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
