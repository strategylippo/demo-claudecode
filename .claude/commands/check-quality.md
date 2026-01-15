# Check Quality Skill

Run all quality checks for the expense tracker project.

## Instructions

Run the following commands in sequence and report results:

### 1. ESLint Check
```bash
npm run lint
```
Report any linting errors or warnings.

### 2. TypeScript Type Check
```bash
npm run typecheck
```
Report any type errors.

### 3. Run Tests
```bash
npm run test:run
```
Report test results (passed/failed/skipped).

### 4. Build Check (optional)
```bash
npm run build
```
Verify the project builds successfully.

### Output Format

Provide a summary table:

| Check | Status | Issues |
|-------|--------|--------|
| ESLint | ✅/❌ | count |
| TypeScript | ✅/❌ | count |
| Tests | ✅/❌ | passed/total |
| Build | ✅/❌ | - |

If any check fails, provide details on how to fix the issues.
