import Image from "next/image";

interface IconLabelButtonProps {
  label: string;
  imageSrc: string;
  onClick?: () => void;
}

export default function IconLabelButton({
  label,
  imageSrc,
  onClick,
}: IconLabelButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 w-fit bg-transparent border-none p-0"
    >
      <div className="relative w-15 h-15 rounded-full overflow-hidden shrink-0">
        <Image
          src={imageSrc || "/lumaBlue.png"}
          alt=""
          aria-hidden="true"
          fill
          sizes="60px"
          className="w-full h-full object-cover"
          onError={(event) => {
            (event.currentTarget as HTMLImageElement).src = "/lumaBlue.png";
          }}
        />
      </div>
      <span className="text-(--dull-grey) text-[2rem] max-sm:text-[1.5rem] leading-none">
        {label}
      </span>
    </button>
  );
}
