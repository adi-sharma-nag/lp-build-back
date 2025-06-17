import { useEffect, useRef } from 'react'

function GradientMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createGradient = (x: number, y: number, radius: number, time: number) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
      gradient.addColorStop(0, `rgba(71, 215, 172, ${0.1 + Math.sin(time) * 0.1})`) // Primary-300
      gradient.addColorStop(1, 'transparent')
      return gradient
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Create multiple overlapping gradients
      const points = [
        {
          x: canvas.width * (0.5 + Math.sin(time * 0.5) * 0.1),
          y: canvas.height * (0.3 + Math.cos(time * 0.3) * 0.1),
          radius: canvas.width * 0.4
        },
        {
          x: canvas.width * (0.7 + Math.cos(time * 0.4) * 0.1),
          y: canvas.height * (0.5 + Math.sin(time * 0.4) * 0.1),
          radius: canvas.width * 0.35
        },
        {
          x: canvas.width * (0.3 + Math.sin(time * 0.3) * 0.1),
          y: canvas.height * (0.6 + Math.cos(time * 0.5) * 0.1),
          radius: canvas.width * 0.3
        }
      ]

      points.forEach((point) => {
        ctx.fillStyle = createGradient(point.x, point.y, point.radius, time)
        ctx.beginPath()
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      time += 0.005
      animationFrameId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-50"
      style={{ mixBlendMode: 'plus-lighter' }}
    />
  )
}

export default GradientMesh