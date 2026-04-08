import { useState } from "react";
import { CheckCircle2, Circle, Clock, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { CategoryBadge } from "@/components/common/CategoryBadge";
import type { Task } from "@/types";

interface Props {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export function TaskItem({ task, onToggle, onDelete }: Props) {
  const [pressed, setPressed] = useState(false);

  return (
    <div
      className={cn(
        "group flex items-start gap-3 bg-white dark:bg-gray-800 rounded-2xl p-4",
        "border border-gray-100 dark:border-gray-700 shadow-sm",
        "transition-all duration-150",
        task.completed && "opacity-55",
        pressed && "scale-[0.98]"
      )}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(task.id)}
        className="mt-0.5 flex-shrink-0 transition-transform active:scale-90 focus:outline-none"
        aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
      >
        {task.completed ? (
          <CheckCircle2 size={22} className="text-indigo-500" />
        ) : (
          <Circle
            size={22}
            className="text-gray-300 dark:text-gray-600 hover:text-indigo-400 transition-colors"
          />
        )}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "text-sm font-medium text-gray-800 dark:text-white truncate",
            task.completed && "line-through text-gray-400 dark:text-gray-500"
          )}
        >
          {task.title}
        </p>
        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
          {task.time && (
            <span className="flex items-center gap-1 text-[11px] text-gray-400 dark:text-gray-500">
              <Clock size={10} />
              {task.time}
            </span>
          )}
          <CategoryBadge category={task.category} />
        </div>
      </div>

      {/* Delete button — visible on hover */}
      <button
        onClick={() => onDelete(task.id)}
        className={cn(
          "flex-shrink-0 p-1.5 rounded-lg transition-all duration-150 focus:outline-none",
          "opacity-0 group-hover:opacity-100",
          "hover:bg-red-50 dark:hover:bg-red-900/20",
          "active:scale-90"
        )}
        aria-label="Delete task"
      >
        <Trash2 size={14} className="text-red-400" />
      </button>
    </div>
  );
}
