import type { Expense } from "../../types";
import { CATEGORY_CONFIG } from "../../constants";
import { formatCurrency, formatDate } from "../../utils";
import { Button } from "../common";

interface ExpenseItemProps {
  expense: Expense;
  onEdit: () => void;
  onDelete: () => void;
}

export function ExpenseItem({ expense, onEdit, onDelete }: ExpenseItemProps) {
  const categoryConfig = CATEGORY_CONFIG[expense.category];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-lg ${categoryConfig.bgColor}`}
        >
          {categoryConfig.icon}
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-900 dark:text-gray-100 truncate">
            {expense.description}
          </p>
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span
              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
              style={{
                backgroundColor: `${categoryConfig.color}20`,
                color: categoryConfig.color,
              }}
            >
              {expense.category}
            </span>
            <span>{formatDate(expense.date)}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-3">
        <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {formatCurrency(expense.amount)}
        </span>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onEdit}
            aria-label={`Edit ${expense.description}`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            aria-label={`Delete ${expense.description}`}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}
