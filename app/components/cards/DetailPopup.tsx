/**
 * DetailPopup
 * -----------
 * Expanded detail modal for either a ProjectEntry or ExperienceEntry.
 * Accepts a discriminated union so fields are correctly typed per variant.
 *
 * Usage:
 *   <DetailPopup isOpen={open} onClose={() => setOpen(false)} type="project" data={project} />
 *   <DetailPopup isOpen={open} onClose={() => setOpen(false)} type="experience" data={exp} />
 *
 * Figma ref: node 1:185
 */

"use client";

import { useEffect } from "react";
import Image from "next/image";
import type { ExperienceEntry } from "../../types/experience";
import type { ProjectEntry } from "../../types/projects";

/* ---------- Prop types ---------- */

type DetailPopupBase = {
  isOpen: boolean;
  onClose: () => void;
};

type ProjectPopupProps = DetailPopupBase & {
  type: "project";
  data: ProjectEntry;
};

type ExperiencePopupProps = DetailPopupBase & {
  type: "experience";
  data: ExperienceEntry;
};

type DetailPopupProps = ProjectPopupProps | ExperiencePopupProps;

/* ---------- Component ---------- */

export default function DetailPopup(props: DetailPopupProps) {
  const { isOpen, onClose, type, data } = props;

  /* Close on Escape key */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  /* Prevent body scroll while open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  /* ---- Resolve display values based on type ---- */

  const image = data.img || "/lumaBlue.png";
  const imageAlt = type === "project" ? data.title : data.company;
  const title = type === "project" ? data.title : data.company;
  const subtitle = type === "project" ? data.stack : data.role;
  const date = data.date;
  const description = data.description;
  const bullets = data.bullets;

  /* Extra meta line for experience (location) */
  const locationLine =
    type === "experience" ? (data as ExperienceEntry).location : null;

  return (
    /* Clicking the overlay backdrop closes the popup */
    <div
      className="
        fixed inset-0 bg-(--popup-overlay) backdrop-blur-xs
        flex items-center justify-center z-100 p-6
        animate-[fadeIn_0.18s_ease]
      "
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} details`}
    >
      <div
        className="
          bg-(--cream) border-4 border-(--dull-blue) rounded-[30px] overflow-hidden
          w-[min(39.25rem,100%)] max-h-[90vh] overflow-y-auto
          px-6 sm:px-9 py-8 relative
          animate-[slideUp_0.22s_ease]
        "
      >
        {/* Close button */}
        <button
          type="button"
          className="
            absolute top-4 right-5 z-30 bg-transparent border-none cursor-pointer
            text-2xl text-(--dull-blue)
            leading-none px-2 py-1 rounded-full transition-colors duration-150
            hover:bg-(--close-hover-bg) hover:text-(--bright-blue)
            focus-visible:bg-(--close-hover-bg) focus-visible:text-(--bright-blue)
          "
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Close detail view"
        >
          ✕
        </button>

        {/* ---- Top section: image + meta ---- */}
        <div className="flex flex-col sm:flex-row gap-5 sm:gap-5.5 items-start">
          {/* Main image */}
          <div
            className="
              relative w-full sm:w-[55%] sm:max-w-78.5 aspect-314/262 max-sm:aspect-video
              rounded-[1.875rem] overflow-hidden shrink-0
              shadow-(--modal-shadow)
            "
          >
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(max-width: 640px) 100vw, 55vw"
              className="w-full h-full object-cover block"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/lumaBlue.png";
              }}
            />
          </div>

          {/* Meta column */}
          <div className="flex-1 flex flex-col gap-0 min-w-0">
            {/* Primary title */}
            <p className="text-[2.5rem] max-sm:text-[1.75rem] text-(--dull-blue) leading-tight m-0 wrap-break-word">
              {title}
            </p>

            {/* Subtitle — stack for project, role for experience */}
            <p className="text-[1.5rem] max-sm:text-[1.125rem] text-(--dull-grey) leading-snug mt-0.5 m-0 wrap-break-word">
              {subtitle}
            </p>

            {/* Location — experience only */}
            {locationLine && (
              <p className="text-[1.5rem] max-sm:text-[1.125rem] text-(--dull-grey) leading-snug m-0">
                {locationLine}
              </p>
            )}

            {/* Date — underlined per Figma */}
            {date && (
              <p className="text-[1.0625rem] max-sm:text-[0.9rem] text-black underline mt-1.5 m-0">
                {date}
              </p>
            )}
          </div>
        </div>

        {/* ---- Bottom section: description + bullets ---- */}
        <div className="mt-6 text-(--dull-grey) text-[1.3rem] max-sm:text-[1.125rem] leading-relaxed">
          {/* Short description paragraph */}
          {description && (
            <p className="max-sm:text-[1.1rem] text-[1.2rem] text-(--dull-blue) font-bold m-0 mb-2">
              {description}
            </p>
          )}

          {/* Bullet points */}
          {bullets && bullets?.length > 0 && (
            <ul className="m-0 pl-6 list-disc flex flex-col gap-[0.15rem]">
              {bullets.map((point, i) => (
                <li key={i} className="leading-relaxed">
                  {point}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
