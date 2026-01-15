import { useMemo } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import type { CategoryBreakdown } from "../../types";
import { formatCurrency } from "../../utils";
import { Card, CardHeader } from "../common";

ChartJS.register(ArcElement, Tooltip, Legend);

interface CategoryPieChartProps {
  breakdown: CategoryBreakdown[];
}

export function CategoryPieChart({ breakdown }: CategoryPieChartProps) {
  const chartData = useMemo(() => {
    return {
      labels: breakdown.map((b) => b.category),
      datasets: [
        {
          data: breakdown.map((b) => b.total),
          backgroundColor: breakdown.map((b) => b.color),
          borderColor: breakdown.map((b) => b.color),
          borderWidth: 1,
        },
      ],
    };
  }, [breakdown]);

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom" as const,
          labels: {
            padding: 16,
            usePointStyle: true,
            pointStyle: "circle",
          },
        },
        tooltip: {
          callbacks: {
            label: (context: { label: string; parsed: number }) => {
              const value = context.parsed;
              const total = breakdown.reduce((sum, b) => sum + b.total, 0);
              const percentage = ((value / total) * 100).toFixed(1);
              return `${context.label}: ${formatCurrency(value)} (${percentage}%)`;
            },
          },
        },
      },
    }),
    [breakdown]
  );

  if (breakdown.length === 0) {
    return (
      <Card>
        <CardHeader title="Spending by Category" />
        <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
          No data to display
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader title="Spending by Category" />
      <div className="h-64">
        <Pie data={chartData} options={chartOptions} />
      </div>
    </Card>
  );
}
