import { v4 as uuidv4 } from "uuid";
import type { Expense } from "../types";

const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = now.getMonth();

function createDate(monthsAgo: number, day: number): string {
  const date = new Date(currentYear, currentMonth - monthsAgo, day);
  return date.toISOString().split("T")[0];
}

function createExpense(
  description: string,
  amount: number,
  category: Expense["category"],
  monthsAgo: number,
  day: number
): Expense {
  const timestamp = new Date().toISOString();
  return {
    id: uuidv4(),
    description,
    amount,
    category,
    date: createDate(monthsAgo, day),
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

export const sampleExpenses: Expense[] = [
  createExpense("Grocery shopping at Whole Foods", 127.45, "Food", 0, 12),
  createExpense("Monthly gym membership", 49.99, "Health", 0, 1),
  createExpense("Uber ride to downtown", 23.5, "Transport", 0, 8),
  createExpense("Netflix subscription", 15.99, "Entertainment", 0, 5),
  createExpense("Electricity bill", 85.2, "Utilities", 0, 15),
  createExpense("New running shoes", 129.0, "Shopping", 0, 3),
  createExpense("Coffee at Starbucks", 6.75, "Food", 0, 10),

  createExpense("Restaurant dinner", 78.9, "Food", 1, 22),
  createExpense("Gas station fill-up", 52.3, "Transport", 1, 18),
  createExpense("Movie tickets", 32.0, "Entertainment", 1, 25),
  createExpense("Internet bill", 69.99, "Utilities", 1, 10),
  createExpense("Weekend trip hotel", 189.0, "Travel", 1, 15),
  createExpense("Pharmacy prescription", 24.5, "Health", 1, 8),
  createExpense("Amazon order - books", 45.67, "Shopping", 1, 28),

  createExpense("Lunch with colleagues", 34.2, "Food", 2, 12),
  createExpense("Bus monthly pass", 75.0, "Transport", 2, 1),
  createExpense("Concert tickets", 95.0, "Entertainment", 2, 20),
  createExpense("Water bill", 42.15, "Utilities", 2, 5),
  createExpense("Dentist checkup", 150.0, "Health", 2, 17),
  createExpense("Birthday gift", 65.0, "Shopping", 2, 24),

  createExpense("Pizza delivery", 28.5, "Food", 3, 8),
  createExpense("Parking fee downtown", 15.0, "Transport", 3, 14),
  createExpense("Spotify annual subscription", 99.0, "Entertainment", 3, 3),
  createExpense("Phone bill", 55.0, "Utilities", 3, 20),
  createExpense("Flight tickets for vacation", 320.0, "Travel", 3, 10),
  createExpense("Winter jacket", 145.0, "Shopping", 3, 28),

  createExpense("Weekly groceries", 98.76, "Food", 4, 5),
  createExpense("Car maintenance", 210.0, "Transport", 4, 22),
  createExpense("Museum visit", 25.0, "Entertainment", 4, 16),
  createExpense("Gas bill", 78.3, "Utilities", 4, 12),
  createExpense("Yoga classes package", 120.0, "Health", 4, 2),

  createExpense("Sushi restaurant", 56.8, "Food", 5, 18),
  createExpense("Train tickets", 42.0, "Transport", 5, 25),
  createExpense("Streaming service", 12.99, "Entertainment", 5, 8),
  createExpense("Airbnb weekend getaway", 175.0, "Travel", 5, 12),
  createExpense("Miscellaneous supplies", 33.45, "Other", 5, 30),
];
