import { useState, useCallback } from "react";
import type { Task, Category } from "@/types";
import { INITIAL_TASKS, } from "@/data/tasks";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  const toggleTask = useCallback((id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }, []);

  const deleteTask = useCallback((id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addTask = useCallback(
    (data: { title: string; date: string; time: string; category: Category }) => {
      const newTask: Task = {
        id: Date.now(),
        title: data.title.trim(),
        date: data.date,
        time: data.time,
        category: data.category,
        completed: false,
      };
      setTasks((prev) => [newTask, ...prev]);
    },
    []
  );

  return { tasks, toggleTask, deleteTask, addTask };
}
