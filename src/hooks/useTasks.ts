import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useTelegramUser } from "@/hooks/useTelegramUser";
import type { Task, Category } from "@/types";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useTelegramUser();

  // Fetch all tasks for the current user
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: false });

      if (error) throw error; // Jump to catch block
      setTasks(data || []);
    } catch (error) {
      console.error("Fetch failed:", error);
    } finally {
      // This runs whether the request succeeded OR failed
      setLoading(false);
    }
  };

  // This handles the object sent by AddTaskSheet's onSave
  const addTask = async (taskData: {
    title: string;
    date: string;
    time: string;
    category: Category;
  }) => {
    const { data, error } = await supabase
      .from("tasks")
      .insert([
        {
          ...taskData,
          completed: false,
          user_id: user.id, // Critical for multi-user apps
        },
      ])
      .select();

    if (!error && data) {
      // Add the new task to the top of the list locally
      setTasks((prev) => [data[0], ...prev]);
    }
  };

  const toggleTask = async (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const { error } = await supabase
      .from("tasks")
      .update({ completed: !task.completed })
      .eq("id", id);

    if (!error) {
      setTasks(
        tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
      );
    }
  };

  const deleteTask = async (id: number) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (!error) {
      setTasks(tasks.filter((t) => t.id !== id));
    }
  };

  useEffect(() => {
    if (user.id) fetchTasks();
  }, [user.id]);

  return { tasks, loading, addTask, toggleTask, deleteTask };
}
