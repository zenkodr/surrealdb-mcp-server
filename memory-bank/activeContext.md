# Active Context: SurrealDB MCP Server (Phase 2 - MCP Server Scaffolding)

## Current Focus

*   **Phase 2: MCP Server Scaffolding.** Having successfully verified the database connection method, the focus now shifts to creating the basic structure for the SurrealDB MCP server using the `@modelcontextprotocol/create-server` tool.

## Recent Changes

*   **Completed Phase 1 (Connection Verification):**
    *   Initialized npm (`package.json`).
    *   Installed the correct `surrealdb` SDK (v1.x+).
    *   Created and iteratively debugged `test-connection.js`.
    *   **Successfully connected and queried the database (`n8n`/`AIWorld` on `ws://localhost:8000`) by providing `namespace`, `database`, and `auth` options directly within the `db.connect()` method.** This avoids issues encountered with separate `use()` and `signin()` calls.

## Next Steps

1.  **Update Memory Bank:** Reflect Phase 1 completion and findings in `progress.md`, `techContext.md`, and `.clinerules`.
2.  **Scaffold MCP Server:** Use `npx @modelcontextprotocol/create-server surrealdb-mcp-server` (or similar name) to create the server project structure (likely using TypeScript).
3.  **Install Dependencies:** Add `surrealdb` to the new server's `package.json`.
4.  **Implement Basic Connection:** Adapt the successful connection logic from `test-connection.js` into the MCP server's main file (e.g., `src/index.ts`), likely establishing the connection when the server starts.
5.  **Define First Tool (e.g., `query`):** Implement the `ListTools` handler and the `CallTool` handler for a basic `query` tool that takes a SurrealQL string and executes it using the established connection.

## Active Decisions & Considerations

*   The successful connection pattern involves passing `namespace`, `database`, and `auth` within the `connect` options. This will be the primary method used in the MCP server.
*   The MCP server will be built using TypeScript, leveraging the structure provided by `create-server`.
*   Need to decide on the exact name for the server project directory if different from the current root. Sticking with the current directory seems appropriate unless specified otherwise.
*   Credentials (`username`/`password`) will eventually need to be sourced from environment variables provided by the MCP host, rather than hardcoded.
