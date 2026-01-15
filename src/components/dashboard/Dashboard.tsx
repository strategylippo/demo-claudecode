import type { ExpenseStats } from "../../types";
import { formatCurrency } from "../../utils";
import { Card } from "../common";
import { CategoryPieChart } from "./CategoryPieChart";
import { MonthlyBarChart } from "./MonthlyBarChart";

interface DashboardProps {
  stats: ExpenseStats;
}

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ReactNode;
  colorClass: string;
}

function StatCard({ title, value, subtitle, icon, colorClass }: StatCardProps) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </p>
          <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-gray-100">
            {value}
          </p>
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colorClass}`}>{icon}</div>
      </div>
    </Card>
  );
}

export function Dashboard({ stats }: DashboardProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Spent"
          value={formatCurrency(stats.totalAmount)}
          subtitle={`${stats.totalExpenses} expenses`}
          colorClass="bg-primary-100 dark:bg-primary-900/30"
          icon={
            <svg
              className="w-6 h-6 text-primary-600 dark:text-primary-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        />

        <StatCard
          title="Average Expense"
          value={formatCurrency(stats.averageAmount)}
          colorClass="bg-green-100 dark:bg-green-900/30"
          icon={
            <svg
              className="w-6 h-6 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          }
        />

        <StatCard
          title="Highest Expense"
          value={
            stats.highestExpense
              ? formatCurrency(stats.highestExpense.amount)
              : "$0.00"
          }
          subtitle={stats.highestExpense?.description}
          colorClass="bg-red-100 dark:bg-red-900/30"
          icon={
            <svg
              className="w-6 h-6 text-red-600 dark:text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          }
        />

        <StatCard
          title="Lowest Expense"
          value={
            stats.lowestExpense
              ? formatCurrency(stats.lowestExpense.amount)
              : "$0.00"
          }
          subtitle={stats.lowestExpense?.description}
          colorClass="bg-amber-100 dark:bg-amber-900/30"
          icon={
            <svg
              className="w-6 h-6 text-amber-600 dark:text-amber-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
              />
            </svg>
          }
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryPieChart breakdown={stats.categoryBreakdown} />
        <MonthlyBarChart trends={stats.monthlyTrends} />
      </div>
    </div>
  );
}
