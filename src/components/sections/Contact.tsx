"use client"

import { useRef, useState } from "react"
import { createPortal } from "react-dom"
import { motion, useInView } from "framer-motion"
import { Github, Linkedin, Mail, MapPin, Send } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { useToast } from "../../hooks/use-toast"

/**
 * Contact section with an embedded (provider‑less) toast system.
 * Submits to Formspree via `fetch` so we never leave the page.
 */
export default function Contact() {
  // ─────────────────────────── animation helpers
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  // ─────────────────────────── toast hook (local)
  const { toast, toasts } = useToast()

  // ─────────────────────────── form submit
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const res = await fetch(form.action, {
        method: form.method,
        headers: { Accept: "application/json" },
        body: formData,
      })
      if (res.ok) {
        toast({
          title: "Message sent!",
          description: "Thank you for your message. I'll get back to you soon.",
        })
        form.reset()
      } else {
        toast({
          title: "Error",
          description: "There was a problem sending your message. Please try again.",
          variant: "destructive",
        })
      }
    } catch {
      toast({
        title: "Network error",
        description: "Please check your connection and try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // ─────────────────────────── local ToastViewport
  const ToastViewport = () => (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map(t => (
        <div
          key={t.id}
          className={`w-72 rounded-md px-4 py-3 shadow-lg backdrop-blur-sm text-sm transition-opacity duration-300 ${
            t.variant === "destructive" ? "bg-red-600 text-white" : "bg-neutral-900/80 text-white"
          }`}
        >
          <p className="font-medium">{t.title}</p>
          <p className="opacity-80">{t.description}</p>
        </div>
      ))}
    </div>
  )

  // ─────────────────────────── JSX
  // bg-muted/30 
  return (
    <section id="contact" className="py-20 px-4 md:px-6 pt-32">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Talk!</h2>
          <p className="max-w-3xl mx-auto text-muted-foreground">
            Feel free to contact me for any inquiries, potential opportunities or to say hello :{")"} {"\n"}
            I am always seeking for new challenges and opportunities. 


          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-12"
        >
          {/* Left column */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Contact info */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-4">
                {/* Email */}
                <div className="flex items-center gap-4 group hover:bg-card p-3 rounded-lg transition-colors">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a
                      href="mailto:h26song@uwaterloo.ca"
                      className="font-medium hover:text-primary transition-colors"
                    >
                      h26song@uwaterloo.ca
                    </a>
                  </div>
                </div>
                {/* Location */}
                <div className="flex items-center gap-4 group hover:bg-card p-3 rounded-lg transition-colors">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">Waterloo, ON, Canada</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Social links */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Connect With Me!</h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com/Dannyso05"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 transform hover:scale-110"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/daniel-song0718/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 transform hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right column (form) */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
            <form
              action="https://formspree.io/f/xldrjvzq"
              method="POST"
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div className="group">
                <label htmlFor="name" className="block text-sm font-medium mb-1 group-hover:text-primary transition-colors">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  required
                  className="w-full transition-all duration-300 focus:border-primary focus:ring-primary hover:border-primary/50"
                />
              </div>
              <div className="group">
                <label htmlFor="email" className="block text-sm font-medium mb-1 group-hover:text-primary transition-colors">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Your email"
                  required
                  className="w-full transition-all duration-300 focus:border-primary focus:ring-primary hover:border-primary/50"
                />
              </div>
              <div className="group">
                <label htmlFor="subject" className="block text-sm font-medium mb-1 group-hover:text-primary transition-colors">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Subject"
                  required
                  className="w-full transition-all duration-300 focus:border-primary focus:ring-primary hover:border-primary/50"
                />
              </div>

              <div className="group">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-1 group-hover:text-primary transition-colors"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Your message"
                  required
                  className="w-full min-h-[150px] transition-all duration-300 focus:border-primary focus:ring-primary hover:border-primary/50"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full transition-transform duration-300 hover:scale-105"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Send Message
                  </span>
                )}
              </Button>
            </form>
          </motion.div>
        </motion.div>
      </div>

      {/* Toast viewport */}
      {createPortal(<ToastViewport />, document.body)}
    </section>
  )
}