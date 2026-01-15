import { describe, it, expect } from "vitest";
import {
  formatCurrency,
  parseCurrencyInput,
  formatCompactCurrency,
  formatDate,
  formatShortDate,
  formatMonthYear,
  formatInputDate,
  isValidDateString,
  getTodayString,
  isDateInRange,
} from "../../src/utils/formatting";

describe("Currency Formatting", () => {
  describe("formatCurrency", () => {
    it("formats positive numbers correctly", () => {
      expect(formatCurrency(1234.56)).toBe("$1,234.56");
    });

    it("formats zero correctly", () => {
      expect(formatCurrency(0)).toBe("$0.00");
    });

    it("formats negative numbers correctly", () => {
      expect(formatCurrency(-100)).toBe("-$100.00");
    });

    it("rounds to two decimal places", () => {
      expect(formatCurrency(10.999)).toBe("$11.00");
    });

    it("handles large numbers", () => {
      expect(formatCurrency(1000000)).toBe("$1,000,000.00");
    });
  });

  describe("parseCurrencyInput", () => {
    it("parses clean number strings", () => {
      expect(parseCurrencyInput("123.45")).toBe(123.45);
    });

    it("removes currency symbols", () => {
      expect(parseCurrencyInput("$123.45")).toBe(123.45);
    });

    it("removes commas", () => {
      expect(parseCurrencyInput("1,234.56")).toBe(1234.56);
    });

    it("returns null for invalid input", () => {
      expect(parseCurrencyInput("abc")).toBe(null);
    });

    it("returns null for empty string", () => {
      expect(parseCurrencyInput("")).toBe(null);
    });
  });

  describe("formatCompactCurrency", () => {
    it("formats millions", () => {
      expect(formatCompactCurrency(1500000)).toBe("$1.5M");
    });

    it("formats thousands", () => {
      expect(formatCompactCurrency(2500)).toBe("$2.5K");
    });

    it("formats regular amounts", () => {
      expect(formatCompactCurrency(999)).toBe("$999.00");
    });
  });
});

describe("Date Formatting", () => {
  describe("formatDate", () => {
    it("formats ISO date strings", () => {
      expect(formatDate("2024-01-15")).toBe("Jan 15, 2024");
    });

    it("returns 'Invalid date' for invalid input", () => {
      expect(formatDate("not-a-date")).toBe("Invalid date");
    });
  });

  describe("formatShortDate", () => {
    it("formats to short date format", () => {
      expect(formatShortDate("2024-01-15")).toBe("01/15/24");
    });
  });

  describe("formatMonthYear", () => {
    it("formats to month and year", () => {
      expect(formatMonthYear("2024-01-15")).toBe("Jan 2024");
    });
  });

  describe("formatInputDate", () => {
    it("formats to input-compatible format", () => {
      expect(formatInputDate("2024-01-15")).toBe("2024-01-15");
    });

    it("returns empty string for invalid date", () => {
      expect(formatInputDate("invalid")).toBe("");
    });
  });

  describe("isValidDateString", () => {
    it("returns true for valid dates", () => {
      expect(isValidDateString("2024-01-15")).toBe(true);
    });

    it("returns false for invalid dates", () => {
      expect(isValidDateString("not-a-date")).toBe(false);
    });
  });

  describe("getTodayString", () => {
    it("returns a valid date string", () => {
      const today = getTodayString();
      expect(isValidDateString(today)).toBe(true);
    });

    it("returns date in YYYY-MM-DD format", () => {
      const today = getTodayString();
      expect(today).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  describe("isDateInRange", () => {
    it("returns true when date is in range", () => {
      expect(isDateInRange("2024-01-15", "2024-01-01", "2024-01-31")).toBe(true);
    });

    it("returns false when date is before range", () => {
      expect(isDateInRange("2023-12-31", "2024-01-01", "2024-01-31")).toBe(false);
    });

    it("returns false when date is after range", () => {
      expect(isDateInRange("2024-02-01", "2024-01-01", "2024-01-31")).toBe(false);
    });

    it("returns true when no range is specified", () => {
      expect(isDateInRange("2024-01-15", null, null)).toBe(true);
    });

    it("handles open-ended ranges", () => {
      expect(isDateInRange("2024-01-15", "2024-01-01", null)).toBe(true);
      expect(isDateInRange("2024-01-15", null, "2024-01-31")).toBe(true);
    });
  });
});
