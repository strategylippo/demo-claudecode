import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useExpenses } from "../../src/hooks/useExpenses";
import type { ExpenseInput, Expense } from "../../src/types";

describe("useExpenses", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const createExpenseInput = (overrides?: Partial<ExpenseInput>): ExpenseInput => ({
    description: "Test expense",
    amount: 50,
    category: "Food",
    date: "2024-01-15",
    ...overrides,
  });

  describe("initialization", () => {
    it("starts with empty expenses", () => {
      const { result } = renderHook(() => useExpenses());
      expect(result.current.expenses).toHaveLength(0);
    });

    it("accepts initial expenses", () => {
      const initialExpenses: Expense[] = [
        {
          id: "1",
          description: "Initial",
          amount: 100,
          category: "Food",
          date: "2024-01-15",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];
      const { result } = renderHook(() => useExpenses(initialExpenses));
      expect(result.current.expenses).toHaveLength(1);
    });
  });

  describe("addExpense", () => {
    it("adds a new expense", () => {
      const { result } = renderHook(() => useExpenses());
      const input = createExpenseInput();

      act(() => {
        result.current.addExpense(input);
      });

      expect(result.current.expenses).toHaveLength(1);
      expect(result.current.expenses[0].description).toBe("Test expense");
    });

    it("generates unique ids for multiple expenses", () => {
      const { result } = renderHook(() => useExpenses());

      act(() => {
        result.current.addExpense(createExpenseInput({ description: "First" }));
      });

      act(() => {
        result.current.addExpense(createExpenseInput({ description: "Second" }));
      });

      expect(result.current.expenses).toHaveLength(2);
      expect(result.current.expenses[0].id).not.toBe(result.current.expenses[1].id);
    });

    it("sanitizes input description", () => {
      const { result } = renderHook(() => useExpenses());

      act(() => {
        result.current.addExpense(
          createExpenseInput({
            description: '<script>alert("xss")</script>Clean text',
          })
        );
      });

      expect(result.current.expenses[0].description).toBe("Clean text");
    });

    it("returns the created expense", () => {
      const { result } = renderHook(() => useExpenses());
      let createdExpense: Expense | null = null;

      act(() => {
        createdExpense = result.current.addExpense(createExpenseInput());
      });

      expect(createdExpense).not.toBe(null);
      expect(createdExpense!.id).toBeDefined();
    });
  });

  describe("updateExpense", () => {
    it("updates an existing expense", () => {
      const { result } = renderHook(() => useExpenses());
      let expenseId: string = "";

      act(() => {
        const expense = result.current.addExpense(createExpenseInput());
        expenseId = expense.id;
      });

      act(() => {
        result.current.updateExpense(expenseId, { amount: 100 });
      });

      expect(result.current.expenses[0].amount).toBe(100);
    });

    it("returns true when expense found", () => {
      const { result } = renderHook(() => useExpenses());
      let expenseId: string = "";
      let updateResult = false;

      act(() => {
        const expense = result.current.addExpense(createExpenseInput());
        expenseId = expense.id;
      });

      act(() => {
        updateResult = result.current.updateExpense(expenseId, { amount: 100 });
      });

      expect(updateResult).toBe(true);
    });

    it("returns false when expense not found", () => {
      const { result } = renderHook(() => useExpenses());
      let updateResult = true;

      act(() => {
        updateResult = result.current.updateExpense("non-existent", {
          amount: 100,
        });
      });

      expect(updateResult).toBe(false);
    });
  });

  describe("deleteExpense", () => {
    it("removes an expense", () => {
      const { result } = renderHook(() => useExpenses());
      let expenseId: string = "";

      act(() => {
        const expense = result.current.addExpense(createExpenseInput());
        expenseId = expense.id;
      });

      act(() => {
        result.current.deleteExpense(expenseId);
      });

      expect(result.current.expenses).toHaveLength(0);
    });

    it("returns true when expense found", () => {
      const { result } = renderHook(() => useExpenses());
      let expenseId: string = "";
      let deleteResult = false;

      act(() => {
        const expense = result.current.addExpense(createExpenseInput());
        expenseId = expense.id;
      });

      act(() => {
        deleteResult = result.current.deleteExpense(expenseId);
      });

      expect(deleteResult).toBe(true);
    });

    it("returns false when expense not found", () => {
      const { result } = renderHook(() => useExpenses());
      let deleteResult = true;

      act(() => {
        deleteResult = result.current.deleteExpense("non-existent");
      });

      expect(deleteResult).toBe(false);
    });
  });

  describe("filtering", () => {
    it.skip("filters by search term", () => {
      const { result } = renderHook(() => useExpenses());

      act(() => {
        result.current.addExpense(createExpenseInput({ description: "Groceries" }));
      });

      act(() => {
        result.current.addExpense(createExpenseInput({ description: "Gas station" }));
      });

      act(() => {
        result.current.setFilter({ searchTerm: "grocery" });
      });

      expect(result.current.filteredExpenses).toHaveLength(1);
      expect(result.current.filteredExpenses[0].description).toBe("Groceries");
    });

    it("filters by category", () => {
      const { result } = renderHook(() => useExpenses());

      act(() => {
        result.current.addExpense(createExpenseInput({ category: "Food" }));
      });

      act(() => {
        result.current.addExpense(createExpenseInput({ category: "Transport" }));
      });

      act(() => {
        result.current.setFilter({ categories: ["Food"] });
      });

      expect(result.current.filteredExpenses).toHaveLength(1);
      expect(result.current.filteredExpenses[0].category).toBe("Food");
    });

    it("filters by amount range", () => {
      const { result } = renderHook(() => useExpenses());

      act(() => {
        result.current.addExpense(createExpenseInput({ amount: 25 }));
      });

      act(() => {
        result.current.addExpense(createExpenseInput({ amount: 75 }));
      });

      act(() => {
        result.current.addExpense(createExpenseInput({ amount: 150 }));
      });

      act(() => {
        result.current.setFilter({ minAmount: 50, maxAmount: 100 });
      });

      expect(result.current.filteredExpenses).toHaveLength(1);
      expect(result.current.filteredExpenses[0].amount).toBe(75);
    });

    it("clears filter", () => {
      const { result } = renderHook(() => useExpenses());

      act(() => {
        result.current.addExpense(createExpenseInput({ description: "First" }));
      });

      act(() => {
        result.current.addExpense(createExpenseInput({ description: "Second" }));
      });

      act(() => {
        result.current.setFilter({ searchTerm: "nonexistent" });
      });

      expect(result.current.filteredExpenses).toHaveLength(0);

      act(() => {
        result.current.clearFilter();
      });

      expect(result.current.filteredExpenses).toHaveLength(2);
    });
  });

  describe("stats", () => {
    it("calculates stats from filtered expenses", () => {
      const { result } = renderHook(() => useExpenses());

      act(() => {
        result.current.addExpense(createExpenseInput({ amount: 100 }));
      });

      act(() => {
        result.current.addExpense(createExpenseInput({ amount: 200 }));
      });

      act(() => {
        result.current.addExpense(createExpenseInput({ amount: 300 }));
      });

      expect(result.current.stats.totalExpenses).toBe(3);
      expect(result.current.stats.totalAmount).toBe(600);
      expect(result.current.stats.averageAmount).toBe(200);
    });

    it("identifies highest and lowest expenses", () => {
      const { result } = renderHook(() => useExpenses());

      act(() => {
        result.current.addExpense(createExpenseInput({ amount: 100 }));
      });

      act(() => {
        result.current.addExpense(createExpenseInput({ amount: 200 }));
      });

      act(() => {
        result.current.addExpense(createExpenseInput({ amount: 50 }));
      });

      expect(result.current.stats.highestExpense?.amount).toBe(200);
      expect(result.current.stats.lowestExpense?.amount).toBe(50);
    });
  });

  describe("clearAllExpenses", () => {
    it("removes all expenses", () => {
      const { result } = renderHook(() => useExpenses());

      act(() => {
        result.current.addExpense(createExpenseInput());
      });

      act(() => {
        result.current.addExpense(createExpenseInput());
      });

      act(() => {
        result.current.clearAllExpenses();
      });

      expect(result.current.expenses).toHaveLength(0);
    });
  });

  describe("importExpenses", () => {
    it("imports new expenses", () => {
      const { result } = renderHook(() => useExpenses());
      const newExpenses: Expense[] = [
        {
          id: "import-1",
          description: "Imported",
          amount: 100,
          category: "Food",
          date: "2024-01-15",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];

      act(() => {
        result.current.importExpenses(newExpenses);
      });

      expect(result.current.expenses).toHaveLength(1);
    });

    it("does not duplicate existing expenses", () => {
      const { result } = renderHook(() => useExpenses());
      let existingId = "";

      act(() => {
        const expense = result.current.addExpense(createExpenseInput());
        existingId = expense.id;
      });

      act(() => {
        result.current.importExpenses([
          {
            id: existingId,
            description: "Duplicate",
            amount: 100,
            category: "Food",
            date: "2024-01-15",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ]);
      });

      expect(result.current.expenses).toHaveLength(1);
    });
  });
});
