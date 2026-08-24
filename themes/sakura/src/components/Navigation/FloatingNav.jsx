import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_ITEMS = [
  { id: 'hero',      label: 'Home',        icon: '🏠' },
  { id: 'couple',    label: 'Mempelai',    icon: '💑' },
  { id: 'event',     label: 'Acara',       icon: '📅' },
  { id: 'gallery',   label: 'Galeri',      icon: '📷' },
  { id: 'rsvp',      label: 'RSVP',        icon: '✉️' },
]

export default function FloatingNav() {
  const [active, setActive]   = useState('hero')
  const [visible, setVisible] = useState(false)
  const [open, setOpen]       = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300)
      // Update active section
      NAV_ITEMS.forEach(item => {
        const el = document.getElementById(item.id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 120 && rect.bottom >= 120) setActive(item.id)
        }
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-2"
        >
          {/* Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpen(p => !p)}
            className="w-11 h-11 rounded-full glass flex items-center justify-center shadow-lg text-sakura-accent text-lg"
            aria-label="Toggle navigation"
          >
            {open ? '✕' : '☰'}
          </motion.button>

          {/* Items */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -10 }}
                className="flex flex-col gap-1.5"
              >
                {NAV_ITEMS.map((item, i) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0, transition: { delay: i * 0.06 } }}
                    onClick={() => scrollTo(item.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-button font-medium transition-all glass shadow ${
                      active === item.id
                        ? 'bg-sakura-accent/20 text-sakura-accent'
                        : 'text-sakura-dark/70 hover:text-sakura-accent'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
