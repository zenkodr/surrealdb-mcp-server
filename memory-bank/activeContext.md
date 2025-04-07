# Active Context: SurrealDB MCP Server (Phase 2 - Core Tool Implementation)

## Current Focus

*   **Phase 2: Core Tool Implementation.** Implementing the core CRUD (Create, Read, Update, Delete) operations as MCP tools. `query`, `select`, `create`, and `update` are complete and tested. Focus is now on implementing the `delete` tool.

## Recent Changes

*   **Completed Phase 1 (Connection Verification).**
*   **Scaffolded MCP Server & Dependencies.**
*   **Implemented Basic Connection & Credential Refactoring.**
*   **Implemented `query` tool:** Tested successfully.
*   **Implemented `select` tool:** Investigated `db.select()` behavior, confirmed need for `RecordId` instance for specific IDs. Tested successfully.
*   **Implemented `create` tool:** Tested successfully.
*   **Implemented `update` tool:** Confirmed need for `RecordId` instance. Tested successfully.
*   **Updated Memory Bank:** `progress.md` and `.clinerules` updated with findings.

## Next Steps

1.  **Implement `delete` tool:** Add the tool definition and handler logic using `db.delete()`, likely requiring a `RecordId` instance similar to `select` and `update`.
2.  **Build & Test `delete` tool.**
3.  **Update Memory Bank:** Reflect completion of `delete` tool.
4.  **Consider Error Handling/Robustness:** Plan improvements for error reporting and logging.
5.  **Consider Further Testing:** Plan more comprehensive tests.

## Active Decisions & Considerations

*   The successful connection pattern involves passing `namespace`, `database`, and `auth` within the `connect` options.
*   The MCP server is TypeScript-based.
*   Credentials are sourced from environment variables.
*   `db.select()` and `db.update()` require `RecordId` instances for specific record operations (documented in `.clinerules`). Assume `db.delete()` will likely require the same.

## Future Considerations

*   **SDK Documentation:** Consider opening a GitHub issue or PR for the `surrealdb.js` SDK documentation regarding the `db.select()` and `db.update()` methods. The examples for selecting/updating specific records (`db.select("table:id")`) are misleading as the methods require a `RecordId` instance (`new RecordId(table, idPart)`) according to TypeScript definitions and observed behavior (v1.3.1).
