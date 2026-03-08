/**
 * LogoText
 * --------
 * Small inline component combining an optional symbol/logo with
 * stylized text used across the site for link-like brand labels.
 *
 * Props: `text`, optional `logoSrc` or `symbol` (ReactNode).
 */

import Image from "next/image";
import type { ReactNode } from "react";

interface LogoTextProps {
  text: string;
  logoSrc?: string;
  symbol?: ReactNode;
}

export default function LogoText({ text, logoSrc, symbol }: LogoTextProps) {
  return (
    <div className="inline-flex w-fit items-center gap-1.5">
      {symbol ? (
        <div
          className="flex h-8 w-8 items-center justify-center text-(--dull-blue)"
          aria-hidden="true"
        >
          {symbol}
        </div>
      ) : logoSrc ? (
        <Image
          src={logoSrc}
          alt=""
          aria-hidden="true"
          width={44}
          height={50}
          className="h-8 w-8 rounded-sm object-cover"
          onError={(event) => {
            (event.currentTarget as HTMLImageElement).src = "/lumaBlue.png";
          }}
        />
      ) : (
        <div className="h-8 w-8" aria-hidden="true" />
      )}

      <p
        className="
          m-0 text-(--dark-blue)
          text-[clamp(1.6rem,4.8vw,2.35rem)]
          leading-none text-right whitespace-nowrap
          [text-shadow:0_-1px_8px_rgba(69,99,149,0.35)]
        "
      >
        {text}
      </p>
    </div>
  );
}
