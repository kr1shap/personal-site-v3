/**
 * IconLabelButton
 * ---------------
 * Simple button combining a square icon and a label. Accepts an
 * `imageSrc`, `label`, and optional click handler. Designed to be
 * lightweight and styleable via `className`, `iconClassName`, and
 * `labelClassName` props.
 *
 * Usage:
 * <IconLabelButton label="languages" imageSrc="/bluebutton.png" />
 */

import Image from "next/image";

interface IconTextButtonProps {
  label: string;
  imageSrc: string;
  onClick?: () => void;
  className?: string;
  iconClassName?: string;
  labelClassName?: string;
}

export default function IconTextButton({
  label,
  imageSrc,
  onClick,
  className = "",
  iconClassName = "",
  labelClassName = "",
}: IconTextButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex w-fit items-center gap-3 bg-transparent border-none p-0 transition-transform duration-200 ease-out hover:-translate-y-0.5 ${className}`}
    >
      <div
        className={`relative h-11 w-11 sm:h-12 sm:w-12 shrink-0 ${iconClassName}`}
      >
        <Image
          src={imageSrc || "/lumaBlue.png"}
          alt=""
          aria-hidden="true"
          fill
          sizes="60px"
          className="w-full h-full object-contain"
          onError={(event) => {
            (event.currentTarget as HTMLImageElement).src = "/lumaBlue.png";
          }}
        />
      </div>
      <span
        className={`text-(--dull-grey) text-[clamp(1.875rem,5.8vw,2.75rem)] leading-none ${labelClassName}`}
      >
        {label}
      </span>
    </button>
  );
}
