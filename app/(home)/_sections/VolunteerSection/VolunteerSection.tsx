"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { VolunteerEntry } from "@/app/lib/types/volunteer";

interface VolunteerSectionProps {
  entries: VolunteerEntry[];
}

const ROTATIONS = [-4, 2.5, -3, 5, -2, 3.5];

export default function VolunteerSection({ entries }: VolunteerSectionProps) {
  const constraintsRef = useRef<HTMLDivElement>(null);

  if (!entries.length) return null;

  return (
    <section className="w-full px-4 pb-16 sm:px-8 md:px-12 lg:px-16 xl:px-20 -mt-8 sm:-mt-12">
      <div className="mx-auto w-full max-w-6xl">
        <p className="text-[clamp(1.5rem,4.2vw,2.5rem)] leading-none mb-8 text-(--dull-blue)">
          my communities
        </p>

        <div
          ref={constraintsRef}
          className="relative flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-10 py-4"
        >
          {entries.map((entry, i) => (
            <motion.div
              key={entry.title}
              drag
              dragConstraints={constraintsRef}
              dragElastic={0.15}
              dragMomentum={false}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.97 }}
              initial={{ rotate: ROTATIONS[i % ROTATIONS.length] }}
              className="relative flex flex-col items-center gap-1.5 rounded-2xl border-2 bg-(--cream) px-4 py-3 sm:px-5 sm:py-4 select-none"
              style={{
                borderColor: "var(--dark-blue)",
                boxShadow: "var(--card-shadow)",
                cursor: "grab",
              }}
            >
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0">
                <Image
                  src={entry.img || "/lumaBlue.png"}
                  alt={entry.title}
                  fill
                  sizes="56px"
                  className="object-contain pointer-events-none"
                  draggable={false}
                />
              </div>
              <span className="text-[clamp(0.8rem,2.4vw,1.05rem)] leading-tight text-center max-w-28 sm:max-w-32 text-(--dark-blue)">
                {entry.title}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
