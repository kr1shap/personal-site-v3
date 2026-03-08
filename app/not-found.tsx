import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className="min-h-screen w-full flex items-center justify-center px-6"
      style={{ backgroundColor: "var(--cream)" }}
    >
      <section className="w-full max-w-2xl text-center">
        <p className="text-[clamp(1.5rem,4vw,2.2rem)] text-(--dull-blue)">
          oopsie...
        </p>
        <h1 className="mt-2 text-[clamp(3rem,12vw,6.5rem)] leading-[0.9] text-(--dark-blue)">
          404
        </h1>
        <p className="mt-3 text-[clamp(1.2rem,4vw,2rem)] text-(--dull-grey)">
          this page doesn&apos;t exist.
        </p>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center rounded-full border-2 border-(--dark-blue) px-6 py-2 text-[clamp(1.1rem,3.2vw,1.5rem)] text-(--dark-blue) transition-colors duration-200 hover:bg-(--dark-blue) hover:text-(--cream)"
          >
            take me home
          </Link>
        </div>
      </section>
    </main>
  );
}
