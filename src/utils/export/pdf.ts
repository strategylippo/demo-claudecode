import { jsPDF } from "jspdf";
import type { Expense, ExpenseStats } from "../../types";
import { formatCurrency, formatDate } from "../formatting";

const MARGIN = 20;
const LINE_HEIGHT = 7;
const PAGE_WIDTH = 210;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

export function generateExpensePDF(
  expenses: Expense[],
  stats: ExpenseStats,
  title = "Expense Report"
): jsPDF {
  const doc = new jsPDF();
  let yPosition = MARGIN;

  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text(title, MARGIN, yPosition);
  yPosition += LINE_HEIGHT * 2;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Generated: ${formatDate(new Date().toISOString())}`, MARGIN, yPosition);
  yPosition += LINE_HEIGHT * 2;

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Summary", MARGIN, yPosition);
  yPosition += LINE_HEIGHT;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  const summaryItems = [
    `Total Expenses: ${stats.totalExpenses}`,
    `Total Amount: ${formatCurrency(stats.totalAmount)}`,
    `Average Amount: ${formatCurrency(stats.averageAmount)}`,
  ];

  for (const item of summaryItems) {
    doc.text(item, MARGIN, yPosition);
    yPosition += LINE_HEIGHT;
  }

  if (stats.highestExpense) {
    doc.text(
      `Highest: ${formatCurrency(stats.highestExpense.amount)} (${stats.highestExpense.description})`,
      MARGIN,
      yPosition
    );
    yPosition += LINE_HEIGHT;
  }

  if (stats.lowestExpense) {
    doc.text(
      `Lowest: ${formatCurrency(stats.lowestExpense.amount)} (${stats.lowestExpense.description})`,
      MARGIN,
      yPosition
    );
    yPosition += LINE_HEIGHT;
  }

  yPosition += LINE_HEIGHT;

  if (stats.categoryBreakdown.length > 0) {
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Category Breakdown", MARGIN, yPosition);
    yPosition += LINE_HEIGHT;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    for (const category of stats.categoryBreakdown) {
      const text = `${category.category}: ${formatCurrency(category.total)} (${category.percentage.toFixed(1)}%)`;
      doc.text(text, MARGIN, yPosition);
      yPosition += LINE_HEIGHT;

      if (yPosition > 270) {
        doc.addPage();
        yPosition = MARGIN;
      }
    }

    yPosition += LINE_HEIGHT;
  }

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Expense Details", MARGIN, yPosition);
  yPosition += LINE_HEIGHT;

  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");

  const colWidths = {
    date: 30,
    description: 70,
    category: 35,
    amount: 30,
  };

  doc.text("Date", MARGIN, yPosition);
  doc.text("Description", MARGIN + colWidths.date, yPosition);
  doc.text("Category", MARGIN + colWidths.date + colWidths.description, yPosition);
  doc.text(
    "Amount",
    MARGIN + colWidths.date + colWidths.description + colWidths.category,
    yPosition
  );
  yPosition += LINE_HEIGHT;

  doc.setLineWidth(0.5);
  doc.line(MARGIN, yPosition - 3, MARGIN + CONTENT_WIDTH, yPosition - 3);

  doc.setFont("helvetica", "normal");

  for (const expense of expenses) {
    if (yPosition > 270) {
      doc.addPage();
      yPosition = MARGIN;

      doc.setFont("helvetica", "bold");
      doc.text("Date", MARGIN, yPosition);
      doc.text("Description", MARGIN + colWidths.date, yPosition);
      doc.text("Category", MARGIN + colWidths.date + colWidths.description, yPosition);
      doc.text(
        "Amount",
        MARGIN + colWidths.date + colWidths.description + colWidths.category,
        yPosition
      );
      yPosition += LINE_HEIGHT;
      doc.line(MARGIN, yPosition - 3, MARGIN + CONTENT_WIDTH, yPosition - 3);
      doc.setFont("helvetica", "normal");
    }

    const shortDate = expense.date.substring(5);
    doc.text(shortDate, MARGIN, yPosition);

    const maxDescLength = 40;
    const description =
      expense.description.length > maxDescLength
        ? expense.description.substring(0, maxDescLength - 3) + "..."
        : expense.description;
    doc.text(description, MARGIN + colWidths.date, yPosition);

    doc.text(expense.category, MARGIN + colWidths.date + colWidths.description, yPosition);
    doc.text(
      formatCurrency(expense.amount),
      MARGIN + colWidths.date + colWidths.description + colWidths.category,
      yPosition
    );
    yPosition += LINE_HEIGHT;
  }

  return doc;
}

export function downloadPDF(
  expenses: Expense[],
  stats: ExpenseStats,
  filename = "expense-report"
): void {
  const doc = generateExpensePDF(expenses, stats);
  doc.save(`${filename}.pdf`);
}
