"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { StickerThought } from "@/app/lib/types/thoughts";

interface Props {
  thought: StickerThought;
}

/**
 * Sticker
 * -------
 * A tiny decorative board pin — emoji or image, animated with the same
 * spring vocabulary as the VolunteerSection "community" stickers.
 */
export default function Sticker({ thought }: Props) {
  const { position, emoji, imageUrl, label } = thought;
  const rotation = position.rotation ?? 0;
  const prefersReducedMotion = useReducedMotion();
  const hoverScale = prefersReducedMotion ? 1 : 1.18;
  const hoverRotateDelta = prefersReducedMotion ? 0 : -6;

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 240, damping: 16 };

  return (
    <motion.div
      className="pointer-events-none absolute grid origin-center place-items-center select-none filter-[drop-shadow(2px_4px_5px_rgba(40,30,60,0.18))] max-sm:hidden"
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
        rotate: rotation + hoverRotateDelta,
        scale: hoverScale,
      }}
      transition={transition}
      aria-hidden={!label}
      aria-label={label}
    >
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt={label ?? ""}
          className="h-22 w-22 object-contain"
        />
      ) : emoji ? (
        <span
          className="block text-[4.5rem] leading-none"
          style={{
            fontFamily:
              '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", system-ui, sans-serif',
          }}
        >
          {emoji}
        </span>
      ) : label ? (
        <span className="text-[1.4rem] text-(--ink) bg-(--cream) px-[0.55rem] py-[0.15rem] rounded-[0.4rem] shadow-[1px_2px_4px_rgba(0,0,0,0.12)] -rotate-2">
          {label}
        </span>
      ) : null}
    </motion.div>
  );
}
