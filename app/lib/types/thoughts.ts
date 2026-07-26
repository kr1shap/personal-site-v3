/**
 * Thought types
 * -------------
 * Three flavors of thoughts live on the dashboard:
 *   1. sticker  — tiny, decorative, optionally with an image or emoji
 *   2. sticky   — small handwritten sticky note with a paper color
 *   3. article  — larger card that opens a modal with a full article body
 *
 * Position values are percentages of the fixed 1600×900 whiteboard
 * (0–100). Because the board size is fixed, positions are absolute and
 * never shift when the viewport resizes. `rotation` is in degrees and `z`
 * controls stacking.
 *
 * Anchor semantics — `x`/`y` are interpreted per type:
 *   - Sticker:    the visual center of the sticker
 *   - StickyNote: the top-left corner of the paper (matches the pin metaphor)
 *   - Article:    the visual center of the card
 */

export interface BoardPosition {
  /** Percent (0–100) of board width — anchor point per type, see file header */
  x: number;
  /** Percent (0–100) of board height — anchor point per type, see file header */
  y: number;
  /** Optional tilt, in degrees (typically between -6 and 6) */
  rotation?: number;
  /** Optional z-index for stacking order */
  z?: number;
}

/**
 * A single block of an article's body.
 * The modal renders these in order.
 */
export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "image"; src: string; alt?: string; caption?: string }
  | { type: "quote"; text: string; source?: string }
  | { type: "list"; items: string[] };

interface BaseThought {
  id: number;
  position: BoardPosition;
  /** ISO or casual date string, e.g. "march 2026" */
  date?: string;
}

/** A tiny decorative item — emoji or a small image, optional short label. */
export interface StickerThought extends BaseThought {
  type: "sticker";
  emoji?: string;
  imageUrl?: string;
  label?: string;
}

export type StickyColor = "yellow" | "blue" | "mint";

/** A small handwritten note on colored paper. */
export interface StickyThought extends BaseThought {
  type: "sticky";
  color: StickyColor;
  text: string;
  /** Optional small image attached to the note. */
  imageUrl?: string;
}

/** A larger article card. Clicking opens a modal with the full body. */
export interface ArticleThought extends BaseThought {
  type: "article";
  title: string;
  /** Short teaser shown on the card itself. */
  preview: string;
  /** Full article body for the modal — rendered as a list of blocks. */
  body: ArticleBlock[];
}

export type Thought = StickerThought | StickyThought | ArticleThought;

export interface ThoughtsData {
  thoughts: Thought[];
}

/**
 * slugifyArticleTitle
 * -------------------
 * Deterministic slug derivation for `/thoughts/[slug]` URLs. Lowercases,
 * collapses non-alphanumeric runs into single hyphens, trims leading/trailing
 * hyphens. Stays ASCII-only so the URL is human-typed-friendly.
 */
export function slugifyArticleTitle(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-+|-+$)/g, "");
}
