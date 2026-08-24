import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-sakura-bg"
        >
          {/* Petal ring animation */}
          <div className="relative w-24 h-24 mb-8">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-5 rounded-full bg-sakura-primary"
                style={{
                  top: '50%', left: '50%',
                  transformOrigin: '0 -40px',
                  rotate: `${i * 45}deg`,
                  marginLeft: '-6px', marginTop: '-10px',
                }}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
              />
            ))}
            {/* Center ornament */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span
                className="text-2xl text-sakura-accent"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >✦</motion.span>
            </div>
          </div>

          <motion.p
            className="font-serif text-xl text-sakura-dark/70 tracking-widest"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            Memuat Undangan...
          </motion.p>

          <motion.div
            className="mt-6 w-40 h-px bg-gradient-to-r from-transparent via-sakura-accent to-transparent"
            animate={{ scaleX: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
