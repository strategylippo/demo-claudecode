import { useState, useCallback } from "react";
import type { Expense, ExpenseInput } from "./types";
import { useExpenses } from "./hooks";
import { sampleExpenses } from "./data/sampleExpenses";
import {
  Layout,
  Button,
  Modal,
  Dashboard,
  ExpenseForm,
  ExpenseFilter,
  ExpenseList,
  ExportButtons,
} from "./components";

type ViewMode = "dashboard" | "list";

function App() {
  const {
    expenses,
    filteredExpenses,
    stats,
    filter,
    addExpense,
    updateExpense,
    deleteExpense,
    setFilter,
    clearFilter,
    importExpenses,
    clearAllExpenses,
  } = useExpenses();

  const [viewMode, setViewMode] = useState<ViewMode>("dashboard");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null
  );

  const handleAddExpense = useCallback(
    (expense: ExpenseInput) => {
      addExpense(expense);
      setIsFormOpen(false);
    },
    [addExpense]
  );

  const handleEditExpense = useCallback(
    (expense: ExpenseInput) => {
      if (editingExpense) {
        updateExpense(editingExpense.id, expense);
        setEditingExpense(null);
      }
    },
    [editingExpense, updateExpense]
  );

  const handleDeleteExpense = useCallback(
    (id: string) => {
      deleteExpense(id);
      setShowDeleteConfirm(null);
    },
    [deleteExpense]
  );

  const handleLoadSampleData = useCallback(() => {
    importExpenses(sampleExpenses);
  }, [importExpenses]);

  const headerActions = (
    <div className="flex items-center gap-2">
      <ExportButtons expenses={filteredExpenses} stats={stats} />
      <Button
        onClick={() => setIsFormOpen(true)}
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
              d="M12 4v16m8-8H4"
            />
          </svg>
        }
      >
        <span className="hidden sm:inline">Add Expense</span>
        <span className="sm:hidden">Add</span>
      </Button>
    </div>
  );

  return (
    <Layout headerActions={headerActions}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("dashboard")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === "dashboard"
                  ? "bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === "list"
                  ? "bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              }`}
            >
              All Expenses
            </button>
          </div>

          {expenses.length === 0 && (
            <div className="flex items-center gap-2">
              <Button variant="secondary" onClick={handleLoadSampleData}>
                Load Sample Data
              </Button>
            </div>
          )}

          {expenses.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllExpenses}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              Clear All
            </Button>
          )}
        </div>

        {viewMode === "dashboard" && <Dashboard stats={stats} />}

        {viewMode === "list" && (
          <div className="space-y-4">
            <ExpenseFilter
              filter={filter}
              onFilterChange={setFilter}
              onClear={clearFilter}
            />
            <ExpenseList
              expenses={filteredExpenses}
              onEdit={setEditingExpense}
              onDelete={(id) => setShowDeleteConfirm(id)}
              emptyMessage={
                filter.searchTerm ||
                filter.categories.length > 0 ||
                filter.startDate ||
                filter.endDate ||
                filter.minAmount !== null ||
                filter.maxAmount !== null
                  ? "No expenses match your filters"
                  : "No expenses yet"
              }
            />
          </div>
        )}
      </div>

      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="Add Expense"
        size="md"
      >
        <ExpenseForm
          onSubmit={handleAddExpense}
          onCancel={() => setIsFormOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={editingExpense !== null}
        onClose={() => setEditingExpense(null)}
        title="Edit Expense"
        size="md"
      >
        {editingExpense && (
          <ExpenseForm
            expense={editingExpense}
            onSubmit={handleEditExpense}
            onCancel={() => setEditingExpense(null)}
          />
        )}
      </Modal>

      <Modal
        isOpen={showDeleteConfirm !== null}
        onClose={() => setShowDeleteConfirm(null)}
        title="Delete Expense"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300">
            Are you sure you want to delete this expense? This action cannot be
            undone.
          </p>
          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => setShowDeleteConfirm(null)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() =>
                showDeleteConfirm && handleDeleteExpense(showDeleteConfirm)
              }
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </Layout>
  );
}

export default App;
