import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  icon: LucideIcon;
  title: string;
  description?: string;
  className?: string;
}

export function EmptyState({ icon: Icon, title, description, className }: Props) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 text-center px-6", className)}>
      <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl flex items-center justify-center mb-4">
        <Icon size={28} className="text-indigo-300 dark:text-indigo-600" />
      </div>
      <p className="text-sm font-semibold text-gray-400 dark:text-gray-500">{title}</p>
      {description && (
        <p className="text-xs text-gray-300 dark:text-gray-600 mt-1">{description}</p>
      )}
    </div>
  );
}
