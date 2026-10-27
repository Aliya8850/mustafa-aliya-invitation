"use client";

import { useEffect, useRef } from "react";

/** A soft golden glow that follows the cursor (fine pointers only). */
export default function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let raf = 0;
    function onMove(e: PointerEvent) {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el!.style.setProperty("--mx", `${e.clientX}px`);
        el!.style.setProperty("--my", `${e.clientY}px`);
        el!.style.opacity = "1";
      });
    }
    window.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <div ref={ref} className="spotlight" aria-hidden="true" />;
}
