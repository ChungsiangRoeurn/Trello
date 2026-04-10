export type Category = "Work" | "Personal" | "Health" | "Learning";

export type Screen = "home" | "stats" | "settings";

export interface CategoryConfig {
  bg: string;
  text: string;
  dot: string;
  barColor: string;
}

export type FilterType = "All" | "Today" | "Completed";

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  date: string;
  time: string;
  category: Category;
  created_at: string;
  updated_at: string;
}
