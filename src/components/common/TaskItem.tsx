import { useState, useCallback } from "react";
import { CheckCircle2, Circle, Clock, Trash2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { CategoryBadge } from "@/components/common/CategoryBadge";
import type { Task } from "@/types";
import { toast } from "sonner";

interface Props {
  task: Task;
  onToggle: (id: number) => Promise<void> | void;
  onDelete: (id: number) => Promise<void> | void;
}

export function TaskItem({ task, onToggle, onDelete }: Props) {
  const [pressed, setPressed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleToggle = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      if (loading) return;

      try {
        await onToggle(task.id);
      } catch (err) {
        console.error("Toggle failed:", err);
      }
    },
    [task.id, onToggle, loading],
  );

  const handleDelete = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();

      if (loading) return;

      const confirmed = window.confirm(
        "Are you sure you want to delete this task?",
      );
      if (!confirmed) return;

      try {
        setLoading(true);
        await onDelete(task.id);

        toast.success("Task deleted successfully");
      } catch (err) {
        toast.error("Failed to delete task");
      } finally {
        setLoading(false);
      }
    },
    [task.id, onDelete, loading],
  );

  return (
    <div
      className={cn(
        "group flex items-start gap-3 rounded-2xl p-4",
        "bg-white dark:bg-gray-800",
        "border border-gray-100 dark:border-gray-700",
        "shadow-sm transition-all duration-150",
        "hover:shadow-md",
        task.completed && "opacity-60",
        pressed && "scale-[0.98]",
      )}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerCancel={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
    >
      <button
        onClick={handleToggle}
        disabled={loading}
        className={cn(
          "mt-0.5 flex-shrink-0 transition-transform",
          "active:scale-90 focus:outline-none",
          loading && "opacity-50 cursor-not-allowed",
        )}
        aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
      >
        {task.completed ? (
          <CheckCircle2 size={22} className="text-indigo-500" />
        ) : (
          <Circle
            size={22}
            className="text-gray-300 hover:text-indigo-400 transition-colors"
          />
        )}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "text-sm font-medium truncate",
            "text-gray-800 dark:text-white",
            task.completed && "line-through text-gray-400 dark:text-gray-500",
          )}
        >
          {task.title}
        </p>

        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
          {task.time && (
            <span className="flex items-center gap-1 text-[11px] text-gray-400">
              <Clock size={10} />
              {task.time}
            </span>
          )}

          <CategoryBadge category={task.category || "Others"} />
        </div>
      </div>

      {/* Delete */}
      <button
        onClick={handleDelete}
        disabled={loading}
        className={cn(
          "flex-shrink-0 p-1.5 rounded-lg transition-all",
          "hover:bg-red-50 dark:hover:bg-red-900/20",
          "active:scale-90 focus:outline-none",
          loading && "opacity-50 cursor-not-allowed",
        )}
        aria-label="Delete task"
      >
        {loading ? (
          <Loader2 size={16} className="text-red-400 animate-spin" />
        ) : (
          <Trash2 size={16} className="text-red-400" />
        )}
      </button>
    </div>
  );
}
