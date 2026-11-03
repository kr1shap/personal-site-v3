"use client";

import Image from "next/image";
import { useState } from "react";

interface CompanyLogoProps {
  src: string;
  company: string;
  className: string;
}

export default function CompanyLogo({
  src,
  company,
  className,
}: CompanyLogoProps) {
  const [failedSource, setFailedSource] = useState<string | null>(null);

  return (
    <span className={`relative block shrink-0 ${className}`}>
      <Image
        src={src && failedSource !== src ? src : "/lumaBlue.png"}
        alt={`${company} logo`}
        fill
        sizes="144px"
        className="object-contain object-left"
        onError={() => setFailedSource(src)}
      />
    </span>
  );
}
