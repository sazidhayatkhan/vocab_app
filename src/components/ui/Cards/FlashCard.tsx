"use client"

import { RefreshCcw } from "lucide-react"
import React, { useState } from "react"
import { motion } from "framer-motion"

type FlashCardProps = {
  word: string
  definition: string
  translation?: string
}

const FlashCard = ({ word, definition, translation }: FlashCardProps) => {
  const [flipped, setFlipped] = useState(false)

  return (
    <div className="w-[300px] h-[360px] perspective">
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Side */}
        <div className="absolute inset-0 bg-white rounded-xl shadow-xl flex items-center justify-center backface-hidden">
          <p className="text-center font-bold text-2xl">{word}</p>
          <button
            className="absolute bottom-[12px] right-[15px] pointer-events-auto"
            onClick={(e) => {
              e.stopPropagation()
              setFlipped(!flipped)
            }}
          >
            <RefreshCcw size={20} />
          </button>
        </div>

        {/* Back Side */}
        <div
          className="absolute inset-0 bg-white rounded-xl shadow-xl p-4 backface-hidden"
          style={{ transform: "rotateY(180deg)" }}
        >
          <div className="mt-10 space-y-6">
            <p className="text-2xl font-bold text-center text-gray-700">
              {word}
            </p>
            <p className="text-center text-gray-500 text-sm">{definition}</p>
            {translation && (
              <p className="text-center text-gray-500 text-sm">
                {translation}
              </p>
            )}
          </div>
          <button
            className="absolute bottom-[12px] right-[15px] pointer-events-auto"
            onClick={(e) => {
              e.stopPropagation()
              setFlipped(!flipped)
            }}
          >
            <RefreshCcw size={20} />
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default FlashCard
