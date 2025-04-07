# SurrealDB MCP Server

<p align="center">
  <!-- TODO: Add a logo if available -->
  <!-- <img src="assets/images/surrealdb-mcp-logo.png" width="256" alt="SurrealDB MCP Server Logo" /> -->
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/surrealdb-mcp-server"><img src="https://img.shields.io/npm/v/surrealdb-mcp-server.svg" alt="npm version"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT"></a>
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen" alt="Node.js Version"></a>
  <a href="https://github.com/modelcontextprotocol/typescript-sdk"><img src="https://img.shields.io/badge/MCP%20SDK-%5E1.6.1-orange" alt="MCP SDK"></a>
</p>

A Model Context Protocol (MCP) server that provides a standardized interface for AI assistants to interact with a SurrealDB database. This server enables AI systems to query and manipulate data within a configured SurrealDB instance.

## Available Tools

The server exposes the following tools for interacting with SurrealDB:

-   `query`: Execute a raw SurrealQL query.
-   `select`: Select records from a table (all or by specific ID).
-   `create`: Create a single new record in a table.
-   `update`: Update a specific record, replacing its content.
-   `delete`: Delete a specific record by ID.
-   `merge`: Merge data into a specific record (partial update).
-   `patch`: Apply JSON Patch operations to a specific record.
-   `upsert`: Create a record if it doesn't exist, or update it if it does.
-   `insert`: Insert multiple records into a table.
-   `insertRelation`: Create a graph relation (edge) between two records.

*(Refer to the MCP host's tool listing for detailed input schemas.)*

## Installation (Local Development)

```bash
# Replace YOUR_USERNAME with your GitHub username or org
git clone https://github.com/YOUR_USERNAME/surrealdb-mcp-server.git
cd surrealdb-mcp-server
npm install
```

## Configuration

This server requires environment variables to connect to your SurrealDB instance. These must be provided via the MCP host's settings file (e.g., `cline_mcp_settings.json` for the VS Code extension or `claude_desktop_config.json` for the desktop app).

**Required Environment Variables:**

-   `SURREALDB_URL`: The WebSocket endpoint of your SurrealDB instance (e.g., `ws://localhost:8000` or `wss://cloud.surrealdb.com`).
-   `SURREALDB_NS`: The target Namespace.
-   `SURREALDB_DB`: The target Database.
-   `SURREALDB_USER`: The username for authentication (Root, NS, DB, or Scope user).
-   `SURREALDB_PASS`: The password for the specified user.

**Example MCP Host Configuration (Local Path):**

```json
{
  "mcpServers": {
    "surrealdb": {
      "command": "node",
      "args": ["/path/to/your/surrealdb-mcp-server/build/index.js"],
      "env": {
        "SURREALDB_URL": "ws://localhost:8000",
        "SURREALDB_NS": "your_namespace",
        "SURREALDB_DB": "your_database",
        "SURREALDB_USER": "your_db_user",
        "SURREALDB_PASS": "your_db_password"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

-   **Important:** Replace `/path/to/your/surrealdb-mcp-server` with the actual path where you cloned the repository.
-   Replace the example environment variable values with your actual SurrealDB connection details.

**Example MCP Host Configuration (NPX - Recommended for Ease of Use):**

If you publish this package to npm, users can run it directly using `npx` without cloning:

```json
{
  "mcpServers": {
    "surrealdb": {
      "command": "npx",
      "args": [
        "-y", // Skips confirmation prompt
        "surrealdb-mcp-server" // Assumes package is published with this name
      ],
      "env": {
        "SURREALDB_URL": "ws://localhost:8000",
        "SURREALDB_NS": "your_namespace",
        "SURREALDB_DB": "your_database",
        "SURREALDB_USER": "your_db_user",
        "SURREALDB_PASS": "your_db_password"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

-   Replace the environment variable values with your actual SurrealDB connection details.
-   This method requires the package to be published to npm under the name `surrealdb-mcp-server`.

## Configuration File Locations

-   **Cline VSCode Extension:** `~/.vscode/extensions/saoudrizwan.claude-dev-*/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json` (Note: the extension version might vary)
-   **Claude Desktop Apps:**
    -   macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
    -   Windows: `%APPDATA%\Claude\claude_desktop_config.json`
    -   Linux: `~/.config/Claude/claude_desktop_config.json`

## Development

### Building

```bash
npm run build
```

### Running Locally (Development)

```bash
# Ensure required SURREALDB_* environment variables are set
npm run dev # (Note: dev script needs implementation, e.g., using ts-node)
# Or run the built version:
npm start
```

### Running Tests

```bash
npm test # (Note: Tests need to be implemented)
```

## License

MIT
