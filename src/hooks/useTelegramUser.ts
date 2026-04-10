import { getTelegramUser } from "@/lib/telegram";
import { useEffect, useState } from "react";
import type { TelegramUser } from "@/types/user";

export const useTelegramUser = () => {
  const [user, setUser] = useState<TelegramUser>({
    name: "Guest",
    username: "guest",
    initials: "G",
    id: null,
  });

  useEffect(() => {
    const tgUser = getTelegramUser();
    
    // If we are in the browser and tgUser doesn't have an ID
    if (!tgUser.id) {
      setUser({
        name: "Dev Mode",
        username: "dev_user",
        initials: "D",
        id: 88888888, // 👈 A dummy ID so useTasks actually runs
      });
    } else {
      setUser(tgUser);
    }
  }, []);

  return user;
};