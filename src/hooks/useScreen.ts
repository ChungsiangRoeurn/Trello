import { useState } from "react";
import type { Screen } from "@/types";

export function useScreen(initial: Screen = "home") {
  const [screen, setScreen] = useState<Screen>(initial);
  return { screen, setScreen };
}
