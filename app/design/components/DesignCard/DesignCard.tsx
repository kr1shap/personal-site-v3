"use client";

import { DesignItem } from "@/app/lib/types/design";

function Placeholder({ color, label }: { color: string; label: string }) {
  return (
    <div
      className="w-full h-full flex items-end p-4 text-[#456395]"
      style={{ background: color }}
    >
      <span className="text-[13px] opacity-40">{label}</span>
    </div>
  );
}

function GridImage({ item }: { item: DesignItem }) {
  if (item.imageUrl) {
    return (
      <img
        src={item.imageUrl}
        alt={item.title}
        className="w-full h-full object-cover"
      />
    );
  }
  return <Placeholder color={item.previewColor} label="add imageUrl" />;
}

export default function DesignCard({
  item,
  onClick,
}: {
  item: DesignItem;
  onClick: () => void;
}) {
  //Compute aspect class
  const aspectClass =
    item.orientation === "portrait"
      ? "aspect-[3/4]"
      : item.orientation === "square"
        ? "aspect-square"
        : "aspect-[4/3]";

  return (
    <button
      onClick={onClick}
      aria-label={`View: ${item.title}`}
      className={[
        "group relative overflow-hidden rounded-[18px] border-[2.5px] border-solid border-[#456395]",
        "text-left w-full cursor-pointer",
        "shadow-[2px_3px_12px_0px_rgba(69,99,149,0.2)]",
        "hover:shadow-[4px_6px_22px_0px_rgba(69,99,149,0.38)] hover:-translate-y-0.75",
        "transition-[box-shadow,transform] duration-200 ease-out",
        aspectClass,
      ].join(" ")}
    >
      {/* image fills card */}
      <div className="absolute inset-0">
        <GridImage item={item} />
      </div>

      {/* hover overlay */}
      <div
        className={[
          "absolute inset-0 flex flex-col justify-end p-5 pointer-events-none",
          "bg-[linear-gradient(to_top,rgba(69,99,149,0.85)_0%,rgba(69,99,149,0.1)_60%,transparent_100%)]",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
        ].join(" ")}
      >
        <p className="text-[22px] leading-tight text-white">{item.title}</p>
        <p className="text-[15px] text-white opacity-80">
          {item.subtitle} · {item.year}
        </p>
      </div>

      {/* tool badge top-right */}
      <div className="absolute top-3 right-3 pointer-events-none">
        <span
          className={[
            "inline-block px-2.5 py-0.5 rounded-full text-[13px] border border-solid",
            "border-[#456395] text-[#456395]",
            "bg-[rgba(246,247,237,0.85)] backdrop-blur-xs",
          ].join(" ")}
        >
          {item.tool}
        </span>
      </div>
    </button>
  );
}