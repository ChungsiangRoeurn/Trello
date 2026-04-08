import { useState, useEffect } from "react";
import { ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  onDone: () => void;
}

type Phase = "enter" | "visible" | "exit";

export function SplashScreen({ onDone }: Props) {
  const [phase, setPhase] = useState<Phase>("enter");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("visible"), 100);
    const t2 = setTimeout(() => setPhase("exit"), 2300);
    const t3 = setTimeout(() => onDone(), 2800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onDone]);

  return (
    <div
      className={cn(
        "absolute inset-0 z-50 flex flex-col items-center justify-center bg-indigo-600",
        "transition-opacity duration-500",
        phase === "enter" && "opacity-0",
        phase === "visible" && "opacity-100",
        phase === "exit" && "opacity-0"
      )}
    >
      {/* Logo + wordmark */}
      <div
        className={cn(
          "flex flex-col items-center gap-5 transition-all duration-500",
          phase === "enter" && "scale-90 translate-y-3",
          phase === "visible" && "scale-100 translate-y-0",
          phase === "exit" && "scale-110 -translate-y-2"
        )}
      >
        <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center ring-4 ring-white/10">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
            <ClipboardList size={32} className="text-indigo-600" />
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-black text-white tracking-tight">Taskly</h1>
          <p className="text-indigo-200 text-sm mt-1 font-medium">
            Stay focused. Get things done.
          </p>
        </div>
      </div>

      {/* Loading dots */}
      <div
        className={cn(
          "absolute bottom-14 flex flex-col items-center gap-3",
          "transition-opacity duration-300",
          phase === "visible" ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce"
              style={{ animationDelay: `${i * 0.18}s`, animationDuration: "0.8s" }}
            />
          ))}
        </div>
        <p className="text-indigo-300 text-xs font-medium">Loading your workspace…</p>
      </div>
    </div>
  );
}
