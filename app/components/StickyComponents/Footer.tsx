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
  { label: "click 4 git", href: "https://github.com/kr1shap" },
  { label: "click 4 linkedln", href: "https://linkedin.com/in/kriishap" },
  { label: "krisha9845@gmail.com", href: "mailto:krisha9845@gmail.com" },
];

export default function Footer() {
  return (
    <footer
      id="site-footer"
      className="w-full px-3 pb-8 pt-6 sm:px-6 md:px-10 lg:px-14 xl:px-16"
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-x-3 pb-5 sm:gap-x-6 sm:pb-6">
        <div className="flex min-w-0 items-center gap-2 sm:gap-4">
          <p className="flex min-w-0 items-center text-[clamp(1.95rem,7vw,3.75rem)] leading-[0.9] text-(--dark-blue)">
            krisha&apos;s
            <br />
            website
          </p>
          <div className="relative aspect-square w-[clamp(4.25rem,13vw,9rem)] shrink-0 items-center md:w-[clamp(8.5rem,20vw,13.3125rem)]">
            <Image
              src="/lumaBlue.png"
              alt="mascot"
              fill
              sizes="(max-width: 640px) 20vw, (max-width: 1024px) 22vw, 213px"
              className="object-contain"
            />
          </div>
        </div>

        <ul className="ml-auto flex min-w-0 flex-col items-end space-y-1 text-[clamp(0.82rem,3.1vw,1.1rem)] leading-[1.05] text-(--dark-blue) md:text-[clamp(1.7rem,5.3vw,2rem)]">
          {FOOTER_LINKS.map((link) => (
            <li key={link?.label}>
              <a
                href={link?.href}
                className="break-all transition-colors duration-200 hover:text-(--bright-blue) sm:break-normal"
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div
        aria-hidden="true"
        className="mt-5 h-0.5 w-full bg-(--dull-blue) sm:mt-6"
      />
    </footer>
  );
}
