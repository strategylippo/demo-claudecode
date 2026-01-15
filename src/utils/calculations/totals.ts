import type { Expense } from "../../types";

export function calculateTotal(expenses: Expense[]): number {
  return expenses.reduce((sum, expense) => sum + expense.amount, 0);
}

export function calculateCount(expenses: Expense[]): number {
  return expenses.length;
}

export function findHighestExpense(expenses: Expense[]): Expense | null {
  if (expenses.length === 0) return null;

  return expenses.reduce((highest, current) =>
    current.amount > highest.amount ? current : highest
  );
}

export function findLowestExpense(expenses: Expense[]): Expense | null {
  if (expenses.length === 0) return null;

  return expenses.reduce((lowest, current) =>
    current.amount < lowest.amount ? current : lowest
  );
}
