"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  slugifyArticleTitle,
  type ArticleThought,
} from "@/app/lib/types/thoughts";

interface Props {
  thought: ArticleThought;
}

/**
 * ArticleCard
 * -----------
 * The card itself is a `motion.div` so framer-motion's whileHover /
 * whileTap / spring work. Next's `<Link>` is wrapped *inside* it, not
 * the other way around (i.e. we deliberately do NOT use
 * `motion.create(Link)`). Reasons:
 *
 *   1. In framer-motion v12, `motion.create(<non-framer-component>)`
 *      routes the wrapped component's pointer stream through framer's
 *      projection pipeline. With article cards this silently broke
 *      Next's `<Link>` click → `router.push` flow — the click event
 *      reaches the DOM but navigation never fires. Wrapping a plain
 *      `<Link>` inside a `<motion.div>` keeps the click on the
 *      plain-DOM anchor, while the parent motion.div handles the
 *      visual spring.
 *
 *   2. The "0×0 parent trap" that the previous MotionLink pattern was
 *      working around no longer applies: this wrapper puts the
 *      position:absolute / width:18.5rem / padding / border geometry
 *      on motion.div, and the Link inside is `display:block` so it
 *      fills motion.div and its onClick fires on the actual anchor.
 */
export default function ArticleCard({ thought }: Props) {
  const { position, title, preview, date } = thought;
  const rotation = position.rotation ?? 0;
  const prefersReducedMotion = useReducedMotion();
  const hoverScale = prefersReducedMotion ? 1 : 1.04;
  const hoverRotateTarget = prefersReducedMotion ? rotation : 0;
  const tapScale = prefersReducedMotion ? 1 : 0.985;
  const spring = prefersReducedMotion
    ? { duration: 0.15 }
    : { type: "spring" as const, stiffness: 240, damping: 22 };

  const slug = slugifyArticleTitle(title);
  const titleId = `article-title-${slug}`;

  return (
    <motion.div
      data-interactive=""
      className="absolute flex w-74 origin-center flex-col overflow-visible rounded-[1.875rem] border-4 border-[#456395] bg-[#f6f7ed] p-0 text-[#1c1c2e] outline-none will-change-transform shadow-[3px_4px_10.4px_0px_rgba(69,99,149,0.45)]"
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
      <Link
        href={`/thoughts/${slug}`}
        className="flex h-full flex-col cursor-pointer rounded-[1.625rem] text-inherit no-underline outline-none"
        aria-labelledby={titleId}
      >
        <div className="absolute left-1/2 top-[-0.6rem] z-1 grid h-[1.05rem] w-32 -translate-x-1/2 -rotate-3 place-items-center border-l border-r border-dashed border-black/7 bg-(--tape) text-(--ink) shadow-[0_1px_2px_rgba(0,0,0,0.14)]">
          <span className="rotate-3 text-[0.95rem] leading-none text-[#1f254599]" />
        </div>
        <header className="relative rounded-t-[1.625rem] bg-[#1c4b9a] px-4 pb-[0.6rem] pt-[0.7rem] text-white">
          <h2 id={titleId} className="m-0 text-[1.95rem] leading-[1.05] font-semibold tracking-[0.005em]">
            {title}
          </h2>
          {date ? (
            <span className="mt-[0.2rem] block text-[0.7rem] font-medium lowercase tracking-[0.06em] text-white/65">
              {date}
            </span>
          ) : null}
          <span className="pointer-events-none absolute bottom-0 left-[0.8rem] right-[0.8rem] h-0.5 bg-[linear-gradient(90deg,transparent,rgba(255,225,150,0.75),transparent)]" />
        </header>
        <div className="rounded-b-[1.625rem] px-[1.1rem] pb-[1.05rem] pt-[0.95rem]">
          <p className="m-0 mb-[0.7rem] text-[0.92rem] leading-[1.55] italic text-[#29293f]">
            {preview}
          </p>
          <span className="text-[0.82rem] font-semibold tracking-[0.01em] text-[#456395]">
            read more →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
