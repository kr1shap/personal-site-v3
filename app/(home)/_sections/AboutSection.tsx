import Image from "next/image";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="w-full px-4 pb-20 sm:px-8 md:px-12 lg:px-16 xl:px-20"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 md:gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16 xl:gap-24">
        <div className="order-2 lg:order-1 relative w-[clamp(10.5rem,40vw,19.875rem)] aspect-318/565 shrink-0">
          <Image
            src="/myselflol.png"
            alt="Krisha portrait"
            fill
            sizes="(max-width: 1024px) 40vw, 318px"
            className="object-contain"
          />
        </div>

        <div className="pr-4 order-1 lg:order-2 w-full max-w-2xl text-right lg:text-left">
          <h2 className="text-[clamp(3.125rem,13vw,7.5rem)] leading-[0.95] text-(--dull-blue)">
            about me
          </h2>

          <div className="mt-3 space-y-4 text-[clamp(1rem,5vw,2rem)] leading-snug text-black lg:mt-4 lg:space-y-5">
            <p>
              I&apos;m a second (mayyybe third) year student at UofT, specializing in
              CS as well as minoring in stats + linguistics.
            </p>

            <p>
              I do a few things; being a part of many cool clubs and a current
              undergraduate TA for MATA22 @ UTSC!
            </p>

            <p>
              Currently interning @ rbc as a <u>software dev</u> and incoming @
              capital one as a <u>mobile engineer</u>!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
