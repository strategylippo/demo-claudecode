import { type ReactNode } from "react";
import { Header } from "./Header";

interface LayoutProps {
  children: ReactNode;
  headerActions?: ReactNode;
}

export function Layout({ children, headerActions }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header actions={headerActions} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
      <footer className="border-t border-gray-200 dark:border-gray-700 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Expense Tracker - Built with React, TypeScript & TailwindCSS
          </p>
        </div>
      </footer>
    </div>
  );
}
