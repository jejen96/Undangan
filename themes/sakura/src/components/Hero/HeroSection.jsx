    import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, VIEWPORT } from '@/config/animationConfig'

export default function HeroSection({ couple, settings, onOpen, opened }) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: settings?.heroBackground ? `url(${settings.heroBackground})` : 'none', backgroundColor: '#FCEEF2' }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-sakura-bg/40 via-sakura-secondary/50 to-sakura-bg/80" />

      {/* Content */}
      <motion.div
        variants={staggerContainer(0.15, 0.3)}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-5 max-w-lg mx-auto"
      >
        {/* Opening label */}
        <motion.p variants={fadeInUp} className="section-label mb-4">
          {settings?.openingText || 'Kepada Yth.'}
        </motion.p>

        {/* Guest name placeholder */}
        <motion.p variants={fadeInUp} className="font-serif text-lg text-sakura-dark/70 mb-6 italic">
          {settings?.guestNameLabel || 'Bapak/Ibu/Saudara/i'}
        </motion.p>

        {/* Ornament */}
        <motion.div variants={fadeInUp} className="sakura-divider mb-8">
          <span className="text-sakura-accent text-xl">✦</span>
        </motion.div>

        {/* Names */}
        <motion.h1
          variants={fadeInUp}
          className="font-serif font-light leading-tight mb-2"
          style={{ fontSize: 'clamp(2.5rem, 10vw, 4.5rem)' }}
        >
          <span className="text-sakura-dark">{couple?.groom?.nickname || 'Budi'}</span>
        </motion.h1>
        <motion.p variants={fadeInUp} className="font-serif text-2xl text-sakura-accent italic mb-2">
          &amp;
        </motion.p>
        <motion.h1
          variants={fadeInUp}
          className="font-serif font-light leading-tight mb-8"
          style={{ fontSize: 'clamp(2.5rem, 10vw, 4.5rem)' }}
        >
          <span className="text-sakura-dark">{couple?.bride?.nickname || 'Sari'}</span>
        </motion.h1>

        {/* Divider */}
        <motion.div variants={fadeInUp} className="sakura-divider mb-8">
          <span className="text-sakura-primary text-lg">🌸</span>
        </motion.div>

        {/* Date */}
        <motion.p variants={fadeInUp} className="font-button text-sm tracking-widest text-sakura-dark/60 mb-10">
          14 September 2026
        </motion.p>

        {/* CTA */}
        {!opened && (
          <motion.div variants={fadeInUp}>
            <motion.button
              onClick={onOpen}
              whileTap={{ scale: 0.96 }}
              className="btn-primary animate-pulse-soft"
            >
              <span>Buka Undangan</span>
              <span>🌸</span>
            </motion.button>
          </motion.div>
        )}

        {opened && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-body text-sm text-sakura-muted"
          >
            Scroll ke bawah ↓
          </motion.p>
        )}
      </motion.div>

      {/* Scroll indicator */}
      {opened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ delay: 1, duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sakura-accent/60 text-2xl"
          aria-hidden="true"
        >
          ↓
        </motion.div>
      )}
    </section>
  )
}
