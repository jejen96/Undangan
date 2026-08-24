import { useEffect, useRef } from 'react'

const PETAL_COUNT = 25

function randomBetween(a, b) {
  return a + Math.random() * (b - a)
}

function createPetal(W) {
  return {
    x:        randomBetween(0, W),
    y:        randomBetween(-200, -10),
    size:     randomBetween(6, 14),
    speedY:   randomBetween(1, 2.5),
    speedX:   randomBetween(-0.8, 0.8),
    rotation: randomBetween(0, 360),
    rotSpeed: randomBetween(-2, 2),
    opacity:  randomBetween(0.4, 0.9),
    swing:    randomBetween(0, Math.PI * 2),
    swingSpd: randomBetween(0.01, 0.025),
  }
}

function drawPetal(ctx, p) {
  ctx.save()
  ctx.globalAlpha = p.opacity
  ctx.translate(p.x, p.y)
  ctx.rotate((p.rotation * Math.PI) / 180)

  // Sakura petal shape
  ctx.beginPath()
  ctx.fillStyle = '#F6C4D0'
  ctx.strokeStyle = '#E8A0B8'
  ctx.lineWidth = 0.5

  // 5-petal flower simplified as ellipse
  ctx.ellipse(0, 0, p.size * 0.5, p.size, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.stroke()

  // Center detail
  ctx.beginPath()
  ctx.fillStyle = '#FFC0CB'
  ctx.arc(0, 0, p.size * 0.15, 0, Math.PI * 2)
  ctx.fill()

  ctx.restore()
}

export default function SakuraCanvas() {
  const canvasRef = useRef(null)
  const petals    = useRef([])
  const animRef   = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let W = window.innerWidth
    let H = window.innerHeight

    const resize = () => {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width  = W
      canvas.height = H
    }

    resize()
    window.addEventListener('resize', resize)

    // Init petals
    petals.current = Array.from({ length: PETAL_COUNT }, () => createPetal(W))

    const tick = () => {
      ctx.clearRect(0, 0, W, H)

      petals.current.forEach(p => {
        p.swing   += p.swingSpd
        p.x       += p.speedX + Math.sin(p.swing) * 1.2
        p.y       += p.speedY
        p.rotation += p.rotSpeed

        if (p.y > H + 20) {
          Object.assign(p, createPetal(W))
          p.y = -20
        }
        if (p.x > W + 20) p.x = -20
        if (p.x < -20)    p.x = W + 20

        drawPetal(ctx, p)
      })

      animRef.current = requestAnimationFrame(tick)
    }

    animRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  )
}
