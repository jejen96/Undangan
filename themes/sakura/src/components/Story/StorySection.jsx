import { motion } from 'framer-motion'
import { staggerContainer, fadeInUp, slideInLeft, slideInRight, VIEWPORT } from '@/config/animationConfig'

function StoryItem({ item, index }) {
  const isLeft = index % 2 === 0
  return (
    <div className="relative flex items-start gap-4">
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center flex-shrink-0 mt-1">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, type: 'spring' }}
          className="w-4 h-4 rounded-full bg-sakura-accent ring-4 ring-sakura-primary ring-offset-2 ring-offset-sakura-bg z-10"
        />
        {index < 3 && <div className="w-px flex-1 bg-gradient-to-b from-sakura-primary to-transparent min-h-[60px]" />}
      </div>

      {/* Card */}
      <motion.div
        variants={isLeft ? slideInLeft : slideInRight}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="glass p-5 rounded-2xl mb-8 flex-1"
      >
        {item.photo && (
          <div className="rounded-xl overflow-hidden mb-4 aspect-video">
            <img src={item.photo} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
          </div>
        )}
        <span className="section-label">{item.date}</span>
        <h3 className="font-serif text-xl text-sakura-dark mt-1 mb-2">{item.title}</h3>
        <p className="font-body text-sm text-sakura-muted leading-relaxed">{item.desc}</p>
      </motion.div>
    </div>
  )
}

export default function StorySection({ story }) {
  if (!story?.length) return null
  return (
    <section className="section-wrap bg-sakura-gradient">
      <div className="section-inner">
        <motion.div variants={staggerContainer()} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
          <motion.span variants={fadeInUp} className="section-label">Perjalanan Cinta</motion.span>
          <motion.h2 variants={fadeInUp} className="section-title mt-1">Love Story</motion.h2>
          <motion.div variants={fadeInUp} className="sakura-divider mb-10">
            <span className="text-sakura-accent">🌸</span>
          </motion.div>
        </motion.div>
        <div className="text-left max-w-md mx-auto">
          {story.map((item, i) => <StoryItem key={item.id} item={item} index={i} />)}
        </div>
      </div>
    </section>
  )
}
