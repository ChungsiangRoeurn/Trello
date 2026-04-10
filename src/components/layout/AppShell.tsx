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

    <div className="fixed inset-0 flex flex-col bg-zinc-950 overflow-hidden">

      <main className="flex-1 overflow-hidden relative">
        {children}
      </main>

      <BottomNav active={screen} onChange={onNavigate} />
    </div>
  );
}