import React, { useEffect, useRef } from 'react'

/**
 * ParticleSystem — Canvas-based particle animations
 * type: 'petals' | 'sakura' | 'firefly' | 'glitter' | 'bubbles' | 'stars' | 'leaves' | 'snow'
 */
export default function ParticleSystem({ type = 'petals', count = 20, color = '#fff', opacity = 0.6 }) {
  const canvasRef = useRef(null)
  const animRef   = useRef(null)
  const particles = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W = canvas.offsetWidth
    let H = canvas.offsetHeight

    const resize = () => {
      W = canvas.offsetWidth
      H = canvas.offsetHeight
      canvas.width  = W
      canvas.height = H
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    // Init particles
    particles.current = Array.from({ length: count }, (_, i) => createParticle(type, W, H, i, color))

    function tick() {
      ctx.clearRect(0, 0, W, H)
      particles.current.forEach((p, i) => {
        updateParticle(p, type, W, H)
        drawParticle(ctx, p, type, opacity)
      })
      animRef.current = requestAnimationFrame(tick)
    }

    animRef.current = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(animRef.current)
      ro.disconnect()
    }
  }, [type, count, color, opacity])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
      aria-hidden="true"
    />
  )
}

function createParticle(type, W, H, i, color) {
  const base = {
    x:    Math.random() * W,
    y:    Math.random() * H - H,
    size: Math.random() * 8 + 4,
    speedX: (Math.random() - 0.5) * 1.5,
    speedY: Math.random() * 1.5 + 0.5,
    rotation: Math.random() * 360,
    rotSpeed: (Math.random() - 0.5) * 3,
    opacity: Math.random() * 0.6 + 0.3,
    color,
  }

  if (type === 'sakura' || type === 'petals') {
    base.size = Math.random() * 10 + 6
    base.speedX = (Math.random() - 0.5) * 2
    base.speedY = Math.random() * 2 + 0.8
    base.swing  = Math.random() * Math.PI * 2
    base.swingSpeed = Math.random() * 0.02 + 0.01
  }
  if (type === 'firefly') {
    base.size    = Math.random() * 4 + 2
    base.speedX  = (Math.random() - 0.5) * 0.8
    base.speedY  = (Math.random() - 0.5) * 0.8
    base.pulse   = Math.random() * Math.PI * 2
    base.pulseSpeed = Math.random() * 0.05 + 0.02
    base.y       = Math.random() * H
  }
  if (type === 'glitter') {
    base.size    = Math.random() * 4 + 1
    base.speedY  = Math.random() * 0.8 + 0.2
    base.sparkle = Math.random() * Math.PI * 2
  }
  if (type === 'stars') {
    base.size    = Math.random() * 3 + 1
    base.speedX  = 0
    base.speedY  = 0
    base.y       = Math.random() * H
    base.twinkle = Math.random() * Math.PI * 2
    base.twinkleSpeed = Math.random() * 0.04 + 0.01
  }
  if (type === 'snow') {
    base.size    = Math.random() * 6 + 3
    base.speedX  = (Math.random() - 0.5) * 1
    base.speedY  = Math.random() * 1 + 0.4
  }
  if (type === 'bubbles') {
    base.size    = Math.random() * 20 + 8
    base.speedX  = (Math.random() - 0.5) * 0.5
    base.speedY  = -(Math.random() * 1 + 0.3)
    base.y       = H + 20
    base.wobble  = Math.random() * Math.PI * 2
  }
  return base
}

function updateParticle(p, type, W, H) {
  if (type === 'sakura' || type === 'petals') {
    p.swing += p.swingSpeed
    p.x += p.speedX + Math.sin(p.swing) * 1.5
    p.y += p.speedY
    p.rotation += p.rotSpeed
    if (p.y > H + 20) { p.y = -20; p.x = Math.random() * W }
    if (p.x > W + 20) p.x = -20
    if (p.x < -20)    p.x = W + 20
  } else if (type === 'firefly') {
    p.pulse += p.pulseSpeed
    p.x += p.speedX + Math.sin(p.pulse * 0.7) * 0.5
    p.y += p.speedY + Math.cos(p.pulse * 0.5) * 0.5
    if (p.x > W + 10) p.x = -10
    if (p.x < -10)    p.x = W + 10
    if (p.y > H + 10) p.y = -10
    if (p.y < -10)    p.y = H + 10
  } else if (type === 'stars') {
    p.twinkle += p.twinkleSpeed
  } else if (type === 'glitter') {
    p.x += p.speedX
    p.y += p.speedY
    p.sparkle += 0.05
    if (p.y > H + 10) { p.y = -10; p.x = Math.random() * W }
  } else if (type === 'bubbles') {
    p.wobble += 0.04
    p.x += p.speedX + Math.sin(p.wobble) * 0.5
    p.y += p.speedY
    if (p.y < -30) { p.y = H + 20; p.x = Math.random() * W }
  } else {
    p.x += p.speedX
    p.y += p.speedY
    p.rotation += p.rotSpeed
    if (p.y > H + 20) { p.y = -20; p.x = Math.random() * W }
  }
}

