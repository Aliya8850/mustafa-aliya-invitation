"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Tilts its children in 3D towards the pointer (fine pointers only, and not
 * when the user prefers reduced motion). Driven by CSS variables so it never
 * re-renders; `--gx`/`--gy` also feed an optional glare layer.
 */
export default function Tilt({
  children,
  className = "",
  max = 8,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || calm) return;

    function move(e: PointerEvent) {
      const r = el!.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el!.style.setProperty("--rx", `${(-y * max).toFixed(2)}deg`);
      el!.style.setProperty("--ry", `${(x * max).toFixed(2)}deg`);
      el!.style.setProperty("--gx", `${((x + 0.5) * 100).toFixed(1)}%`);
      el!.style.setProperty("--gy", `${((y + 0.5) * 100).toFixed(1)}%`);
      el!.dataset.tilting = "1";
    }
    function leave() {
      el!.style.setProperty("--rx", "0deg");
      el!.style.setProperty("--ry", "0deg");
      delete el!.dataset.tilting;
    }

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [max]);

  return (
    <div ref={ref} className={`tilt ${className}`}>
      {children}
    </div>
  );
}
