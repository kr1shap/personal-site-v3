"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { RefObject } from "react";
import type { StickyThought } from "@/app/lib/types/thoughts";

interface Props {
  thought: StickyThought;
}

/**
 * StickyNote
 * ----------
 * A piece of colored paper pinned to the board. Drag uses framer-motion
 * with the same vocabulary as the VolunteerSection "community" stickers.
 */

export default function StickyNote({ thought }: Props) {
  const { position, color, text, imageUrl, date } = thought;
  const rotation = position.rotation ?? 0;
  const colorClass =
    color === "yellow"
      ? "bg-linear-to-b from-(--sticky-yellow) to-(--sticky-yellow-edge)"
      : color === "mint"
        ? "bg-linear-to-b from-(--sticky-mint) to-(--sticky-mint-edge)"
        : "bg-linear-to-b from-(--sticky-blue) to-(--sticky-blue-edge)";
  const prefersReducedMotion = useReducedMotion();
  const dragElastic = prefersReducedMotion ? 0 : 0.15;
  const hoverScale = prefersReducedMotion ? 1 : 1.08;
  const tapScale = prefersReducedMotion ? 1 : 0.97;
  const dragScale = prefersReducedMotion ? 1 : 1.05;
  const spring = prefersReducedMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 260, damping: 22 };

  return (
    <motion.div
      data-interactive=""
      className={`absolute w-46 min-h-42 rounded-none px-4 pt-[1.4rem] pb-[0.95rem] text-[1.08rem] leading-tight text-[#1d1d22] shadow-[2px_4px_12px_var(--paper-shadow)] touch-none select-none outline-none origin-top-left will-change-transform cursor-grab ${colorClass} focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--ink-soft)`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        zIndex: position.z ?? 1,
      }}
      drag
      dragConstraints={"parent" as unknown as RefObject<HTMLElement | null>}
      dragElastic={dragElastic}
      dragMomentum={false}
      whileHover={{ scale: hoverScale, rotate: rotation + 1 }}
      whileTap={{ scale: tapScale }}
      whileDrag={{ scale: dragScale, zIndex: 100, cursor: "grabbing" }}
      initial={{ rotate: rotation, scale: 1 }}
      animate={{ rotate: rotation, scale: 1 }}
      transition={spring}
      aria-label={`Sticky note: ${text}`}
    >
      <span
        className="absolute -top-2 left-1/2 h-[0.95rem] w-18 -translate-x-1/2 -rotate-2 border-l border-r border-dashed border-black/6 bg-(--tape) shadow-[0_1px_2px_rgba(0,0,0,0.12)] backdrop-blur-[1px]"
        aria-hidden
      />
      {imageUrl ? (
        <div className="mb-2 grid w-full place-items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt="" className="h-24 w-24 object-contain" />
        </div>
      ) : null}
      <p className="m-0 whitespace-pre-wrap wrap-break-word text-left">
        {text}
      </p>
      {date ? (
        <span className="mt-[0.85rem] block text-[0.78rem] italic tracking-[0.01em] text-black/42">
          {date}
        </span>
      ) : null}
    </motion.div>
  );
}
