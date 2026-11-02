"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ArticleThought } from "@/app/lib/types/thoughts";
import ThoughtPreviewCard from "../ThoughtPreviewCard/ThoughtPreviewCard";

interface Props {
  thought: ArticleThought;
}

/**
 * ArticleCard
 * -----------
 * Adds board positioning, motion, and tape around the same preview card
 * used in the article quick links below the board.
 */
export default function ArticleCard({ thought }: Props) {
  const { position } = thought;
  const rotation = position.rotation ?? 0;
  const prefersReducedMotion = useReducedMotion();
  const hoverScale = prefersReducedMotion ? 1 : 1.04;
  const hoverRotateTarget = prefersReducedMotion ? rotation : 0;
  const tapScale = prefersReducedMotion ? 1 : 0.985;
  const spring = prefersReducedMotion
    ? { duration: 0.15 }
    : { type: "spring" as const, stiffness: 240, damping: 22 };

  return (
    <motion.div
      data-interactive=""
      className="absolute h-64 w-80 origin-center overflow-visible will-change-transform"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        zIndex: position.z ?? 1,
      }}
      initial={{ x: "-50%", y: "-50%", rotate: rotation, scale: 1 }}
      animate={{ x: "-50%", y: "-50%", rotate: rotation, scale: 1 }}
      whileHover={{
        x: "-50%",
        y: "-50%",
        rotate: hoverRotateTarget,
        scale: hoverScale,
      }}
      whileTap={{ x: "-50%", y: "-50%", scale: tapScale }}
      transition={spring}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-0.6rem] z-10 h-[1.05rem] w-32 -translate-x-1/2 -rotate-3 border-l border-r border-dashed border-black/7 bg-(--tape) shadow-[0_1px_2px_rgba(0,0,0,0.14)]"
      />
      <ThoughtPreviewCard thought={thought} headingAs="h2" className="h-full" />
    </motion.div>
  );
}
