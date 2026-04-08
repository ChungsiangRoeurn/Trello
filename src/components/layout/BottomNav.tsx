import { LayoutList, BarChart2, Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Screen } from "@/types";

interface NavItem {
  id: Screen;
  icon: typeof LayoutList;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "home", icon: LayoutList, label: "Tasks" },
  { id: "stats", icon: BarChart2, label: "Stats" },
  { id: "settings", icon: Settings2, label: "Settings" },
];

interface Props {
  active: Screen;
  onChange: (screen: Screen) => void;
}

export function BottomNav({ active, onChange }: Props) {
  return (
    <div className="flex-shrink-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700">
      <nav className="flex items-stretch">
        {NAV_ITEMS.map(({ id, icon: Icon, label }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className={cn(
                "relative flex-1 flex flex-col items-center justify-center gap-1 py-3 transition-all duration-150 active:scale-90 focus:outline-none",
                isActive
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-gray-400 dark:text-gray-500"
              )}
              aria-label={label}
            >
              {/* Active pill indicator */}
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-indigo-500 rounded-b-full" />
              )}
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
              <span className={cn("text-[10px]", isActive ? "font-bold" : "font-medium")}>
                {label}
              </span>
            </button>
          );
        })}
      </nav>
      {/* iOS safe-area spacer */}
      <div style={{ height: "env(safe-area-inset-bottom, 0px)" }} />
    </div>
  );
}
