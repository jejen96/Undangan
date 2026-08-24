
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, VIEWPORT } from '@/config/animationConfig'

export default function FooterSection({ couple, settings }) {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="section-wrap bg-sakura-gradient border-t border-sakura-primary/30">
      <div className="section-inner py-12">
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="flex flex-col items-center gap-5"
        >
          {/* Ornament */}
          <motion.div variants={fadeInUp} className="text-4xl">🌸</motion.div>

          {/* Names */}
          <motion.div variants={fadeInUp} className="text-center">
            <h2 className="font-serif text-3xl font-light text-sakura-dark">
              {couple?.groom?.nickname} &amp; {couple?.bride?.nickname}
            </h2>
            <p className="font-button text-xs tracking-widest text-sakura-muted mt-1">14 September 2026</p>
          </motion.div>

          {/* Closing text */}
          <motion.div variants={fadeInUp} className="glass max-w-xs mx-auto px-6 py-4 rounded-2xl text-center">
            <p className="font-body text-sm text-sakura-muted leading-relaxed italic">
              "{settings?.closingText || "Wassalamu'alaikum Warahmatullahi Wabarakatuh"}"
            </p>
          </motion.div>

          {/* Divider */}
          <motion.div variants={fadeInUp} className="sakura-divider w-full">
            <span className="text-sakura-accent">✦</span>
          </motion.div>

          {/* Brand */}
          <motion.p variants={fadeInUp} className="font-button text-xs text-sakura-muted/60">
            Made with 🌸 <span className="text-sakura-accent">UndangTeman.id</span>
          </motion.p>

          {/* Back to top */}
          <motion.button
            variants={fadeInUp}
            onClick={scrollTop}
            whileTap={{ scale: 0.9 }}
            className="mt-2 w-10 h-10 rounded-full glass flex items-center justify-center text-sakura-accent text-lg shadow hover:shadow-md transition"
            aria-label="Kembali ke atas"
          >
            ↑
          </motion.button>
        </motion.div>
      </div>
    </footer>
  )
}
