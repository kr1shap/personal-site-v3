"use client";

import { useEffect, useRef, useState } from "react";
import type { Thought } from "@/app/lib/types/thoughts";
import Sticker from "../Sticker/Sticker";
import StickyNote from "../StickyNote/StickyNote";
import ArticleCard from "../ArticleCard/ArticleCard";
import styles from "./BoardCanvas.module.css";

/**
 * BoardCanvas
 * -----------
 * Wraps the thoughts children inside a transformed inner canvas so the
 * board behaves like a whiteboard:
 *
 *   - **Wheel** over the viewport zooms toward the cursor (factor = exp of
 *     deltaY). Zoom is clamped at MIN/MAX before recomputing pan; clamping
 *     first prevents drift at the boundaries.
 *   - **Background drag** pans the canvas — gated on the pointerdown
 *     target NOT being inside a `[data-interactive]` card, so dragging a
 *     sticky never starts a pan.
 *   - **Two-finger touch** pinch zooms toward the midpoint of the two
 *     pointers; releasing one finger mid-pinch reverts cleanly to pan with
 *     the remaining finger.
 *   - **Floating controls** (+/−/100%/reset) bottom-right for users who'd
 *     rather click than scroll.
 *
 * The board viewport (gradients, dynamic CSS-var dimensions) stays in a
 * CSS module because Tailwind arbitrary values are awkward there; the
 * float controls + zoom buttons are pure Tailwind below.
 */

const MIN_ZOOM = 0.25;
const MAX_ZOOM = 3;
const RESET_ZOOM = 1;
const RESET_PAN = { x: 0, y: 0 };
const FIT_PADDING_PX = 48; // breathing room between cards and viewport edges on autofit

/**
 * Fixed whiteboard dimensions.
 * 1600×900 is a comfortable 16:9 canvas — large enough for the current
 * handful of thoughts plus plenty of room to add more, while still fitting
 */
const BOARD_WIDTH = 1600;
const BOARD_HEIGHT = 900;

/** Fixed card sizes at zoom=1 — these intentionally do NOT change with viewport. */
const CARD_SIZE: Record<Thought["type"], { w: number; h: number }> = {
  sticker: { w: 88, h: 88 },
  sticky: { w: 184, h: 168 },
  article: { w: 296, h: 240 },
};

/** Anchor point per type — used to compute each card's bbox from its % position. */
const CARD_ANCHOR: Record<Thought["type"], "center" | "top-left"> = {
  sticker: "center",
  sticky: "top-left",
  article: "center",
};

interface PointerSample {
  x: number;
  y: number;
}

