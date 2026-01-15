---
name: add-component
description: Scaffold a new React component with TypeScript types and tests. Use when creating a new component, adding a component, or scaffolding component files.
---

# Add Component Skill

Create a new React component following project conventions.

## What to Create

When scaffolding a component named `{ComponentName}`:

1. **Create folder**: `src/components/{ComponentName}/`
2. **Create component**: `src/components/{ComponentName}/{ComponentName}.tsx`
3. **Create tests**: `src/components/{ComponentName}/{ComponentName}.test.tsx`
4. **Export**: Add to `src/components/index.ts`

## Component Template

```tsx
interface {ComponentName}Props {
  // Define props
}

export function {ComponentName}({}: {ComponentName}Props) {
  return (
    <div className="p-4">
      {/* Component content */}
    </div>
  )
}
```

## Test Template

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { {ComponentName} } from './{ComponentName}'

describe('{ComponentName}', () => {
  it('renders correctly', () => {
    render(<{ComponentName} />)
    // Add assertions
  })
})
```

## Conventions

- Use function declarations for components
- Use TailwindCSS for styling
- Strict TypeScript - no `any` types
- Follow patterns in existing components like `ExpenseItem` and `ExpenseForm`
