"use client";

import { useState } from "react";
import Image from "next/image";
import type { ExperienceEntry } from "@/app/lib/types/experience";
import { sortExperiencesByRecency } from "@/app/lib/experienceRoadmap";
import DetailPopup from "@/app/components/Cards/DetailPopup";

interface ExperienceSectionProps {
  entries: ExperienceEntry[];
}

export default function ExperienceSection({ entries }: ExperienceSectionProps) {
  const [selected, setSelected] = useState<ExperienceEntry | null>(null);

  if (entries.length === 0) return null;

  const roadmapEntries = sortExperiencesByRecency(entries);

  return (
    <section
      id="experience"
      className="w-full px-4 py-20 sm:px-8 md:px-12 lg:px-16 xl:px-20"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-12 flex flex-col items-start justify-between gap-3 md:mb-16 md:flex-row md:items-end">
          <h2 className="text-[clamp(3.125rem,13vw,7.5rem)] leading-[0.95] text-(--dull-blue)">
            experience
          </h2>
          <p className="max-w-58 text-2xl leading-none text-(--dull-grey) md:pb-2 md:text-right md:text-3xl">
            a few stops along the way ↓
          </p>
        </div>

        <div className="relative pl-11 md:pl-0">
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 h-full w-8 overflow-visible md:left-1/2 md:-translate-x-1/2"
            viewBox="0 0 20 100"
            preserveAspectRatio="none"
          >
            <path
              d="M10 0 C3 10 17 20 10 30 C3 40 17 50 10 60 C3 70 17 80 10 100"
              fill="none"
              stroke="var(--dull-blue)"
              strokeWidth="3"
              strokeDasharray="7 5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <ol aria-label="career roadmap" className="space-y-10 md:space-y-14">
            {roadmapEntries.map((experience, index) => {
              const isLeft = index % 2 === 0;
              return (
                <li
                  key={`${experience.company}-${experience.date}`}
                  className="relative md:grid md:grid-cols-[minmax(0,1fr)_4.5rem_minmax(0,1fr)] md:items-center"
                >
                  <div
                    aria-hidden="true"
                    className="absolute -left-11 top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full 
                    border-4 border-(--dull-blue) bg-(--cream) text-lg leading-none text-(--dark-blue) 
                    shadow-[0_0_0_6px_var(--cream)] md:static md:col-start-2 md:row-start-1 md:mx-auto md:translate-y-0"
                  >
                    {entries.length - index}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelected(experience)}
                    aria-label={`View details for ${experience.role} at ${experience.company}`}
                    className={`group w-full rounded-[25px] border-4 border-(--dull-blue) bg-(--cream) px-5 py-5 text-left 
                      shadow-(--popup-shadow) transition-all duration-200 ease-out
                      hover:-translate-y-0.75 hover:shadow-(--card-shadow-hover)
                      focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-(--bright-blue) md:row-start-1 md:max-w-md ${
                        isLeft
                          ? "md:col-start-1 md:justify-self-end"
                          : "md:col-start-3 md:justify-self-start"
                      }`}
                  >
                    <span className="flex items-center gap-4">
                      <span className="relative size-18 shrink-0 overflow-hidden rounded-2xl bg-white/65 p-2 sm:size-22">
                        <Image
                          src={experience.img || "/lumaBlue.png"}
                          alt=""
                          fill
                          sizes="88px"
                          className="object-contain p-2"
                        />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[clamp(2.25rem,6vw,3.3rem)] leading-[0.85] text-(--dull-grey)">
                          {experience.company}
                        </span>
                        <span className="mt-2 block text-[clamp(1.35rem,3vw,1.8rem)] leading-none text-(--dull-grey)">
                          {experience.role}
                        </span>
                      </span>
                    </span>

                    <span className="mt-4 flex items-end justify-between gap-3 border-t-2 border-dashed border-(--cream-grey) pt-3">
                      <span className="text-xl leading-none text-(--dull-grey) sm:text-2xl">
                        {experience.location}
                      </span>
                      <span className="shrink-0 rounded-full bg-(--dull-blue) px-3 py-1 text-xl leading-none text-(--cream) sm:text-2xl">
                        {experience.date}
                      </span>
                    </span>
                  </button>

                  <p
                    className={`mt-3 text-2xl leading-none text-(--dull-blue) md:row-start-1 md:mt-0 md:text-3xl ${
                      isLeft
                        ? "md:col-start-3 md:justify-self-start"
                        : "md:col-start-1 md:justify-self-end md:text-right"
                    }`}
                  >
                    {index === 0 ? "next stop!" : experience.date}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <DetailPopup
        isOpen={selected !== null}
        onClose={() => setSelected(null)}
        type="experience"
        data={selected ?? roadmapEntries[0]}
      />
    </section>
  );
}
