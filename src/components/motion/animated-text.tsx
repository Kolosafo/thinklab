"use client"

import { motion } from "motion/react"
import { cn } from "@/lib/utils"

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  highlight?: boolean
  heading?: boolean
}

export default function AnimatedText({ text, className, delay = 0, highlight = false }: AnimatedTextProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true }}
      className={cn(highlight && "relative inline-block", className)}
    >
      {text}
      {highlight && (
        <motion.span
          className="absolute -bottom-2 left-0 h-1 bg-primary rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{
            duration: 1,
            delay: delay + 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{ once: true }}
        />
      )}
    </motion.div>
  )
}
