"use client";

import { motion } from "framer-motion";

interface SpeechBubbleProps {
  text: string;
  className?: string;
}

export default function SpeechBubble({
  text,
  className = "",
}: SpeechBubbleProps) {
  return (
    <motion.div
      className={`inline-flex w-fit ${className}`}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity }}
    >
      <div
        className="
          rounded-[2.5rem]
          border-[3px] border-(--dull-blue) bg-(--cream)
          px-8 py-1.5
          shadow-(--popup-shadow)
          transition-shadow duration-200 ease-out
          hover:shadow-(--popup-shadow-hover)
        "
      >
        <p className="m-0 text-(--dull-grey) text-[2rem] max-sm:text-[1.5rem] leading-none whitespace-nowrap">
          {text}
        </p>
      </div>
    </motion.div>
  );
}
