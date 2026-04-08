import type { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export interface SettingsRowItem {
  icon: LucideIcon;
  label: string;
  type: "chevron" | "toggle";
  value?: boolean;
  onChange?: (val: boolean) => void;
  danger?: boolean;
}

interface Props {
  items: SettingsRowItem[];
  className?: string;
}

export function SettingsGroup({ items, className }: Props) {
  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden",
        className
      )}
    >
      {items.map((item, i) => (
        <div key={item.label}>
          {i > 0 && <Separator className="mx-4" />}
          <div className="flex items-center gap-3 px-4 py-3.5">
            {/* Icon */}
            <div
              className={cn(
                "w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0",
                item.danger
                  ? "bg-red-50 dark:bg-red-900/20"
                  : "bg-gray-100 dark:bg-gray-700"
              )}
            >
              <item.icon
                size={15}
                className={
                  item.danger
                    ? "text-red-500"
                    : "text-gray-500 dark:text-gray-400"
                }
              />
            </div>

            {/* Label */}
            <span
              className={cn(
                "flex-1 text-sm font-medium",
                item.danger
                  ? "text-red-500"
                  : "text-gray-700 dark:text-gray-200"
              )}
            >
              {item.label}
            </span>

            {/* Action */}
            {item.type === "toggle" && item.onChange ? (
              <Switch
                checked={!!item.value}
                onCheckedChange={item.onChange}
              />
            ) : (
              <ChevronRight
                size={16}
                className="text-gray-300 dark:text-gray-600"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
