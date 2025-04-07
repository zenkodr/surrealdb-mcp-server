# Project Brief: SurrealDB MCP Server

## Overview

The primary goal of this project is to create a Model Context Protocol (MCP) server that facilitates interaction with a SurrealDB database instance. This server will provide tools for connecting to the database, executing queries, managing data, and potentially other database-related operations.

## Core Requirements

1.  **MCP Server Implementation:** Develop a Node.js-based MCP server.
2.  **SurrealDB Integration:** Utilize the official `surrealdb.js` SDK to connect and interact with SurrealDB.
3.  **Connection Management:** Implement robust connection handling, including authentication using provided credentials.
4.  **Tooling:** Expose MCP tools for common SurrealDB operations (e.g., query execution, data manipulation).
5.  **Configuration:** Allow configuration of connection details (host, port, credentials) potentially via environment variables managed by the MCP settings.

## Initial Focus (Phase 1)

Before building the full MCP server, create a simple standalone Node.js script to demonstrate a successful connection and basic interaction with the target SurrealDB instance. This verifies the connection parameters and SDK usage.

## Target Database Details (for initial testing)

*   **Connection Type:** WebSocket (`ws`)
*   **Host:** `localhost:8000`
*   **Authentication:** Root
*   **Username:** `root`
*   **Password:** `root`

## Success Criteria (Phase 1)

*   A Node.js script successfully connects to the specified SurrealDB instance.
*   The script can execute a basic command (e.g., `INFO FOR DB`) and receive a valid response.
*   Connection errors are handled gracefully.
