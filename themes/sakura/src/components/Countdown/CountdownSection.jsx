import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { staggerContainer, fadeInUp, scaleIn, VIEWPORT } from '@/config/animationConfig'

function useCountdown(targetDate) {
  const calc = () => {
    const diff = new Date(targetDate) - new Date()
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 }
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    }
  }
  const [time, setTime] = useState(calc)
  useEffect(() => {
    const t = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(t)
  }, [targetDate])
  return time
}

function CountUnit({ value, label }) {
  return (
    <motion.div
      variants={scaleIn}
      className="flex flex-col items-center glass px-4 py-5 sm:px-6 sm:py-6 min-w-[72px] sm:min-w-[88px]"
    >
      <motion.span
        key={value}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="font-serif text-4xl sm:text-5xl font-light text-sakura-accent leading-none"
      >
        {String(value).padStart(2, '0')}
      </motion.span>
      <span className="font-button text-[10px] tracking-widest uppercase text-sakura-muted mt-2">
        {label}
      </span>
    </motion.div>
  )
}

export default function CountdownSection({ countdown }) {
  const target = countdown?.targetDate || '2026-09-14T08:00:00+07:00'
  const { d, h, m, s } = useCountdown(target)

  return (
    <section className="section-wrap bg-sakura-secondary/40">
      <div className="section-inner">
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          <motion.span variants={fadeInUp} className="section-label">Menuju Hari Bahagia</motion.span>
          <motion.h2 variants={fadeInUp} className="section-title mt-1">Hitung Mundur</motion.h2>

          <motion.div
            variants={staggerContainer(0.12, 0.3)}
            className="flex justify-center gap-3 sm:gap-4 mt-10 flex-wrap"
          >
            <CountUnit value={d} label="Hari" />
            <CountUnit value={h} label="Jam" />
            <CountUnit value={m} label="Menit" />
            <CountUnit value={s} label="Detik" />
          </motion.div>

          <motion.div variants={fadeInUp} className="sakura-divider mt-10">
            <span className="text-sakura-accent">🌸</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
