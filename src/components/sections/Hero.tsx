"use client"

import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"
import { motion } from "framer-motion"

import githubLight from "../../assets/github-light.svg"
import linkedinLight from "../../assets/linkedin-light.svg"
import CVLight from "../../assets/Resume-light.svg"
import linkedinDark from "../../assets/linkedin-dark.svg"
import githubDark from "../../assets/github-dark.svg"
import CVDark from "../../assets/Resume-dark.svg"
import { useTheme } from "../theme-provider"

const themeIcons ={
  light: {
    github: githubLight,
    linkedin: linkedinLight,
    cv: CVLight
  },
  dark: {
    github: githubDark,
    linkedin: linkedinDark,
    cv: CVDark
  }
}
export default function Hero() {
  const [scrollY, setScrollY] = useState(0)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleScrollDown = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      const navbarHeight = 80 // Approximate navbar height
      const elementPosition = aboutSection.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - navbarHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <section id="home" className="relative h-screen flex flex-col items-center justify-center text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl"
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">Daniel Song</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8">Mathematics Student at University of Waterloo </p>
        <div className="flex flex-wrap justify-center gap-4">
              <a href="https://www.linkedin.com/in/daniel-song0718/">
                <img src={themeIcons[resolvedTheme].linkedin} alt="LinkedinIcon" />
              </a>
              <a href="https://github.com/Dannyso05">
                <img src={themeIcons[resolvedTheme].github}  alt="GithubIcon" />
              </a>
              <a href="https://drive.google.com/file/d/1RmNOHAVCvf6Oy-IJt_FfhAfHCbUID_7N/view?usp=sharing">
                <img src={themeIcons[resolvedTheme].cv}  alt="ResumeIcon" />
              </a>
          {/* <a
            href="#contact"
            className="px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-105"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            Get in Touch
          </a>

          <a
            href="#projects"
            className="px-6 py-3 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-105"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            View My Work
          </a> */}
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 cursor-pointer"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        }}
        style={{
          opacity: Math.max(0, 1 - scrollY / 300),
        }}
        onClick={handleScrollDown}
      >
        <ChevronDown className="h-10 w-10 text-primary hover:scale-110 transition-transform" />
      </motion.div>
    </section>
  )
}
