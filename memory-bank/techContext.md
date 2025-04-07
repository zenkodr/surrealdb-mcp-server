# Tech Context: SurrealDB MCP Server

## Core Technologies

*   **Runtime:** Node.js (LTS version recommended)
*   **Language:** JavaScript (initially for test script), TypeScript (for the final MCP server)
*   **Package Manager:** npm
*   **Database:** SurrealDB (Target version: latest stable)
*   **Database SDK:** `surrealdb` (v1.x+, Official JavaScript SDK - Note: `surrealdb.js` is deprecated)
*   **MCP Framework:** `@modelcontextprotocol/sdk`

## Development Setup

*   **Prerequisites:**
    *   Node.js and npm installed.
    *   Access to a running SurrealDB instance (local or remote). For initial testing, a local instance running on `ws://localhost:8000` with root credentials (`root`/`root`) is assumed.
*   **Installation:** Project dependencies will be managed via `package.json`. Key dependencies will include `surrealdb.js` and `@modelcontextprotocol/sdk`.

## Technical Constraints

*   Requires network access to the target SurrealDB instance from the machine running the MCP server.
*   The MCP server itself runs non-interactively, so all configuration (like database credentials) must be provided upfront (e.g., via environment variables).

## Dependencies

*   **`surrealdb`:** For all database interactions. Compatibility confirmed with SurrealDB v2.2.2. Connection requires providing `namespace`, `database`, and `auth` (with `username`/`password`) directly in `connect` options.
*   **`@modelcontextprotocol/sdk`:** For implementing the MCP server logic, handling requests, and defining tools/resources.
*   **`@modelcontextprotocol/create-server`:** Used for scaffolding the TypeScript MCP server structure.

*(This file will be updated as specific versions are chosen and other dependencies are added.)*
