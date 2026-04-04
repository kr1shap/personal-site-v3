/**
 * ProjectCard
 * -----------
 * Displays a summary card for a single project entry.
 * Click / tap the card to open the DetailPopup.
 *
 */

import type { ProjectEntry } from "../../lib/types/projects";
import Image from "next/image";

interface ProjectCardProps {
  /** The project data object to display */
  project: ProjectEntry;
  /** Optional click handler — use this to open the detail popup */
  onClick?: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <article
      className="
        bg-(--cream) border-4 border-(--dull-blue) rounded-[25px] overflow-hidden
        shadow-(--card-shadow)
        w-91 min-h-69
        flex flex-col
        cursor-pointer transition-all duration-200 ease-out
        hover:-translate-y-0.75 hover:shadow-(--card-shadow-hover)
        max-sm:w-[90vw] max-sm:min-h-0
      "
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      {/* Project screenshot / banner */}
      <div
        className="
          relative mx-5.25 mt-4.25 rounded-[1.875rem] overflow-hidden
          shadow-(--modal-shadow)
          aspect-314/154 w-[calc(100%-2.625rem)] shrink-0
        "
      >
        <Image
          src={project.img || "/lumaBlue.png"}
          alt={`${project.title} preview`}
          fill
          sizes="(max-width: 640px) 90vw, 314px"
          className="w-full h-full object-cover block"
          onError={(e) => {
            /* Fallback to placeholder if the project image is missing */
            (e.currentTarget as HTMLImageElement).src = "/lumaBlue.png";
          }}
        />
      </div>

      {/* Project name and tech stack */}
      <div className="px-6.75 pt-2 pb-5 flex flex-col gap-0.5 font-['Gamja_Flower',system-ui,sans-serif]">
        {/* Project name — dull-blue, 32px */}
        <p className="text-[2rem] max-sm:text-[1.5rem] text-(--dull-blue) leading-snug m-0 whitespace-nowrap overflow-hidden text-ellipsis">
          {project.title}
        </p>
        {/* Tech stack — dull-grey, 20px */}
        <p className="text-[1.25rem] max-sm:text-[1rem] text-(--dull-grey) leading-snug m-0 whitespace-nowrap overflow-hidden text-ellipsis">
          {project.stack}
        </p>
      </div>
    </article>
  );
}
