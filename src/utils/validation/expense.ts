import { VALIDATION_LIMITS, VALIDATION_MESSAGES } from "../../constants";
import { EXPENSE_CATEGORIES, type ExpenseInput } from "../../types";
import { isValidDateString } from "../formatting";

export interface ValidationError {
  field: keyof ExpenseInput;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export function validateDescription(description: string): string | null {
  const trimmed = description.trim();

  if (trimmed.length < VALIDATION_LIMITS.DESCRIPTION_MIN_LENGTH) {
    return VALIDATION_MESSAGES.DESCRIPTION_REQUIRED;
  }

  if (trimmed.length > VALIDATION_LIMITS.DESCRIPTION_MAX_LENGTH) {
    return VALIDATION_MESSAGES.DESCRIPTION_TOO_LONG;
  }

  return null;
}

export function validateAmount(amount: number | null | undefined): string | null {
  if (amount === null || amount === undefined) {
    return VALIDATION_MESSAGES.AMOUNT_REQUIRED;
  }

  if (isNaN(amount)) {
    return VALIDATION_MESSAGES.AMOUNT_INVALID;
  }

  if (amount < VALIDATION_LIMITS.AMOUNT_MIN) {
    return VALIDATION_MESSAGES.AMOUNT_TOO_LOW;
  }

  if (amount > VALIDATION_LIMITS.AMOUNT_MAX) {
    return VALIDATION_MESSAGES.AMOUNT_TOO_HIGH;
  }

  return null;
}

export function validateCategory(category: string): string | null {
  if (!category) {
    return VALIDATION_MESSAGES.CATEGORY_REQUIRED;
  }

  if (!EXPENSE_CATEGORIES.includes(category as (typeof EXPENSE_CATEGORIES)[number])) {
    return VALIDATION_MESSAGES.CATEGORY_REQUIRED;
  }

  return null;
}

export function validateDate(date: string): string | null {
  if (!date) {
    return VALIDATION_MESSAGES.DATE_REQUIRED;
  }

  if (!isValidDateString(date)) {
    return VALIDATION_MESSAGES.DATE_INVALID;
  }

  return null;
}

export function validateExpense(expense: ExpenseInput): ValidationResult {
  const errors: ValidationError[] = [];

  const descriptionError = validateDescription(expense.description);
  if (descriptionError) {
    errors.push({ field: "description", message: descriptionError });
  }

  const amountError = validateAmount(expense.amount);
  if (amountError) {
    errors.push({ field: "amount", message: amountError });
  }

  const categoryError = validateCategory(expense.category);
  if (categoryError) {
    errors.push({ field: "category", message: categoryError });
  }

  const dateError = validateDate(expense.date);
  if (dateError) {
    errors.push({ field: "date", message: dateError });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
