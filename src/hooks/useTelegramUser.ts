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
    setUser(tgUser);
  }, []);

  return user;
};