"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Github, ExternalLink } from "lucide-react"


interface Project {
  title: string
  description: string
  image: string
  github: string
  demo: string
  tags: string[]
}

const projects: Project[] = [
  {
    title: 'Presence',
    description: 'AI-powered soft-skill screening.',
    image: 'assets/Presence.jpeg',
    github: 'https://github.com/EricJujianZou/Spurhacks2025',
    demo: 'https://devpost.com/software/articula',
    tags: ['FastaAPI', 'React', 'Gemini 2.5']
  }

]

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="projects" className="py-20 px-4 md:px-6 pt-32 bg-muted/30 ">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Projects</h2>
          <p className="max-w-3xl mx-auto text-muted-foreground">
            A selection of my recent work and personal projects.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.length === 0 ? (
            <motion.p
              variants={itemVariants}
              className="col-span-full text-center text-muted-foreground"
            >
              No projects to display just yet—check back soon!
            </motion.p>
          ) : (
            projects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-card rounded-lg overflow-hidden border border-border shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/50 hover:-translate-y-1"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    // className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
                    // className="absolute inset-0 w-full h-full object-contain object-center transition-transform duration-500 ease-in-out"
                    className="absolute inset-0 w-full h-full object-scale-down object-center transition-transform duration-500 ease-in-out"
                    style={{
                      transform:
                        hoveredIndex === index ? "scale(1.05)" : "scale(1)",
                    }}
                  />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors transform hover:scale-110"
                      aria-label={`GitHub repository for ${project.title}`}
                    >
                      <Github className="h-6 w-6 text-white" />
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors transform hover:scale-110"
                      aria-label={`Live demo for ${project.title}`}
                    >
                      <ExternalLink className="h-6 w-6 text-white" />
                    </a>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

        {projects.length > 0 && (
          <motion.div variants={itemVariants} className="mt-12 text-center">
            <a
              href="https://github.com/Dannyso05"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors transform hover:scale-105"
            >
              <Github className="h-5 w-5" />
              See More on GitHub
            </a>
          </motion.div>
        )}
      </div>
    </section>
  )
}
