"use client";

import { useState } from "react";
import Image from "next/image";
import type { ExperienceEntry } from "@/app/lib/types/experience";
import ExperienceCard from "@/app/components/Cards/ExperienceCard";
import DetailPopup from "@/app/components/Cards/DetailPopup";

interface ExperienceSectionProps {
  entries: ExperienceEntry[];
}

export default function ExperienceSection({ entries }: ExperienceSectionProps) {
  const [selected, setSelected] = useState<ExperienceEntry | null>(null);

  if (entries.length === 0) return null;

  const visibleEntries = entries.slice(0, 4).reverse();

  return (
    <section
      id="experience"
      className="w-full px-4 py-20 sm:px-8 md:px-12 lg:px-16 xl:px-20"
    >
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="text-[clamp(3.125rem,13vw,7.5rem)] leading-[0.95] mb-10 lg:mb-14 text-(--dull-blue)">
          experience
        </h2>
        {/* Mobile — stacked cards with arrow images between them */}
        <div className="flex flex-col items-center gap-1 md:hidden">
          {visibleEntries.map((experience, index) => (
            <div
              key={`${experience.company}-${experience.date}`}
              className="flex flex-col items-center w-full"
            >
              <ExperienceCard
                experience={experience}
                onClick={() => setSelected(experience)}
              />

              {index < visibleEntries.length - 1 && (
                <Image
                  src="/arrow.svg"
                  alt=""
                  aria-hidden="true"
                  width={98}
                  height={259}
                  className={`h-32 w-auto -my-2 ${
                    index % 2 === 0
                      ? "self-start ml-8"
                      : "self-end mr-8 -scale-x-100"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Desktop — horizontal carousel with fade edges */}
        <div className="hidden md:block">
          <div className="relative">
            <div className="overflow-x-auto pt-2 pb-5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex w-max items-start gap-4 sm:gap-5 lg:gap-6 pl-0.5 pr-5">
                {visibleEntries.reverse().map((experience) => (
                  <ExperienceCard
                    key={`${experience.company}-${experience.date}`}
                    experience={experience}
                    onClick={() => setSelected(experience)}
                  />
                ))}
              </div>
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-10 bg-linear-to-r from-(--cream) to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-10 bg-linear-to-l from-(--cream) to-transparent"
            />
          </div>
        </div>
      </div>

      <DetailPopup
        isOpen={selected !== null}
        onClose={() => setSelected(null)}
        type="experience"
        data={selected ?? visibleEntries[0]}
      />
    </section>
  );
}
