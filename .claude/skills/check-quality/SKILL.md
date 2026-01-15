---
name: check-quality
description: Run all quality checks including linting, type checking, and tests. Use for code review, pre-commit validation, or ensuring code quality.
---

# Check Quality Skill

Run comprehensive quality checks on the expense tracker codebase.

## Commands to Run

Execute these checks in order:

### 1. TypeScript Type Check

```bash
npm run build
```

Verifies strict TypeScript compliance. Catches type errors, missing types, and `any` usage.

### 2. ESLint

```bash
npm run lint
```

Checks code style and potential bugs.

### 3. Run Tests

```bash
npm run test -- --run
```

Runs all Vitest tests once (non-watch mode).

## Full Quality Check Sequence

Run all checks in sequence:

```bash
npm run build && npm run lint && npm run test -- --run
```

## What to Fix

| Check | Common Issues |
|-------|---------------|
| TypeScript | Missing types, implicit `any`, type mismatches |
| ESLint | Unused variables, missing dependencies in hooks, formatting |
| Tests | Failed assertions, missing test coverage |

## Quick Reference

| Command | Purpose |
|---------|---------|
| `npm run build` | TypeScript check + production build |
| `npm run lint` | ESLint code quality |
| `npm run test -- --run` | Run tests once |
| `npm run test:coverage` | Tests with coverage report |

## Before Committing

Always run the full quality check sequence before committing changes to ensure:

1. No TypeScript errors
2. No linting violations
3. All tests pass
