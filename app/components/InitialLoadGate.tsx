"use client";

import { useEffect, useState } from "react";
import Loading from "@/app/loading";

export default function InitialLoadGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 1000);
    return () => clearTimeout(t);
  }, []);

  if (!ready) {
    return <Loading />;
  }

  return <>{children}</>;
}
