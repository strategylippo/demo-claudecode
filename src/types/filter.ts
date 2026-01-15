import type { ExpenseCategory } from "./expense";

export interface ExpenseFilter {
  startDate: string | null;
  endDate: string | null;
  categories: ExpenseCategory[];
  minAmount: number | null;
  maxAmount: number | null;
  searchTerm: string;
}

export const DEFAULT_FILTER: ExpenseFilter = {
  startDate: null,
  endDate: null,
  categories: [],
  minAmount: null,
  maxAmount: null,
  searchTerm: "",
};