function drawParticle(ctx, p, type, globalOpacity) {
  ctx.save()

  if (type === 'sakura' || type === 'petals') {
    ctx.globalAlpha = p.opacity * globalOpacity
    ctx.translate(p.x, p.y)
    ctx.rotate((p.rotation * Math.PI) / 180)
    // Draw petal shape
    ctx.beginPath()
    ctx.fillStyle = p.color || '#FFB7C5'
    ctx.ellipse(0, 0, p.size * 0.6, p.size, 0, 0, Math.PI * 2)
    ctx.fill()
  } else if (type === 'firefly') {
    const a = (Math.sin(p.pulse) + 1) * 0.5
    ctx.globalAlpha = a * globalOpacity
    ctx.translate(p.x, p.y)
    const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 3)
    grd.addColorStop(0, p.color || '#FFFF80')
    grd.addColorStop(1, 'transparent')
    ctx.fillStyle = grd
    ctx.beginPath()
    ctx.arc(0, 0, p.size * 3, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = p.color || '#FFFF80'
    ctx.beginPath()
    ctx.arc(0, 0, p.size * 0.5, 0, Math.PI * 2)
    ctx.fill()
  } else if (type === 'stars') {
    const a = (Math.sin(p.twinkle) + 1) * 0.5
    ctx.globalAlpha = a * globalOpacity
    ctx.translate(p.x, p.y)
    ctx.fillStyle = p.color || '#fff'
    ctx.beginPath()
    ctx.arc(0, 0, p.size, 0, Math.PI * 2)
    ctx.fill()
  } else if (type === 'glitter') {
    const a = Math.abs(Math.sin(p.sparkle))
    ctx.globalAlpha = a * globalOpacity
    ctx.translate(p.x, p.y)
    ctx.rotate(p.sparkle)
    ctx.fillStyle = p.color || '#FFD700'
    // Diamond shape
    ctx.beginPath()
    ctx.moveTo(0, -p.size)
    ctx.lineTo(p.size * 0.5, 0)
    ctx.lineTo(0, p.size)
    ctx.lineTo(-p.size * 0.5, 0)
    ctx.closePath()
    ctx.fill()
  } else if (type === 'bubbles') {
    ctx.globalAlpha = p.opacity * 0.3 * globalOpacity
    ctx.translate(p.x, p.y)
    ctx.beginPath()
    ctx.arc(0, 0, p.size, 0, Math.PI * 2)
    ctx.strokeStyle = p.color || 'rgba(255,255,255,0.6)'
    ctx.lineWidth = 1.5
    ctx.stroke()
    // Highlight
    ctx.globalAlpha = p.opacity * 0.15 * globalOpacity
    ctx.fillStyle = p.color || '#fff'
    ctx.fill()
  } else if (type === 'snow') {
    ctx.globalAlpha = p.opacity * globalOpacity
    ctx.translate(p.x, p.y)
    ctx.fillStyle = p.color || '#fff'
    ctx.beginPath()
    ctx.arc(0, 0, p.size * 0.5, 0, Math.PI * 2)
    ctx.fill()
  } else if (type === 'leaves') {
    ctx.globalAlpha = p.opacity * globalOpacity
    ctx.translate(p.x, p.y)
    ctx.rotate((p.rotation * Math.PI) / 180)
    ctx.beginPath()
    ctx.fillStyle = p.color || '#4CAF50'
    ctx.ellipse(0, 0, p.size * 0.4, p.size, 0, 0, Math.PI * 2)
    ctx.fill()
  } else {
    ctx.globalAlpha = p.opacity * globalOpacity
    ctx.translate(p.x, p.y)
    ctx.rotate((p.rotation * Math.PI) / 180)
    ctx.beginPath()
    ctx.fillStyle = p.color || '#fff'
    ctx.arc(0, 0, p.size * 0.5, 0, Math.PI * 2)
    ctx.fill()
  }

  ctx.restore()
}
