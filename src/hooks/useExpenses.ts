import { useState, useMemo, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "./useLocalStorage";
import { STORAGE_KEYS } from "../constants";
import {
  type Expense,
  type ExpenseInput,
  type ExpenseFilter,
  type ExpenseStats,
  DEFAULT_FILTER,
  EMPTY_STATS,
} from "../types";
import {
  isDateInRange,
  calculateTotal,
  calculateCount,
  calculateAverage,
  calculateCategoryBreakdown,
  calculateMonthlyTrends,
  findHighestExpense,
  findLowestExpense,
  sanitizeExpenseInput,
} from "../utils";

export interface UseExpensesReturn {
  expenses: Expense[];
  filteredExpenses: Expense[];
  stats: ExpenseStats;
  filter: ExpenseFilter;
  addExpense: (expense: ExpenseInput) => Expense;
  updateExpense: (id: string, expense: Partial<ExpenseInput>) => boolean;
  deleteExpense: (id: string) => boolean;
  setFilter: (filter: Partial<ExpenseFilter>) => void;
  clearFilter: () => void;
  clearAllExpenses: () => void;
  importExpenses: (newExpenses: Expense[]) => void;
}

export function useExpenses(initialExpenses: Expense[] = []): UseExpensesReturn {
  const [expenses, setExpenses] = useLocalStorage<Expense[]>(
    STORAGE_KEYS.EXPENSES,
    initialExpenses
  );
  const [filter, setFilterState] = useState<ExpenseFilter>(DEFAULT_FILTER);

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      if (
        !isDateInRange(expense.date, filter.startDate, filter.endDate)
      ) {
        return false;
      }

      if (
        filter.categories.length > 0 &&
        !filter.categories.includes(expense.category)
      ) {
        return false;
      }

      if (filter.minAmount !== null && expense.amount < filter.minAmount) {
        return false;
      }

      if (filter.maxAmount !== null && expense.amount > filter.maxAmount) {
        return false;
      }

      if (filter.searchTerm) {
        const searchLower = filter.searchTerm.toLowerCase();
        const matchesDescription = expense.description
          .toLowerCase()
          .includes(searchLower);
        const matchesCategory = expense.category
          .toLowerCase()
          .includes(searchLower);

        if (!matchesDescription && !matchesCategory) {
          return false;
        }
      }

      return true;
    });
  }, [expenses, filter]);

  const stats = useMemo((): ExpenseStats => {
    if (filteredExpenses.length === 0) {
      return EMPTY_STATS;
    }

    return {
      totalExpenses: calculateCount(filteredExpenses),
      totalAmount: calculateTotal(filteredExpenses),
      averageAmount: calculateAverage(filteredExpenses),
      categoryBreakdown: calculateCategoryBreakdown(filteredExpenses),
      monthlyTrends: calculateMonthlyTrends(filteredExpenses),
      highestExpense: findHighestExpense(filteredExpenses),
      lowestExpense: findLowestExpense(filteredExpenses),
    };
  }, [filteredExpenses]);

  const addExpense = useCallback(
    (expenseInput: ExpenseInput): Expense => {
      const sanitized = sanitizeExpenseInput(expenseInput);
      const now = new Date().toISOString();

      const newExpense: Expense = {
        ...sanitized,
        id: uuidv4(),
        createdAt: now,
        updatedAt: now,
      };

      setExpenses((prev) => [newExpense, ...prev]);
      return newExpense;
    },
    [setExpenses]
  );

  const updateExpense = useCallback(
    (id: string, updates: Partial<ExpenseInput>): boolean => {
      let found = false;

      setExpenses((prev) =>
        prev.map((expense) => {
          if (expense.id === id) {
            found = true;
            const sanitizedUpdates = updates.description
              ? sanitizeExpenseInput({
                  ...expense,
                  ...updates,
                } as ExpenseInput)
              : updates;

            return {
              ...expense,
              ...sanitizedUpdates,
              updatedAt: new Date().toISOString(),
            };
          }
          return expense;
        })
      );

      return found;
    },
    [setExpenses]
  );

  const deleteExpense = useCallback(
    (id: string): boolean => {
      let found = false;

      setExpenses((prev) => {
        const filtered = prev.filter((expense) => {
          if (expense.id === id) {
            found = true;
            return false;
          }
          return true;
        });
        return filtered;
      });

      return found;
    },
    [setExpenses]
  );

  const setFilter = useCallback((updates: Partial<ExpenseFilter>) => {
    setFilterState((prev) => ({ ...prev, ...updates }));
  }, []);

  const clearFilter = useCallback(() => {
    setFilterState(DEFAULT_FILTER);
  }, []);

  const clearAllExpenses = useCallback(() => {
    setExpenses([]);
  }, [setExpenses]);

  const importExpenses = useCallback(
    (newExpenses: Expense[]) => {
      setExpenses((prev) => {
        const existingIds = new Set(prev.map((e) => e.id));
        const uniqueNew = newExpenses.filter((e) => !existingIds.has(e.id));
        return [...uniqueNew, ...prev];
      });
    },
    [setExpenses]
  );

  return {
    expenses,
    filteredExpenses,
    stats,
    filter,
    addExpense,
    updateExpense,
    deleteExpense,
    setFilter,
    clearFilter,
    clearAllExpenses,
    importExpenses,
  };
}
