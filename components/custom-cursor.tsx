"use client";

import { animate } from "motion";
import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;

    if (!dot || !ring || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const move = (event: PointerEvent) => {
      dot.style.transform = `translate3d(${event.clientX - 4}px, ${event.clientY - 4}px, 0)`;
      ring.style.transform = `translate3d(${event.clientX - 18}px, ${event.clientY - 18}px, 0)`;
    };

    const hover = (event: PointerEvent) => {
      const target = event.target as HTMLElement;
      const isInteractive = Boolean(target.closest("a, button, input, textarea, [data-cursor='magnetic']"));
      animate(ring, { scale: isInteractive ? 1.75 : 1, opacity: isInteractive ? 0.75 : 0.42 }, { duration: 0.2 });
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", hover);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", hover);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-9 w-9 rounded-full border border-[var(--primary)] opacity-40 mix-blend-screen md:block"
        aria-hidden
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[91] hidden h-2 w-2 rounded-full bg-[var(--primary)] shadow-[0_0_18px_var(--primary)] md:block"
        aria-hidden
      />
    </>
  );
}
