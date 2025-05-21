# Project Automation Scripts

This directory contains scripts for rule/memory hygiene and automation:

- `lint-rules.js`: Lints `.rules/` for stub/deprecated content and formatting issues.
- `lint-memories.js`: Checks for required files in `memories/`.
- `memory-sync-checklist.md`: Manual checklist for memory and documentation hygiene.

Pre-commit hooks in `.husky/` will run these scripts automatically.
