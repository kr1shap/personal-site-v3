/**
 * CustomCursor
 * ------------
 * Lightweight custom cursor implementation that follows mouse movement
 * and adds interactive/pressed states for UI elements. Only active on
 * devices that support a fine pointer (`(hover: hover) and (pointer: fine)`).
 *
 * Usage: include <CustomCursor /> at app root (e.g. layout) so it can
 * listen globally to pointer events.
 */

"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const currentXRef = useRef(0);
  const currentYRef = useRef(0);
  const targetXRef = useRef(0);
  const targetYRef = useRef(0);

  useEffect(() => {
    const hasFinePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;

    if (!hasFinePointer || !cursorRef.current || !dotRef.current) {
      return;
    }

    const cursorEl = cursorRef.current;
    const dotEl = dotRef.current;
    cursorEl.style.opacity = "1";
    dotEl.style.opacity = "1";

    const isInteractiveTarget = (target: EventTarget | null) => {
      const element =
        target instanceof Element
          ? target
          : target instanceof Node
            ? target.parentElement
            : null;

      if (!element) return false;

      return Boolean(
        element.closest(
          'button, a, [role="button"], input, select, textarea, summary, label',
        ),
      );
    };

    // Offset so the image's visual tip aligns with the true pointer hotspot.
    // Adjust HOTSPOT_Y if the cursor still feels misaligned vertically.
    const HOTSPOT_X = 10;
    const HOTSPOT_Y = 15;

    const animate = () => {
      currentXRef.current += (targetXRef.current - currentXRef.current) * 0.28;
      currentYRef.current += (targetYRef.current - currentYRef.current) * 0.28;

      cursorEl.style.transform = `translate3d(${currentXRef.current - HOTSPOT_X}px, ${currentYRef.current - HOTSPOT_Y}px, 0)`;
      dotEl.style.transform = `translate3d(calc(${currentXRef.current}px - 50%), calc(${currentYRef.current}px - 50%), 0)`;
      rafRef.current = window.requestAnimationFrame(animate);
    };

    const handleMouseMove = (event: MouseEvent) => {
      targetXRef.current = event.clientX;
      targetYRef.current = event.clientY;

      if (isInteractiveTarget(event.target)) {
        cursorEl.classList.add("is-hover-interactive");
        dotEl.classList.add("is-hover-interactive");
      } else {
        cursorEl.classList.remove("is-hover-interactive");
        dotEl.classList.remove("is-hover-interactive");
      }
    };

    const handleMouseEnter = () => {
      cursorEl.style.opacity = "1";
      dotEl.style.opacity = "1";
    };

    const handleMouseLeave = () => {
      cursorEl.style.opacity = "0";
      dotEl.style.opacity = "0";
      cursorEl.classList.remove("is-hover-interactive", "is-pressed");
      dotEl.classList.remove("is-hover-interactive", "is-pressed");
    };

    const handleMouseDown = (event: MouseEvent) => {
      if (isInteractiveTarget(event.target)) {
        cursorEl.classList.add("is-pressed");
        dotEl.classList.add("is-pressed");
      }
    };

    const handleMouseUp = () => {
      cursorEl.classList.remove("is-pressed");
      dotEl.classList.remove("is-pressed");
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseenter", handleMouseEnter, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    window.addEventListener("blur", handleMouseUp, { passive: true });

    rafRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("blur", handleMouseUp);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="custom-cursor"
        aria-hidden="true"
        style={{ pointerEvents: "none" }}
      />
      <div
        ref={dotRef}
        className="cursor-dot"
        aria-hidden="true"
        style={{ pointerEvents: "none" }}
      />
    </>
  );
}
