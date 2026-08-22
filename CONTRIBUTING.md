# Contributing to SoraUI

Thank you for your interest in contributing to SoraUI! This guide explains how to set up the project and contribute effectively.

---

## Development Philosophy

Before contributing, please understand our core principles:

> **Build fast. Ship less. Own your UI.**

- **Lightweight first** — every addition must justify its bundle cost
- **CSS over JS** — if it can be CSS, it should be CSS
- **Accessibility is not optional** — every component must pass a11y checks
- **No unnecessary abstractions** — keep component APIs simple

---

## Setup

### Prerequisites

- Node.js >= 18
- pnpm >= 9

### Install

`ash
git clone https://github.com/soraui/soraui.git
cd soraui
pnpm install
pnpm build
`

---

## Working on a Component

Each component must have these 4 files minimum:

`
packages/react/src/components/{name}/
├── {name}.tsx           # Implementation
├── {name}.module.css    # Styles (CSS Modules, no hardcoded colors)
├── {name}.types.ts      # TypeScript types
└── {name}.test.tsx      # Unit + accessibility tests
`

### Component Rules

1. No hardcoded hex colors — use ar(--ui-*) CSS variables only
2. No JS for behavior that CSS can handle
3. Must pass: TypeScript check, ESLint, Vitest, a11y tests
4. Must be within performance budget (see ARCHITECTURE.md)
5. Must support keyboard navigation, ARIA, and focus management

---

## Testing

`ash
pnpm test           # All unit tests
pnpm test:a11y      # Accessibility tests
pnpm typecheck      # TypeScript check
pnpm lint           # ESLint
`

---

## Pull Request Checklist

Before submitting a PR:

- [ ] All tests pass
- [ ] TypeScript check passes
- [ ] ESLint passes
- [ ] Component is within bundle budget
- [ ] No hardcoded colors — all via CSS variables
- [ ] Keyboard navigation works
- [ ] ARIA attributes correct
- [ ] Added entry to registry metadata
- [ ] Updated CHANGELOG.md

---

## Code of Conduct

Please read [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).
