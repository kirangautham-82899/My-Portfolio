"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import type { PointerEvent as ReactPointerEvent, ReactNode, RefObject } from "react";
import { useRef } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";

type MagneticButtonProps = ButtonProps & {
  children: ReactNode;
  href?: string;
};

export function MagneticButton({ children, href, ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });

  const handleMove = (event: ReactPointerEvent<HTMLElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) {
      return;
    }
    x.set((event.clientX - rect.left - rect.width / 2) * 0.28);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.28);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  if (href) {
    return (
      <motion.a
        ref={ref as RefObject<HTMLAnchorElement>}
        href={href}
        style={{ x, y }}
        onPointerMove={(event) => handleMove(event)}
        onPointerLeave={reset}
        data-cursor="magnetic"
      >
        <Button asChild {...props}>
          <span>{children}</span>
        </Button>
      </motion.a>
    );
  }

  return (
    <motion.span style={{ x, y }} onPointerMove={(event) => handleMove(event)} onPointerLeave={reset} data-cursor="magnetic">
      <Button ref={ref as RefObject<HTMLButtonElement>} {...props}>
        {children}
      </Button>
    </motion.span>
  );
}
