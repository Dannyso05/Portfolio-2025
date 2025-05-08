"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const skills = [
  { name: "Python", percentage: 90 },
  { name: "Flask", percentage: 85 },
  { name: "Git", percentage: 85 },
  { name: "FastAPI", percentage: 70},
  { name: "SQL", percentage: 70 },
  { name: "React", percentage: 65 },
  { name: "JS/TS", percentage: 65 },
  { name: "Java", percentage: 50 },

]

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const barVariants = {
    hidden: { width: 0 },
    visible: (percentage: number) => ({
      width: `${percentage}%`,
      transition: { duration: 1, ease: "easeOut" },
    }),
  }

  return (
    <section id="skills" className="py-20 px-4 md:px-6 bg-muted/30 pt-32">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills</h2>
          <p className="max-w-3xl mx-auto text-muted-foreground">
            A comprehensive overview of my technical skills and proficiency levels.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-x-12 gap-y-8"
        >
          {skills.map((skill, index) => (
            <motion.div key={index} variants={itemVariants} className="space-y-2 group">
              <div className="flex justify-between items-center">
                <h3 className="font-medium group-hover:text-primary transition-colors">{skill.name}</h3>
                <span className="text-sm font-medium text-primary">{skill.percentage}%</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden group-hover:bg-muted/70 transition-colors">
                <motion.div
                  custom={skill.percentage}
                  variants={barVariants}
                  className="h-full bg-primary rounded-full group-hover:bg-primary/80 transition-colors relative"
                >
                  <span className="absolute top-0 right-0 h-full w-2 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
