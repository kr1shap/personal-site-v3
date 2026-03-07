"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "about", href: "#about", top: "14%", left: "10%" },
  { label: "skills", href: "#skills", top: "22%", right: "12%" },
  { label: "projects", href: "#projects", top: "30%", left: "40%" },
  { label: "experience", href: "#experience", top: "38%", left: "6%" },
  { label: "contact", href: "#contact", top: "46%", right: "14%" },
];

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-8 transition-colors duration-300" +
          (scrolled
            ? " bg-linear-to-b from-[rgba(20,30,60,0.38)] to-transparent backdrop-blur-sm"
            : "")
        }
      >
        {/* Logo */}
        <a
          href="#home"
          className="flex items-center gap-2.5 sm:gap-3 select-none"
        >
          <div className="relative w-11 h-11 sm:w-12.5 sm:h-12.5 rounded-full overflow-hidden shrink-0">
            <Image
              src="/lumaBlue.png"
              alt="logo"
              fill
              sizes="50px"
              className="object-cover"
            />
          </div>
          <span
            className="text-[1.75rem] sm:text-[2rem] leading-none"
            style={{ color: "var(--dull-blue)" }}
          >
            kp
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-8 xl:gap-12">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-[1.65rem] xl:text-[2rem] text-(--dull-blue) hover:text-(--dark-blue) transition-colors duration-200"
                style={{ textShadow: "0 2px 8px rgba(69,99,149,0.15)" }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="lg:hidden flex flex-col gap-1.5 p-2 -mr-1"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="block h-0.75 w-7 rounded-full origin-center"
              style={{ backgroundColor: "var(--dull-blue)" }}
              animate={
                mobileOpen
                  ? i === 1
                    ? { opacity: 0, scaleX: 0 }
                    : { rotate: i === 0 ? 45 : -45, y: i === 0 ? 9 : -9 }
                  : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }
              }
              transition={{ duration: 0.22, ease: "easeInOut" }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile full-screen scattered menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="nav-backdrop"
              className="fixed inset-0 z-40 lg:hidden backdrop-blur-sm"
              style={{ backgroundColor: "rgba(14, 27, 46, 0.82)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setMobileOpen(false)}
            />

            {NAV_LINKS.map((link, i) => {
              const { label, href, top, ...pos } = link;
              return (
                <motion.a
                  key={label}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="fixed z-50 lg:hidden text-[2.25rem] text-(--cream)"
                  style={{
                    top,
                    ...("left" in pos
                      ? { left: pos.left }
                      : { right: pos.right }),
                    textShadow:
                      "0 0 10px rgba(69,99,149,0.6), 0 0 22px rgba(69,99,149,0.4), 0 2px 10px rgba(0,0,0,0.32)",
                  }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{
                    delay: i * 0.07,
                    type: "spring",
                    stiffness: 340,
                    damping: 28,
                  }}
                  whileHover={{
                    scale: 1.06,
                    textShadow:
                      "0 0 12px rgba(20,91,210,0.82), 0 0 26px rgba(20,91,210,0.6), 0 2px 10px rgba(0,0,0,0.34)",
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  {label}
                </motion.a>
              );
            })}
          </>
        )}
      </AnimatePresence>
    </>
  );
}
