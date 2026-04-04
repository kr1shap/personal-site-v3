"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main
      className="min-h-screen w-full flex items-center justify-center px-6"
      style={{ backgroundColor: "var(--cream)" }}
    >
      <section className="w-full max-w-2xl text-center">
        <p className="text-[clamp(1.5rem,4vw,2.2rem)] text-(--dull-blue)">
          uh oh...
        </p>
        <h1 className="mt-2 text-[clamp(2.4rem,10vw,5.5rem)] leading-[0.95] text-(--dark-blue)">
          something broke
        </h1>
        <p className="mt-3 text-[clamp(1.1rem,3.8vw,1.8rem)] text-(--dull-grey)">
          this page ran into an unexpected error.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center rounded-full border-2 border-(--dark-blue) px-6 py-2 text-[clamp(1rem,3vw,1.4rem)] text-(--dark-blue) transition-colors duration-200 hover:bg-(--dark-blue) hover:text-(--cream)"
          >
            try again
          </button>

          <Link
            href="/"
            className="inline-flex items-center rounded-full border-2 border-(--dull-blue) px-6 py-2 text-[clamp(1rem,3vw,1.4rem)] text-(--dull-blue) transition-colors duration-200 hover:bg-(--dull-blue) hover:text-(--cream)"
          >
            go home
          </Link>
        </div>
      </section>
    </main>
  );
}
