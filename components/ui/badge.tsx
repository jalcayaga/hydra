import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase",
  {
    variants: {
      variant: {
        default: "border-slate-800 bg-slate-900/60 text-slate-200",
        outline: "border-slate-700 text-slate-200",
        secondary: "border-amber-400/40 bg-amber-400/10 text-amber-200",
        destructive: "border-rose-500/60 bg-rose-500/10 text-rose-200",
        success: "border-emerald-500/60 bg-emerald-500/10 text-emerald-200"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
