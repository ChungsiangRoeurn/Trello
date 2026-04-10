import { getTelegramUser } from "@/lib/telegram";
import { useEffect, useState } from "react";
import type { TelegramUser } from "@/types/user";

export const useTelegramUser = () => {
  const [user, setUser] = useState<TelegramUser>({
    name: "Loading...",
    id: null,
    initials: "?",
    username: ""
  });

  useEffect(() => {
    const tgUser = getTelegramUser();
    
    // Only use Dev Mode if we are NOT in Telegram AND on Localhost
    const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

    if (!tgUser.id && isLocal) {
      setUser({
        name: "Dev Mode",
        username: "dev_user",
        initials: "D",
        id: 88888888,
      });
    } else {
      setUser(tgUser);
    }
  }, []);

  return user;
};