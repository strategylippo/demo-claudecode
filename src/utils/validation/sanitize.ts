import DOMPurify from "dompurify";
import type { ExpenseInput } from "../../types";

export function sanitizeInput(input: string): string {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  }).trim();
}

export function sanitizeExpenseInput(expense: ExpenseInput): ExpenseInput {
  return {
    ...expense,
    description: sanitizeInput(expense.description),
  };
}

export function escapeCSVField(field: string): string {
  if (field.includes(",") || field.includes('"') || field.includes("\n")) {
    return `"${field.replace(/"/g, '""')}"`;
  }
  return field;
}