export default function BoardCanvas({ thoughts }: { thoughts: Thought[] }) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  // Live values kept in refs so the once-attached wheel/pointer listeners
  // always see the freshest state without needing to re-bind.
  const zoomRef = useRef(RESET_ZOOM);
  const panRef = useRef(RESET_PAN);

  const [zoom, setZoom] = useState(RESET_ZOOM);
  const [pan, setPan] = useState(RESET_PAN);

  useEffect(() => {
    zoomRef.current = zoom;
    panRef.current = pan;
  }, [zoom, pan]);

  // ---- Autofit (initial mount only) ----------------------------------------
  // The board is a fixed 1600×900 whiteboard; card positions are absolute
  // percentages of that board, so the layout never shifts when the
  // viewport resizes. We fit the *cards* into view once on first paint,
  // then leave zoom/pan under the user's control. The reset button re-runs this.
  const fitToViewport = () => {
    const el = viewportRef.current;
    if (!el || thoughts.length === 0) return;
    const rect = el.getBoundingClientRect();

    // Compute the axis-aligned bounding box of all thoughts in
    // board-local pixels. Because card sizes are fixed (no responsive
    // overrides), this bbox is stable across viewports — the definition
    // of absolute positioning.
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    thoughts.forEach((t) => {
      const { w, h } = CARD_SIZE[t.type];
      const cx = (t.position.x / 100) * BOARD_WIDTH;
      const cy = (t.position.y / 100) * BOARD_HEIGHT;
      const left =
        CARD_ANCHOR[t.type] === "center" ? cx - w / 2 : cx;
      const top =
        CARD_ANCHOR[t.type] === "center" ? cy - h / 2 : cy;
      if (left < minX) minX = left;
      if (top < minY) minY = top;
      if (left + w > maxX) maxX = left + w;
      if (top + h > maxY) maxY = top + h;
    });

    const boundsW = maxX - minX;
    const boundsH = maxY - minY;
    const availW = Math.max(1, rect.width - 2 * FIT_PADDING_PX);
    const availH = Math.max(1, rect.height - 2 * FIT_PADDING_PX);
    const targetZoom = Math.max(
      MIN_ZOOM,
      Math.min(MAX_ZOOM, availW / boundsW, availH / boundsH)
    );

    // Center the content bbox in the viewport.
    const scaledW = boundsW * targetZoom;
    const scaledH = boundsH * targetZoom;
    const offsetX = (rect.width - scaledW) / 2;
    const offsetY = (rect.height - scaledH) / 2;
    setZoom(targetZoom);
    setPan({
      x: offsetX - minX * targetZoom,
      y: offsetY - minY * targetZoom,
    });
  };

  useEffect(() => {
    fitToViewport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- Wheel zoom-to-cursor -------------------------------------------------
  // Attached once as a non-passive listener so we can preventDefault the
  // browser's native scroll (viewport has no scroll; overflow:hidden).
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const handler = (e: WheelEvent) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const factor = Math.exp(-e.deltaY * 0.0015);
      const currentZoom = zoomRef.current;
      const currentPan = panRef.current;
      const newZoom = Math.max(
        MIN_ZOOM,
        Math.min(MAX_ZOOM, currentZoom * factor)
      );
      if (newZoom === currentZoom) return; // at boundary — don't drift.
      const worldX = (mx - currentPan.x) / currentZoom;
      const worldY = (my - currentPan.y) / currentZoom;
      setZoom(newZoom);
      setPan({ x: mx - worldX * newZoom, y: my - worldY * newZoom });
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, []);

  // ---- Pointer-driven pan + pinch ------------------------------------------
  const pointersRef = useRef<Map<number, PointerSample>>(new Map());
  const pinchStartRef = useRef<{
    dist: number;
    mid: PointerSample;
    zoom: number;
    pan: { x: number; y: number };
  } | null>(null);
  const panStartRef = useRef<{
    clientX: number;
    clientY: number;
    pan: { x: number; y: number };
  } | null>(null);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const target = e.target as Element | null;
  
    if (target?.closest("[data-interactive]")) {
      pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
      return;
    }
    e.currentTarget.setPointerCapture(e.pointerId);
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointersRef.current.size === 2) {
      panStartRef.current = null;
      const [a, b] = [...pointersRef.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      pinchStartRef.current = {
        dist,
        mid: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 },
        zoom: zoomRef.current,
        pan: { ...panRef.current },
      };
    } else if (pointersRef.current.size === 1) {
     
      panStartRef.current = {
        clientX: e.clientX,
        clientY: e.clientY,
        pan: { ...panRef.current },
      };
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pointersRef.current.has(e.pointerId)) return;
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointersRef.current.size === 2 && pinchStartRef.current) {
      e.preventDefault();
      const start = pinchStartRef.current;
      const [a, b] = [...pointersRef.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const mid: PointerSample = {
        x: (a.x + b.x) / 2,
        y: (a.y + b.y) / 2,
      };
      const el = viewportRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = mid.x - rect.left;
      const cy = mid.y - rect.top;
      const newZoom = Math.max(
        MIN_ZOOM,
        Math.min(MAX_ZOOM, start.zoom * (dist / start.dist))
      );
      const worldX = (cx - start.pan.x) / start.zoom;
      const worldY = (cy - start.pan.y) / start.zoom;
      setZoom(newZoom);
      setPan({ x: cx - worldX * newZoom, y: cy - worldY * newZoom });
    } else if (pointersRef.current.size === 1 && panStartRef.current) {
      e.preventDefault();
      const start = panStartRef.current;
      const dx = e.clientX - start.clientX;
      const dy = e.clientY - start.clientY;
      setPan({ x: start.pan.x + dx, y: start.pan.y + dy });
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    pointersRef.current.delete(e.pointerId);
    if (pointersRef.current.size === 0) {
      pinchStartRef.current = null;
      panStartRef.current = null;
    } else if (
      pointersRef.current.size === 1 &&
      pinchStartRef.current
    ) {
      pinchStartRef.current = null;
      const last = [...pointersRef.current.values()][0];
      panStartRef.current = {
        clientX: last.x,
        clientY: last.y,
        pan: { ...panRef.current },
      };
    }
  };

  // ---- Control handlers (anchored at viewport center) ----------------------
  const zoomToward = (
    targetZoom: number,
    anchor: { x: number; y: number }
  ) => {
    const newZoom = Math.max(
      MIN_ZOOM,
      Math.min(MAX_ZOOM, targetZoom)
    );
    const currentZoom = zoomRef.current;
    if (newZoom === currentZoom) return;
    const currentPan = panRef.current;
    const worldX = (anchor.x - currentPan.x) / currentZoom;
    const worldY = (anchor.y - currentPan.y) / currentZoom;
    setZoom(newZoom);
    setPan({
      x: anchor.x - worldX * newZoom,
      y: anchor.y - worldY * newZoom,
    });
  };

  const viewportCenter = () => {
    const el = viewportRef.current;
    if (!el) return { x: 0, y: 0 };
    const rect = el.getBoundingClientRect();
    return { x: rect.width / 2, y: rect.height / 2 };
  };

  const handleZoomOut = () => {
    zoomToward(zoomRef.current - 0.2, viewportCenter());
  };
  const handleZoomIn = () => {
    zoomToward(zoomRef.current + 0.2, viewportCenter());
  };
  const handleReset = () => {
    fitToViewport();
  };

  // ---- Render --------------------------------------------------------------
  const transform = `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`;
  const atMinZoom = zoom <= MIN_ZOOM + 1e-3;
  const atMaxZoom = zoom >= MAX_ZOOM - 1e-3;

  return (
    <div
      ref={viewportRef}
      className={styles.viewport}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      role="application"
      aria-label="Zoomable thoughts board"
    >
      <div
        className={styles.canvas}
        data-canvas=""
        style={{ transform, transformOrigin: "0 0" }}
      >
        {thoughts.map((t) => {
          switch (t.type) {
            case "sticker":
              return <Sticker key={t.id} thought={t} />;
            case "sticky":
              return <StickyNote key={t.id} thought={t} />;
            case "article":
              return <ArticleCard key={t.id} thought={t} />;
          }
        })}
      </div>

      <div
        data-interactive=""
        aria-label="Zoom controls"
        className="absolute bottom-5 right-4 z-50 flex items-center gap-[0.15rem]
                   bg-[rgba(251,247,238,0.92)] backdrop-blur-[8px]
                   border-[1.5px] border-(--dull-blue) rounded-full
                   py-[0.3rem] px-[0.4rem]
                   shadow-[0_2px_10px_rgba(28,75,154,0.18)] select-none
                   sm:bottom-9 sm:right-8 sm:px-[0.45rem]"
      >
        <button
          type="button"
          onClick={handleZoomOut}
          aria-label="Zoom out"
          disabled={atMinZoom}
          className="text-(--dark-blue) bg-transparent border-0 rounded-full
                     cursor-pointer leading-none
                     transition-[background,color,transform] duration-150 ease-linear
                     py-[0.6rem] px-[0.8rem] text-[1.1rem]
                     hover:enabled:bg-[rgba(69,99,149,0.14)]
                     hover:enabled:text-(--bright-blue)
                     active:enabled:scale-[0.92]
                     disabled:opacity-35 disabled:cursor-not-allowed
                     focus-visible:outline-2 focus-visible:outline-(--bright-blue)
                     focus-visible:outline-offset-[3px]
                     sm:py-[0.4rem] sm:px-[0.7rem] sm:text-[1.15rem]"
        >
          −
        </button>
        <span
          aria-live="polite"
          aria-atomic="true"
          className="text-(--dull-blue) text-center tracking-[0.02em] tabular-nums
                     px-[0.4rem] min-w-[3.2rem] text-[0.95rem]
                     sm:px-[0.45rem] sm:min-w-[3.4rem] sm:text-[0.98rem]"
        >
          {Math.round(zoom * 100)}%
        </span>
        <button
          type="button"
          onClick={handleZoomIn}
          aria-label="Zoom in"
          disabled={atMaxZoom}
          className="text-(--dark-blue) bg-transparent border-0 rounded-full
                     cursor-pointer leading-none
                     transition-[background,color,transform] duration-150 ease-linear
                     py-[0.6rem] px-[0.8rem] text-[1.1rem]
                     hover:enabled:bg-[rgba(69,99,149,0.14)]
                     hover:enabled:text-(--bright-blue)
                     active:enabled:scale-[0.92]
                     disabled:opacity-35 disabled:cursor-not-allowed
                     focus-visible:outline-2 focus-visible:outline-(--bright-blue)
                     focus-visible:outline-offset-[3px]
                     sm:py-[0.4rem] sm:px-[0.7rem] sm:text-[1.15rem]"
        >
          +
        </button>
        <button
          type="button"
          onClick={handleReset}
          aria-label="Reset zoom and pan"
          className="text-(--dark-blue) bg-transparent border-0 cursor-pointer
                     leading-none transition-[background,color,transform] duration-150 ease-linear
                     border-l border-l-solid border-[rgba(69,99,149,0.3)] rounded-none tracking-[0.02em]
                     py-[0.7rem] px-[1rem] text-[0.95rem]
                     hover:enabled:bg-[rgba(69,99,149,0.14)]
                     hover:enabled:text-(--bright-blue)
                     active:enabled:scale-[0.92]
                     focus-visible:outline-2 focus-visible:outline-(--bright-blue)
                     focus-visible:outline-offset-[3px]
                     sm:py-[0.4rem] sm:px-[0.85rem] sm:text-[0.88rem]"
        >
          reset
        </button>
      </div>
    </div>
  );
}
