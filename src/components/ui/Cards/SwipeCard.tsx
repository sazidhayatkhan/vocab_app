"use client"

import FlashCard from "@/components/ui/Cards/FlashCard"
import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion"
import { useState } from "react"

type SwipeCardProps = {
  word: string
  definition: string
  translation?: string
  onGone?: (dir: "left" | "right") => void
  draggable?: boolean
}

export default function SwipeCard({
  word,
  definition,
  translation,
  onGone,
  draggable = true,
}: SwipeCardProps) {
  const controls = useAnimation()
  const [gone, setGone] = useState(false)

  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15])

  // Overlay opacity depending on drag distance
  const rightOpacity = useTransform(x, [50, 150], [0, 1])
  const leftOpacity = useTransform(x, [-150, -50], [1, 0])

  const handleDragEnd = (_: any, info: any) => {
    const offset = info.offset.x
    const velocity = info.velocity.x

    if (offset > 100 || velocity > 500) {
      // swiped right
      controls.start({ x: 500, opacity: 0, rotate: 20 })
      setGone(true)
      onGone?.("right")
    } else if (offset < -100 || velocity < -500) {
      // swiped left
      controls.start({ x: -500, opacity: 0, rotate: -20 })
      setGone(true)
      onGone?.("left")
    } else {
      // not enough swipe, reset
      controls.start({ x: 0, opacity: 1, rotate: 0 })
    }
  }

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          drag={draggable ? "x" : false}
          style={{ x, rotate }}
          onDragEnd={handleDragEnd}
          animate={controls}
          whileTap={draggable ? { scale: 0.95 } : {}}
          className="cursor-grab active:cursor-grabbing relative"
        >
          {/* Flashcard content */}
          <FlashCard
            word={word}
            definition={definition}
            translation={translation}
          />

          {/* ✅ Right Overlay */}
          <motion.div
            className="absolute inset-0 flex items-start justify-start p-6 pointer-events-none"
            style={{ opacity: rightOpacity }}
          >
            <div className="text-3xl">
              😎
            </div>
          </motion.div>

          {/* ❌ Left Overlay */}
          <motion.div
            className="absolute inset-0 flex items-start justify-end p-6 pointer-events-none"
            style={{ opacity: leftOpacity }}
          >
            <div className="text-3xl">
              😣
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
