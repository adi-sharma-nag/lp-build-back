import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  alpha: number
  color: string
}

interface ParticleEffectProps {
  x: number
  y: number
  onComplete?: () => void
}

function ParticleEffect({ x, y, onComplete }: ParticleEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Create particles
    const particles: Particle[] = []
    const colors = ['#818CF8', '#6366F1', '#4F46E5', '#C084FC', '#A855F7']
    
    for (let i = 0; i < 20; i++) {
      const angle = (Math.PI * 2 * i) / 20
      const velocity = 2 + Math.random() * 2
      
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        alpha: 1,
        color: colors[Math.floor(Math.random() * colors.length)]
      })
    }

    let animationFrame: number
    let isActive = true

    const animate = () => {
      if (!ctx || !isActive) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      let allDone = true

      particles.forEach(particle => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.alpha *= 0.96

        if (particle.alpha > 0.01) {
          allDone = false
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2)
          ctx.fillStyle = `${particle.color}${Math.floor(particle.alpha * 255).toString(16).padStart(2, '0')}`
          ctx.fill()
        }
      })

      if (allDone) {
        isActive = false
        onComplete?.()
        return
      }

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      isActive = false
      cancelAnimationFrame(animationFrame)
    }
  }, [x, y, onComplete])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}

export default ParticleEffect