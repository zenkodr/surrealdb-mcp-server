# Project Onboarding: Rules & Guidelines

Welcome to the SurrealDB MCP Server project!

## 🚀 Quick Start

1. Install [pnpm](https://pnpm.io/), Node.js, and required tools.
2. Review all rules and guidelines in the [`.rules/`](./.rules/README.md) directory.
3. Familiarize yourself with the [key documentation files](./.rules/key-files-and-templates.md).
4. Run tests and linters before submitting code.
5. For any questions, see the feedback section below.

## Rules & Guidelines

- **All project rules, code standards, and best practices are centralized in the [`.rules/`](./.rules/README.md) directory at the project root.**
- This directory contains comprehensive, up-to-date guidelines covering:
  - Code quality, naming conventions, security, DevOps, documentation, memory practices, and more.
  - Both project-agnostic and SurrealDB MCP-specific rules.
- **Always reference `.rules/` for authoritative guidance.**
- Do not use `.clinerules`, `.roorules`, or `.windsurfrules` for rule definitions—these are stub files that direct all contributors and AI assistants to `.rules/`.

## Key Documentation Files

- Project documentation and context are maintained in the [`memories/`](./memories/) directory (see [key files and templates](./.rules/key-files-and-templates.md)).
- All technical decisions, tasks, features, and architectural patterns are tracked and updated here.

## Contribution Checklist

- Review [`.rules/`](./.rules/README.md) before starting any new work or code review.
- Update [`memories/`](./memories/) after each milestone, major refactor, or critical change.
- If you find any rule or guideline that needs clarification or updating, propose changes directly in `.rules/` and notify the team.

## Feedback & Suggestions

- To suggest improvements or report unclear rules, open a GitHub Issue or Discussion with the label `rules-feedback`.
- For urgent matters, ping a maintainer in the repository.

## Automation & Hygiene

- Pre-commit hooks automatically lint `.rules/` and `memories/` and run tests (see `scripts/` and `.husky/`).
- Memory sync and rule hygiene scripts are in `scripts/`.
- See the [Memory Sync Checklist](./scripts/memory-sync-checklist.md) for milestone reviews.
- Security checklist is in [`.rules/security-and-compliance.md`](./.rules/security-and-compliance.md).

---

For more information, see:
- [`.rules/README.md`](./.rules/README.md) — Rules index
- [Key files and templates](./.rules/key-files-and-templates.md)
- [Security & compliance checklist](./.rules/security-and-compliance.md)
- [Software development guidelines](./.rules/software_development_guidelines.md)
- [Research and documentation](./.rules/research-and-documentation.md)
