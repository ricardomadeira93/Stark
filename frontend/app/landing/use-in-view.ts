"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reports once when an element scrolls into view.
 *
 * Content is only hidden ("armed") after hydration and only when the element is
 * still below the fold, so the server-rendered page is never blank, and anything
 * already on screen appears at once instead of flashing. With reduced motion the
 * element counts as seen immediately.
 */
export function useInView<T extends Element>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [armed, setArmed] = useState(false);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }

    if (el.getBoundingClientRect().top < window.innerHeight * 0.85) {
      setSeen(true);
      return;
    }

    setArmed(true);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, seen, pending: armed && !seen };
}
