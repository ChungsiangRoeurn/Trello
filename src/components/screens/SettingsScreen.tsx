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

interface Props {
  darkMode: boolean;
  onToggleDark: (val: boolean) => void;
}

export function SettingsScreen({ darkMode, onToggleDark }: Props) {
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

  const user = useTelegramUser()

  return (
    <div className="h-full overflow-y-auto">
      <div className="px-5 pt-5 pb-24 space-y-5">
        {/* Page title */}
        <h1 className="text-2xl font-black text-gray-800 dark:text-white tracking-tight">
          Settings
        </h1>

        {/* Profile card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-14 h-14 ring-2 ring-indigo-200 dark:ring-indigo-700">
                <AvatarFallback className="text-lg">{user.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-800 dark:text-white text-base truncate">
                  {user.name}
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500 truncate">
                  {/* {user.email} */}
                </p>
              </div>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex-shrink-0">
                <ChevronRight size={15} className="text-gray-400" />
              </button>
            </div>

            <Separator className="my-4" />

            {/* Quick stats row */}
            <div className="grid grid-cols-3 gap-2 text-center">
              {[
                { label: "Total", value: "8" },
                { label: "Done", value: "2" },
                { label: "Streak", value: "5d" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="bg-gray-50 dark:bg-gray-700/50 rounded-xl py-2.5"
                >
                  <p className="text-base font-black text-indigo-600 dark:text-indigo-400">
                    {value}
                  </p>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">
                    {label}
                  </p>
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
          Trello v1.0.0 — Made with ♥
        </p>
      </div>
    </div>
  );
}
