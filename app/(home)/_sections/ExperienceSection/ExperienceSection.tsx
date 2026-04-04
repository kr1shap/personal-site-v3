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

  const visibleEntries = entries.slice(0, 3);

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
        <div className="flex flex-col items-center md:hidden">
          <ExperienceCard
            experience={visibleEntries[2]}
            onClick={() => setSelected(visibleEntries[2])}
          />

          <Image
            src="/arrow.svg"
            alt=""
            aria-hidden="true"
            width={98}
            height={259}
            className="h-36 w-auto self-start ml-8 -my-4"
          />

          <ExperienceCard
            experience={visibleEntries[1]}
            onClick={() => setSelected(visibleEntries[1])}
          />

          <Image
            src="/arrow.svg"
            alt=""
            aria-hidden="true"
            width={98}
            height={259}
            className="h-36 w-auto self-end mr-8 -my-4 -scale-x-100"
          />

          <ExperienceCard
            experience={visibleEntries[0]}
            onClick={() => setSelected(visibleEntries[0])}
          />
        </div>

        {/* Desktop — cards above vector overlays */}
        <div className="relative hidden md:block">
          <div className="relative mx-auto h-156 w-full max-w-280">
            <div className="absolute left-0 top-0 z-10">
              <ExperienceCard
                experience={visibleEntries[0]}
                onClick={() => setSelected(visibleEntries[0])}
              />
            </div>

            <div className="absolute left-1/2 top-52 z-10 -translate-x-1/2">
              <ExperienceCard
                experience={visibleEntries[1]}
                onClick={() => setSelected(visibleEntries[1])}
              />
            </div>

            <div className="absolute right-0 top-4 z-10">
              <ExperienceCard
                experience={visibleEntries[2]}
                onClick={() => setSelected(visibleEntries[2])}
              />
            </div>

            <Image
              src="/arrowFlipped.svg"
              alt=""
              aria-hidden="true"
              width={242}
              height={138}
              className="pointer-events-none absolute left-[15%] top-96 z-0 w-28 rotate-60 select-none lg:w-36"
            />

            <Image
              src="/arrowFlipped.svg"
              alt=""
              aria-hidden="true"
              width={242}
              height={138}
              className="pointer-events-none absolute right-[15%] top-96 z-0 w-28 -rotate-6 select-none lg:w-36"
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
