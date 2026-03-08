"use client";

export default function Loading() {
  return (
    <main
      className="min-h-screen w-full bg-(--cream) px-6 pt-28 pb-10"
      style={{ animation: "fadeIn 220ms ease" }}
    >
      <section className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-center justify-center text-center">
        <div className="relative">
          <div className="px-8 py-6 ">
            <p className="text-[clamp(2.2rem,8vw,3.7rem)] leading-none text-(--dark-blue)">
              (˶ᵔ ᵕ ᵔ˶)
            </p>
            <p className="mt-3 text-[clamp(1.4rem,4.5vw,2rem)] text-(--dull-blue)">
              loading things...
            </p>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-(--bright-blue) animate-bounce" />
          <span className="h-3 w-3 rounded-full bg-(--dull-blue) animate-bounce [animation-delay:120ms]" />
          <span className="h-3 w-3 rounded-full bg-(--dark-blue) animate-bounce [animation-delay:240ms]" />
        </div>

        <p className="mt-5 text-[clamp(1.05rem,3.2vw,1.35rem)] text-(--dull-grey)">
          getting everything ready for you...
        </p>
      </section>
    </main>
  );
}
