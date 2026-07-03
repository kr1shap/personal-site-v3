"use client";

import { useState } from "react";
import { DesignItem } from "@/app/lib/types/design";
import DesignCard from "@/app/design/components/DesignCard/DesignCard";
import DesignModal from "@/app/design/components/DesignModal/DesignModal";
import { getDesignData } from "@/app/lib/portfolioData";

export default function DesignPage() {
  const designData = getDesignData().design;
  const [selected, setSelected] = useState<DesignItem | null>(null);

  return (
    <>
      <div
        className="min-h-screen w-full py-20 px-8 bg-[#f6f7ed]"
      >
        <div className="max-w-5xl mx-auto">
          {/* header */}
          <div className="mb-12">
            <h1 className="text-[100px] leading-none text-[#456395]">
              design
            </h1>
            <p className="text-[28px] mt-1 text-[#757272]">
              some things i&apos;ve made ; hover to peek, click to read more
              :)
            </p>
          </div>

          <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(260px,1fr))]">
            {designData.map((item) => (
              <DesignCard
                key={item.id}
                item={item}
                onClick={() => setSelected(item)}
              />
            ))}
          </div>

        </div>
      </div>

      {selected && (
        <DesignModal item={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}