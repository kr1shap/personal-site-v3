import BoardCanvas from "./components/BoardCanvas/BoardCanvas";
import ThoughtPreviewCard from "./components/ThoughtPreviewCard/ThoughtPreviewCard";
import { getThoughtsData } from "@/app/lib/portfolioData";
import type { ArticleThought } from "@/app/lib/types/thoughts";

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
  const articles = thoughts.filter(
    (thought): thought is ArticleThought => thought.type === "article"
  );

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
    <div className="min-h-screen w-full overflow-x-clip bg-[#f6f7ed] px-4 py-20 sm:px-8">
      <div className="-mx-4 px-4 sm:-mx-8 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="mx-auto mb-12 w-full max-w-6xl text-left">
          <h1 className="text-[clamp(4.75rem,20vw,6.25rem)] leading-[0.95] text-[#456395]">
            krisha&apos;s thoughts
          </h1>
          <p className="-mt-1 text-[clamp(1.5rem,4.2vw,2.5rem)] leading-none text-[#757272]">
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

      <section
        aria-labelledby="article-quick-links"
        className="mx-auto mt-8 max-w-5xl px-1 sm:mt-10"
      >
        <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="m-0 text-[1.05rem] font-semibold lowercase tracking-[0.08em] text-[#456395]">
              article quick links
            </p>
            <h2
              id="article-quick-links"
              className="m-0 text-[clamp(2.2rem,5vw,4.25rem)] leading-none text-[#1c4b9a]"
            >
              read without the board
            </h2>
          </div>
          <p className="m-0 max-w-md text-[1.2rem] leading-snug text-[#757272]">
            same thoughts, less dragging :)
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ThoughtPreviewCard key={article.id} thought={article} />
          ))}
        </div>
      </section>
    </div>
  );
}
