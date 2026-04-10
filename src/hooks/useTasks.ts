import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { Task } from "@/types";
import { useTelegramUser } from "./useTelegramUser";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useTelegramUser();

  const fetchTasks = async () => {
    if (!user?.id) {
      // If after the fallback we STILL have no ID, then we stop.
      setLoading(false);
      return;
    }

    try {
      console.log(`📡 Fetching tasks for Telegram ID: ${user.id}`);
      setLoading(true);

      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", String(user.id))
        .order("id", { ascending: false });

      if (error) throw error;
      setTasks(data || []);
    } catch (err) {
      console.error("💥 Fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Re-run fetch as soon as user.id becomes available
  useEffect(() => {
    fetchTasks();
  }, [user?.id]);

  // ADD TASK (Now with ownership)
  const addTask = async (taskData: any) => {
    if (!user?.id) return;

    const newTask = {
      ...taskData,
      user_id: String(user.id) // 👈 IMPORTANT: Tag the owner
    };

    const { data, error } = await supabase.from("tasks").insert([newTask]).select();
    if (!error && data) setTasks([data[0], ...tasks]);
  };

  // TOGGLE (Added user_id safety)
  const toggleTask = async (id: number) => {
    if (!user?.id) return;

    const task = tasks.find((t) => String(t.id) === String(id));
    if (!task) return;

    const { error } = await supabase
      .from("tasks")
      .update({ completed: !task.completed })
      .eq("id", id)
      .eq("user_id", String(user.id)); // 👈 Safety check

    if (!error) {
      setTasks(prev => prev.map(t => String(t.id) === String(id) ? { ...t, completed: !t.completed } : t));
    }
  };

  // DELETE (Added user_id safety)
  const deleteTask = async (id: number) => {
    if (!user?.id) return;

    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", id)
      .eq("user_id", String(user.id)); // 👈 Safety check

    if (!error) {
      setTasks(prev => prev.filter((t) => String(t.id) !== String(id)));
    }
  };

  return { tasks, loading, addTask, toggleTask, deleteTask };
}