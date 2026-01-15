import { parseISO, format } from "date-fns";
import { CATEGORY_CONFIG } from "../../constants";
import {
  EXPENSE_CATEGORIES,
  type Expense,
  type ExpenseCategory,
  type CategoryBreakdown,
  type MonthlyTrend,
} from "../../types";

export function groupByCategory(
  expenses: Expense[]
): Map<ExpenseCategory, Expense[]> {
  const groups = new Map<ExpenseCategory, Expense[]>();

  for (const category of EXPENSE_CATEGORIES) {
    groups.set(category, []);
  }

  for (const expense of expenses) {
    const group = groups.get(expense.category);
    if (group) {
      group.push(expense);
    }
  }

  return groups;
}

export function calculateCategoryBreakdown(
  expenses: Expense[]
): CategoryBreakdown[] {
  const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);
  const groups = groupByCategory(expenses);

  const breakdown: CategoryBreakdown[] = [];

  for (const [category, categoryExpenses] of groups) {
    const total = categoryExpenses.reduce((sum, e) => sum + e.amount, 0);
    const count = categoryExpenses.length;
    const percentage = totalAmount > 0 ? (total / totalAmount) * 100 : 0;
    const color = CATEGORY_CONFIG[category].color;

    if (count > 0) {
      breakdown.push({
        category,
        total,
        count,
        percentage,
        color,
      });
    }
  }

  return breakdown.sort((a, b) => b.total - a.total);
}

export function groupByMonth(
  expenses: Expense[]
): Map<string, Expense[]> {
  const groups = new Map<string, Expense[]>();

  for (const expense of expenses) {
    const date = parseISO(expense.date);
    const key = format(date, "yyyy-MM");

    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)!.push(expense);
  }

  return groups;
}

export function calculateMonthlyTrends(expenses: Expense[]): MonthlyTrend[] {
  const groups = groupByMonth(expenses);
  const trends: MonthlyTrend[] = [];

  for (const [key, monthExpenses] of groups) {
    const [yearStr, monthStr] = key.split("-");
    const year = parseInt(yearStr, 10);
    const monthIndex = parseInt(monthStr, 10) - 1;

    const date = new Date(year, monthIndex, 1);
    const total = monthExpenses.reduce((sum, e) => sum + e.amount, 0);
    const count = monthExpenses.length;

    trends.push({
      month: format(date, "MMM"),
      year,
      total,
      count,
      label: format(date, "MMM yyyy"),
    });
  }

  return trends.sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months.indexOf(a.month) - months.indexOf(b.month);
  });
}

export function getCategoryTotal(
  expenses: Expense[],
  category: ExpenseCategory
): number {
  return expenses
    .filter((e) => e.category === category)
    .reduce((sum, e) => sum + e.amount, 0);
}

export function getCategoryCount(
  expenses: Expense[],
  category: ExpenseCategory
): number {
  return expenses.filter((e) => e.category === category).length;
}
