# SurrealDB MCP Server

<p align="center">
  <img src="assets/images/sdblogo.png" width="256" alt="SurrealDB MCP Server Logo" />
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

## Getting Started

This MCP server allows AI assistants like Cline, Claude, and other MCP-compatible assistants to interact with a SurrealDB database. Here's how to get it up and running:

### Quick Start

#### For Claude Desktop App (Recommended)

1. **Configure your AI assistant to use the server:**
   
   Add the server configuration to your Claude Desktop App's MCP settings file (`claude_desktop_config.json`).

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

   > **Note:** Using the `npx` command as shown above means the MCP client will automatically download and run the package from npm when needed. No manual installation is required.

#### For Cline VS Code Extension (Windows Users)

Due to known issues with the `npx` approach in Cline (especially on Windows), you should use one of the following methods:

1. **Install the package globally first:**

   ```bash
   npm install -g surrealdb-mcp-server
   ```

   Then configure Cline to use the installed package:

   ```json
   {
     "mcpServers": {
       "surrealdb": {
         "command": "C:\\Program Files\\nodejs\\node.exe",
         "args": [
           "C:\\Users\\YOUR_USERNAME\\AppData\\Roaming\\npm\\node_modules\\surrealdb-mcp-server\\build\\index.js"
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

   > **Note:** Replace `YOUR_USERNAME` with your actual Windows username in the path.

2. **Start using the tools with your AI assistant:**
   
   Once configured, your AI assistant will have access to all the SurrealDB tools listed above. You can ask it to query or manipulate data in your SurrealDB instance.

### Configuration Details

This server requires environment variables to connect to your SurrealDB instance. These must be provided via the MCP host's settings file.

**Required Environment Variables:**

-   `SURREALDB_URL`: The WebSocket endpoint of your SurrealDB instance (e.g., `ws://localhost:8000` or `wss://cloud.surrealdb.com`).
-   `SURREALDB_NS`: The target Namespace.
-   `SURREALDB_DB`: The target Database.
-   `SURREALDB_USER`: The username for authentication (Root, NS, DB, or Scope user).
-   `SURREALDB_PASS`: The password for the specified user.

**Alternative Configuration (Local Path):**

If you've cloned the repository or want to use a local build, you can use this configuration:

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

- Replace `/path/to/your/surrealdb-mcp-server` with the actual path where you cloned the repository
- Replace the environment variable values with your actual SurrealDB connection details

## Configuration File Locations

-   **Cline VSCode Extension:** `~/.vscode/extensions/saoudrizwan.claude-dev-*/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json` (Note: the extension version might vary)
-   **Claude Desktop Apps:**
    -   macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
    -   Windows: `%APPDATA%\Claude\claude_desktop_config.json`
    -   Linux: `~/.config/Claude/claude_desktop_config.json`

## Development

If you want to contribute to the development of this MCP server, follow these steps:

### Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nsxdavid/surrealdb-mcp-server.git
   cd surrealdb-mcp-server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the project:**
   ```bash
   npm run build
   ```

### Running Locally

```bash
# Ensure required SURREALDB_* environment variables are set
npm run dev # (Note: dev script uses ts-node to run TypeScript directly)
# Or run the built version:
npm start
```

### Testing

```bash
npm test # (Note: Tests need to be implemented)
```

### Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT
