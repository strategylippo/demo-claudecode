import type { ExpenseCategory } from "../types";

export interface CategoryConfig {
  label: string;
  color: string;
  bgColor: string;
  icon: string;
}

export const CATEGORY_CONFIG: Record<ExpenseCategory, CategoryConfig> = {
  Food: {
    label: "Food",
    color: "#ef4444",
    bgColor: "bg-red-100 dark:bg-red-900/30",
    icon: "🍔",
  },
  Transport: {
    label: "Transport",
    color: "#3b82f6",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
    icon: "🚗",
  },
  Entertainment: {
    label: "Entertainment",
    color: "#8b5cf6",
    bgColor: "bg-purple-100 dark:bg-purple-900/30",
    icon: "🎬",
  },
  Utilities: {
    label: "Utilities",
    color: "#f59e0b",
    bgColor: "bg-amber-100 dark:bg-amber-900/30",
    icon: "💡",
  },
  Shopping: {
    label: "Shopping",
    color: "#ec4899",
    bgColor: "bg-pink-100 dark:bg-pink-900/30",
    icon: "🛍️",
  },
  Health: {
    label: "Health",
    color: "#10b981",
    bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
    icon: "🏥",
  },
  Travel: {
    label: "Travel",
    color: "#06b6d4",
    bgColor: "bg-cyan-100 dark:bg-cyan-900/30",
    icon: "✈️",
  },
  Other: {
    label: "Other",
    color: "#6b7280",
    bgColor: "bg-gray-100 dark:bg-gray-700/30",
    icon: "📦",
  },
};

export const CATEGORY_COLORS = Object.fromEntries(
  Object.entries(CATEGORY_CONFIG).map(([key, value]) => [key, value.color])
) as Record<ExpenseCategory, string>;
