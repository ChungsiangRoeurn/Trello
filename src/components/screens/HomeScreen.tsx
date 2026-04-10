import { Plus, ClipboardList, Loader2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { TaskItem } from "@/components/common/TaskItem";
import { EmptyState } from "@/components/common/EmptyState";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { formatDisplayDate, pct } from "@/lib/utils";
import { TODAY } from "@/constants";
import { useTelegramUser } from "@/hooks/useTelegramUser";
import type { Task } from "@/types";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface Props {
  tasks: Task[];
  onToggle: (id: number) => void | Promise<void>;
  onDelete: (id: number) => void | Promise<void>;
  onAddClick: () => void;
  isLoading: boolean;
}

export function HomeScreen({
  tasks = [], // Defensive default
  onToggle,
  onDelete,
  onAddClick,
  isLoading,
}: Props) {
  const user = useTelegramUser();

  // 1. Defensively handle data to prevent filter() crashes
  const safeTasks = Array.isArray(tasks) ? tasks : [];
  
  // 2. Data Filtering
  const todayTasks = safeTasks.filter((t) => t && t.date === TODAY);
  const todayDone = todayTasks.filter((t) => t?.completed).length;
  const progressValue = todayTasks.length > 0 ? pct(todayDone, todayTasks.length) : 0;

  const allCount = safeTasks.length;
  const todayCount = todayTasks.length;
  const completedCount = safeTasks.filter((t) => t?.completed).length;

  // 3. Loading State - Center a spinner
  if (isLoading && safeTasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        <p className="text-xs text-gray-400 font-medium">Fetching your tasks...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-zinc-950">
      {/* ── Header Section ── */}
      <div className="px-5 pt-6 pb-4 flex-shrink-0">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-[11px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider">
              {formatDisplayDate(TODAY)}
            </p>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
              Hi, {user?.name || "there"} 👋
            </h1>
          </div>
          <Avatar className="h-11 w-11 border-2 border-white dark:border-zinc-800 shadow-sm">
            <AvatarFallback className="bg-indigo-100 text-indigo-700 font-bold">
              {user?.initials || "U"}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Progress Card */}
        {todayTasks.length > 0 && (
          <div className="bg-indigo-600 rounded-3xl p-5 text-white shadow-lg shadow-indigo-200 dark:shadow-none transition-all">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-indigo-100 font-medium opacity-80">Daily Progress</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-black">{todayDone}</span>
                  <span className="text-indigo-200 text-sm font-bold">/{todayTasks.length} tasks</span>
                </div>
              </div>
              <div className="w-14 h-14">
                <CircularProgressbar
                  value={progressValue}
                  text={`${progressValue}%`}
                  styles={buildStyles({
                    textSize: "26px",
                    pathColor: "#ffffff",
                    trailColor: "rgba(255,255,255,0.2)",
                    textColor: "#ffffff",
                    pathTransitionDuration: 0.5,
                  })}
                />
              </div>
            </div>
            <Progress value={progressValue} className="h-2 bg-white/20 [&>div]:bg-white" />
          </div>
        )}
      </div>

      {/* ── Tabs & Content ── */}
      <div className="px-5 flex-1 min-h-0 flex flex-col">
        <Tabs defaultValue="All" className="flex-1 flex flex-col">
          <TabsList className="bg-gray-200/50 dark:bg-zinc-900 p-1 rounded-xl">
            <TabsTrigger value="All" className="rounded-lg text-xs font-bold">All {allCount}</TabsTrigger>
            <TabsTrigger value="Today" className="rounded-lg text-xs font-bold">Today {todayCount}</TabsTrigger>
            <TabsTrigger value="Completed" className="rounded-lg text-xs font-bold">Done {completedCount}</TabsTrigger>
          </TabsList>

          {(["All", "Today", "Completed"] as const).map((tab) => {
            const filtered = tab === "All" 
              ? safeTasks 
              : tab === "Today" 
                ? todayTasks 
                : safeTasks.filter(t => t?.completed);

            return (
              <TabsContent key={tab} value={tab} className="flex-1 mt-0 outline-none">
                <div className="h-[calc(100vh-340px)] overflow-y-auto space-y-3 pt-4 pb-32">
                  {filtered.length === 0 ? (
                    <EmptyState
                      icon={ClipboardList}
                      title={tab === "Completed" ? "No finished tasks" : "List is empty"}
                      description="Click the button below to add your first task."
                    />
                  ) : (
                    filtered.map((task) => (
                      <TaskItem
                        key={task.id?.toString()}
                        task={task}
                        onToggle={onToggle}
                        onDelete={onDelete}
                      />
                    ))
                  )}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>

      {/* ── Action Button ── */}
      <button
        onClick={onAddClick}
        className={cn(
          "fixed bottom-24 right-6 w-14 h-14 z-50",
          "bg-indigo-600 hover:bg-indigo-700 rounded-2xl shadow-xl shadow-indigo-300 dark:shadow-none",
          "flex items-center justify-center text-white transition-all",
          "active:scale-90 active:rotate-45"
        )}
      >
        <Plus size={32} strokeWidth={3} />
      </button>
    </div>
  );
}