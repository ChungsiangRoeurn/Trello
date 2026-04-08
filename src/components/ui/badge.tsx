// badge.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300",
        secondary: "border-transparent bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400",
        destructive: "border-transparent bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
        outline: "border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
