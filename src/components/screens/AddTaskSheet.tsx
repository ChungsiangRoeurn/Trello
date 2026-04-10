import { useEffect, useState } from "react";
import { Calendar, Clock } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CATEGORIES, CATEGORY_CONFIG, TODAY } from "@/constants";
import { to12Hour } from "@/lib/utils";
import type { Category, Task } from "@/types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: { title: string; date: string; time: string; category: Category }) => void;
  editingTask?: Task | null;
}

export function AddTaskSheet({ open, onOpenChange, onSave, editingTask }: Props) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(TODAY);
  const [time, setTime] = useState("09:00");
  const [category, setCategory] = useState<Category>("Work");

  useEffect(() => {
    if (editingTask && open) {
      setTitle(editingTask.title);
      setCategory(editingTask.category);
      setDate(editingTask.date);

      if (editingTask.time) {
        const [t, mod] = editingTask.time.split(" ");
        let [h, m] = t.split(":");
        let hNum = parseInt(h, 10);
        if (mod === "PM" && hNum < 12) hNum += 12;
        if (mod === "AM" && hNum === 12) hNum = 0;
        setTime(`${hNum.toString().padStart(2, '0')}:${m}`);
      }
    } else if (open) {
      setTitle("");
      setDate(TODAY);
      setTime("09:00");
      setCategory("Work");
    }
  }, [editingTask, open]);

  const handleSave = () => {
    if (!title.trim()) return;
    onSave({ title, date, time: to12Hour(time), category });
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="bottom" 
        className="px-6 pt-6 pb-10 max-h-[90vh] overflow-y-auto bg-zinc-900 border-zinc-800 text-zinc-100"
      >
        <SheetHeader>
          <SheetTitle className="text-white">
            {editingTask ? "Edit Task" : "New Task"}
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-5 mt-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
              Task Title
            </label>
            <Input
              autoFocus
              placeholder="What do you need to do?"
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:ring-indigo-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1">
                <Calendar size={10} /> Date
              </label>
              <Input
                type="date"
                value={date}
                className="bg-zinc-800 border-zinc-700 text-white text-xs"
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1">
                <Clock size={10} /> Time
              </label>
              <Input
                type="time"
                value={time}
                className="bg-zinc-800 border-zinc-700 text-white text-xs"
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
              Category
            </label>
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map((cat) => {
                const cfg = CATEGORY_CONFIG[cat];
                const active = category === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={cn(
                      "px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 active:scale-95 focus:outline-none",
                      active
                        ? `${cfg.bg} ${cfg.text} ring-2 ring-offset-1 ring-indigo-500`
                        : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                    )}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <Button
              variant="secondary"
              className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-none"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              {editingTask ? "Update Task" : "Save Task"}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}