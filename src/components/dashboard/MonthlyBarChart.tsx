import { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import type { MonthlyTrend } from "../../types";
import { formatCurrency } from "../../utils";
import { Card, CardHeader } from "../common";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface MonthlyBarChartProps {
  trends: MonthlyTrend[];
}

export function MonthlyBarChart({ trends }: MonthlyBarChartProps) {
  const chartData = useMemo(() => {
    const sortedTrends = [...trends].slice(-6);

    return {
      labels: sortedTrends.map((t) => t.label),
      datasets: [
        {
          label: "Monthly Spending",
          data: sortedTrends.map((t) => t.total),
          backgroundColor: "rgba(59, 130, 246, 0.8)",
          borderColor: "rgb(59, 130, 246)",
          borderWidth: 1,
          borderRadius: 4,
        },
      ],
    };
  }, [trends]);

  const chartOptions: ChartOptions<"bar"> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const value = context.parsed.y;
              return value !== null ? formatCurrency(value) : "";
            },
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value) => {
              if (typeof value === "number") {
                return formatCurrency(value);
              }
              return String(value);
            },
          },
        },
      },
    }),
    []
  );

  if (trends.length === 0) {
    return (
      <Card>
        <CardHeader title="Monthly Trends" />
        <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
          No data to display
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader title="Monthly Trends" subtitle="Last 6 months" />
      <div className="h-64">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </Card>
  );
}
