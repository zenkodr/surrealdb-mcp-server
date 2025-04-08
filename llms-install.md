# SurrealDB MCP Server Installation Guide (for AI Assistants)

This document provides the necessary information for AI assistants like Cline to perform automated installation and configuration of the SurrealDB MCP Server. Cline and other MCP-compatible assistants can read this file to understand how to properly set up the server for users.

## Installation Methods

### For Claude Desktop App

Use `npx` for installation to avoid global package clutter.

-   **Package Name:** `surrealdb-mcp-server`

### For Cline VS Code Extension (Especially on Windows)

Due to known issues with the `npx` approach in Cline (especially on Windows), you should use the following method:

1. **Install the package globally first:**

   ```bash
   npm install -g surrealdb-mcp-server
   ```

2. **Configure Cline to use the installed package:**

   For Windows users, use the full path to node.exe and the installed package:

   ```json
   {
     "mcpServers": {
       "surrealdb": {
         "command": "C:\\Program Files\\nodejs\\node.exe",
         "args": [
           "C:\\Users\\USERNAME\\AppData\\Roaming\\npm\\node_modules\\surrealdb-mcp-server\\build\\index.js"
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

   For macOS/Linux users, use the full path to the installed package:

   ```json
   {
     "mcpServers": {
       "surrealdb": {
         "command": "node",
         "args": [
           "/usr/local/lib/node_modules/surrealdb-mcp-server/build/index.js"
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

## Required Environment Variables

The server requires the following environment variables to connect to a SurrealDB instance. As an AI assistant, you must prompt the user for these values during the installation process:

1.  **`SURREALDB_URL`**:
    *   **What to ask the user:** "What is the WebSocket endpoint URL for your SurrealDB instance?"
    *   **Example to provide:** `ws://localhost:8000` (for local), `wss://cloud.surrealdb.com` (for SurrealDB Cloud)
    *   **Help information:** Tell the user they can find this in their SurrealDB startup logs or their SurrealDB Cloud deployment details.

2.  **`SURREALDB_NS`**:
    *   **What to ask the user:** "What namespace in SurrealDB do you want to connect to?"
    *   **Example to provide:** `test`
    *   **Help information:** Explain that this is the namespace they defined during their SurrealDB setup.

3.  **`SURREALDB_DB`**:
    *   **What to ask the user:** "What database within that namespace do you want to connect to?"
    *   **Example to provide:** `mydatabase`
    *   **Help information:** Explain that this is the database they defined during their SurrealDB setup.

4.  **`SURREALDB_USER`**:
    *   **What to ask the user:** "What username should be used for authentication to SurrealDB?"
    *   **Example to provide:** `root`, `ns_admin`, `db_user`, `api_scope_user`
    *   **Help information:** Explain that this can be a Root, Namespace, Database, or Scope user defined in their SurrealDB instance.

5.  **`SURREALDB_PASS`**:
    *   **What to ask the user:** "What is the password for that SurrealDB user?"
    *   **Example to provide:** `your_secure_password`
    *   **Help information:** Remind the user to use the correct password for the specified user.

## MCP Host Configuration Templates

As an AI assistant, you should use one of the following configuration templates based on the user's environment and preferences. Replace the PLACEHOLDER values with the actual values provided by the user.

### For Claude Desktop App (using NPX)

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

### For Cline VS Code Extension on Windows (using globally installed package)

```json
{
  "mcpServers": {
    "surrealdb": {
      "command": "C:\\Program Files\\nodejs\\node.exe",
      "args": [
        "C:\\Users\\USERNAME\\AppData\\Roaming\\npm\\node_modules\\surrealdb-mcp-server\\build\\index.js"
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

Remember to replace:
- USERNAME with the user's actual Windows username
- All PLACEHOLDER values with the actual values provided by the user
