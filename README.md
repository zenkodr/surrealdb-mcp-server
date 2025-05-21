# SurrealDB MCP Server

<p align="center">
  <img src="assets/images/sdblogo.png" width="256" alt="SurrealDB MCP Server Logo" />
</p>

<p align="center">
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT"></a>
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen" alt="Node.js Version"></a>
  <a href="https://github.com/modelcontextprotocol/typescript-sdk"><img src="https://img.shields.io/badge/MCP%20SDK-%5E1.6.1-orange" alt="MCP SDK"></a>
</p>

## Project Overview

This repository implements a robust, extensible Model Context Protocol (MCP) server for SurrealDB, inspired by [David Whatley's surrealdb-mcp-server](https://github.com/nsxdavid/surrealdb-mcp-server). It provides a standardized interface for AI assistants and developers to interact with a [SurrealDB](https://surrealdb.com/) instance, enabling seamless querying, mutation, and advanced database operations.

### Documentation & Memory System

> **Source of Truth:**
> - All architecture, decisions, features, and roadmap items are documented in the `memories/` directory. This directory is the authoritative source for current project state, requirements, and technical context. Update `memories/` after every milestone, refactor, or significant change.
> - See [`memories/activeContext.md`](memories/activeContext.md), [`memories/features.md`](memories/features.md), [`memories/tasklist.md`](memories/tasklist.md), [`memories/progress.md`](memories/progress.md), [`memories/prd.md`](memories/prd.md), [`memories/techContext.md`](memories/techContext.md), and [`memories/systemPatterns.md`](memories/systemPatterns.md).

> **Note for AI Assistants:** If you are an AI assistant (like Claude, Cline, Copilot, etc.) reading this documentation, please refer to the [llms-install.md](llms-install.md) file for detailed instructions specifically designed for you to help users install and configure this MCP server.

## Installation Guide

### Which AI Assistant or Platform?

- **📝 Cline VS Code Extension:** [Cline Installation](#cline-installation)
- **🖥️ Claude Desktop App:** [Claude Installation](#claude-installation)
- **🤖 GitHub Copilot:** [Copilot Installation](#copilot-installation)
- **🦘 Roo Code:** [Roo Code Installation](#roo-code-installation)
- **🌊 Windsurf:** [Windsurf Installation](#windsurf-installation)
- **⚡ Cursor:** [Cursor Installation](#cursor-installation)
- **🔄 [n8n](https://n8n.io/):** [n8n Integration](#integration-with-n8n)

---

## Documentation & Contribution Workflow

- **Update `memories/` after every milestone, feature, refactor, or architectural change.**
- **Reference `memories/` for the latest context, requirements, features, and technical decisions.**
- **Document all tech debt, issues, and decisions in the appropriate `memories/` file before/after making code changes.**
- **Keep the README and `memories/` in sync.**
- **For new contributors:**
  - Review all `memories/` files before starting work.
  - Add new features/tasks to `memories/tasklist.md` and `memories/features.md`.
  - Summarize changes in `memories/progress.md` and decisions in `memories/activeContext.md`.

---

## Key Concepts & Architecture

- **MCP Server:** Implements the Model Context Protocol, enabling AI assistants and tools to access SurrealDB via a standardized interface.
- **Modular Tool Handlers:** Each SurrealDB operation (query, select, create, update, etc.) is implemented as a modular handler in `src/tools/` for maintainability and extensibility.
- **Type Safety & Validation:** All tool inputs and outputs are statically typed (TypeScript) and will use [arktype](https://github.com/arktypeio/arktype) for runtime validation (see `memories/techContext.md`).
- **Data Access Layer (DAL):** Planned abstraction to separate DB access, enabling testability and future DB support.
- **Security:** Environment-driven configuration, input validation, and planned middleware for authentication, permissions, and rate limiting.
- **Memory System:** All project context, decisions, features, and tech debt are tracked in `memories/` for cross-assistant and team synchronization.

## Supported & Planned Tools

- `query`: Execute raw SurrealQL queries
- `select`: Select records (all/by ID)
- `create`: Create a new record
- `update`: Replace a record
- `delete`: Delete by ID
- `merge`: Partial update
- `patch`: JSON Patch operations
- `upsert`: Create-or-update
- `insert`: Bulk insert
- `insertRelation`: Create graph edge

**Planned:**
- LIVE SELECT (real-time queries)
- DEFINE FUNCTION (user-defined functions)
- Import/export
- Schema/permission management
- Advanced authentication (roles, tokens)
- Graph traversal
- Variable binding
- DAL abstraction
- Static validation (arktype)
- Comprehensive tests
- Security event logging
- CI/CD, containerization

*(See `memories/features.md` and `memories/tasklist.md` for the full roadmap.)*

## 📝 Cline Installation

### One-Click Installation for Cline VS Code Extension

1. **Install the package globally:**

   ```bash
   npm install -g surrealdb-mcp-server
   ```

2. **Add to Cline settings:**

   Edit the file at: `%APPDATA%\Code\User\globalStorage\saoudrizwan.claude-dev\settings\cline_mcp_settings.json`
   
   Add the following configuration:

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

   > **Important:** Replace `YOUR_USERNAME` with your actual Windows username in the path.

3. **Restart VS Code**

4. **Verify Installation:**
   - Open Cline in VS Code
   - Ask Cline to "list available MCP servers"
   - You should see "surrealdb" in the list

## 🖥️ Claude Installation

### Installation for Claude Desktop App

1. **Configure Claude Desktop to use the server:**
   
   Edit the Claude Desktop App's MCP settings file:
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Linux: `~/.config/Claude/claude_desktop_config.json`

   Add the following configuration:

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

2. **Restart Claude Desktop App**

3. **Verify Installation:**
   - Ask Claude to "list available MCP servers"
   - You should see "surrealdb" in the list

## 🤖 Copilot Installation

### Installation for GitHub Copilot in VS Code

1. **Create a workspace configuration file:**
   
   Create a file at: `.vscode/mcp.json` in your workspace
   
   Add the following configuration:

   ```json
   {
     "inputs": [
       {
         "type": "promptString",
         "id": "surrealdb-url",
         "description": "SurrealDB URL",
         "default": "ws://localhost:8000"
       },
       {
         "type": "promptString",
         "id": "surrealdb-ns",
         "description": "SurrealDB Namespace"
       },
       {
         "type": "promptString",
         "id": "surrealdb-db",
         "description": "SurrealDB Database"
       },
       {
         "type": "promptString",
         "id": "surrealdb-user",
         "description": "SurrealDB Username"
       },
       {
         "type": "promptString",
         "id": "surrealdb-pass",
         "description": "SurrealDB Password",
         "password": true
       }
     ],
     "servers": {
       "surrealdb": {
         "type": "stdio",
         "command": "npx",
         "args": [
           "-y",
           "surrealdb-mcp-server"
         ],
         "env": {
           "SURREALDB_URL": "${input:surrealdb-url}",
           "SURREALDB_NS": "${input:surrealdb-ns}",
           "SURREALDB_DB": "${input:surrealdb-db}",
           "SURREALDB_USER": "${input:surrealdb-user}",
           "SURREALDB_PASS": "${input:surrealdb-pass}"
         }
       }
     }
   }
   ```

   > **Note:** This configuration uses VS Code's input variables to securely prompt for and store your SurrealDB credentials.

2. **Verify Installation:**
   - Open GitHub Copilot Chat in VS Code
   - Select "Agent" mode from the dropdown
   - Click the "Tools" button to see available tools
   - You should see SurrealDB tools in the list

## 🦘 Roo Code Installation

### Installation for Roo Code in VS Code

1. **Access MCP Settings:**
   
   Click the MCP icon in the top navigation of the Roo Code pane, then select "Edit MCP Settings" to open the configuration file.

2. **Add the SurrealDB MCP Server configuration:**

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

   > **Important:** Replace `YOUR_USERNAME` with your actual Windows username in the path.

3. **Restart VS Code**

4. **Verify Installation:**
   - Open Roo Code in VS Code
   - Click the MCP icon to see available servers
   - You should see "surrealdb" in the list

## 🌊 Windsurf Installation

### Installation for Windsurf

1. **Install the package globally:**

   ```bash
   npm install -g surrealdb-mcp-server
   ```

2. **Configure Windsurf:**
   
   - Open Windsurf on your system
   - Navigate to the Settings page
   - Go to the Cascade tab
   - Find the Model Context Protocol (MCP) Servers section
   - Click on "View raw config" to open the configuration file (typically at `~/.codeium/windsurf/mcp_config.json`)

3. **Add the SurrealDB MCP Server configuration:**

   ```json
   {
     "servers": [
       {
         "name": "surrealdb",
         "command": "node",
         "args": [
           "/path/to/global/node_modules/surrealdb-mcp-server/build/index.js"
         ],
         "env": {
           "SURREALDB_URL": "ws://localhost:8000",
           "SURREALDB_NS": "your_namespace",
           "SURREALDB_DB": "your_database",
           "SURREALDB_USER": "your_db_user",
           "SURREALDB_PASS": "your_db_password"
         }
       }
     ]
   }
   ```

   > **Note:** Replace `/path/to/global/node_modules` with the actual path to your global node_modules directory.

4. **Restart Windsurf**

5. **Verify Installation:**
   - Open Cascade in Windsurf
   - You should see SurrealDB tools available in the tools list

## ⚡ Cursor Installation

### Installation for Cursor

1. **Install the package globally:**

   ```bash
   npm install -g surrealdb-mcp-server
   ```

2. **Configure Cursor:**
   
   - Open Cursor
   - Go to Settings > Cursor Settings
   - Find the MCP Servers option and enable it
   - Click on "Add New MCP Server"

3. **Add the SurrealDB MCP Server configuration:**

   ```json
   {
     "name": "surrealdb",
     "command": "node",
     "args": [
       "/path/to/global/node_modules/surrealdb-mcp-server/build/index.js"
     ],
     "env": {
       "SURREALDB_URL": "ws://localhost:8000",
       "SURREALDB_NS": "your_namespace",
       "SURREALDB_DB": "your_database",
       "SURREALDB_USER": "your_db_user",
       "SURREALDB_PASS": "your_db_password"
     }
   }
   ```

   > **Note:** Replace `/path/to/global/node_modules` with the actual path to your global node_modules directory.

4. **Restart Cursor**

5. **Verify Installation:**
   - Open Cursor Chat
   - You should see SurrealDB tools available in the tools list

## Required Environment Variables

This server requires the following environment variables to connect to your SurrealDB instance:

-   `SURREALDB_URL`: The WebSocket endpoint of your SurrealDB instance (e.g., `ws://localhost:8000` or `wss://cloud.surrealdb.com`).
-   `SURREALDB_NS`: The target Namespace.
-   `SURREALDB_DB`: The target Database.
-   `SURREALDB_USER`: The username for authentication (Root, NS, DB, or Scope user).
-   `SURREALDB_PASS`: The password for the specified user.

## Troubleshooting

### Common Issues

#### "Cannot find module" Error

If you see an error like "Cannot find module 'surrealdb-mcp-server'", try:

1. Verify the global installation: `npm list -g surrealdb-mcp-server`
2. Check the path in your configuration matches the actual installation path
3. Try reinstalling: `npm install -g surrealdb-mcp-server`

#### Connection Errors

If you see "Failed to connect to SurrealDB":

1. Verify SurrealDB is running: `surreal start --log debug`
2. Check your connection URL, namespace, database, and credentials
3. Ensure your SurrealDB instance is accessible from the path specified

#### Cline-Specific Issues

If the npx approach doesn't work with Cline:

1. Always use the global installation method for Cline
2. Specify the full path to node.exe and the installed package
3. Make sure to replace YOUR_USERNAME with your actual Windows username

## Advanced Configuration

### Using a Local Build

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

## Integration with n8n

You can integrate this SurrealDB MCP Server with [n8n](https://n8n.io/) using the [n8n-nodes-mcp](https://github.com/nerding-io/n8n-nodes-mcp) community node.

**NOTE: Currently only the [self-hosted (Docker) version of n8n](https://docs.n8n.io/hosting/installation/docker/) supports community nodes. There is no option for MCP Servers in the n8n cloud version (yet?).**

### Installation

1. **Install the n8n-nodes-mcp package:**

   ```bash
   npm install n8n-nodes-mcp
   ```

2. **Configure n8n to use the custom node:**

   Add the following to your n8n configuration:

   ```bash
   N8N_CUSTOM_EXTENSIONS="n8n-nodes-mcp"
   ```

3. **Configure the MCP node in n8n:**
   
   - Add the "MCP" node to your workflow
   - Configure it to connect to your SurrealDB MCP Server
   - Select the desired operation (query, select, create, etc.)
   - Configure the operation parameters

For more details, visit the [n8n-nodes-mcp GitHub repository](https://github.com/nerding-io/n8n-nodes-mcp).

## License

MIT
