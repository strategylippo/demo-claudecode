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
