"use client";

import { BiZoomIn } from "react-icons/bi";
import Image from "next/image";
import { DesignImage } from "@/app/lib/types/design";

export default function ModalImage({
  image,
  isPortrait,
  previewColor,
  onEnlarge,
}: {
  image: DesignImage | undefined;
  isPortrait: boolean;
  previewColor: string;
  onEnlarge: () => void;
}) {
  const imageFrameClasses = isPortrait
    ? "h-[46dvh] sm:h-[70dvh]"
    : "h-[40dvh] sm:h-[52dvh]";

  if (image) {
    return (
      <button
        type="button"
        onClick={onEnlarge}
        aria-label={`Enlarge ${image.alt}`}
        className={`group relative flex w-full cursor-zoom-in items-center justify-center overflow-hidden rounded-b-3xl border-0 bg-transparent p-0 ${imageFrameClasses}`}
        style={{ background: previewColor }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={isPortrait ? "(min-width: 640px) 448px, calc(100vw - 32px)" : "(min-width: 640px) 780px, calc(100vw - 32px)"}
          loading="eager"
          className="block h-auto max-h-full w-auto max-w-full rounded-b-3xl object-contain"
        />
        <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-opacity duration-150 group-hover:bg-black/10 group-hover:opacity-100">
          <span className="flex items-center gap-1.5 rounded-full bg-[rgba(246,247,237,0.9)] px-3 py-1 text-[13px] text-[#456395] backdrop-blur-sm">
            <BiZoomIn size={16} /> click to enlarge
          </span>
        </span>
      </button>
    );
  }
  return (
    <div
      className={`flex w-full items-center justify-center rounded-b-3xl ${
        isPortrait ? "min-h-100" : "min-h-65"
      } ${imageFrameClasses}`}
      style={{ background: previewColor }}
    ></div>
  );
}
