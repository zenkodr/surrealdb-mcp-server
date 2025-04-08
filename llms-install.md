# SurrealDB MCP Server Installation Guide (for AI Assistants)

## IMPORTANT: READ THIS FIRST

This document is **specifically for AI assistants** like Cline and Claude. It contains instructions for YOU (the AI) on how to automatically install and configure the SurrealDB MCP Server for users with minimal user intervention.

## What is SurrealDB MCP Server?

SurrealDB MCP Server is a Model Context Protocol (MCP) server that allows you (an AI assistant) to interact with a SurrealDB database. It enables you to query and manipulate data within a configured SurrealDB instance on behalf of the user.

## Installation Decision Tree

As an AI assistant, you should first determine which AI platform you are running on:

- If you are **Cline in VS Code** → Follow the [Cline-specific instructions](#cline-specific-instructions)
- If you are **Claude Desktop App** → Follow the [Claude-specific instructions](#claude-specific-instructions)
- If you are **GitHub Copilot in VS Code** → Follow the [Copilot-specific instructions](#copilot-specific-instructions)
- If you are **Roo Code in VS Code** → Follow the [Roo Code-specific instructions](#roo-code-specific-instructions)
- If you are **Windsurf** → Follow the [Windsurf-specific instructions](#windsurf-specific-instructions)
- If you are **Cursor** → Follow the [Cursor-specific instructions](#cursor-specific-instructions)

## Required Environment Variables

You will need to collect the following SurrealDB connection information from the user. Try to make this process as seamless as possible by asking direct questions:

1. **`SURREALDB_URL`**:
   * Ask: "What is the WebSocket endpoint URL for your SurrealDB instance? (e.g., ws://localhost:8000)"
   * Default suggestion if user is unsure: `ws://localhost:8000`

2. **`SURREALDB_NS`**:
   * Ask: "What namespace in SurrealDB do you want to connect to? (e.g., test)"
   * Default suggestion if user is unsure: `test`

3. **`SURREALDB_DB`**:
   * Ask: "What database within that namespace do you want to connect to? (e.g., mydatabase)"
   * Default suggestion if user is unsure: `mydatabase`

4. **`SURREALDB_USER`**:
   * Ask: "What username should be used for authentication to SurrealDB? (e.g., root)"
   * Default suggestion if user is unsure: `root`

5. **`SURREALDB_PASS`**:
   * Ask: "What is the password for that SurrealDB user?"
   * Default suggestion if user is unsure: `root` (only suggest this for local development)

## Cline-Specific Instructions

### For Cline VS Code Extension (Especially on Windows)

Due to known issues with the `npx` approach in Cline (especially on Windows), you (the AI) should:

1. **Instruct the user to install the package globally with a single command:**
   ```bash
   npm install -g surrealdb-mcp-server
   ```

2. **Automatically generate the complete configuration:**
   - Determine the user's Windows username from context if possible
   - Create the full configuration JSON with all environment variables filled in
   - Provide the exact file path where this should be saved

   Example configuration:
   ```json
   {
     "mcpServers": {
       "surrealdb": {
         "command": "C:\\Program Files\\nodejs\\node.exe",
         "args": [
           "C:\\Users\\USERNAME\\AppData\\Roaming\\npm\\node_modules\\surrealdb-mcp-server\\build\\index.js"
         ],
         "env": {
           "SURREALDB_URL": "ws://localhost:8000",
           "SURREALDB_NS": "test",
           "SURREALDB_DB": "mydatabase",
           "SURREALDB_USER": "root",
           "SURREALDB_PASS": "root"
         },
         "disabled": false,
         "autoApprove": []
       }
     }
   }
   ```

3. **Provide clear, one-step instructions:**
   - Tell the user exactly where to save this configuration
   - Default location: `%APPDATA%\Code\User\globalStorage\saoudrizwan.claude-dev\settings\cline_mcp_settings.json`
   - Instruct them to restart VS Code after saving

4. **Verify the installation automatically:**
   - After the user confirms they've completed the steps, test the connection by using the MCP server
   - Try a simple query like `SELECT * FROM information_schema.tables LIMIT 1`

### For Cline on macOS/Linux

For macOS/Linux users, follow the same approach but with the appropriate paths:

```json
{
  "mcpServers": {
    "surrealdb": {
      "command": "node",
      "args": [
        "/usr/local/lib/node_modules/surrealdb-mcp-server/build/index.js"
      ],
      "env": {
        "SURREALDB_URL": "ws://localhost:8000",
        "SURREALDB_NS": "test",
        "SURREALDB_DB": "mydatabase",
        "SURREALDB_USER": "root",
        "SURREALDB_PASS": "root"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

## Claude-Specific Instructions

### For Claude Desktop App

The Claude Desktop App works well with the `npx` approach. You (the AI) should:

1. **Generate the complete configuration automatically:**
   - Create the full configuration JSON with all environment variables filled in
   - Provide the exact file path where this should be saved based on the user's OS

   Example configuration:
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
           "SURREALDB_NS": "test",
           "SURREALDB_DB": "mydatabase",
           "SURREALDB_USER": "root",
           "SURREALDB_PASS": "root"
         },
         "disabled": false,
         "autoApprove": []
       }
     }
   }
   ```

2. **Provide clear, one-step instructions:**
   - Tell the user exactly where to save this configuration based on their OS:
     - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
     - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
     - Linux: `~/.config/Claude/claude_desktop_config.json`
   - Instruct them to restart the Claude Desktop App after saving

3. **Verify the installation automatically:**
   - After the user confirms they've completed the steps, test the connection by using the MCP server
   - Try a simple query like `SELECT * FROM information_schema.tables LIMIT 1`

## Troubleshooting Guide

If you encounter issues during installation, try these solutions:

### "Cannot find module" Error

If you see an error like "Cannot find module 'surrealdb-mcp-server'":

1. Check if the package is installed globally: `npm list -g surrealdb-mcp-server`
2. Verify the path in your configuration matches the actual installation path
3. Try reinstalling: `npm install -g surrealdb-mcp-server`

### Connection Errors

If you see "Failed to connect to SurrealDB":

1. Check if SurrealDB is running: `surreal start --log debug`
2. Verify the connection URL, namespace, database, and credentials
3. Ensure the SurrealDB instance is accessible from the path specified

## Copilot-Specific Instructions

### For GitHub Copilot in VS Code

GitHub Copilot in VS Code uses a different configuration approach for MCP servers. You (the AI) should:

1. **Create a workspace-specific configuration file:**
   - Instruct the user to create a file at `.vscode/mcp.json` in their workspace
   - Generate the configuration with input variables for secure credential handling

   Example configuration:
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

2. **Explain the benefits of this approach:**
   - VS Code will securely prompt for and store the credentials
   - The configuration is workspace-specific, making it ideal for project-based setups
   - Input variables with defaults simplify the configuration process

3. **Provide verification instructions:**
   - Tell the user to open GitHub Copilot Chat in VS Code
   - Instruct them to select "Agent" mode from the dropdown
   - Have them click the "Tools" button to see available tools
   - They should see SurrealDB tools in the list

4. **Verify the installation automatically:**
   - After the user confirms they've completed the steps, test the connection by using the MCP server
   - Try a simple query like `SELECT * FROM information_schema.tables LIMIT 1`

## Roo Code-Specific Instructions

### For Roo Code in VS Code

Roo Code in VS Code uses a similar configuration approach to Cline. You (the AI) should:

1. **Instruct the user to install the package globally:**
   ```bash
   npm install -g surrealdb-mcp-server
   ```

2. **Guide the user to access MCP Settings:**
   - Tell them to click the MCP icon in the top navigation of the Roo Code pane
   - Instruct them to select "Edit MCP Settings" to open the configuration file

3. **Generate the complete configuration automatically:**
   - Create the full configuration JSON with all environment variables filled in
   - Provide the exact configuration to add

   Example configuration:
   ```json
   {
     "mcpServers": {
       "surrealdb": {
         "command": "C:\\Program Files\\nodejs\\node.exe",
         "args": [
           "C:\\Users\\USERNAME\\AppData\\Roaming\\npm\\node_modules\\surrealdb-mcp-server\\build\\index.js"
         ],
         "env": {
           "SURREALDB_URL": "ws://localhost:8000",
           "SURREALDB_NS": "test",
           "SURREALDB_DB": "mydatabase",
           "SURREALDB_USER": "root",
           "SURREALDB_PASS": "root"
         },
         "disabled": false,
         "autoApprove": []
       }
     }
   }
   ```

4. **Provide clear verification instructions:**
   - Tell the user to restart VS Code after saving
   - Instruct them to open Roo Code in VS Code
   - Have them click the MCP icon to see available servers
   - They should see "surrealdb" in the list

5. **Verify the installation automatically:**
   - After the user confirms they've completed the steps, test the connection by using the MCP server
   - Try a simple query like `SELECT * FROM information_schema.tables LIMIT 1`

## Windsurf-Specific Instructions

### For Windsurf

Windsurf uses a different configuration format for MCP servers. You (the AI) should:

1. **Instruct the user to install the package globally:**
   ```bash
   npm install -g surrealdb-mcp-server
   ```

2. **Guide the user to access MCP Settings in Windsurf:**
   - Tell them to open Windsurf on their system
   - Navigate to the Settings page
   - Go to the Cascade tab
   - Find the Model Context Protocol (MCP) Servers section
   - Click on "View raw config" to open the configuration file (typically at `~/.codeium/windsurf/mcp_config.json`)

3. **Generate the complete configuration automatically:**
   - Create the full configuration JSON with all environment variables filled in
   - Provide the exact configuration to add

   Example configuration:
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
           "SURREALDB_NS": "test",
           "SURREALDB_DB": "mydatabase",
           "SURREALDB_USER": "root",
           "SURREALDB_PASS": "root"
         }
       }
     ]
   }
   ```

4. **Provide clear verification instructions:**
   - Tell the user to restart Windsurf after saving
   - Instruct them to open Cascade in Windsurf
   - They should see SurrealDB tools available in the tools list

5. **Verify the installation automatically:**
   - After the user confirms they've completed the steps, test the connection by using the MCP server
   - Try a simple query like `SELECT * FROM information_schema.tables LIMIT 1`

## Cursor-Specific Instructions

### For Cursor

Cursor has its own interface for adding MCP servers. You (the AI) should:

1. **Instruct the user to install the package globally:**
   ```bash
   npm install -g surrealdb-mcp-server
   ```

2. **Guide the user to access MCP Settings in Cursor:**
   - Tell them to open Cursor
   - Go to Settings > Cursor Settings
   - Find the MCP Servers option and enable it
   - Click on "Add New MCP Server"

3. **Generate the complete configuration automatically:**
   - Create the full configuration JSON with all environment variables filled in
   - Provide the exact configuration to add

   Example configuration:
   ```json
   {
     "name": "surrealdb",
     "command": "node",
     "args": [
       "/path/to/global/node_modules/surrealdb-mcp-server/build/index.js"
     ],
     "env": {
       "SURREALDB_URL": "ws://localhost:8000",
       "SURREALDB_NS": "test",
       "SURREALDB_DB": "mydatabase",
       "SURREALDB_USER": "root",
       "SURREALDB_PASS": "root"
     }
   }
   ```

4. **Provide clear verification instructions:**
   - Tell the user to restart Cursor after saving
   - Instruct them to open Cursor Chat
   - They should see SurrealDB tools available in the tools list

5. **Verify the installation automatically:**
   - After the user confirms they've completed the steps, test the connection by using the MCP server
   - Try a simple query like `SELECT * FROM information_schema.tables LIMIT 1`

### Common Issues Across All Platforms

If the npx approach doesn't work:

1. Always use the global installation method
2. Use the full path to node.exe and the installed package on Windows
3. Make sure to use the correct username in the path
