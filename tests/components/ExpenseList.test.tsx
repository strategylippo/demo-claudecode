import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ExpenseList } from "../../src/components/expenses/ExpenseList";
import type { Expense } from "../../src/types";

const mockExpenses: Expense[] = [
  {
    id: "1",
    description: "Grocery shopping",
    amount: 127.45,
    category: "Food",
    date: "2024-01-15",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    description: "Gas station",
    amount: 52.3,
    category: "Transport",
    date: "2024-01-18",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

describe("ExpenseList", () => {
  it("renders all expenses", () => {
    render(
      <ExpenseList
        expenses={mockExpenses}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(screen.getByText("Grocery shopping")).toBeInTheDocument();
    expect(screen.getByText("Gas station")).toBeInTheDocument();
  });

  it("renders empty state when no expenses", () => {
    render(
      <ExpenseList expenses={[]} onEdit={vi.fn()} onDelete={vi.fn()} />
    );

    expect(screen.getByText(/no expenses found/i)).toBeInTheDocument();
  });

  it("renders custom empty message", () => {
    render(
      <ExpenseList
        expenses={[]}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        emptyMessage="No matching expenses"
      />
    );

    expect(screen.getByText("No matching expenses")).toBeInTheDocument();
  });

  it("calls onEdit with correct expense", async () => {
    const user = userEvent.setup();
    const mockOnEdit = vi.fn();

    render(
      <ExpenseList
        expenses={mockExpenses}
        onEdit={mockOnEdit}
        onDelete={vi.fn()}
      />
    );

    await user.click(
      screen.getByRole("button", { name: /edit grocery shopping/i })
    );

    expect(mockOnEdit).toHaveBeenCalledWith(mockExpenses[0]);
  });

  it("calls onDelete with correct id", async () => {
    const user = userEvent.setup();
    const mockOnDelete = vi.fn();

    render(
      <ExpenseList
        expenses={mockExpenses}
        onEdit={vi.fn()}
        onDelete={mockOnDelete}
      />
    );

    await user.click(
      screen.getByRole("button", { name: /delete gas station/i })
    );

    expect(mockOnDelete).toHaveBeenCalledWith("2");
  });

  it("renders correct number of expense items", () => {
    render(
      <ExpenseList
        expenses={mockExpenses}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    const amounts = screen.getAllByText(/\$/);
    expect(amounts).toHaveLength(2);
  });
});
