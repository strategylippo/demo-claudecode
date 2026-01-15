---
name: add-category
description: Add a new expense category to the tracker. Use when adding category, creating new category, or extending expense categories.
---

# Add Category Skill

Add a new expense category to the expense tracker application.

## Files to Modify

### 1. Update Type Definition

In `src/types/index.ts`, add to `ExpenseCategory` union:

```typescript
export type ExpenseCategory =
  | 'Food'
  | 'Transport'
  // ... existing
  | 'NewCategory'  // Add here
```

### 2. Update Constants

In `src/constants/index.ts`, add to `EXPENSE_CATEGORIES` array:

```typescript
export const EXPENSE_CATEGORIES: CategoryConfig[] = [
  // ... existing categories
  { name: 'NewCategory', color: '#HEXCODE', icon: '🎯' }
]
```

## Category Guidelines

- **Name**: Single word, PascalCase (e.g., `Pets`, `Education`, `Gifts`)
- **Color**: Hex code format `#RRGGBB`
- **Icon**: Single emoji representing the category

## Suggested Icons by Category

| Category | Suggested Icon |
|----------|----------------|
| Pets | 🐾 |
| Education | 📚 |
| Gifts | 🎁 |
| Fitness | 💪 |
| Subscriptions | 📱 |
| Insurance | 🛡️ |
| Childcare | 👶 |

## Validation

Before adding:
1. Check category doesn't already exist
2. Verify color is unique (not already used)
3. Run `npm run typecheck` after changes
