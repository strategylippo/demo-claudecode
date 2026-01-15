import type { Expense, ExpenseCategory } from "./expense";

export interface CategoryBreakdown {
  category: ExpenseCategory;
  total: number;
  count: number;
  percentage: number;
  color: string;
}

export interface MonthlyTrend {
  month: string;
  year: number;
  total: number;
  count: number;
  label: string;
}

export interface ExpenseStats {
  totalExpenses: number;
  totalAmount: number;
  averageAmount: number;
  categoryBreakdown: CategoryBreakdown[];
  monthlyTrends: MonthlyTrend[];
  highestExpense: Expense | null;
  lowestExpense: Expense | null;
}

export const EMPTY_STATS: ExpenseStats = {
  totalExpenses: 0,
  totalAmount: 0,
  averageAmount: 0,
  categoryBreakdown: [],
  monthlyTrends: [],
  highestExpense: null,
  lowestExpense: null,
};
