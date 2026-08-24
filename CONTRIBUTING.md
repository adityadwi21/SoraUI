# Contributing to SoraUI

Thank you for your interest in contributing to SoraUI! This guide explains how to set up the project and contribute effectively.

---

## Development Philosophy

Before contributing, please understand our core principles:

> **Build fast. Ship less. Own your UI.**

- **Lightweight first** : every addition must justify its bundle cost
- **CSS over JS** : if it can be CSS, it should be CSS
- **Accessibility is not optional** : every component must pass a11y checks
- **No unnecessary abstractions** : keep component APIs simple
- **Universal Lucide Iconography** : always use `lucide-react` for component and block icons

---

## Setup

### Prerequisites

- Node.js >= 18
- pnpm >= 9

### Install

```bash
git clone https://github.com/adityadwi21/SoraUI.git
cd soraui
pnpm install
pnpm build
```

---

## Working on a Component

Each component must have these 4 files minimum:

```text
packages/react/src/components/{name}/
├── {name}.tsx           # Implementation
├── {name}.types.ts      # TypeScript types
└── {name}.test.tsx      # Unit + accessibility tests
```

### Component Rules

1. No hardcoded hex colors : use `var(--ui-*)` CSS variables only
2. No JS for behavior that CSS can handle
3. Must pass: TypeScript check, Vitest, a11y tests
4. Must be within performance budget (see ARCHITECTURE.md)
5. Must support keyboard navigation, ARIA, and focus management
6. Icons must strictly be imported from `lucide-react`

---

## Testing

```bash
pnpm test           # All unit tests
pnpm typecheck      # TypeScript check
pnpm test:visual    # Playwright browser visual tests
```

---

## Pull Request Checklist

Before submitting a PR:

- [ ] All tests pass
- [ ] TypeScript check passes
- [ ] ESLint passes
- [ ] Component is within bundle budget
- [ ] No hardcoded colors : all via CSS variables
- [ ] Keyboard navigation works
- [ ] ARIA attributes correct
- [ ] Icons use `lucide-react`
- [ ] Added entry to registry metadata
- [ ] Updated CHANGELOG.md

---

## Code of Conduct

Please read [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).
