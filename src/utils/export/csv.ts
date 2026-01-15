import type { Expense } from "../../types";
import { formatCurrency } from "../formatting";
import { escapeCSVField } from "../validation";

const CSV_HEADERS = ["Date", "Description", "Category", "Amount"];

export function generateCSVContent(expenses: Expense[]): string {
  const headerRow = CSV_HEADERS.join(",");

  const dataRows = expenses.map((expense) => {
    const fields = [
      escapeCSVField(expense.date),
      escapeCSVField(expense.description),
      escapeCSVField(expense.category),
      expense.amount.toFixed(2),
    ];
    return fields.join(",");
  });

  return [headerRow, ...dataRows].join("\n");
}

export function downloadCSV(expenses: Expense[], filename = "expenses"): void {
  const csvContent = generateCSVContent(expenses);
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}.csv`;
  link.style.display = "none";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

export function generateExpenseSummaryCSV(
  expenses: Expense[],
  categoryTotals: Record<string, number>
): string {
  const lines: string[] = [];

  lines.push("Expense Summary Report");
  lines.push("");
  lines.push(`Total Expenses,${expenses.length}`);
  lines.push(
    `Total Amount,${formatCurrency(expenses.reduce((sum, e) => sum + e.amount, 0))}`
  );
  lines.push("");
  lines.push("Category Breakdown");
  lines.push("Category,Total");

  for (const [category, total] of Object.entries(categoryTotals)) {
    lines.push(`${escapeCSVField(category)},${formatCurrency(total)}`);
  }

  lines.push("");
  lines.push("All Expenses");
  lines.push(CSV_HEADERS.join(","));

  for (const expense of expenses) {
    const fields = [
      escapeCSVField(expense.date),
      escapeCSVField(expense.description),
      escapeCSVField(expense.category),
      expense.amount.toFixed(2),
    ];
    lines.push(fields.join(","));
  }

  return lines.join("\n");
}
