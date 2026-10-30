"use client";

import { useEffect, useRef } from "react";

/**
 * Thin progress line at the top of the page.
 *
 * Driven by a passive scroll listener + requestAnimationFrame that eases the
 * bar towards the scroll position, writing only a GPU `transform`. That avoids
 * the CSS scroll-timeline feature, which glitches on iOS Safari, and the easing
 * hides the jumpiness of iOS momentum scrolling and its collapsing toolbar.
 */
export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bar.current;
    if (!el) return;

    let target = 0;
    let current = 0;
    let raf = 0;

    function measure() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      target = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    }

    function frame() {
      current += (target - current) * 0.18;
      if (Math.abs(target - current) < 0.0005) current = target;
      el!.style.transform = `scaleX(${current.toFixed(4)})`;
      raf = current === target ? 0 : requestAnimationFrame(frame);
    }

    function onScroll() {
      measure();
      if (!raf) raf = requestAnimationFrame(frame);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={bar} className="progress" aria-hidden="true" />;
}
