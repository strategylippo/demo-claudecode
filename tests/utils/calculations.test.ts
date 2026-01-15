import { describe, it, expect } from "vitest";
import {
  calculateTotal,
  calculateCount,
  findHighestExpense,
  findLowestExpense,
  calculateAverage,
  calculateMedian,
  calculateCategoryBreakdown,
  calculateMonthlyTrends,
  getCategoryTotal,
  getCategoryCount,
} from "../../src/utils/calculations";
import type { Expense } from "../../src/types";

const createExpense = (
  id: string,
  amount: number,
  category: Expense["category"],
  date: string
): Expense => ({
  id,
  description: `Expense ${id}`,
  amount,
  category,
  date,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

const sampleExpenses: Expense[] = [
  createExpense("1", 100, "Food", "2024-01-15"),
  createExpense("2", 50, "Transport", "2024-01-20"),
  createExpense("3", 200, "Food", "2024-02-10"),
  createExpense("4", 75, "Entertainment", "2024-02-15"),
  createExpense("5", 25, "Food", "2024-03-01"),
];

describe("Totals", () => {
  describe("calculateTotal", () => {
    it("calculates total of all expenses", () => {
      expect(calculateTotal(sampleExpenses)).toBe(450);
    });

    it("returns 0 for empty array", () => {
      expect(calculateTotal([])).toBe(0);
    });
  });

  describe("calculateCount", () => {
    it("returns number of expenses", () => {
      expect(calculateCount(sampleExpenses)).toBe(5);
    });

    it("returns 0 for empty array", () => {
      expect(calculateCount([])).toBe(0);
    });
  });

  describe("findHighestExpense", () => {
    it("finds expense with highest amount", () => {
      const highest = findHighestExpense(sampleExpenses);
      expect(highest?.amount).toBe(200);
      expect(highest?.id).toBe("3");
    });

    it("returns null for empty array", () => {
      expect(findHighestExpense([])).toBe(null);
    });
  });

  describe("findLowestExpense", () => {
    it("finds expense with lowest amount", () => {
      const lowest = findLowestExpense(sampleExpenses);
      expect(lowest?.amount).toBe(25);
      expect(lowest?.id).toBe("5");
    });

    it("returns null for empty array", () => {
      expect(findLowestExpense([])).toBe(null);
    });
  });
});

describe("Averages", () => {
  describe("calculateAverage", () => {
    it("calculates average of all expenses", () => {
      expect(calculateAverage(sampleExpenses)).toBe(90);
    });

    it("returns 0 for empty array", () => {
      expect(calculateAverage([])).toBe(0);
    });
  });

  describe("calculateMedian", () => {
    it("calculates median for odd number of expenses", () => {
      expect(calculateMedian(sampleExpenses)).toBe(75);
    });

    it("calculates median for even number of expenses", () => {
      const evenExpenses = sampleExpenses.slice(0, 4);
      expect(calculateMedian(evenExpenses)).toBe(87.5);
    });

    it("returns 0 for empty array", () => {
      expect(calculateMedian([])).toBe(0);
    });
  });
});

describe("Category Calculations", () => {
  describe("calculateCategoryBreakdown", () => {
    it("groups expenses by category", () => {
      const breakdown = calculateCategoryBreakdown(sampleExpenses);
      const foodCategory = breakdown.find((b) => b.category === "Food");
      expect(foodCategory?.count).toBe(3);
      expect(foodCategory?.total).toBe(325);
    });

    it("calculates percentages", () => {
      const breakdown = calculateCategoryBreakdown(sampleExpenses);
      const foodCategory = breakdown.find((b) => b.category === "Food");
      expect(foodCategory?.percentage).toBeCloseTo(72.22, 1);
    });

    it("sorts by total descending", () => {
      const breakdown = calculateCategoryBreakdown(sampleExpenses);
      expect(breakdown[0].category).toBe("Food");
    });

    it("returns empty array for empty expenses", () => {
      expect(calculateCategoryBreakdown([])).toHaveLength(0);
    });
  });

  describe("getCategoryTotal", () => {
    it("returns total for specific category", () => {
      expect(getCategoryTotal(sampleExpenses, "Food")).toBe(325);
    });

    it("returns 0 for category with no expenses", () => {
      expect(getCategoryTotal(sampleExpenses, "Health")).toBe(0);
    });
  });

  describe("getCategoryCount", () => {
    it("returns count for specific category", () => {
      expect(getCategoryCount(sampleExpenses, "Food")).toBe(3);
    });

    it("returns 0 for category with no expenses", () => {
      expect(getCategoryCount(sampleExpenses, "Health")).toBe(0);
    });
  });
});

describe("Monthly Trends", () => {
  describe("calculateMonthlyTrends", () => {
    it("groups expenses by month", () => {
      const trends = calculateMonthlyTrends(sampleExpenses);
      expect(trends.length).toBe(3);
    });

    it("calculates totals per month", () => {
      const trends = calculateMonthlyTrends(sampleExpenses);
      const janTrend = trends.find(
        (t) => t.month === "Jan" && t.year === 2024
      );
      expect(janTrend?.total).toBe(150);
    });

    it("sorts by date ascending", () => {
      const trends = calculateMonthlyTrends(sampleExpenses);
      expect(trends[0].month).toBe("Jan");
      expect(trends[trends.length - 1].month).toBe("Mar");
    });

    it("returns empty array for empty expenses", () => {
      expect(calculateMonthlyTrends([])).toHaveLength(0);
    });
  });
});
