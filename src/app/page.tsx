"use client"

import SwipeCard from "@/components/ui/Cards/SwipeCard"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

type CardData = {
  word: string
  definition: string
  translation?: string
}

const cards: CardData[] = [
  {
    word: "Paucity",
    definition: "the presence of something in only small or insufficient quantities or amounts.",
    translation: "অভাব, অনটন, অল্পতা, পরিমাণে স্বল্পতা",
  },
  {
    word: "Ephemeral",
    definition: "lasting for a very short time.",
    translation: "ক্ষণস্থায়ী, অল্পস্থায়ী",
  },
  {
    word: "Ubiquitous",
    definition: "present, appearing, or found everywhere.",
    translation: "সর্বত্র বিদ্যমান, সর্বব্যাপী",
  },
  {
    word: "Sagacious",
    definition: "having or showing keen mental discernment and good judgment; wise.",
    translation: "বিচক্ষণ, জ্ঞানী, প্রাজ্ঞ",
  },
  {
    word: "Eloquent",
    definition: "fluent or persuasive in speaking or writing.",
    translation: "বাগ্মী, সুবক্তা",
  },
]

export default function SwipeDeck() {
  const [index, setIndex] = useState(0)

  const handleGone = () => {
    setTimeout(() => {
      setIndex((prev) => (prev + 1 < cards.length ? prev + 1 : 0)) // loop back
    }, 300)
  }

  return (
    <div className="bg-yellow-100 w-screen h-screen flex justify-center items-center relative overflow-hidden">
      <AnimatePresence>
        {cards.slice(index, index + 3).map((card, i) => {
          const isTop = i === 0
          return (
            <motion.div
              key={card.word}
              className="absolute flex justify-center items-center w-full"
              initial={{ scale: 0.9, y: 40, opacity: 0 }}
              animate={{
                scale: 1 - i * 0.05,
                y: i * 15,
                opacity: 1,
              }}
              exit={{ scale: 0.9, y: -40, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ zIndex: cards.length - i }}
            >
              <SwipeCard
                word={card.word}
                definition={card.definition}
                translation={card.translation}
                onGone={isTop ? handleGone : undefined}
                draggable={isTop}
              />
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
