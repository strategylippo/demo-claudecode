export const VALIDATION_LIMITS = {
  DESCRIPTION_MIN_LENGTH: 1,
  DESCRIPTION_MAX_LENGTH: 200,
  AMOUNT_MIN: 0.01,
  AMOUNT_MAX: 1_000_000,
  AMOUNT_DECIMAL_PLACES: 2,
} as const;

export const VALIDATION_MESSAGES = {
  DESCRIPTION_REQUIRED: "Description is required",
  DESCRIPTION_TOO_LONG: `Description must be less than ${VALIDATION_LIMITS.DESCRIPTION_MAX_LENGTH} characters`,
  AMOUNT_REQUIRED: "Amount is required",
  AMOUNT_INVALID: "Amount must be a valid number",
  AMOUNT_TOO_LOW: `Amount must be at least $${VALIDATION_LIMITS.AMOUNT_MIN.toFixed(2)}`,
  AMOUNT_TOO_HIGH: `Amount cannot exceed $${VALIDATION_LIMITS.AMOUNT_MAX.toLocaleString()}`,
  CATEGORY_REQUIRED: "Category is required",
  DATE_REQUIRED: "Date is required",
  DATE_INVALID: "Invalid date format",
} as const;
