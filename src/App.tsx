"use client"

import { useEffect, useState } from "react"
import { ThemeProvider } from "./components/theme-provider"
import Navbar from "./components/Navbar"
import Hero from "./components/sections/Hero"
import About from "./components/sections/About"
import Experience from "./components/sections/Experience"
import Projects from "./components/sections/Projects"
// import Skills from "./components/sections/Skills"
import Contact from "./components/sections/Contact"
import CustomCursor from "./components/CustomCursor"
import ParticleBackground from "./components/ParticleBackground"

function App() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
      <CustomCursor />
      <ParticleBackground />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Experience />
        {/* <Skills /> */}
        <Projects />
        <Contact />
      </div>
    </ThemeProvider>
  )
}

export default App
