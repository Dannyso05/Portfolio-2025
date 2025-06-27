"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const experiences = [
  // {
  //   company: "8090 Solutions Inc",
  //   role: "Software Engineering Intern",
  //   period: "2025 September - 2024 December",
  //   description:
  //     "Collaborated with 3 metrological scientists to improve air quality forecast models and streamline forecasting verification process.",
  //   logo: "assets/environment_canada_logo.jpeg",
  // },
  {
    company: "Wat.ai",
    role: "Machine Learning Engineer",
    period: "2025 May - 2025 August",
    description:"Developing ViViT for Body Language Detection.",
    logo: "src/assets/wat_ai_logo.jpeg",
  },
  {
    company: "Environment and Climate Change Canada",
    role: "Data Science Intern",
    period: "2025 January - 2024 April",
    description:
      "Optimizing Air Quality Health Index forecasting verification process.",
    logo: "assets/environment_canada_logo.jpeg",
  },
  {
    company: "Remitbee",
    role: "AI Software Engineer (Contract Part time)",
    period: "2024 September - 2024 December",
    description:
      "AI/ML model training pipelines, enhancing efficiency and optimizing end-to-end workflows.",
    logo: "assets/remitbee_logo.jpeg",
  },
  {
    company: "Remitbee",
    role: "AI Software Engineer Intern",
    period: "2024 June - 2024 September",
    description:
      "Developing AI agent customer service chatbot, and a fraudulent transaction detection system.",
    logo: "assets/remitbee_logo.jpeg",
    },
  {
    company: "Countable",
    role: "Data Engineer",
    period: "2024 January - 2024 June",
    description:
      "ETL pipeline for Alberta Bill Govenment.",    
    logo: "assets/countable_io_logo.jpeg",
    },
    // {
    //   company: "Watonomous",
    //   role: "Machine Learning Researcher",
    //   period: "2024 January - 2024 April",
    //   description:'Working on Autonomous Vehicle' ,
    //   logo: "src/assets/watonomous_logo.jpeg",
    //   },
]

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="experience" className="py-20 px-4 md:px-6 pt-32">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience</h2>
          <p className="max-w-3xl mx-auto text-muted-foreground">
            My professional journey and the companies I've had the pleasure to work with.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="relative"
        >
          {/* Timeline line */}
          <div className="absolute left-[20px] md:left-[30px] top-0 bottom-0 w-0.5 bg-border" />

          {experiences.map((exp, index) => (
            <motion.div key={index} variants={itemVariants} className="relative mb-12 pl-12 md:pl-20">
              {/* Timeline dot */}
              <div className="absolute left-3 top-6 w-10 h-10 rounded-full bg-primary/10 border-4 border-background flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm border border-border transition-all duration-300 hover:shadow-md hover:border-primary/50 hover:-translate-y-1">
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                  <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden bg-muted">
                    <img
                      src={exp.logo || "/placeholder.svg"}
                      alt={`${exp.company} logo`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{exp.company}</h3>
                    <p className="text-primary font-medium">{exp.role}</p>
                    <p className="text-sm text-muted-foreground">{exp.period}</p>
                  </div>
                </div>
                <p className="text-muted-foreground">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
