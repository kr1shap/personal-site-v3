"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

/**
 * ThoughtsBubble
 * --------------
 * A playful floating bubble fixed to the home page that invites visitors
 * to the /thoughts board. It uses the site's soft blue/cream palette and
 * a gentle hover/float animation. Motion is disabled for users who
 * prefer reduced motion.
 */
export default function ThoughtsBubble() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-[55] sm:bottom-10 sm:right-10"
      animate={prefersReducedMotion ? {} : { y: [0, -8, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        href="/thoughts"
        aria-label="Read my thoughts"
        className="flex items-center gap-2 rounded-full border-[3px] border-(--dull-blue) bg-(--cream) px-5 py-3 text-(--dull-blue) shadow-(--popup-shadow) transition-shadow duration-200 hover:shadow-(--popup-shadow-hover) focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-(--dull-blue)"
      >
        <span className="text-[clamp(1.1rem,2vw,1.35rem)] leading-none">
          thoughts
        </span>
        <span className="text-xl leading-none" aria-hidden="true">
          💭
        </span>
      </Link>
    </motion.div>
  );
}
