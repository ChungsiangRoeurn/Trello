import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { Task } from "@/types";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      console.log("🚀 STARTING FETCH...");
      setLoading(true);

      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: false });

      if (error) {
        console.error("❌ SUPABASE ERROR:", error.message);
      } else {
        console.log("✅ DATA RECEIVED:", data);
        setTasks(data || []);
      }
    } catch (err) {
      console.error("💥 SCRIPT CRASHED:", err);
    } finally {
      console.log("🏁 LOADING SET TO FALSE");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []); // Run once on load

  // ADD TASK
  const addTask = async (taskData: any) => {
    const { data, error } = await supabase.from("tasks").insert([taskData]).select();
    if (!error && data) setTasks([data[0], ...tasks]);
  };

  // TOGGLE
  const toggleTask = async (id: number) => {
    const task = tasks.find((t) => String(t.id) === String(id));
    if (!task) return;
    const { error } = await supabase.from("tasks").update({ completed: !task.completed }).eq("id", id);
    if (!error) setTasks(tasks.map(t => String(t.id) === String(id) ? { ...t, completed: !t.completed } : t));
  };

  // DELETE
  const deleteTask = async (id: number) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (!error) setTasks(tasks.filter((t) => String(t.id) !== String(id)));
  };

  return { tasks, loading, addTask, toggleTask, deleteTask };
}