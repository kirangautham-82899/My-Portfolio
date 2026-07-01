"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1250);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center bg-[var(--background)]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="relative grid place-items-center">
        <motion.div
          className="absolute h-36 w-36 rounded-full border border-[var(--line-strong)]"
          animate={{ rotate: 360, scale: [1, 1.08, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute h-24 w-24 rounded-full border border-[var(--primary)] shadow-[0_0_46px_color-mix(in_oklab,var(--primary)_34%,transparent)]"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
        />
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.42em] text-[var(--muted)]">Initializing</p>
          <h1 className="mt-3 text-2xl font-semibold glow-text">Kiran Gautham</h1>
        </div>
      </div>
    </motion.div>
  );
}
