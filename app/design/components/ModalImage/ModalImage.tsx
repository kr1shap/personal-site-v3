"use client";

import { BiZoomIn } from "react-icons/bi";
import { DesignItem } from "@/app/lib/types/design";

export default function ModalImage({
  item,
  onEnlarge,
}: {
  item: DesignItem;
  onEnlarge: () => void;
}) {
  const isPortrait = item.orientation === "portrait";
  const imageFrameClasses = isPortrait
    ? "max-h-[70vh]"
    : "max-h-[44vh] sm:max-h-[52vh]";

  if (item.imageUrl) {
    return (
      <button
        type="button"
        onClick={onEnlarge}
        aria-label={`Enlarge ${item.title}`}
        className={`group relative flex w-full cursor-zoom-in items-center justify-center border-0 bg-transparent p-0 ${imageFrameClasses}`}
      >
        <img
          src={item.imageUrl}
          alt={item.title}
          className="block h-auto max-h-full w-auto max-w-full object-contain"
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
      className={`flex w-full items-center justify-center ${
        isPortrait ? "min-h-100" : "min-h-65"
      } ${imageFrameClasses}`}
      style={{ background: item.previewColor }}
    ></div>
  );
}