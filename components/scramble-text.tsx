"use client";

import { useEffect, useMemo, useState } from "react";

const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>[]{}";

export function ScrambleText({ text, className }: { text: string; className?: string }) {
  const [output, setOutput] = useState(text);
  const chars = useMemo(() => text.split(""), [text]);

  useEffect(() => {
    let frame = 0;
    const total = 46;
    const interval = window.setInterval(() => {
      frame += 1;
      setOutput(
        chars
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < (frame / total) * chars.length) return char;
            return glyphs[Math.floor(Math.random() * glyphs.length)];
          })
          .join(""),
      );

      if (frame >= total) {
        window.clearInterval(interval);
        setOutput(text);
      }
    }, 28);

    return () => window.clearInterval(interval);
  }, [chars, text]);

  return <span className={className}>{output}</span>;
}
