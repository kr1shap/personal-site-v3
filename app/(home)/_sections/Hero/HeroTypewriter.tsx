"use client";

import { TypeAnimation } from "react-type-animation";

export default function HeroTypewriter() {
  return (
    <TypeAnimation
      sequence={[
        "designer\nsoftware engineer\n& baker :)",
        2000,
        "",
        2500,
      ]}
      speed={45}
      deletionSpeed={65}
      repeat={Infinity}
      wrapper="span"
      className="inline-block min-h-[3lh]"
      style={{ whiteSpace: "pre-line" }}
    />
  );
}
