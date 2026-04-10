import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Props {
  onDone: () => void;
}

type Phase = "enter" | "visible" | "exit";

export function SplashScreen({ onDone }: Props) {
  const [phase, setPhase] = useState<Phase>("enter");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("visible"), 100);
    const t2 = setTimeout(() => setPhase("exit"), 2500);
    const t3 = setTimeout(() => onDone(), 3000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onDone]);

  return (
    <div
      className={cn(
        "absolute inset-0 z-50 flex flex-col items-center justify-center",
        "bg-gradient-to-br from-gray-950 via-gray-900 to-black",
        "transition-opacity duration-700",
        phase === "enter" && "opacity-0",
        phase === "visible" && "opacity-100",
        phase === "exit" && "opacity-0"
      )}
    >
      {/* Glow background */}
      <div className="absolute w-40 h-40 bg-indigo-500/20 blur-3xl rounded-full" />

      {/* Logo + text */}
      <div
        className={cn(
          "relative flex flex-col items-center gap-6 transition-all duration-700",
          phase === "enter" && "scale-90 translate-y-4",
          phase === "visible" && "scale-100 translate-y-0",
          phase === "exit" && "scale-110 -translate-y-2"
        )}
      >
        {/* Logo container */}
        <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-2xl p-3 ring-1 ring-black/5">
          <img
            src="/logo/trello-img.png"
            alt="logo"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Text */}
        <div className="text-center">
          <h1 className="text-4xl font-black text-white tracking-tight">
            Trello
          </h1>
          <p className="text-indigo-300 text-sm mt-1 font-medium">
            Stay focused. Get things done.
          </p>
        </div>
      </div>

      {/* Loading dots */}
      <div
        className={cn(
          "absolute bottom-16 flex flex-col items-center gap-3",
          "transition-opacity duration-500",
          phase === "visible" ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full bg-white animate-bounce"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: "0.9s",
              }}
            />
          ))}
        </div>
        <p className="text-indigo-400 text-xs font-medium">
          Loading your workspace…
        </p>
      </div>
    </div>
  );
}