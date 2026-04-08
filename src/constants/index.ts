import type { Category, CategoryConfig } from "@/types";

export const TODAY = "2026-04-08";

export const USER = {
  name: "Chungsiang",
  initials: "CS",
  email: "chungsiang@trello.app",
};

export const CATEGORY_CONFIG: Record<Category, CategoryConfig> = {
  Work: {
    bg: "bg-sky-100 dark:bg-sky-900/40",
    text: "text-sky-700 dark:text-sky-300",
    dot: "bg-sky-500",
    barColor: "bg-sky-500",
  },
  Personal: {
    bg: "bg-violet-100 dark:bg-violet-900/40",
    text: "text-violet-700 dark:text-violet-300",
    dot: "bg-violet-500",
    barColor: "bg-violet-500",
  },
  Health: {
    bg: "bg-emerald-100 dark:bg-emerald-900/40",
    text: "text-emerald-700 dark:text-emerald-300",
    dot: "bg-emerald-500",
    barColor: "bg-emerald-500",
  },
  Learning: {
    bg: "bg-amber-100 dark:bg-amber-900/40",
    text: "text-amber-700 dark:text-amber-300",
    dot: "bg-amber-500",
    barColor: "bg-amber-500",
  },
};

export const CATEGORIES: Category[] = ["Work", "Personal", "Health", "Learning"];
