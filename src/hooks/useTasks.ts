import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { Task } from "@/types";
import { useTelegramUser } from "./useTelegramUser";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useTelegramUser();

  const fetchTasks = async () => {
    if (!user?.id) return; // Wait until Telegram gives us the ID
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", String(user.id)) // 👈 The "Lock"
        .order("id", { ascending: false });

      if (!error) setTasks(data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user?.id]); // 👈 Refetch if the user logs in/changes

  const addTask = async (taskData: any) => {
    if (!user?.id) return;
    const newTask = { ...taskData, user_id: String(user.id) }; // 👈 The "Tag"
    const { data, error } = await supabase.from("tasks").insert([newTask]).select();
    if (!error && data) setTasks([data[0], ...tasks]);
  };

  const toggleTask = async (id: number) => {
    if (!user?.id) return;
    const task = tasks.find((t) => String(t.id) === String(id));
    if (!task) return;

    const { error } = await supabase
      .from("tasks")
      .update({ completed: !task.completed })
      .eq("id", id)
      .eq("user_id", String(user.id)); 

    if (!error) {
      setTasks(prev => prev.map(t => String(t.id) === String(id) ? { ...t, completed: !t.completed } : t));
    }
  };

  const deleteTask = async (id: number) => {
    if (!user?.id) return;
    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", id)
      .eq("user_id", String(user.id)); 

    if (!error) {
      setTasks(prev => prev.filter((t) => String(t.id) !== String(id)));
    }
  };

  return { tasks, loading, addTask, toggleTask, deleteTask };
}