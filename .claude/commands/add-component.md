# Add Component Skill

Scaffold a new React component with TypeScript types, styles, and tests.

## Arguments
- `$ARGUMENTS` - The component name (e.g., "TransactionHistory")

## Instructions

Create a new React component following the project conventions:

1. Create the component folder: `src/components/{ComponentName}/`
2. Create the main component file: `{ComponentName}.tsx`
3. Create the test file: `{ComponentName}.test.tsx`
4. Export from `src/components/index.ts`

### Component Template

```tsx
// {ComponentName}.tsx
interface {ComponentName}Props {
  // Add props here
}

export function {ComponentName}({ }: {ComponentName}Props) {
  return (
    <div className="...">
      {/* Component content */}
    </div>
  )
}
```

### Test Template

```tsx
// {ComponentName}.test.tsx
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

### Conventions
- Use function declarations (not arrow functions) for components
- Use TailwindCSS for styling
- Use strict TypeScript (no `any`)
- Follow existing component patterns in the codebase

Create the component named: $ARGUMENTS
