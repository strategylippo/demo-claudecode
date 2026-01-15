import type { Expense } from "../../types";
import { ExpenseItem } from "./ExpenseItem";

interface ExpenseListProps {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
  emptyMessage?: string;
}

export function ExpenseList({
  expenses,
  onEdit,
  onDelete,
  emptyMessage = "No expenses found",
}: ExpenseListProps) {
  if (expenses.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <p className="text-gray-500 dark:text-gray-400">{emptyMessage}</p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
          Add your first expense to get started
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
          onEdit={() => onEdit(expense)}
          onDelete={() => onDelete(expense.id)}
        />
      ))}
    </div>
  );
}
