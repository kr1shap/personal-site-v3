/**
 * ExperienceCard
 * --------------
 * Displays a summary card for a single work experience entry.
 * Click / tap the card to open the DetailPopup.
 *
 */

import type { ExperienceEntry } from "../../types/experience";
import Image from "next/image";

interface ExperienceCardProps {
  /** The experience data object to display */
  experience: ExperienceEntry;
  /** Optional click handler — use this to open the detail popup */
  onClick?: () => void;
}

export default function ExperienceCard({
  experience,
  onClick,
}: ExperienceCardProps) {
  return (
    <article
      className="
        border-4 border-(--dull-blue) rounded-[25px] overflow-hidden
        shadow-(--popup-shadow)
        w-[min(22.75rem,90vw)] min-h-[19.3rem] pb-5 px-3 sm:px-4
        flex flex-col items-center bg-(--cream)
        cursor-pointer transition-all duration-200 ease-out
        hover:-translate-y-0.75 hover:shadow-(--popup-shadow-hover)
      "
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      {/* Company logo / placeholder image */}
      <div className="relative w-29 h-29 mt-5 overflow-hidden shrink-0">
        <Image
          src={experience?.img || "/lumaBlue.png"}
          alt={`${experience?.company} logo`}
          fill
          sizes="116px"
          className="w-full h-full object-contain"
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            (e.currentTarget as HTMLImageElement).src = "/lumaBlue.png";
          }}
        />
      </div>

      {/* Company name, role, and location/date */}
      <div className="flex flex-col items-center gap-0 mt-2 text-center px-2 sm:px-3 w-full max-w-full wrap-break-word">
        {/* Company name — largest, dull-grey */}
        <p className="text-[4rem] max-sm:text-[2.75rem] text-(--dull-grey) leading-none m-0">
          {experience?.company}
        </p>
        {/* Role — medium, dull-grey */}
        <p className="text-[2.1rem] max-sm:text-[1.4rem] text-(--dull-grey) leading-tight m-0">
          {experience?.role}
        </p>
        {/* Location | date — dull-blue, smallest */}
        <p className="text-[1.9rem] max-sm:text-[1.3rem] text-(--dull-blue) leading-snug mt-1 m-0">
          {experience?.location} | {experience?.date}
        </p>
      </div>
    </article>
  );
}
