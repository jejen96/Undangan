import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function MusicButton({ music }) {
  const [playing, setPlaying] = useState(false)
  const [show, setShow]       = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    // Show after invitation is opened
    const timer = setTimeout(() => setShow(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  const toggle = () => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      audioRef.current.play().catch(() => {})
      setPlaying(true)
    }
  }

  if (!music?.enabled) return null

  return (
    <>
      {music.url && (
        <audio
          ref={audioRef}
          src={music.url}
          loop
          preload="none"
          style={{ display: 'none' }}
        />
      )}

      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="fixed bottom-6 left-4 z-50 flex items-center gap-2"
          >
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggle}
              className="relative w-12 h-12 rounded-full glass shadow-lg flex items-center justify-center text-sakura-accent"
              aria-label={playing ? 'Pause musik' : 'Play musik'}
            >
              {/* Pulsing ring when playing */}
              {playing && (
                <span className="absolute inset-0 rounded-full border-2 border-sakura-accent/40 animate-ping" />
              )}
              <span className="text-xl">{playing ? '⏸' : '🎵'}</span>
            </motion.button>

            {/* Music title tooltip */}
            <AnimatePresence>
              {playing && music.title && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="glass px-3 py-1.5 rounded-full text-xs font-body text-sakura-dark/70 max-w-[160px] truncate shadow"
                >
                  ♪ {music.title}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
