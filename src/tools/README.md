# Tool Handler Pattern

All SurrealDB MCP tool handlers should be implemented as individual modules in this directory.

## Pattern
- Each tool handler exports a function (e.g., `handleQuery`, `handleCreate`, etc.)
- Handlers accept a SurrealDB instance and validated arguments
- Errors should use `McpError` and SurrealDB SDK error handling

## Example
See `query.ts` for an example handler.

## Adding a New Tool
1. Create `<tool>.ts` in this directory
2. Export a handler function
3. Import and register in `src/index.ts`

---
This pattern supports maintainability, testability, and easy extension as new SurrealDB features are added.
