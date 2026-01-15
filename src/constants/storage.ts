export const STORAGE_KEYS = {
  EXPENSES: "expense-tracker-expenses",
  THEME: "expense-tracker-theme",
  FILTER: "expense-tracker-filter",
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
