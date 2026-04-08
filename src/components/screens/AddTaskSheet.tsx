import { useState } from "react";
import { Calendar, Clock } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetCloseButton,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CATEGORIES, CATEGORY_CONFIG, TODAY } from "@/constants";
import { to12Hour } from "@/lib/utils";
import type { Category } from "@/types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: { title: string; date: string; time: string; category: Category }) => void;
}

export function AddTaskSheet({ open, onOpenChange, onSave }: Props) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(TODAY);
  const [time, setTime] = useState("09:00");
  const [category, setCategory] = useState<Category>("Work");

  const handleSave = () => {
    if (!title.trim()) return;
    onSave({ title, date, time: to12Hour(time), category });
    // Reset
    setTitle("");
    setDate(TODAY);
    setTime("09:00");
    setCategory("Work");
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="px-6 pt-6 pb-10 max-h-[90vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>New Task</SheetTitle>
          <SheetCloseButton />
        </SheetHeader>

        <div className="space-y-5">
          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
              Task Title
            </label>
            <Input
              autoFocus
              placeholder="What do you need to do?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
            />
          </div>

          {/* Date + Time */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest flex items-center gap-1">
                <Calendar size={10} /> Date
              </label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="text-xs"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest flex items-center gap-1">
                <Clock size={10} /> Time
              </label>
              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="text-xs"
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
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
                        ? `${cfg.bg} ${cfg.text} ring-2 ring-offset-1 ring-indigo-400`
                        : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                    )}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              className="flex-1"
              disabled={!title.trim()}
              onClick={handleSave}
            >
              Save Task
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
