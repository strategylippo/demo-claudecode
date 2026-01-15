import type { Expense, ExpenseStats } from "../../types";
import { downloadCSV, downloadPDF } from "../../utils";
import { Button } from "../common";

interface ExportButtonsProps {
  expenses: Expense[];
  stats: ExpenseStats;
  disabled?: boolean;
}

export function ExportButtons({
  expenses,
  stats,
  disabled = false,
}: ExportButtonsProps) {
  const handleExportCSV = () => {
    const timestamp = new Date().toISOString().split("T")[0];
    downloadCSV(expenses, `expenses-${timestamp}`);
  };

  const handleExportPDF = () => {
    const timestamp = new Date().toISOString().split("T")[0];
    downloadPDF(expenses, stats, `expense-report-${timestamp}`);
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="secondary"
        size="sm"
        onClick={handleExportCSV}
        disabled={disabled || expenses.length === 0}
        leftIcon={
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
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        }
      >
        CSV
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={handleExportPDF}
        disabled={disabled || expenses.length === 0}
        leftIcon={
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
              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
        }
      >
        PDF
      </Button>
    </div>
  );
}
