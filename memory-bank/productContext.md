# Product Context: SurrealDB MCP Server

## Problem Solved

Interacting with a SurrealDB database often requires custom scripts or direct use of database clients. This project aims to provide a standardized, reusable interface for interacting with SurrealDB via the Model Context Protocol (MCP). This allows AI agents or other MCP clients to easily query and manipulate data within the database without needing bespoke integration code for each use case.

## How It Should Work

The MCP server will act as a bridge between an MCP client (like an AI assistant) and the SurrealDB database.

1.  **Connection:** The server establishes and maintains a connection to the configured SurrealDB instance using the `surrealdb.js` SDK. Connection details (host, port, credentials) will be configurable.
2.  **Tool Exposure:** The server exposes specific functionalities as MCP tools. Examples include:
    *   `connect`: Establish or verify the database connection.
    *   `query`: Execute an arbitrary SurrealQL query.
    *   `select`: Retrieve records from a table.
    *   `create`: Insert new records.
    *   `update`: Modify existing records.
    *   `delete`: Remove records.
3.  **Interaction:** An MCP client calls these tools with appropriate arguments (e.g., a query string for the `query` tool, table name and data for the `create` tool).
4.  **Execution:** The server translates the tool call into the corresponding `surrealdb.js` SDK method, executes it against the database, and handles authentication.
5.  **Response:** The server formats the result (or error) from the database and returns it to the MCP client.

## User Experience Goals

*   **Simplicity:** Easy configuration and straightforward tool usage for MCP clients.
*   **Reliability:** Robust connection handling and clear error reporting.
*   **Flexibility:** Support for common SurrealDB operations through well-defined tools.
*   **Security:** Secure handling of database credentials.
