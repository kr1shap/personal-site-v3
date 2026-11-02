"use client";
import { useEffect, useRef, useState } from "react";
import { BiWinkSmile, BiX } from "react-icons/bi";
import { DesignItem } from "@/app/lib/types/design";
import styles from "./DesignModal.module.css";
import DesignTagList from "@/app/design/components/Tag/DesignTag";
import ModalImage from "@/app/design/components/ModalImage/ModalImage";
import ImageLightbox from "@/app/design/components/ImageLightBox/ImageLightBox";
import ImageNavigation from "@/app/design/components/ImageNavigation/ImageNavigation";

export default function DesignModal({
  item,
  onClose,
}: {
  item: DesignItem;
  onClose: () => void;
}) {
  const isPortrait = item.orientation === "portrait";
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const activeImage = item.images[activeImageIndex];
  const previousImage = () => setActiveImageIndex((index) => (index - 1 + item.images.length) % item.images.length);
  const nextImage = () => setActiveImageIndex((index) => (index + 1) % item.images.length);

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, []);

  useEffect(() => {
    if (lightboxOpen) return;
    closeButtonRef.current?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (item.images.length > 1 && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
        event.preventDefault();
        setActiveImageIndex((index) => (index + (event.key === "ArrowLeft" ? -1 : 1) + item.images.length) % item.images.length);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxOpen, item.images.length, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 ${styles.animateFadeIn}`}
    >
      <div
        className="absolute inset-0 bg-[rgba(46,66,99,0.35)] backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="design-modal-title"
        inert={lightboxOpen}
        className={[
          "relative z-10 w-full rounded-3xl overflow-y-auto border-[2.5px] border-solid border-[#456395]",
          "bg-[#f6f7ed] shadow-[0px_12px_50px_0px_rgba(69,99,149,0.45)] max-h-[92dvh]",
          styles.animatePopIn,
          "flex",
          isPortrait ? "flex-col sm:flex-row max-w-215" : "flex-col max-w-195",
        ].join(" ")}
      >
        {/* image side */}
        <div
          className={[
            "overflow-hidden shrink-0 bg-[#f6f7ed]",
            isPortrait
              ? "sm:w-[52%] sm:overflow-y-auto border-b-[2.5px] sm:border-b-0 sm:border-r-[2.5px] border-solid border-[#456395]"
              : "w-full border-b-[2.5px] border-solid border-[#456395]",
          ].join(" ")}
        >
          <ModalImage image={activeImage} isPortrait={isPortrait} previewColor={item.previewColor} onEnlarge={() => setLightboxOpen(true)} />
          <ImageNavigation index={activeImageIndex} count={item.images.length} onPrevious={previousImage} onNext={nextImage} />
        </div>

        {/* details side */}
        <div
          className={`flex flex-col shrink-0 sm:shrink sm:overflow-y-auto ${
            isPortrait ? "sm:w-[48%]" : "w-full"
          }`}
        >
          {/* close button */}
          <div className="flex justify-end px-5 pt-5 shrink-0">
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="close"
              className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-solid border-[#456395] text-[#456395] bg-transparent"
            >
              <BiX size={16} />
            </button>
          </div>

          <div className="px-6 pb-7 flex flex-col gap-4 flex-1">
            {/* title */}
            <div>
              <h2 id="design-modal-title" className="text-[42px] leading-none text-[#456395]">
                {item.title}
              </h2>
              <p className="text-[20px] mt-1 text-[#757272]">
                {item.subtitle} · {item.year}
              </p>
            </div>

            {/* badges */}
            <div className="flex flex-wrap gap-2">
              <span className="inline-block px-3 py-0.5 rounded-full text-[15px] border-2 border-solid border-[#456395] text-[#456395] bg-[#f6f7ed]">
                {item.tool}
              </span>
              <DesignTagList tags={item.tags ?? []} />
            </div>

            {/* divider */}
            <div className="h-0.5 rounded-full w-full bg-[#456395] opacity-20" />

            {/* written details */}
            <p className="text-[20px] leading-relaxed flex-1 text-[#3a3a3a]">
              {item.details}
            </p>

            {/* link */}
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className={[
                  "self-start flex items-center gap-1.5 px-4 py-2 rounded-full",
                  "border-2 border-solid border-[#456395] text-[#456395] no-underline",
                  "hover:bg-[#456395] hover:text-[#f6f7ed] transition-colors duration-150",
                ].join(" ")}
              >
                view project <BiWinkSmile size={14} />
              </a>
            )}
          </div>
        </div>
      </div>

      {lightboxOpen && activeImage && (
        <ImageLightbox
          image={activeImage}
          index={activeImageIndex}
          count={item.images.length}
          onPrevious={previousImage}
          onNext={nextImage}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}
