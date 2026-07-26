import BoardCanvas from "./components/BoardCanvas/BoardCanvas";
import { getThoughtsData } from "@/app/lib/portfolioData";

import styles from "./page.module.css";

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

      <div className={styles.hintBar}>
        <p className={styles.hintContent}>
          <span>drag</span>
          <span aria-hidden className={styles.hintDot}>
            ·
          </span>
          <span>wheel to zoom</span>
          <span aria-hidden className={styles.hintDot}>
            ·
          </span>
          <span>click to read</span>
          <span aria-hidden className={styles.hintDot}>
            ·
          </span>
          <span>play with it!</span>
        </p>
      </div>
    </div>
  );
}
