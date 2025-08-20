"use client"

import FlashCard from "@/components/ui/Cards/FlashCard"
import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion"
import { useState } from "react"

type SwipeCardProps = {
  word: string
  definition: string
  translation?: string
}

export default function SwipeCard({ word, definition, translation }: SwipeCardProps) {
  const controls = useAnimation()
  const [gone, setGone] = useState(false)

  // Track x position
  const x = useMotionValue(0)
  // Map x position to rotation: left = -15deg, right = +15deg
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15])

  const handleDragEnd = (_: any, info: any) => {
    const offset = info.offset.x
    const velocity = info.velocity.x

    if (offset > 100 || velocity > 500) {
      controls.start({ x: 500, opacity: 0, rotate: 20 })
      setGone(true)
    } else if (offset < -100 || velocity < -500) {
      controls.start({ x: -500, opacity: 0, rotate: -20 })
      setGone(true)
    } else {
      controls.start({ x: 0, opacity: 1, rotate: 0 })
    }
  }

  return (
    <div className="bg-yellow-100 w-screen h-screen flex justify-center items-center">
      {!gone && (
        <motion.div
          drag="x"
          style={{ x, rotate }}
          onDragEnd={handleDragEnd}
          animate={controls}
          whileTap={{ scale: 0.95 }}
          className="cursor-grab active:cursor-grabbing"
        >
          <FlashCard word={word} definition={definition} translation={translation} />
        </motion.div>
      )}
    </div>
  )
}
