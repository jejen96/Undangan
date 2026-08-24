import { useState } from 'react'
import { motion } from 'framer-motion'
import { staggerContainer, fadeInUp, scaleIn, VIEWPORT } from '@/config/animationConfig'

function BankCard({ bank }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(bank.number).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }
  return (
    <motion.div variants={scaleIn} className="glass p-5 rounded-2xl text-center">
      <p className="font-button text-xs tracking-widest uppercase text-sakura-accent mb-2">{bank.bank}</p>
      <p className="font-serif text-2xl text-sakura-dark mb-1 tracking-wider">{bank.number}</p>
      <p className="font-body text-sm text-sakura-muted mb-4">{bank.name}</p>
      <button onClick={copy} className={`btn-outline text-xs py-2 w-full ${copied ? 'bg-sakura-accent text-white border-sakura-accent' : ''}`}>
        {copied ? '✓ Tersalin!' : 'Salin Nomor'}
      </button>
    </motion.div>
  )
}

export default function GiftSection({ gift }) {
  const [addrCopied, setAddrCopied] = useState(false)
  if (!gift?.enabled) return null

  const copyAddress = () => {
    navigator.clipboard.writeText(gift.address || '').then(() => {
      setAddrCopied(true)
      setTimeout(() => setAddrCopied(false), 2000)
    })
  }

  return (
    <section className="section-wrap bg-sakura-secondary/30">
      <div className="section-inner">
        <motion.div variants={staggerContainer()} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
          <motion.span variants={fadeInUp} className="section-label">Hadiah Pernikahan</motion.span>
          <motion.h2 variants={fadeInUp} className="section-title mt-1">Wedding Gift</motion.h2>
          <motion.p variants={fadeInUp} className="section-sub max-w-sm mx-auto">{gift.message}</motion.p>
          <motion.div variants={fadeInUp} className="sakura-divider"><span className="text-sakura-accent">🌸</span></motion.div>
        </motion.div>

        {/* Bank accounts */}
        {gift.banks?.length > 0 && (
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden" whileInView="visible" viewport={VIEWPORT}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8"
          >
            {gift.banks.map((b, i) => <BankCard key={i} bank={b} />)}
          </motion.div>
        )}

        {/* QRIS */}
        {gift.qris && (
          <motion.div variants={scaleIn} initial="hidden" whileInView="visible" viewport={VIEWPORT} className="mt-6 flex flex-col items-center">
            <span className="section-label mb-3">QRIS</span>
            <div className="glass p-4 rounded-2xl inline-block">
              <img src={gift.qris} alt="QRIS" className="w-40 h-40 object-contain rounded-xl" loading="lazy" />
            </div>
          </motion.div>
        )}

        {/* Address */}
        {gift.address && (
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={VIEWPORT} className="mt-6">
            <div className="glass max-w-sm mx-auto p-5 rounded-2xl text-center">
              <p className="section-label mb-2">Alamat Pengiriman</p>
              <p className="font-body text-sm text-sakura-muted leading-relaxed mb-4">{gift.address}</p>
              <button onClick={copyAddress} className={`btn-outline text-xs py-2 w-full ${addrCopied ? 'bg-sakura-accent text-white border-sakura-accent' : ''}`}>
                {addrCopied ? '✓ Tersalin!' : '📋 Salin Alamat'}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
