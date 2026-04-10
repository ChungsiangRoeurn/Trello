import { LayoutList, CheckCircle2, Target, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/common/StatCard";
import { CircularProgress } from "@/components/common/CircularProgress";
import { Progress } from "@/components/ui/progress";
import { CATEGORY_CONFIG, TODAY } from "@/constants";
import { pct } from "@/lib/utils";
import type { Task } from "@/types";

interface Props {
  tasks: Task[];
}

export function StatsScreen({ tasks = [] }: Props) {
  // Defensive check for array
  const safeTasks = Array.isArray(tasks) ? tasks : [];
  
  const total = safeTasks.length;
  const done = safeTasks.filter((t) => t?.completed).length;
  const pending = total - done;
  const overall = pct(done, total);

  const todayTasks = safeTasks.filter((t) => t?.date === TODAY);
  const todayDone = todayTasks.filter((t) => t?.completed).length;

  // Dynamically calculate stats based on categories actually present in the data
  // This prevents crashes if a task has a category not in your constants
  const uniqueCategories = Array.from(new Set(safeTasks.map(t => t.category || "Others")));

  const catStats = uniqueCategories.map((cat) => {
    const allInCat = safeTasks.filter((t) => (t.category || "Others") === cat);
    const completedInCat = allInCat.filter((t) => t.completed).length;
    return { 
      cat, 
      total: allInCat.length, 
      completed: completedInCat, 
      pct: pct(completedInCat, allInCat.length) 
    };
  }).filter((s) => s.total > 0);

  return (
    <div className="h-full overflow-y-auto bg-slate-50 dark:bg-zinc-950">
      <div className="px-5 pt-5 pb-24 space-y-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Statistics</h1>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Your productivity overview</p>
        </div>

        <Card className="border-none shadow-sm dark:bg-zinc-900">
          <CardContent className="pt-6 flex flex-col items-center gap-3 pb-6">
            <CircularProgress value={overall} size={140} strokeWidth={12} />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-bold text-gray-900 dark:text-white">{done}</span> of{" "}
              <span className="font-bold text-gray-900 dark:text-white">{total}</span> tasks completed
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-3">
          <StatCard icon={LayoutList} label="Total Tasks" value={total} iconBg="bg-indigo-100 dark:bg-indigo-900/40" iconColor="text-indigo-600 dark:text-indigo-400" />
          <StatCard icon={CheckCircle2} label="Completed" value={done} iconBg="bg-emerald-100 dark:bg-emerald-900/40" iconColor="text-emerald-600 dark:text-emerald-400" />
          <StatCard icon={Target} label="Today Done" value={`${todayDone}/${todayTasks.length}`} iconBg="bg-amber-100 dark:bg-amber-900/40" iconColor="text-amber-600 dark:text-amber-400" />
          <StatCard icon={TrendingUp} label="Pending" value={pending} iconBg="bg-rose-100 dark:bg-rose-900/40" iconColor="text-rose-600 dark:text-rose-400" />
        </div>

        {catStats.length > 0 && (
          <Card className="border-none shadow-sm dark:bg-zinc-900">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold">By Category</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              {catStats.map(({ cat, total: ct, completed: cd, pct: p }) => {
                const cfg = CATEGORY_CONFIG[cat] || { text: "text-gray-500", dot: "bg-gray-400", barColor: "bg-gray-400" };
                return (
                  <div key={cat}>
                    <div className="flex justify-between items-center mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                        <span className={`text-xs font-bold uppercase tracking-wider ${cfg.text}`}>{cat}</span>
                      </div>
                      <span className="text-xs text-gray-400 tabular-nums">{cd}/{ct}</span>
                    </div>
                    <Progress value={p} className={`h-1.5 bg-gray-100 dark:bg-zinc-800 [&>div]:${cfg.barColor}`} />
                  </div>
                );
              })}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}