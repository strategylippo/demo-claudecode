import { useState } from "react";
import type { ExpenseFilter as ExpenseFilterType, ExpenseCategory } from "../../types";
import { EXPENSE_CATEGORIES } from "../../types";
import { CATEGORY_CONFIG } from "../../constants";
import { Button, Input, Card } from "../common";

interface ExpenseFilterProps {
  filter: ExpenseFilterType;
  onFilterChange: (filter: Partial<ExpenseFilterType>) => void;
  onClear: () => void;
}

export function ExpenseFilter({
  filter,
  onFilterChange,
  onClear,
}: ExpenseFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasActiveFilters =
    filter.startDate !== null ||
    filter.endDate !== null ||
    filter.categories.length > 0 ||
    filter.minAmount !== null ||
    filter.maxAmount !== null ||
    filter.searchTerm !== "";

  const toggleCategory = (category: ExpenseCategory) => {
    const newCategories = filter.categories.includes(category)
      ? filter.categories.filter((c) => c !== category)
      : [...filter.categories, category];
    onFilterChange({ categories: newCategories });
  };

  return (
    <Card padding="none" className="overflow-hidden">
      <div className="p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              placeholder="Search expenses..."
              value={filter.searchTerm}
              onChange={(e) => onFilterChange({ searchTerm: e.target.value })}
              leftIcon={
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              }
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant={isExpanded ? "primary" : "secondary"}
              onClick={() => setIsExpanded(!isExpanded)}
              rightIcon={
                <svg
                  className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              }
            >
              Filters
              {hasActiveFilters && (
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-white/20 rounded-full">
                  {filter.categories.length +
                    (filter.startDate ? 1 : 0) +
                    (filter.endDate ? 1 : 0) +
                    (filter.minAmount !== null ? 1 : 0) +
                    (filter.maxAmount !== null ? 1 : 0)}
                </span>
              )}
            </Button>

            {hasActiveFilters && (
              <Button variant="ghost" onClick={onClear}>
                Clear
              </Button>
            )}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800/50">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Categories
              </label>
              <div className="flex flex-wrap gap-2">
                {EXPENSE_CATEGORIES.map((category) => {
                  const config = CATEGORY_CONFIG[category];
                  const isSelected = filter.categories.includes(category);
                  return (
                    <button
                      key={category}
                      onClick={() => toggleCategory(category)}
                      className={`
                        inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium
                        transition-colors border
                        ${
                          isSelected
                            ? "border-transparent text-white"
                            : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }
                      `}
                      style={
                        isSelected
                          ? { backgroundColor: config.color }
                          : undefined
                      }
                    >
                      <span>{config.icon}</span>
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date Range
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    type="date"
                    value={filter.startDate ?? ""}
                    onChange={(e) =>
                      onFilterChange({
                        startDate: e.target.value || null,
                      })
                    }
                    className="flex-1"
                  />
                  <span className="text-gray-500">to</span>
                  <Input
                    type="date"
                    value={filter.endDate ?? ""}
                    onChange={(e) =>
                      onFilterChange({
                        endDate: e.target.value || null,
                      })
                    }
                    className="flex-1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Amount Range
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filter.minAmount ?? ""}
                    onChange={(e) =>
                      onFilterChange({
                        minAmount: e.target.value
                          ? parseFloat(e.target.value)
                          : null,
                      })
                    }
                    min={0}
                    step={0.01}
                    className="flex-1"
                  />
                  <span className="text-gray-500">to</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filter.maxAmount ?? ""}
                    onChange={(e) =>
                      onFilterChange({
                        maxAmount: e.target.value
                          ? parseFloat(e.target.value)
                          : null,
                      })
                    }
                    min={0}
                    step={0.01}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
