"use client"

import { motion } from "motion/react"
import type { ReactNode } from "react"

interface AnimatedImageProps {
  children: ReactNode
}

export default function AnimatedImage({ children }: AnimatedImageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {children}
    </motion.div>
  )
}
