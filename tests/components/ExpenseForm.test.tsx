import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ExpenseForm } from "../../src/components/expenses/ExpenseForm";
import type { Expense } from "../../src/types";

describe("ExpenseForm", () => {
  const mockOnSubmit = vi.fn();
  const mockOnCancel = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all form fields", () => {
    render(<ExpenseForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
  });

  it("renders Add button for new expense", () => {
    render(<ExpenseForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    expect(screen.getByRole("button", { name: /add expense/i })).toBeInTheDocument();
  });

  it("renders Update button for existing expense", () => {
    const existingExpense: Expense = {
      id: "1",
      description: "Existing",
      amount: 100,
      category: "Food",
      date: "2024-01-15",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    render(
      <ExpenseForm
        expense={existingExpense}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    expect(screen.getByRole("button", { name: /update expense/i })).toBeInTheDocument();
  });

  it("populates fields with existing expense data", () => {
    const existingExpense: Expense = {
      id: "1",
      description: "Existing expense",
      amount: 150,
      category: "Transport",
      date: "2024-01-15",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    render(
      <ExpenseForm
        expense={existingExpense}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    expect(screen.getByLabelText(/description/i)).toHaveValue("Existing expense");
    expect(screen.getByLabelText(/amount/i)).toHaveValue("150");
  });

  it("calls onCancel when cancel button clicked", async () => {
    const user = userEvent.setup();
    render(<ExpenseForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    await user.click(screen.getByRole("button", { name: /cancel/i }));

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it.skip("shows validation errors for empty required fields", async () => {
    const user = userEvent.setup();
    render(<ExpenseForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    await user.click(screen.getByRole("button", { name: /add expense/i }));

    await waitFor(() => {
      expect(screen.getByText(/description is required/i)).toBeInTheDocument();
    });
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("submits valid form data", async () => {
    const user = userEvent.setup();
    render(<ExpenseForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    await user.type(screen.getByLabelText(/description/i), "Test expense");
    await user.type(screen.getByLabelText(/amount/i), "50");
    await user.selectOptions(screen.getByLabelText(/category/i), "Food");

    await user.click(screen.getByRole("button", { name: /add expense/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          description: "Test expense",
          amount: 50,
          category: "Food",
        })
      );
    });
  });

  it("validates amount is positive", async () => {
    const user = userEvent.setup();
    render(<ExpenseForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    await user.type(screen.getByLabelText(/description/i), "Test");
    await user.type(screen.getByLabelText(/amount/i), "0");
    await user.selectOptions(screen.getByLabelText(/category/i), "Food");

    await user.click(screen.getByRole("button", { name: /add expense/i }));

    await waitFor(() => {
      expect(screen.getByText(/amount must be at least/i)).toBeInTheDocument();
    });
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});
