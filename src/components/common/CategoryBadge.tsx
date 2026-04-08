import { cn } from "@/lib/utils";
import { CATEGORY_CONFIG } from "@/constants";
import type { Category } from "@/types";

interface Props {
  category: Category;
  className?: string;
}

export function CategoryBadge({ category, className }: Props) {
  const cfg = CATEGORY_CONFIG[category];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold",
        cfg.bg,
        cfg.text,
        className
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", cfg.dot)} />
      {category}
    </span>
  );
}
