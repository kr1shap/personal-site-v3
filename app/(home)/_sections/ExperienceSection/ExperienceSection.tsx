"use client";

import { useState } from "react";
import type { ExperienceEntry } from "@/app/lib/types/experience";
import { sortExperiencesByRecency } from "@/app/lib/experienceRoadmap";
import DetailPopup from "@/app/components/Cards/DetailPopup";
import CompanyLogo from "@/app/components/Cards/CompanyLogo";

interface ExperienceSectionProps {
  entries: ExperienceEntry[];
}

export default function ExperienceSection({ entries }: ExperienceSectionProps) {
  const [selected, setSelected] = useState<ExperienceEntry | null>(null);

  if (entries.length === 0) return null;

  const sortedEntries = sortExperiencesByRecency(entries);

  return (
    <section
      id="experience"
      className="w-full px-4 py-16 sm:px-8 sm:py-20 md:px-12 lg:px-16 xl:px-20"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-8 flex flex-col items-start justify-between gap-3 sm:mb-12 md:flex-row md:items-end">
          <h2 className="text-[clamp(3.125rem,13vw,7.5rem)] leading-[0.95] text-(--dull-blue)">
            experience
          </h2>
          <p className="text-2xl leading-none text-(--dull-grey) md:pb-2 md:text-right md:text-3xl">
            collected along the way
          </p>
        </div>

        <ol
          aria-label="Work experience, newest first"
          className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8"
        >
          {sortedEntries.map((experience, index) => (
            <li
              key={`${experience.company}-${experience.date}`}
              className={`min-w-0 ${
                index % 4 === 0 || index % 4 === 3
                  ? "sm:-rotate-1"
                  : "sm:rotate-1"
              }`}
            >
              <button
                type="button"
                onClick={() => setSelected(experience)}
                aria-label={`View details for ${experience.role} at ${experience.company}`}
                aria-haspopup="dialog"
                className="group flex h-full min-h-52 w-full min-w-0 flex-col rounded-2xl border-2 border-dashed border-(--dull-blue) bg-(--cream) p-3.5 text-left shadow-(--popup-shadow) transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-(--card-shadow-hover) focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-(--bright-blue) motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:min-h-56 sm:p-6 md:p-8"
              >
                <span className="flex w-full flex-col-reverse items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <span className="min-w-0 text-[clamp(1.875rem,4.6vw,3.5rem)] leading-none text-(--dull-blue) [overflow-wrap:anywhere]">
                    {experience.company}
                  </span>
                  <CompanyLogo
                    src={experience.img}
                    company={experience.company}
                    className="h-8 w-24 sm:h-12 sm:w-28"
                  />
                </span>
                <span className="mt-2 block w-full flex-1 text-[clamp(1.125rem,2.6vw,1.875rem)] leading-tight text-(--dull-grey) sm:mt-3">
                  {experience.role}
                </span>
                <span className="mt-3 flex w-full flex-wrap items-end justify-between gap-x-2 gap-y-1 text-lg leading-none text-(--dull-blue) sm:mt-5 sm:text-2xl">
                  <span>{experience.date}</span>
                  <span aria-hidden="true" className="ml-auto">
                    ↗
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <DetailPopup
        isOpen={selected !== null}
        onClose={() => setSelected(null)}
        type="experience"
        data={selected ?? sortedEntries[0]}
      />
    </section>
  );
}
