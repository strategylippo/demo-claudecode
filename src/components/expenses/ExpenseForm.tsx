import { useState, useEffect, type FormEvent } from "react";
import type { Expense, ExpenseInput, ExpenseCategory } from "../../types";
import { EXPENSE_CATEGORIES } from "../../types";
import { CATEGORY_CONFIG } from "../../constants";
import { validateExpense, getTodayString, type ValidationError } from "../../utils";
import { Button, Input, Select } from "../common";

interface ExpenseFormProps {
  expense?: Expense;
  onSubmit: (expense: ExpenseInput) => void;
  onCancel: () => void;
}

const categoryOptions = EXPENSE_CATEGORIES.map((category) => ({
  value: category,
  label: `${CATEGORY_CONFIG[category].icon} ${category}`,
}));

export function ExpenseForm({ expense, onSubmit, onCancel }: ExpenseFormProps) {
  const [description, setDescription] = useState(expense?.description ?? "");
  const [amount, setAmount] = useState(expense?.amount?.toString() ?? "");
  const [category, setCategory] = useState<ExpenseCategory | "">(
    expense?.category ?? ""
  );
  const [date, setDate] = useState(expense?.date ?? getTodayString());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (expense) {
      setDescription(expense.description);
      setAmount(expense.amount.toString());
      setCategory(expense.category);
      setDate(expense.date);
    }
  }, [expense]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const parsedAmount = parseFloat(amount);
    const expenseInput: ExpenseInput = {
      description: description.trim(),
      amount: isNaN(parsedAmount) ? 0 : parsedAmount,
      category: category as ExpenseCategory,
      date,
    };

    const validation = validateExpense(expenseInput);

    if (!validation.isValid) {
      const errorMap: Record<string, string> = {};
      validation.errors.forEach((error: ValidationError) => {
        errorMap[error.field] = error.message;
      });
      setErrors(errorMap);
      setIsSubmitting(false);
      return;
    }

    setErrors({});
    onSubmit(expenseInput);
    setIsSubmitting(false);
  };

  const handleAmountChange = (value: string) => {
    const cleaned = value.replace(/[^0-9.]/g, "");
    const parts = cleaned.split(".");
    if (parts.length > 2) {
      return;
    }
    if (parts[1] && parts[1].length > 2) {
      return;
    }
    setAmount(cleaned);
    if (errors.amount) {
      setErrors((prev) => ({ ...prev, amount: "" }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Description"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
          if (errors.description) {
            setErrors((prev) => ({ ...prev, description: "" }));
          }
        }}
        error={errors.description}
        placeholder="What did you spend on?"
        autoFocus
        required
      />

      <Input
        label="Amount"
        type="text"
        inputMode="decimal"
        value={amount}
        onChange={(e) => handleAmountChange(e.target.value)}
        error={errors.amount}
        placeholder="0.00"
        leftIcon={
          <span className="text-gray-500 dark:text-gray-400 font-medium">$</span>
        }
        required
      />

      <Select
        label="Category"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value as ExpenseCategory);
          if (errors.category) {
            setErrors((prev) => ({ ...prev, category: "" }));
          }
        }}
        options={categoryOptions}
        error={errors.category}
        placeholder="Select a category"
        required
      />

      <Input
        label="Date"
        type="date"
        value={date}
        onChange={(e) => {
          setDate(e.target.value);
          if (errors.date) {
            setErrors((prev) => ({ ...prev, date: "" }));
          }
        }}
        error={errors.date}
        max={getTodayString()}
        required
      />

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          {expense ? "Update" : "Add"} Expense
        </Button>
      </div>
    </form>
  );
}
