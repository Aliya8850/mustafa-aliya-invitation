"use client";

import { useEffect, useRef } from "react";

const COUNT = 12;

/** Little burst of green sparkles wherever the guest taps or clicks. */
export default function ClickBurst() {
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = layer.current;
    if (!host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function burst(e: PointerEvent) {
      for (let i = 0; i < COUNT; i++) {
        const angle = (Math.PI * 2 * i) / COUNT + Math.random() * 0.5;
        const dist = 38 + Math.random() * 44;
        const p = document.createElement("span");
        p.className = i % 3 === 0 ? "burst burst-diamond" : "burst";
        p.style.left = `${e.clientX}px`;
        p.style.top = `${e.clientY}px`;
        p.style.setProperty("--dx", `${(Math.cos(angle) * dist).toFixed(1)}px`);
        p.style.setProperty("--dy", `${(Math.sin(angle) * dist).toFixed(1)}px`);
        p.style.setProperty("--s", `${(0.6 + Math.random() * 0.9).toFixed(2)}`);
        p.addEventListener("animationend", () => p.remove(), { once: true });
        host!.appendChild(p);
      }
    }

    window.addEventListener("pointerdown", burst);
    return () => window.removeEventListener("pointerdown", burst);
  }, []);

  return <div ref={layer} className="burst-layer" aria-hidden="true" />;
}
