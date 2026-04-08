import type { ReactNode } from "react";
import { BottomNav } from "@/components/layout/BottomNav";
import type { Screen } from "@/types";

interface Props {
  screen: Screen;
  onNavigate: (screen: Screen) => void;
  children: ReactNode;
}

export function AppShell({ screen, onNavigate, children }: Props) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 dark:bg-gray-950 p-0">
      <div className="relative w-full max-w-sm h-screen flex flex-col bg-gray-50 dark:bg-gray-900 shadow-2xl overflow-hidden">
        {/* Scrollable screen area */}
        <main className="flex-1 overflow-hidden relative">
          {children}
        </main>
        <BottomNav active={screen} onChange={onNavigate} />
      </div>
    </div>
  );
}
