"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Bot, HardDrive, Cog, Download } from 'lucide-react'
import { Button } from "../ui/button"

const interests = [
  {
    title: "AI & Machine Learning",
    description: "Developing intelligent systems that learn from data and improve over time.",
    icon: Bot,
  },
  {
    title: "Backend Development",
    description: "Building robust and scalable server-side applications using modern frameworks and technologies.",
    icon: HardDrive,
  },
  {
    title: "Data Science",
    description: "Extracting insights from data to drive decision-making and solve complex problems.",
    icon: Cog,
  },
]


const paragraph = [
  {
    description: "Hi! I am Daniel, a Mathematics student @ The University of Waterloo pursuing a career in software development and Data Science. I am currently looking for Fall 2025 internships!",
  },
  {
    description: "Since I was young, I was a big math lover! I always loved learning about new mathematical logics and concepts. This lead me to pursue a career in Data Science, I am fascinated about the concept of using data and mathematics to solve real-world problems.",
  },
  {
    description: "Recently, I've been interested in learning about AI secrutiy, reading about how developers can ensure their AI model to be protected under cybersecruity attacks. I believe that this is a very important topic that needs to be addressed in the future, as I will be working within the field of AI and AI secrurity is a big concern for me!",
  },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="about" className="py-20 px-4 md:px-6 bg-muted/30 pt-32">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="space-y-12"
        >
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          </motion.div> 

          {/* Profile and Bio - Side by Side */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col items-center gap-6">
              {/* Circular image */}
              <div className="relative group w-64 h-64 md:w-80 md:h-80">
                <div className="overflow-hidden rounded-full border-2 border-primary/50 transition-all duration-300 group-hover:border-primary group-hover:shadow-lg w-full h-full">
                  <div className="relative w-full h-full">
                    <img
                      src="assets/1703795023034.jpeg"
                      alt="Profile"
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  
                </div>
              </div>
              
              {/* <div className="animate-blob bg-cover bg-center w-60 h-60 md:w-64 md:h-64 relative shadow-[0_5px_5px_5px_rgba(13,110,253,0.2)] overflow-hidden">
                    <img 
                      src="src/assets/1703795023034.jpeg"
                      alt="Daniel Song"
                      className="object-cover"
                    />
                  </div> */}
              {/* Resume button outside the image */}
              <Button
                className="flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 transform hover:translate-y-[-2px]"
                onClick={() => window.open("https://drive.google.com/file/d/1RmNOHAVCvf6Oy-IJt_FfhAfHCbUID_7N/view?usp=sharing", "_blank")}
              >
                <Download className="h-4 w-4" />
                Download Resume              

              </Button>
            </div>

            <div className="space-y-4">
              {paragraph.map((short, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="para">
                  <p className="text-lg text-muted-foreground">{short.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Interests - 3 Column Grid */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold mb-6">My Interests</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {interests.map((interest, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-card p-6 rounded-lg shadow-sm border border-border transition-all duration-300 hover:shadow-md hover:border-primary/50 hover:translate-y-[-4px]"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <interest.icon className="h-6 w-6" />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">{interest.title}</h4>
                  <p className="text-muted-foreground">{interest.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
              