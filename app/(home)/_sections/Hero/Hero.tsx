import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6 pt-20 pb-16 sm:px-10 lg:px-20"
    >
      {/* Mobile layout */}
      <div className="flex w-full flex-col lg:hidden">
        {/* Greeting — full-width top line */}
        <p className="text-[clamp(2rem,10.5vw,2.8rem)] leading-tight text-black whitespace-nowrap">
          hello! my name is
        </p>

        {/* "krisha" + mascot side by side */}
        <div className="flex items-center justify-between">
          <p
            className="text-[clamp(5.2rem,24vw,6rem)] leading-none text-(--dull-blue)"
          >
            krisha
          </p>
          <div className="relative shrink-0 w-[clamp(110px,35vw,155px)] aspect-square">
            <Image
              src="/lumaBlue.png"
              alt="mascot"
              fill
              loading="eager"
              sizes="35vw"
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Subtitle */}
        <div style={{ color: "var(--bright-blue)" }}>
          <p className="text-[clamp(0.9rem,4vw,1.125rem)] leading-snug">
            cs + stats + linguistics @ uoft
          </p>
          <div className="text-[clamp(0.75rem,3.5vw,0.9375rem)] leading-snug mt-0.5">
            <p>designer</p>
            <p>software engineer</p>
            <p>&amp; baker :)</p>
          </div>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden lg:flex w-full max-w-6xl items-center justify-between gap-8">
        {/* Left text block */}
        <div className="flex flex-col">
          <p className="text-[clamp(3.5rem,7vw,7.5rem)] leading-tight text-black whitespace-nowrap">
            hello! my name is
          </p>
          <p
            className="text-[clamp(6rem,12vw,12.5rem)] leading-[0.88] -mt-2 ml-3 text-(--dull-blue)"
          >
            krisha
          </p>

          {/* Subtitle */}
          <div className="mt-6 ml-1" style={{ color: "var(--bright-blue)" }}>
            <p className="text-[clamp(1.4rem,2.5vw,2.5rem)] leading-normal whitespace-nowrap">
              cs + stats + linguistics @ uoft
            </p>
            <div className="text-[clamp(1.1rem,2vw,2rem)] leading-tight mt-1">
              <p>designer</p>
              <p>software engineer</p>
              <p>&amp; baker :)</p>
            </div>
          </div>
        </div>

        {/* Mascot */}
        <div className="relative shrink-0 w-[clamp(260px,28vw,450px)] aspect-square">
          <Image
            src="/lumaBlue.png"
            alt="mascot"
            fill
            sizes="(min-width: 1024px) 28vw, 450px"
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
