import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex h-11 items-center justify-center gap-2 rounded-[var(--radius)] border border-transparent px-5 text-sm font-semibold transition outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--foreground)] text-[var(--background)] shadow-[0_0_28px_color-mix(in_oklab,var(--primary)_28%,transparent)] hover:scale-[1.02]",
        secondary:
          "border-[var(--line)] bg-[var(--panel)] text-[var(--foreground)] backdrop-blur-xl hover:border-[var(--line-strong)] hover:bg-[var(--panel-strong)]",
        ghost: "text-[var(--foreground)] hover:bg-[color-mix(in_oklab,var(--foreground)_8%,transparent)]",
        neon:
          "border-[color-mix(in_oklab,var(--primary)_45%,transparent)] bg-[color-mix(in_oklab,var(--primary)_14%,transparent)] text-[var(--foreground)] shadow-[0_0_34px_color-mix(in_oklab,var(--primary)_22%,transparent)] hover:bg-[color-mix(in_oklab,var(--primary)_20%,transparent)]",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-3 text-xs",
        lg: "h-12 px-6",
        icon: "h-10 w-10 px-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
