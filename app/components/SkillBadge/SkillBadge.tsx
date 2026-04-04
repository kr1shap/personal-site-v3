/**
 * SkillBadge
 * ----------
 * Compact badge used to display a skill name with an icon. Intended for
 * grid displays and lists of skills; keeps image square and label
 * centered beneath.
 *
 * Props: `name`, `imageSrc`, optional `className`.
 */

import Image from "next/image";

interface SkillBadgeProps {
  name: string;
  imageSrc: string;
}

export default function SkillBadge({ name, imageSrc }: SkillBadgeProps) {
  return (
    <div className="inline-flex w-fit flex-col items-center">
      <div className="relative w-28 h-28 overflow-hidden shrink-0">
        <Image
          src={imageSrc || "/lumaBlue.png"}
          alt={`${name} icon`}
          fill
          sizes="112px"
          className="w-full h-full object-cover"
          onError={(event) => {
            (event.currentTarget as HTMLImageElement).src = "/lumaBlue.png";
          }}
        />
      </div>
      <p className="mt-0.5 text-(--dark-blue) text-[2rem] max-sm:text-[1.5rem] leading-none text-center align-middle m-0">
        {name}
      </p>
    </div>
  );
}
