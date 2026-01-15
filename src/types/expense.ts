export const EXPENSE_CATEGORIES = [
  "Food",
  "Transport",
  "Entertainment",
  "Utilities",
  "Shopping",
  "Health",
  "Travel",
  "Other",
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export type ExpenseInput = Omit<Expense, "id" | "createdAt" | "updatedAt">;
