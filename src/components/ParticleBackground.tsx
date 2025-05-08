"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "./theme-provider"

interface Particle {
  x: number
  y: number
  size: number
  baseSize: number
  speedX: number
  speedY: number
  color: string
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const parallaxOffsetRef = useRef({ x: 0, y: 0 })
  const isClickedRef = useRef(false)
  const animationRef = useRef<number>(0)
  const themeRef = useRef<string>("dark")
  const { resolvedTheme } = useTheme()

  // Update theme ref when theme changes
  useEffect(() => {
    if (resolvedTheme) themeRef.current = resolvedTheme
  }, [resolvedTheme])

  // Initialize canvas and particles
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleResize = () => {
      if (!canvas) return

      // Set canvas dimensions
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      // Initialize particles
      const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 9000), 120)
      const particles: Particle[] = []

      for (let i = 0; i < particleCount; i++) {
        const baseSize = Math.random() * 2 + 1
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: baseSize,
          baseSize,
          speedX: Math.random() * 0.8 - 0.4,
          speedY: Math.random() * 0.8 - 0.4,
          color: themeRef.current === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)",
        })
      }

      particlesRef.current = particles
    }

    // Handle mouse events for parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position as percentage of window
      const mouseX = e.clientX / window.innerWidth
      const mouseY = e.clientY / window.innerHeight

      // Update mouse position - store exact cursor position
      mouseRef.current = { x: e.clientX, y: e.clientY }

      // Calculate parallax offset (opposite direction of mouse movement)
      // Increased multiplier from 30 to 50 for stronger effect
      parallaxOffsetRef.current = {
        x: (0.5 - mouseX) * 50,
        y: (0.5 - mouseY) * 50,
      }
    }

    // Handle mouse click for particle attraction
    const handleMouseDown = () => {
      isClickedRef.current = true
    }

    const handleMouseUp = () => {
      isClickedRef.current = false
    }

    // Set up event listeners
    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)
    // window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    // Initial setup
    handleResize()

    // Animation loop
    const animate = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update particle colors based on theme
      const particleColor = themeRef.current === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)"

      // Update and draw particles
      particlesRef.current.forEach((particle, i) => {
        // Update color if theme changed
        particle.color = particleColor

        // Calculate distance to mouse for click attraction
        // Use exact mouse position for attraction
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 200

        // Apply click attraction if clicked
        if (isClickedRef.current && distance < maxDistance) {
          const force = (1 - distance / maxDistance) * 0.5
          particle.x += dx * force * 0.1
          particle.y += dy * force * 0.1
          particle.size = particle.baseSize * (1 + force * 2)
        } else {
          // Reset size when not clicked or out of range
          particle.size = particle.baseSize
        }

        // Apply parallax effect to particle position
        // Increased effect for particles based on their size
        const parallaxX = particle.x + parallaxOffsetRef.current.x * (particle.size / 2)
        const parallaxY = particle.y + parallaxOffsetRef.current.y * (particle.size / 2)

        // Regular movement
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Boundary check with bounce
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1
        }

        // Draw particle with parallax effect
        ctx.beginPath()
        ctx.arc(parallaxX, parallaxY, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Connect particles that are close to each other
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const particle2 = particlesRef.current[j]

          // Apply parallax to second particle
          const parallaxX2 = particle2.x + parallaxOffsetRef.current.x * (particle2.size / 2)
          const parallaxY2 = particle2.y + parallaxOffsetRef.current.y * (particle2.size / 2)

          const dx = parallaxX - parallaxX2
          const dy = parallaxY - parallaxY2
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            ctx.beginPath()
            ctx.moveTo(parallaxX, parallaxY)
            ctx.lineTo(parallaxX2, parallaxY2)
            ctx.strokeStyle =
              themeRef.current === "dark"
                ? `rgba(255, 255, 255, ${0.2 * (1 - distance / 120)})`
                : `rgba(0, 0, 0, ${0.2 * (1 - distance / 120)})`
            ctx.stroke()
          }
        }

        // Connect particles to cursor
        const cursorDistance = Math.sqrt(
          Math.pow(parallaxX - mouseRef.current.x, 2) + Math.pow(parallaxY - mouseRef.current.y, 2),
        )
        const maxCursorDistance = 150 // Maximum distance to draw connection to cursor

        if (cursorDistance < maxCursorDistance) {
          ctx.beginPath()
          ctx.moveTo(parallaxX, parallaxY)
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y)

          // Opacity based on distance (closer = more visible)
          const opacity = 0.3 * (1 - cursorDistance / maxCursorDistance)

          ctx.strokeStyle =
            themeRef.current === "dark" ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`

          // Line width based on distance (closer = thicker)
          ctx.lineWidth = 1 * (1 - cursorDistance / maxCursorDistance) + 0.5
          ctx.stroke()
          ctx.lineWidth = 1 // Reset line width
        }
      })

      // Continue animation
      animationRef.current = requestAnimationFrame(animate)
    }

    // Start animation
    animationRef.current = requestAnimationFrame(animate)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />
      {/* Hidden div to expose the current theme color */}
      <div id="particle-theme" className="hidden" data-theme={themeRef.current}></div>
    </>
  )
}
