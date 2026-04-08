# Taskly — Mobile Task Manager

A Telegram Mini App-inspired task manager built with React 18, TypeScript, Tailwind CSS, and shadcn/ui primitives.

---

## Tech Stack

| Layer | Library |
|---|---|
| Framework | React 18 + TypeScript |
| Bundler | Vite 5 |
| Styling | Tailwind CSS 3 |
| UI Primitives | Radix UI (via shadcn/ui pattern) |
| Icons | Lucide React |
| Variants | class-variance-authority |
| Class merging | clsx + tailwind-merge |

---

## Project Structure

```
src/
├── types/
│   └── index.ts              # Task, Screen, Category, FilterType types
│
├── constants/
│   └── index.ts              # TODAY, USER, CATEGORY_CONFIG, CATEGORIES
│
├── data/
│   └── tasks.ts              # Initial dummy tasks
│
├── lib/
│   └── utils.ts              # cn(), formatDisplayDate(), to12Hour(), pct()
│
├── hooks/
│   ├── useTasks.ts           # Task CRUD state management
│   ├── useDarkMode.ts        # Dark mode toggle + DOM class effect
│   └── useScreen.ts          # Navigation screen state
│
├── components/
│   ├── ui/                   # shadcn/ui-style primitives
│   │   ├── button.tsx        # Button with CVA variants
│   │   ├── card.tsx          # Card + CardHeader/Title/Content/Footer
│   │   ├── badge.tsx         # Badge with variants
│   │   ├── input.tsx         # Styled Input
│   │   ├── progress.tsx      # Radix Progress bar
│   │   ├── switch.tsx        # Radix Switch toggle
│   │   ├── separator.tsx     # Radix Separator
│   │   ├── avatar.tsx        # Radix Avatar + Fallback
│   │   ├── sheet.tsx         # Radix Dialog as bottom sheet
│   │   └── tabs.tsx          # Radix Tabs
│   │
│   ├── common/               # Reusable domain components
│   │   ├── CategoryBadge.tsx # Colored dot + label badge
│   │   ├── StatCard.tsx      # Icon + value + label card
│   │   ├── CircularProgress.tsx  # SVG ring progress
│   │   ├── EmptyState.tsx    # Icon + message empty state
│   │   ├── TaskItem.tsx      # Full task row with toggle + delete
│   │   └── SettingsGroup.tsx # Grouped settings rows with toggle/chevron
│   │
│   ├── layout/               # App shell & navigation
│   │   ├── StatusBar.tsx     # Fake iOS status bar
│   │   ├── BottomNav.tsx     # 3-tab bottom navigation
│   │   └── AppShell.tsx      # Phone frame wrapper
│   │
│   └── screens/              # Full page components
│       ├── SplashScreen.tsx  # Animated splash with logo + loading dots
│       ├── HomeScreen.tsx    # Task list + progress card + FAB
│       ├── AddTaskSheet.tsx  # Bottom sheet form to create tasks
│       ├── StatsScreen.tsx   # Circular progress + stat grid + category bars
│       └── SettingsScreen.tsx # Profile card + grouped settings
│
├── App.tsx                   # Root — composes all screens + hooks
├── main.tsx                  # React entry point
└── index.css                 # Tailwind directives + global animation CSS
```

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the dev server

```bash
npm run dev
```

### 3. Open in browser

```
http://localhost:5173
```

For the best mobile experience, open DevTools → Toggle device toolbar → select iPhone 14 Pro or similar (~390px wide).

---

## Features

- **Splash screen** — animated fade + scale in/out with loading dots
- **Home screen** — greeting header with avatar, today's progress ring, filter tabs (All / Today / Completed), task list with checkbox + category badge + time, and a floating action button
- **Add task sheet** — Radix Dialog as an animated bottom sheet with title input, date/time pickers, and category selector
- **Stats screen** — SVG circular progress ring, 4-stat grid, per-category progress bars using Radix Progress
- **Settings screen** — profile card with avatar + quick stats, grouped settings rows with Radix Switch toggle for dark mode
- **Dark mode** — full dark theme toggled via `.dark` class on `<html>`
- **TypeScript** — strict mode, path aliases (`@/`), full type coverage

---

## Customisation

- **User info** → edit `src/constants/index.ts` → `USER`
- **Category colours** → edit `CATEGORY_CONFIG` in the same file
- **Dummy tasks** → edit `src/data/tasks.ts`
- **Theme colour** → swap `indigo` → any Tailwind colour across the codebase
