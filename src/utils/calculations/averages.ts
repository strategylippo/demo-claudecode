import type { Expense } from "../../types";
import { calculateTotal, calculateCount } from "./totals";

export function calculateAverage(expenses: Expense[]): number {
  const count = calculateCount(expenses);
  if (count === 0) return 0;

  const total = calculateTotal(expenses);
  return total / count;
}

export function calculateMedian(expenses: Expense[]): number {
  if (expenses.length === 0) return 0;

  const sorted = [...expenses].sort((a, b) => a.amount - b.amount);
  const mid = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1].amount + sorted[mid].amount) / 2;
  }

  return sorted[mid].amount;
}

export function calculateDailyAverage(expenses: Expense[]): number {
  if (expenses.length === 0) return 0;

  const dates = new Set(expenses.map((e) => e.date));
  const uniqueDays = dates.size;

  if (uniqueDays === 0) return 0;

  const total = calculateTotal(expenses);
  return total / uniqueDays;
}
