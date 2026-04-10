import { Plus, ClipboardList } from "lucide-react";
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
  tasks,
  onToggle,
  onDelete,
  onAddClick,
  isLoading,
}: Props) {
  const todayTasks = tasks.filter((t) => t.date === TODAY);
  const todayDone = todayTasks.filter((t) => t.completed).length;
  const progressValue = pct(todayDone, todayTasks.length);

  const allCount = tasks.length;
  const todayCount = todayTasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;

  const user = useTelegramUser();

  if (isLoading && tasks.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* ── Header ── */}
      <div className="px-5 pt-5 pb-4 flex-shrink-0">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">
              {formatDisplayDate(TODAY)}
            </p>
            <h1 className="text-2xl font-black text-gray-800 dark:text-white mt-0.5 tracking-tight">
              Hi, {user.name} 👋
            </h1>
          </div>
          <Avatar className="w-10 h-10 ring-2 ring-indigo-200 dark:ring-indigo-700">
            <AvatarFallback>{user.initials}</AvatarFallback>
          </Avatar>
        </div>

        {/* Progress card */}
        {/* Progress card */}
        {todayTasks.length > 0 && (
          <div className="bg-indigo-600 rounded-2xl p-4 text-white">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs text-indigo-200 font-medium">
                  Today's Progress
                </p>
                <p className="text-xl font-black mt-0.5">
                  {todayDone}
                  <span className="text-indigo-300 font-semibold text-base">
                    /{todayTasks.length} tasks
                  </span>
                </p>
              </div>

              {/* Mini circle using react-circular-progressbar */}
              <div className="w-12 h-12">
                <CircularProgressbar
                  value={progressValue}
                  text={`${progressValue}%`}
                  styles={buildStyles({
                    textSize: "24px",
                    pathColor: "white",
                    trailColor: "rgba(255,255,255,0.25)",
                    textColor: "white",
                  })}
                />
              </div>
            </div>

            <Progress
              value={progressValue}
              className="h-1.5 bg-white/25 [&>div]:bg-white"
            />
          </div>
        )}
      </div>

      {/* ── Tabs ── */}
      <div className="px-5 mb-3 flex-shrink-0">
        <Tabs defaultValue="All">
          <TabsList>
            <TabsTrigger value="All">All ({allCount})</TabsTrigger>
            <TabsTrigger value="Today">Today ({todayCount})</TabsTrigger>
            <TabsTrigger value="Completed">Done ({completedCount})</TabsTrigger>
          </TabsList>

          {/* ── Task Lists ── */}
          {(["All", "Today", "Completed"] as const).map((tab) => {
            const filtered =
              tab === "All"
                ? tasks
                : tab === "Today"
                  ? todayTasks
                  : tasks.filter((t) => t.completed);

            return (
              <TabsContent key={tab} value={tab}>
                <div
                  className={cn(
                    "overflow-y-auto space-y-2.5 pt-3",
                    "max-h-[calc(100vh-370px)]",
                    "pb-24",
                  )}
                >
                  {filtered.length === 0 ? (
                    <EmptyState
                      icon={ClipboardList}
                      title="No tasks here"
                      description="Tap + to add a new task"
                    />
                  ) : (
                    filtered.map((task) => (
                      <TaskItem
                        key={task.id}
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

      <button
        onClick={onAddClick}
        className={cn(
          "fixed bottom-20 right-5 w-14 h-14 z-30",
          "bg-indigo-600 hover:bg-indigo-700 rounded-full shadow-xl",
          "shadow-indigo-300 dark:shadow-indigo-900",
          "flex items-center justify-center",
          "transition-all duration-150 active:scale-90 focus:outline-none",
          "focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2",
        )}
        aria-label="Add new task"
      >
        <Plus size={24} className="text-white" />
      </button>
    </div>
  );
}
