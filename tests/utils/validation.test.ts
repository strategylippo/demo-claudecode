import { describe, it, expect } from "vitest";
import {
  sanitizeInput,
  sanitizeExpenseInput,
  escapeCSVField,
  validateDescription,
  validateAmount,
  validateCategory,
  validateDate,
  validateExpense,
} from "../../src/utils/validation";
import type { ExpenseInput } from "../../src/types";

describe("Sanitization", () => {
  describe("sanitizeInput", () => {
    it("removes script tags", () => {
      const malicious = '<script>alert("xss")</script>Hello';
      expect(sanitizeInput(malicious)).toBe("Hello");
    });

    it("removes HTML tags", () => {
      const html = "<div><p>Hello</p></div>";
      expect(sanitizeInput(html)).toBe("Hello");
    });

    it("preserves safe text", () => {
      expect(sanitizeInput("Normal text")).toBe("Normal text");
    });

    it("trims whitespace", () => {
      expect(sanitizeInput("  text  ")).toBe("text");
    });

    it("handles empty strings", () => {
      expect(sanitizeInput("")).toBe("");
    });
  });

  describe("sanitizeExpenseInput", () => {
    it("sanitizes description field", () => {
      const input: ExpenseInput = {
        description: '<script>bad</script>Groceries',
        amount: 50,
        category: "Food",
        date: "2024-01-15",
      };
      const sanitized = sanitizeExpenseInput(input);
      expect(sanitized.description).toBe("Groceries");
    });

    it("preserves other fields", () => {
      const input: ExpenseInput = {
        description: "Groceries",
        amount: 50,
        category: "Food",
        date: "2024-01-15",
      };
      const sanitized = sanitizeExpenseInput(input);
      expect(sanitized.amount).toBe(50);
      expect(sanitized.category).toBe("Food");
      expect(sanitized.date).toBe("2024-01-15");
    });
  });

  describe("escapeCSVField", () => {
    it("escapes fields with commas", () => {
      expect(escapeCSVField("hello, world")).toBe('"hello, world"');
    });

    it("escapes fields with quotes", () => {
      expect(escapeCSVField('say "hello"')).toBe('"say ""hello"""');
    });

    it("escapes fields with newlines", () => {
      expect(escapeCSVField("line1\nline2")).toBe('"line1\nline2"');
    });

    it("leaves simple fields unchanged", () => {
      expect(escapeCSVField("simple")).toBe("simple");
    });
  });
});

describe("Validation", () => {
  describe("validateDescription", () => {
    it("returns null for valid description", () => {
      expect(validateDescription("Grocery shopping")).toBe(null);
    });

    it("returns error for empty description", () => {
      expect(validateDescription("")).toBe("Description is required");
    });

    it("returns error for whitespace-only description", () => {
      expect(validateDescription("   ")).toBe("Description is required");
    });

    it("returns error for too long description", () => {
      const longText = "a".repeat(201);
      expect(validateDescription(longText)).toBe(
        "Description must be less than 200 characters"
      );
    });
  });

  describe("validateAmount", () => {
    it("returns null for valid amount", () => {
      expect(validateAmount(50)).toBe(null);
    });

    it("returns error for null amount", () => {
      expect(validateAmount(null)).toBe("Amount is required");
    });

    it("returns error for undefined amount", () => {
      expect(validateAmount(undefined)).toBe("Amount is required");
    });

    it("returns error for NaN", () => {
      expect(validateAmount(NaN)).toBe("Amount must be a valid number");
    });

    it("returns error for amount below minimum", () => {
      expect(validateAmount(0)).toBe("Amount must be at least $0.01");
    });

    it("returns error for amount above maximum", () => {
      expect(validateAmount(2000000)).toBe("Amount cannot exceed $1,000,000");
    });
  });

  describe("validateCategory", () => {
    it("returns null for valid category", () => {
      expect(validateCategory("Food")).toBe(null);
    });

    it("returns error for empty category", () => {
      expect(validateCategory("")).toBe("Category is required");
    });

    it("returns error for invalid category", () => {
      expect(validateCategory("InvalidCategory")).toBe("Category is required");
    });
  });

  describe("validateDate", () => {
    it("returns null for valid date", () => {
      expect(validateDate("2024-01-15")).toBe(null);
    });

    it("returns error for empty date", () => {
      expect(validateDate("")).toBe("Date is required");
    });

    it("returns error for invalid date format", () => {
      expect(validateDate("invalid-date")).toBe("Invalid date format");
    });
  });

  describe("validateExpense", () => {
    it("returns valid for complete expense", () => {
      const expense: ExpenseInput = {
        description: "Groceries",
        amount: 50,
        category: "Food",
        date: "2024-01-15",
      };
      const result = validateExpense(expense);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("collects all errors", () => {
      const expense: ExpenseInput = {
        description: "",
        amount: 0,
        category: "" as "Food",
        date: "",
      };
      const result = validateExpense(expense);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it("includes field names in errors", () => {
      const expense: ExpenseInput = {
        description: "",
        amount: 50,
        category: "Food",
        date: "2024-01-15",
      };
      const result = validateExpense(expense);
      expect(result.errors[0].field).toBe("description");
    });
  });
});
