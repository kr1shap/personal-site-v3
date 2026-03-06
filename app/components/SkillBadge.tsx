import Image from "next/image";

interface SkillBadgeProps {
  name: string;
  imageSrc: string;
  className?: string;
}

export default function SkillBadge({
  name,
  imageSrc,
  className = "",
}: SkillBadgeProps) {
  return (
    <div className={`inline-flex flex-col items-center w-fit ${className}`}>
      <div className="relative w-28 h-28 rounded-full overflow-hidden shrink-0">
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
