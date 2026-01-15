# Demo Claude Code

A demonstration project showcasing Claude Code configurations including custom agents, commands, skills, hooks, and plugins.

## Expense Tracker Application

This project includes a complete expense tracker application built with:
- React 19 + TypeScript
- Vite 7
- TailwindCSS 4
- Chart.js for visualizations
- jsPDF for PDF export

### Running the App

```bash
cd expense-tracker
npm install
npm run dev
```

### Running Tests

```bash
cd expense-tracker
npm run test
```

---

## Claude Code Setup

### Initialize Claude Code

First, initialize Claude Code in your project:

```bash
/init
```

### Add Plugin Marketplace

Clone and add the agents marketplace:

```bash
git clone https://github.com/wshobson/agents
/marketplace add ./agents
```

### Install Plugins

Install the recommended plugins from the marketplace:

#### Essential
```bash
/plugin install javascript-typescript
/plugin install frontend-mobile-development
```

#### Data Handling
```bash
/plugin install data-validation-suite
/plugin install business-analytics
```

#### Quality
```bash
/plugin install unit-testing
/plugin install code-review-ai
```

#### Security & Accessibility
```bash
/plugin install frontend-mobile-security
/plugin install accessibility-compliance
```

---

## Project Structure

```
.claude/
├── agents/                    # Custom AI agents
│   ├── ui-ux-consultant.md
│   ├── typescript-best-practices.md
│   ├── unit-test-creator.md
│   └── business-graphic-designer.md
├── commands/                  # Custom slash commands
│   ├── add-category.md
│   ├── add-component.md
│   └── check-quality.md
├── skills/                    # Reusable skills
│   ├── add-category/
│   ├── add-component/
│   └── check-quality/
└── settings.json              # Hooks configuration

expense-tracker/               # Demo application
├── src/
│   ├── components/
│   ├── hooks/
│   ├── types/
│   └── utils/
└── tests/
```

## Custom Agents

| Agent | Description |
|-------|-------------|
| `ui-ux-consultant` | Expert UI/UX design guidance using established principles |
| `typescript-best-practices` | TypeScript code review and best practices |
| `unit-test-creator` | Automated unit test generation |
| `business-graphic-designer` | Business graphics and visualization design |

## Custom Commands

| Command | Description |
|---------|-------------|
| `/add-category` | Add a new expense category |
| `/add-component` | Create a new React component |
| `/check-quality` | Run code quality checks |

## Hooks

The project includes pre-configured hooks for TypeScript/TSX files:

- **PreToolUse (Edit)**: Runs ESLint before editing files
- **PostToolUse (Edit)**: Formats with Prettier and runs TypeScript check
- **PostToolUse (Write)**: Formats new files with Prettier

---

## Homework: Enhancement Ideas

Use Claude Code to extend the expense tracker with these features. Practice using the installed plugins and custom agents!

### Receipt OCR Scanner

Add the ability to scan receipts and automatically extract expense data.

**Prompt idea:**
> "Add a receipt scanner feature that uses OCR to extract merchant name, amount, and date from uploaded receipt images. Use Tesseract.js for OCR processing."

**Skills to practice:** Image upload, OCR integration, form auto-fill

---

### Budget Management

Add monthly budget limits per category with visual progress indicators.

**Prompt idea:**
> "Add a budgeting feature where users can set monthly spending limits for each category. Show progress bars and warnings when approaching or exceeding limits."

**Skills to practice:** State management, progress visualization, alerts

---

### Recurring Expenses

Allow users to create recurring expenses (daily, weekly, monthly).

**Prompt idea:**
> "Implement recurring expenses that automatically generate new entries based on a schedule. Include options for daily, weekly, monthly, and yearly recurrence."

**Skills to practice:** Date calculations, scheduling logic, background tasks

---

### Multi-Currency Support

Support multiple currencies with automatic conversion.

**Prompt idea:**
> "Add multi-currency support with a currency selector. Integrate with an exchange rate API to show converted totals in the user's preferred currency."

**Skills to practice:** API integration, currency formatting, user preferences

---

### Expense Splitting

Split expenses among multiple people for shared costs.

**Prompt idea:**
> "Add expense splitting functionality for shared expenses. Users can split equally or by custom amounts, and track who owes what."

**Skills to practice:** Complex calculations, user management, balance tracking

---

### Data Sync with Cloud Storage

Sync expenses across devices using cloud storage.

**Prompt idea:**
> "Implement cloud sync using Firebase or Supabase so users can access their expenses from any device. Include conflict resolution for offline edits."

**Skills to practice:** Backend integration, authentication, offline-first architecture

---

### AI-Powered Insights

Add intelligent spending insights and recommendations.

**Prompt idea:**
> "Add an insights dashboard that analyzes spending patterns and provides personalized recommendations. Show unusual spending alerts and savings opportunities."

**Skills to practice:** Data analysis, trend detection, AI integration

---

### Export to Accounting Software

Export expenses in formats compatible with accounting software.

**Prompt idea:**
> "Add export options for QuickBooks (QBO), Excel (XLSX), and OFX formats. Include category mapping to standard accounting categories."

**Skills to practice:** File format generation, data transformation, business logic

---

### Tags and Notes

Add custom tags and notes to expenses for better organization.

**Prompt idea:**
> "Add a tagging system where users can create custom tags and add notes to expenses. Include tag-based filtering and search."

**Skills to practice:** Many-to-many relationships, search functionality, UI components

---

### Expense Approval Workflow

Add an approval workflow for team expense management.

**Prompt idea:**
> "Implement an expense approval workflow where team members submit expenses for manager approval. Include status tracking and email notifications."

**Skills to practice:** State machines, role-based access, notifications

---

## Tips for Using Claude Code

1. **Start with a clear prompt** - Describe the feature you want in detail
2. **Use the agents** - Ask the `ui-ux-consultant` for design guidance before implementing
3. **Run quality checks** - Use `/check-quality` after implementing features
4. **Write tests** - Ask Claude to generate tests using the `unit-test-creator` agent
5. **Iterate** - Refine features by providing feedback on Claude's implementation
