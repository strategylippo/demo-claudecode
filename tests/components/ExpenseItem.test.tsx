import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ExpenseItem } from "../../src/components/expenses/ExpenseItem";
import type { Expense } from "../../src/types";

const mockExpense: Expense = {
  id: "1",
  description: "Grocery shopping",
  amount: 127.45,
  category: "Food",
  date: "2024-01-15",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe("ExpenseItem", () => {
  it("renders expense description", () => {
    render(
      <ExpenseItem
        expense={mockExpense}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(screen.getByText("Grocery shopping")).toBeInTheDocument();
  });

  it("renders formatted amount", () => {
    render(
      <ExpenseItem
        expense={mockExpense}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(screen.getByText("$127.45")).toBeInTheDocument();
  });

  it("renders category badge", () => {
    render(
      <ExpenseItem
        expense={mockExpense}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(screen.getByText("Food")).toBeInTheDocument();
  });

  it("renders formatted date", () => {
    render(
      <ExpenseItem
        expense={mockExpense}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(screen.getByText("Jan 15, 2024")).toBeInTheDocument();
  });

  it("calls onEdit when edit button clicked", async () => {
    const user = userEvent.setup();
    const mockOnEdit = vi.fn();

    render(
      <ExpenseItem
        expense={mockExpense}
        onEdit={mockOnEdit}
        onDelete={vi.fn()}
      />
    );

    await user.click(
      screen.getByRole("button", { name: /edit grocery shopping/i })
    );

    expect(mockOnEdit).toHaveBeenCalledTimes(1);
  });

  it("calls onDelete when delete button clicked", async () => {
    const user = userEvent.setup();
    const mockOnDelete = vi.fn();

    render(
      <ExpenseItem
        expense={mockExpense}
        onEdit={vi.fn()}
        onDelete={mockOnDelete}
      />
    );

    await user.click(
      screen.getByRole("button", { name: /delete grocery shopping/i })
    );

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  it("displays category icon", () => {
    render(
      <ExpenseItem
        expense={mockExpense}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    // Food category has burger emoji
    expect(screen.getByText("🍔")).toBeInTheDocument();
  });

  it("renders different category colors", () => {
    const transportExpense: Expense = {
      ...mockExpense,
      category: "Transport",
    };

    render(
      <ExpenseItem
        expense={transportExpense}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(screen.getByText("Transport")).toBeInTheDocument();
    expect(screen.getByText("🚗")).toBeInTheDocument();
  });
});
