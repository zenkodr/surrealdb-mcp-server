# SurrealDB MCP Server Installation Guide (for LLMs/Cline)

This document provides the necessary information for automated installation and configuration of the SurrealDB MCP Server via the Cline Marketplace or similar systems.

## Installation Method

Use `npx` for installation to avoid global package clutter.

-   **Package Name:** `surrealdb-mcp-server`

## Required Environment Variables

The server requires the following environment variables to connect to your SurrealDB instance. You will be prompted to enter these during installation.

1.  **`SURREALDB_URL`**:
    *   **Description:** The WebSocket endpoint of your SurrealDB instance.
    *   **Example:** `ws://localhost:8000` (for local), `wss://cloud.surrealdb.com` (for SurrealDB Cloud)
    *   **How to find:** Check your local SurrealDB startup logs or your SurrealDB Cloud deployment details.

2.  **`SURREALDB_NS`**:
    *   **Description:** The target Namespace within your SurrealDB instance.
    *   **Example:** `test`
    *   **How to find:** This is defined during your SurrealDB setup.

3.  **`SURREALDB_DB`**:
    *   **Description:** The target Database within the specified Namespace.
    *   **Example:** `mydatabase`
    *   **How to find:** This is defined during your SurrealDB setup.

4.  **`SURREALDB_USER`**:
    *   **Description:** The username for authentication. This can be a Root, Namespace, Database, or Scope user defined in your SurrealDB instance.
    *   **Example:** `root`, `ns_admin`, `db_user`, `api_scope_user`
    *   **How to find:** Use the credentials you have configured for accessing the specified Namespace/Database.

5.  **`SURREALDB_PASS`**:
    *   **Description:** The password corresponding to the `SURREALDB_USER`.
    *   **Example:** `your_secure_password`
    *   **How to find:** Use the credentials you have configured for accessing the specified Namespace/Database.

## MCP Host Configuration Template (using NPX)

This is the configuration block that will be added to your MCP host's settings file:

```json
{
  "mcpServers": {
    "surrealdb": {
      "command": "npx",
      "args": [
        "-y",
        "surrealdb-mcp-server"
      ],
      "env": {
        "SURREALDB_URL": "PLACEHOLDER_URL",
        "SURREALDB_NS": "PLACEHOLDER_NS",
        "SURREALDB_DB": "PLACEHOLDER_DB",
        "SURREALDB_USER": "PLACEHOLDER_USER",
        "SURREALDB_PASS": "PLACEHOLDER_PASS"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

*(Placeholders will be replaced with the values you provide during the guided installation process.)*
