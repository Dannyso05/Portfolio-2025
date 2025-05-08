"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "./theme-provider"

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const requestRef = useRef<number>(null)
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const { resolvedTheme } = useTheme()
  const [cursorColor, setCursorColor] = useState("rgba(255, 255, 255, 0.5)")

  useEffect(() => {
    // Set cursor color based on theme
    setCursorColor(resolvedTheme === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)")
  }, [resolvedTheme])

  useEffect(() => {
    // Skip on server-side or mobile
    if (typeof window === "undefined" || window.innerWidth <= 768) return

    const onMouseMove = (event: MouseEvent) => {
      // Update mouse position immediately
      mousePositionRef.current = { x: event.clientX, y: event.clientY }

      // Apply position directly for immediate response
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`
      }
    }

    const onMouseDown = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.add("cursor-clicked")
      }
    }

    const onMouseUp = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.remove("cursor-clicked")
      }
    }

    const onMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        window.getComputedStyle(target).cursor === "pointer"

      if (isClickable && cursorRef.current) {
        cursorRef.current.classList.add("cursor-pointer")
      }
    }

    const onMouseOut = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.remove("cursor-pointer")
      }
    }

    // Apply cursor: none to the body
    document.body.style.cursor = "none"
    const elements = document.querySelectorAll(
      "a, button, [role='button'], [type='button'], [type='submit'], [type='reset']",
    )
    elements.forEach((el) => {
      ;(el as HTMLElement).style.cursor = "none"
    })

    // Add event listeners
    document.addEventListener("mousemove", onMouseMove, { passive: true })
    document.addEventListener("mousedown", onMouseDown)
    document.addEventListener("mouseup", onMouseUp)
    document.addEventListener("mouseover", onMouseOver, true)
    document.addEventListener("mouseout", onMouseOut, true)

    return () => {
      // Clean up
      document.body.style.cursor = ""
      elements.forEach((el) => {
        ;(el as HTMLElement).style.cursor = ""
      })

      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mouseup", onMouseUp)
      document.removeEventListener("mouseover", onMouseOver, true)
      document.removeEventListener("mouseout", onMouseOut, true)

      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [])

  // Only render on client-side and non-mobile
  if (typeof window === "undefined" || (typeof window !== "undefined" && window.innerWidth <= 768)) {
    return null
  }

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-50 will-change-transform"
      style={{ transform: "translate(-50%, -50%)" }}
    >
      {/* Outer circle and center dot in a single container */}
      <div className="relative">
        {/* Outer circle centered around the dot */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 transition-transform duration-150 cursor-pointer:scale-150 cursor-clicked:scale-75"
          style={{ borderColor: cursorColor }}
        ></div>

        {/* Center dot (actual cursor point) */}
        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cursorColor }}></div>
      </div>
    </div>
  )
}
