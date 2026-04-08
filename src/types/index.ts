export type Category = "Work" | "Personal" | "Health" | "Learning";

export type Screen = "home" | "stats" | "settings";

export interface Task {
  id: number;
  title: string;
  time: string;
  date: string;
  completed: boolean;
  category: Category;
}

export interface CategoryConfig {
  bg: string;
  text: string;
  dot: string;
  barColor: string;
}

export type FilterType = "All" | "Today" | "Completed";
