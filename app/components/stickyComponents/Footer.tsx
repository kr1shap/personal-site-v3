/**
 * Footer
 * ------
 * Site footer with quick contact links and mascot. Kept intentionally
 * compact and responsive — used at the bottom of the main page.
 *
 * No external dependencies; purely presentational.
 */

import Image from "next/image";

const FOOTER_LINKS = [
  { label: "github", href: "https://github.com/kr1shap" },
  { label: "linkedin", href: "www.linkedin.com/in/kriishap" },
  { label: "krisha9845@gmail.com", href: "mailto:krisha9845@gmail.com" },
];

export default function Footer() {
  return (
    <footer
      id="site-footer"
      className="w-full px-3 pb-8 pt-6 sm:px-6 md:px-10 lg:px-14 xl:px-16"
    >
      <div className="mx-auto w-full max-w-7xl border-b-2 border-(--dull-blue) pb-5 sm:pb-6">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-5">
          <div className="flex items-center gap-3 sm:gap-4 ">
            <p className="text-[clamp(2.25rem,8vw,3.75rem)] leading-[0.9] flex items-center text-(--dark-blue)">
              krisha&apos;s
              <br />
              website
            </p>
            <div className="relative w-[clamp(5.5rem,16vw,9rem)] md:w-[clamp(8.5rem,20vw,13.3125rem)] aspect-square shrink-0 flex items-center">
              <Image
                src="/lumaBlue.png"
                alt="mascot"
                fill
                sizes="(max-width: 640px) 20vw, (max-width: 1024px) 22vw, 213px"
                className="object-contain"
              />
            </div>
          </div>

          <ul className="ml-auto flex flex-col items-end text-[clamp(1rem,3.6vw,1.1rem)] md:text-[clamp(1.7rem,5.3vw,2.0rem)] leading-[1.05] mt-0 space-y-1 text-(--dark-blue)">
            {FOOTER_LINKS.map((link) => (
              <li key={link?.label}>
                <a
                  href={link?.href}
                  className="hover:text-(--bright-blue) transition-colors duration-200"
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
