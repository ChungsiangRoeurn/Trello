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
        "bg-zinc-900 rounded-2xl border border-zinc-800 shadow-sm overflow-hidden",
        className
      )}
    >
      {items.map((item, i) => (
        <div key={item.label}>
          {i > 0 && <Separator className="mx-4 bg-zinc-800" />}
          <div className="flex items-center gap-3 px-4 py-3.5 active:bg-zinc-800/50 transition-colors">
            {/* Icon Container */}
            <div
              className={cn(
                "w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0",
                item.danger
                  ? "bg-red-900/20"
                  : "bg-zinc-800" // Permanent dark background
              )}
            >
              <item.icon
                size={16}
                className={
                  item.danger
                    ? "text-red-500"
                    : "text-zinc-400" // Soft silver/gray for icons
                }
              />
            </div>

            {/* Label */}
            <span
              className={cn(
                "flex-1 text-sm font-semibold tracking-tight",
                item.danger
                  ? "text-red-500"
                  : "text-zinc-200" // Off-white for readability
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
                className="text-zinc-600"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}