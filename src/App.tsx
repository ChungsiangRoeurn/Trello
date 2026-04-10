import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { SplashScreen } from "@/components/screens/SplashScreen";
import { HomeScreen } from "@/components/screens/HomeScreen";
import { AddTaskSheet } from "@/components/screens/AddTaskSheet";
import { StatsScreen } from "@/components/screens/StatsScreen";
import { SettingsScreen } from "@/components/screens/SettingsScreen";
import { useTasks } from "@/hooks/useTasks";
import { useDarkMode } from "@/hooks/useDarkMode";
import { useScreen } from "@/hooks/useScreen";

export default function App() {
  const [splashDone, setSplashDone] = useState(false);
  const [addOpen, setAddOpen] = useState(false);

  const { tasks, toggleTask, deleteTask, addTask, loading } = useTasks();
  const { dark, toggle: toggleDark } = useDarkMode();
  const { screen, setScreen } = useScreen("home");

  return (
    <div className={dark ? "dark" : ""}>
      {!splashDone ? (
        <SplashScreen onDone={() => setSplashDone(true)} />
      ) : (
        <AppShell screen={screen} onNavigate={setScreen}>
          {screen === "home" && (
            <HomeScreen
              tasks={tasks}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onAddClick={() => setAddOpen(true)}
              isLoading={loading}
            />
          )}
          {screen === "stats" && <StatsScreen tasks={tasks} />}
          {screen === "settings" && (
            <SettingsScreen darkMode={dark} onToggleDark={toggleDark} />
          )}

          <AddTaskSheet
            open={addOpen}
            onOpenChange={setAddOpen}
            onSave={addTask}
          />
        </AppShell>
      )}
    </div>
  );
}
