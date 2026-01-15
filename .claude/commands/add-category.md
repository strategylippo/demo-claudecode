# Add Category Skill

Add a new expense category to the expense tracker.

## Arguments
- `$ARGUMENTS` - Category name and color (e.g., "Pets #FF69B4")

## Instructions

Parse the arguments to extract:
- Category name (first word, capitalize first letter)
- Color (hex code starting with #, default to #808080 if not provided)
- Icon (pick an appropriate emoji for the category)

### Files to Update

1. **src/types/index.ts** - Add the new category to `ExpenseCategory` type:
   ```typescript
   export type ExpenseCategory = 'Food' | 'Transport' | ... | 'NewCategory'
   ```

2. **src/constants/index.ts** - Add to `EXPENSE_CATEGORIES` array:
   ```typescript
   { name: 'NewCategory', color: '#HEXCODE', icon: '🐾' }
   ```

### Validation
- Category name must be a single word
- Color must be a valid hex code (#RRGGBB format)
- Check if category already exists before adding

### Example Usage
```
/add-category Pets #FF69B4
/add-category Education #4169E1
/add-category Gifts
```

Add the category from: $ARGUMENTS
