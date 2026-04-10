import {
  Bell,
  Moon,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  Palette,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { SettingsGroup } from "@/components/common/SettingsGroup";
import type { SettingsRowItem } from "@/components/common/SettingsGroup";
import { useTelegramUser } from "@/hooks/useTelegramUser";
import { Task } from "@/types";

interface Props {
  darkMode: boolean;
  onToggleDark: (val: boolean) => void;
  tasks: Task[];
}

export function SettingsScreen({ darkMode, onToggleDark, tasks = [] }: Props) {

  const user = useTelegramUser();
  const safeTasks = Array.isArray(tasks) ? tasks : [];

  const totalCount = safeTasks.length;
  const completedCount = safeTasks.filter(t => t.completed).length;

  const streak = "5d";

  const preferenceItems: SettingsRowItem[] = [
    {
      icon: Moon,
      label: "Dark Mode",
      type: "toggle",
      value: darkMode,
      onChange: onToggleDark,
    },
    {
      icon: Bell,
      label: "Notifications",
      type: "chevron",
    },
    {
      icon: Palette,
      label: "Appearance",
      type: "chevron",
    },
  ];

  const accountItems: SettingsRowItem[] = [
    { icon: Shield, label: "Privacy & Security", type: "chevron" },
    { icon: HelpCircle, label: "Help & Support", type: "chevron" },
    { icon: LogOut, label: "Sign Out", type: "chevron", danger: true },
  ];

  return (
    <div className="h-full overflow-y-auto dark:bg-zinc-950">
      <div className="px-5 pt-5 pb-24 space-y-5">
        {/* Page title */}
        <h1 className="text-2xl font-black text-gray-800 dark:text-white tracking-tight">
          Settings
        </h1>

        {/* Profile card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-14 h-14 ring-2 ring-indigo-100 dark:ring-indigo-900">
                <AvatarFallback className="text-lg bg-indigo-50 text-indigo-600 font-bold">{user.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-black text-gray-900 dark:text-white text-base truncate">{user.name}</p>
                <p className="text-xs text-gray-400 truncate">Telegram User</p>
              </div>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-400">
                <ChevronRight size={15} />
              </button>
            </div>

            <Separator className="my-4 opacity-50" />

            {/* Quick stats row */}
            <div className="grid grid-cols-3 gap-2 text-center">
              {[
                { label: "Total", value: totalCount },
                { label: "Done", value: completedCount },
                { label: "Streak", value: streak },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white dark:bg-zinc-800/50 rounded-2xl py-3 border border-gray-50 dark:border-none shadow-sm">
                  <p className="text-base font-black text-indigo-600 dark:text-indigo-400">{value}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">{label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <div className="space-y-1.5">
          <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest px-1">
            Preferences
          </p>
          <SettingsGroup items={preferenceItems} />
        </div>

        {/* Account */}
        <div className="space-y-1.5">
          <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest px-1">
            Account
          </p>
          <SettingsGroup items={accountItems} />
        </div>

        <p className="text-center text-xs text-gray-300 dark:text-gray-600">
          Trello v1.0.0 — Built By JS.♥
        </p>
      </div>
    </div>
  );
}
