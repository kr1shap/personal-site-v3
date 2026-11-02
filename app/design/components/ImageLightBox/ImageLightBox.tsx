"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { BiX } from "react-icons/bi";
import { DesignImage } from "@/app/lib/types/design";
import ImageNavigation from "@/app/design/components/ImageNavigation/ImageNavigation";

export default function ImageLightbox({
  image,
  index,
  count,
  onPrevious,
  onNext,
  onClose,
}: {
  image: DesignImage;
  index: number;
  count: number;
  onPrevious: () => void;
  onNext: () => void;
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    return () => previousFocus?.focus();
  }, []);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (count > 1 && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
        event.preventDefault();
        if (event.key === "ArrowLeft") onPrevious();
        else onNext();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [count, onClose, onNext, onPrevious]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Enlarged design image"
      className="fixed inset-0 z-70 flex flex-col items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
    >
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        aria-label="close enlarged image"
        className="absolute top-5 right-5 z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-solid border-[#f6f7ed] text-[#f6f7ed] bg-black/40"
      >
        <BiX size={20} />
      </button>
      <div
        className="relative w-full max-w-[90vw]"
        style={{ height: count > 1 ? "calc(90dvh - 64px)" : "90dvh" }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={`min(90vw, ${90 * image.width / image.height}vh)`}
          loading="eager"
          onClick={(event) => event.stopPropagation()}
          className="mx-auto block h-full max-w-full object-contain"
          style={{ width: `min(100%, ${90 * image.width / image.height}dvh)` }}
        />
      </div>
      <div onClick={(event) => event.stopPropagation()}>
        <ImageNavigation index={index} count={count} onPrevious={onPrevious} onNext={onNext} dark />
      </div>
    </div>
  );
}
