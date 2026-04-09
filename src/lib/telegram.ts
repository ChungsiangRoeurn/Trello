import type { TelegramUser } from "@/types/user";

export const getTelegramUser = (): TelegramUser => {
  if (typeof window === "undefined") {
    return {
      name: "Guest",
      username: "guest",
      initials: "G",
      id: null,
    };
  }

  const tg = (window as any)?.Telegram?.WebApp;

  if (!tg) {
    return {
      name: "Guest",
      username: "guest",
      initials: "G",
      id: null,
    };
  }

  const user = tg.initDataUnsafe?.user;

  if (!user) {
    return {
      name: "Guest",
      username: "guest",
      initials: "G",
      id: null,
    };
  }

  const name =
    `${user.first_name || ""} ${user.last_name || ""}`.trim() ||
    user.username ||
    "User";

  return {
    name,
    username: user.username ?? "unknown",
    initials: name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase(),
    id: user.id ?? null,
  };
};