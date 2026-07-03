"use client";

import { useEffect } from "react";
import { BiX } from "react-icons/bi";

export default function ImageLightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-70 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="close enlarged image"
        className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border-2 border-solid border-[#f6f7ed] text-[#f6f7ed] bg-transparent"
      >
        <BiX size={20} />
      </button>
      <img
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] max-w-[90vw] object-contain"
      />
    </div>
  );
}