import BoardCanvas from "./components/BoardCanvas/BoardCanvas";
import { getThoughtsData } from "@/app/lib/portfolioData";

/** Tailwind classnames that don't change between breakpoints. */
const hintBase =
  "inline-flex items-center flex-wrap justify-center m-0 font-medium tracking-[0.02em]";
const hintDotBase =
  "text-[var(--dull-blue)] opacity-[0.45] leading-none font-bold";

/**
 * Thoughts dashboard — server component.
 *
 * Loads the thoughts JSON on the server, then hands it to a single
 * client wrapper (`BoardCanvas`) that owns zoom + pan + pinch state and
 * renders the Sticker / StickyNote / ArticleCard children inside a
 * transformed inner canvas. Article cards navigate to
 * `/thoughts/[slug]` via Next's `<Link>` instead of opening an
 * in-page modal — better mobile readability, real back-button
 * behavior, shareable URLs.
 */

export default function ThoughtsPage() {
  const { thoughts } = getThoughtsData();

  // Mobile-first hint pill:
  //   - mobile (<640px)  → row wraps inside a 75vw × 75vh cap, larger
  //     font, thicker border, generous tap-friendly padding.
  //   - desktop (≥640px) → single line (nowrap) with the original
  //     tighter pill proportions.
  const hintPillClass = [
    hintBase,
    "bg-[var(--cream)] border-[var(--dull-blue)] text-[var(--ink-soft)]",
    "rounded-full",
    "py-[0.85rem] px-[1.6rem] gap-y-1 gap-x-[0.7rem]",
    "max-w-[75vw] max-h-[75vh] text-base border-[3px] whitespace-normal",
    "sm:gap-[0.65rem] sm:py-[0.55rem] sm:px-[1.25rem]",
    "sm:text-[0.8rem] sm:border-[2px] sm:whitespace-nowrap",
  ].join(" ");

  const hintDotClass = [hintDotBase, "text-[1.35rem] sm:text-[1.15rem]"].join(
    " "
  );

  return (
    <div className="min-h-screen w-full py-20 px-8 bg-[#f6f7ed]">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-left">
          <h1 className="text-[100px] leading-none text-[#456395]">
            krisha&apos;s thoughts
          </h1>
          <p className="text-[28px] mt-1 text-[#757272]">
            some scattered thoughts ; drag to play, wheel to zoom, click to read :)
          </p>
        </div>
      </div>

      <BoardCanvas thoughts={thoughts} />

      <div className="flex justify-center pt-5 pb-10 px-4 sm:pt-6 sm:pb-12">
        <p className={hintPillClass}>
          <span>drag</span>
          <span aria-hidden className={hintDotClass}>
            ·
          </span>
          <span>wheel to zoom</span>
          <span aria-hidden className={hintDotClass}>
            ·
          </span>
          <span>click to read</span>
          <span aria-hidden className={hintDotClass}>
            ·
          </span>
          <span>play with it!</span>
        </p>
      </div>
    </div>
  );
}
