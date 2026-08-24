import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { staggerContainer, fadeInUp, scaleIn, VIEWPORT } from '@/config/animationConfig'

function Lightbox({ images, index, onClose }) {
  const [cur, setCur] = useState(index)
  const prev = () => setCur(i => (i - 1 + images.length) % images.length)
  const next = () => setCur(i => (i + 1) % images.length)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9000] bg-black/90 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        className="relative max-w-2xl w-full"
        onClick={e => e.stopPropagation()}
      >
        <img src={images[cur]} alt={`Gallery ${cur + 1}`} className="w-full max-h-[80vh] object-contain rounded-2xl" />

        <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center text-lg">‹</button>
        <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center text-lg">›</button>
        <button onClick={onClose} className="absolute top-2 right-2 w-9 h-9 rounded-full bg-white/20 text-white flex items-center justify-center">✕</button>

        <p className="text-center text-white/60 text-sm mt-3">{cur + 1} / {images.length}</p>
      </motion.div>
    </motion.div>
  )
}

export default function GallerySection({ gallery }) {
  const [lightbox, setLightbox] = useState(null)
  if (!gallery?.length) return null

  return (
    <section id="gallery" className="section-wrap bg-sakura-secondary/30">
      <div className="section-inner">
        <motion.div variants={staggerContainer()} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
          <motion.span variants={fadeInUp} className="section-label">Galeri Foto</motion.span>
          <motion.h2 variants={fadeInUp} className="section-title mt-1">Momen Bersama</motion.h2>
          <motion.div variants={fadeInUp} className="sakura-divider">
            <span className="text-sakura-accent">🌸</span>
          </motion.div>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-10"
        >
          {gallery.map((url, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              onClick={() => setLightbox(i)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="cursor-pointer rounded-2xl overflow-hidden shadow-md aspect-square"
            >
              <img src={url} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" loading="lazy" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox images={gallery} index={lightbox} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
