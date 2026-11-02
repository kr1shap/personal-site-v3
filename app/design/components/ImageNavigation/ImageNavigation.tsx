"use client";

import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

export default function ImageNavigation({
  index,
  count,
  onPrevious,
  onNext,
  dark = false,
}: {
  index: number;
  count: number;
  onPrevious: () => void;
  onNext: () => void;
  dark?: boolean;
}) {
  if (count < 2) return null;

  const buttonClasses = `flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-solid cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 ${
    dark
      ? "border-[#f6f7ed] text-[#f6f7ed] hover:bg-white/15"
      : "border-[#456395] text-[#456395] hover:bg-[#456395]/10"
  }`;

  return (
    <div className={`flex items-center justify-center gap-4 px-4 py-3 ${dark ? "" : "bg-[#f6f7ed]"}`}>
      <button type="button" aria-label="Previous image" onClick={onPrevious} className={buttonClasses}>
        <BiChevronLeft size={24} />
      </button>
      <span aria-live="polite" aria-atomic="true" className={`min-w-12 text-center text-[17px] tabular-nums ${dark ? "text-[#f6f7ed]" : "text-[#456395]"}`}>
        {index + 1} / {count}
      </span>
      <button type="button" aria-label="Next image" onClick={onNext} className={buttonClasses}>
        <BiChevronRight size={24} />
      </button>
    </div>
  );
}
