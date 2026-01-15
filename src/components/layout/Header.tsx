import { type ReactNode } from "react";
import { DarkModeToggle } from "./DarkModeToggle";

interface HeaderProps {
  actions?: ReactNode;
}

export function Header({ actions }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
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
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Expense Tracker
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                Track and manage your expenses
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {actions}
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
