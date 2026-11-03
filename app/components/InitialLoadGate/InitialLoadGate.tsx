"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Loading from "@/app/(home)/loading";

export default function InitialLoadGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <div
        inert={!ready}
        className={`transition-opacity duration-300 motion-reduce:transition-none ${ready ? "opacity-100" : "opacity-0"}`}
      >
        {children}
      </div>
      <AnimatePresence initial={false}>
        {!ready && (
          <motion.div
            key="initial-loading"
            className="fixed inset-0 z-200 overflow-y-auto bg-(--cream)"
            role="status"
            aria-label="Loading the site"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -12 }}
            transition={{
              duration: reduceMotion ? 0 : 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Loading />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
