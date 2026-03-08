"use client";

import { useState } from "react";
import type { Skill, SkillSet } from "@/app/types/skillSet";
import IconLabelButton from "@/app/components/IconLabelButton";
import SkillBadge from "@/app/components/SkillBadge";
import SpeechBubble from "@/app/components/SpeechBubble";

const CATEGORY_LABELS: Record<keyof SkillSet, string> = {
  ProgrammingLanguages: "languages",
  FrameworksTools: "frameworks/libs",
  Databases: "databases",
  DevOps_Cloud: "devops",
  Tools_Other: "tools",
};

const CATEGORY_KEYS = Object.keys(CATEGORY_LABELS) as (keyof SkillSet)[];
const CATEGORY_ICON = "/bluebutton.png";

interface SkillsSectionProps {
  skillSet: SkillSet;
}

export default function SkillsSection({ skillSet }: SkillsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<keyof SkillSet>(
    "ProgrammingLanguages",
  );

  const activeSkills: Skill[] = skillSet[activeCategory] ?? [];

  return (
    <section
      id="skills"
      className="w-full px-4 py-20 sm:px-8 md:px-12 lg:px-16 xl:px-20"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-5 w-full text-left lg:w-auto lg:pt-2">
          <h2 className="text-[clamp(3.125rem,13vw,7.5rem)] leading-[0.95] text-(--dull-blue)">
            skills
          </h2>
          <p className="-mt-1 text-[clamp(1.5rem,4.2vw,2.5rem)] leading-none text-(--dull-grey)">
            i have some cool skillz
          </p>
        </div>

        {/* Category buttons */}
        <div className="flex justify-center flex-wrap gap-x-4 gap-y-3 sm:gap-x-6 sm:gap-y-4 mb-10 lg:mb-14">
          {CATEGORY_KEYS.map((key) => {
            const isActive = activeCategory === key;
            return (
              <IconLabelButton
                key={key}
                onClick={() => setActiveCategory(key)}
                label={CATEGORY_LABELS[key]}
                imageSrc={CATEGORY_ICON}
                className={`transition-transform duration-200 ease-out ${
                  isActive ? "scale-[1.02]" : "hover:-translate-y-0.5"
                }`}
                iconClassName={`${
                  isActive
                    ? "drop-shadow-[0_0_0.35rem_rgba(20,91,210,0.35)]"
                    : ""
                }`}
                labelClassName={`${
                  isActive ? "text-(--bright-blue)" : "text-(--dull-grey)"
                }`}
              />
            );
          })}
        </div>

        {/* Skill badges grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-x-4 gap-y-6 sm:gap-x-6 sm:gap-y-8 justify-items-center">
          {activeSkills.map((skill) => (
            <div
              key={skill.name}
              className="relative flex flex-col items-center"
            >
              {skill.isFavourite && (
                <div className="absolute -top-10 sm:-top-12 z-10">
                  <SpeechBubble
                    text="fav!"
                    className="px-0! py-0! scale-[0.65] sm:scale-75 origin-bottom"
                  />
                </div>
              )}
              <SkillBadge name={skill.name} imageSrc={skill.img_url} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
