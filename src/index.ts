#!/usr/bin/env node

/**
 * SurrealDB MCP Server
 *
 * This MCP server provides a standardized interface for AI assistants to interact with a SurrealDB database.
 * It implements tools for common SurrealDB operations including:
 * - Executing raw SurrealQL queries
 * - Selecting, creating, updating, and deleting records
 * - Merging and patching data
 * - Upserting records
 * - Inserting multiple records
 * - Creating graph relations between records
 */

// Redirect console.log and console.error to ensure no logs go to stdout
console.log = (...args) => process.stderr.write(`${args.join(" ")}\n`);
console.error = (...args) => process.stderr.write(`${args.join(" ")}\n`);

// MCP SDK Imports
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ErrorCode,
  ListPromptsRequestSchema,
  ListResourceTemplatesRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";

import { inspect } from "node:util";
// SurrealDB Import
import { Surreal } from "surrealdb";

// Custom logger that writes to stderr to avoid interfering with JSON-RPC communication
const logger = {
  info: (...args: unknown[]) => {
    const timestamp = new Date().toISOString();
    process.stderr.write(
      `${timestamp} [surrealdb] [info] ${args.map((arg) => (typeof arg === "string" ? arg : inspect(arg))).join(" ")}\n`
    );
  },
  error: (...args: unknown[]) => {
    const timestamp = new Date().toISOString();
    process.stderr.write(
      `${timestamp} [surrealdb] [error] ${args.map((arg) => (typeof arg === "string" ? arg : inspect(arg))).join(" ")}\n`
    );
  },
};

// --- Database Configuration ---
// Read configuration from environment variables provided by MCP host
const DB_ENDPOINT = process.env.SURREALDB_URL;
const DB_NAMESPACE = process.env.SURREALDB_NS;
const DB_DATABASE = process.env.SURREALDB_DB;
const DB_USER = process.env.SURREALDB_USER;
const DB_PASS = process.env.SURREALDB_PASS;
// -----------------------------

// Validate that all required environment variables are set
if (!DB_ENDPOINT || !DB_NAMESPACE || !DB_DATABASE || !DB_USER || !DB_PASS) {
  logger.error(
    "FATAL ERROR: Missing one or more required SurrealDB environment variables (SURREALDB_URL, SURREALDB_NS, SURREALDB_DB, SURREALDB_USER, SURREALDB_PASS)"
  );
  process.exit(1);
}

// Instantiate the SurrealDB client
const db = new Surreal();

/**
 * Create an MCP server instance.
 * Capabilities will be added as tools are implemented.
 */
// Create server instance
const server = new Server(
  {
    name: "surrealdb-mcp-server",
    version: "0.1.10", // Updated to match current package version
  },
  {
    // Declare tool capability
    capabilities: {
      tools: {}, // This enables tool-related handlers like ListTools and CallTool
      resources: {}, // Add resources capability
      prompts: {}, // Add prompts capability
    },
  }
);

// --- MCP Request Handlers ---

// Handler for listing resources (required by MCP protocol)
server.setRequestHandler(ListResourcesRequestSchema, () => {
  logger.info("Handling ListResources request");
  return {
    resources: [], // Return empty array as we don't have any resources
  };
});

// Handler for listing resource templates (required by MCP protocol)
server.setRequestHandler(ListResourceTemplatesRequestSchema, () => {
  logger.info("Handling ListResourceTemplates request");
  return {
    resourceTemplates: [], // Return empty array as we don't have any resource templates
  };
});

// Handler for listing prompts (required by MCP protocol)
server.setRequestHandler(ListPromptsRequestSchema, () => {
  logger.info("Handling ListPrompts request");
  return {
    prompts: [], // Return an empty array as we don't have any prompts
  };
});

// Handler for listing available tools
server.setRequestHandler(ListToolsRequestSchema, () => {
  logger.info("Handling ListTools request");
  return {
    tools: [
      {
        name: "query",
        description:
          "Execute a raw SurrealQL query against the connected database.",
        inputSchema: {
          type: "object",
          properties: {
            query_string: {
              type: "string",
              description: "The SurrealQL query string to execute.",
            },
          },
          required: ["query_string"],
        },
      },
      {
        name: "select",
        description:
          "Select all records from a table or a specific record by ID.",
        inputSchema: {
          type: "object",
          properties: {
            table: {
              type: "string",
              description: "The name of the table to select from.",
            },
            id: {
              type: "string",
              description:
                "Optional: The specific ID of the record to select (e.g., 'user:john'). If omitted, selects all records.",
            },
          },
          required: ["table"],
        },
      },
      {
        name: "create",
        description: "Create a new record in a table with the specified data.",
        inputSchema: {
          type: "object",
          properties: {
            table: {
              type: "string",
              description: "The name of the table to create the record in.",
            },
            data: {
              type: "object",
              description: "An object containing the data for the new record.",
              additionalProperties: true, // Allow any properties in the data object
            },
          },
          required: ["table", "data"],
        },
      },
      {
        name: "update",
        description:
          "Update a specific record with new data. Replaces the entire record content.",
        inputSchema: {
          type: "object",
          properties: {
            thing: {
              type: "string",
              description: "The full record ID to update (e.g., 'table:id').",
            },
            data: {
              type: "object",
              description: "An object containing the new data for the record.",
              additionalProperties: true,
            },
          },
          required: ["thing", "data"],
        },
      },
      {
        name: "delete",
        description: "Delete a specific record by ID.",
        inputSchema: {
          type: "object",
          properties: {
            thing: {
              type: "string",
              description: "The full record ID to delete (e.g., 'table:id').",
            },
          },
          required: ["thing"],
        },
      },
      {
        name: "merge",
        description:
          "Merge data into a specific record. Only updates specified fields.",
        inputSchema: {
          type: "object",
          properties: {
            thing: {
              type: "string",
              description:
                "The full record ID to merge data into (e.g., 'table:id').",
            },
            data: {
              type: "object",
              description:
                "An object containing the data to merge into the record.",
              additionalProperties: true,
            },
          },
          required: ["thing", "data"],
        },
      },
      {
        name: "patch",
        description: "Apply JSON patches to a specific record.",
        inputSchema: {
          type: "object",
          properties: {
            thing: {
              type: "string",
              description: "The full record ID to patch (e.g., 'table:id').",
            },
            patches: {
              type: "array",
              description: "An array of JSON Patch operations (RFC 6902).",
              items: {
                type: "object",
                properties: {
                  op: {
                    type: "string",
                    enum: ["add", "remove", "replace", "move", "copy", "test"],
                  },
                  path: { type: "string" },
                  value: {
                    description: "Value for add, replace, test operations",
                  },
                  from: {
                    type: "string",
                    description: "Source path for move, copy operations",
                  },
                },
                required: ["op", "path"],
              },
            },
          },
          required: ["thing", "patches"],
        },
      },
      {
        name: "upsert",
        description:
          "Upsert a record: create if it doesn't exist, update if it does.",
        inputSchema: {
          type: "object",
          properties: {
            thing: {
              type: "string",
              description: "The full record ID to upsert (e.g., 'table:id').",
            },
            data: {
              type: "object",
              description: "An object containing the data for the record.",
              additionalProperties: true,
            },
          },
          required: ["thing", "data"],
        },
      },
      {
        name: "insert",
        description:
          "Insert multiple records into a table. Use 'create' for single records.",
        inputSchema: {
          type: "object",
          properties: {
            table: {
              type: "string",
              description: "The name of the table to insert records into.",
            },
            data: {
              type: "array",
              description:
                "An array of objects, each representing a record to insert.",
              items: {
                type: "object",
                additionalProperties: true,
              },
            },
          },
          required: ["table", "data"],
        },
      },
      {
        name: "insert-relation",
        description: "Create a graph relation (edge) between two records.",
        inputSchema: {
          type: "object",
          properties: {
            from_thing: {
              type: "string",
              description:
                "The full record ID of the 'from' record (e.g., 'user:john').",
            },
            relation_name: {
              type: "string",
              description:
                "The name of the relation/edge table (e.g., 'likes').",
            },
            to_thing: {
              type: "string",
              description:
                "The full record ID of the 'to' record (e.g., 'product:apple').",
            },
            data: {
              type: "object",
              description:
                "Optional: An object containing data for the relation itself.",
              additionalProperties: true,
            },
          },
          required: ["from_thing", "relation_name", "to_thing"],
        },
      },
    ],
  };
});

import { handleCreate } from "./tools/create.js";
import { handleDelete } from "./tools/delete.js";
import { handleInsertRelation } from "./tools/insert-relation.js";
import { handleInsert } from "./tools/insert.js";
import { handleMerge } from "./tools/merge.js";
import { handlePatch } from "./tools/patch.js";
// --- Modular Tool Handler Imports ---
// Modular SurrealDB tool handlers (one import per handler, no duplicates)
import { handleQuery } from "./tools/query.js";
import { handleSelect } from "./tools/select.js";
import { handleUpdate } from "./tools/update.js";
import { handleUpsert } from "./tools/upsert.js";
import type { Logger, ToolHandlerResult } from "./types.js";

// Map tool names to modular handler functions
const toolHandlers: Record<
  string,
  (
    db: Surreal,
    args: Record<string, unknown>,
    logger: Logger
  ) => Promise<ToolHandlerResult>
> = {
  query: handleQuery,
  select: handleSelect,
  create: handleCreate,
  update: handleUpdate,
  delete: handleDelete,
  merge: handleMerge,
  patch: handlePatch,
  upsert: handleUpsert,
  insert: handleInsert,
  "insert-relation": handleInsertRelation,
};

// Handler for executing tool calls (all logic is delegated to modular handlers)
server.setRequestHandler(
  CallToolRequestSchema,
  async (request): Promise<ToolHandlerResult> => {
    const handler = toolHandlers[request.params.name];
    if (!handler) {
      throw new McpError(
        ErrorCode.MethodNotFound,
        `Unknown tool: ${request.params.name}`
      );
    }
    return await handler(db, request.params.arguments ?? {}, logger);
  }
);

// --------------------------

/**
 * Main function to start the server.
 * Connects to SurrealDB first, then starts the MCP server transport.
 */
async function main() {
  try {
    // Prepare and validate SurrealDB environment variables
    const endpoint = DB_ENDPOINT;
    const namespace = DB_NAMESPACE;
    const database = DB_DATABASE;
    const user = DB_USER;
    const pass = DB_PASS;
    if (!endpoint || !namespace || !database || !user || !pass) {
      throw new Error("Missing required SurrealDB environment variables.");
    }

    // Log connection attempt using the environment variable
    logger.info(`Attempting to connect to SurrealDB at ${endpoint}...`);
    // Connect to SurrealDB using validated variables
    await db.connect(endpoint, {
      namespace,
      database,
      auth: {
        username: user,
        password: pass,
      },
    });
    // Log success using the environment variables
    logger.info(
      `Successfully connected to SurrealDB (NS: ${DB_NAMESPACE}, DB: ${DB_DATABASE})`
    );

    // Start the MCP server communication
    const transport = new StdioServerTransport();
    await server.connect(transport);
    logger.info("SurrealDB MCP Server connected via stdio transport.");
  } catch (error) {
    logger.error("--- FATAL ERROR ---");
    if (error instanceof Error) {
      logger.error(
        "Failed to connect to SurrealDB or start MCP server:",
        error.message
      );
      logger.error(error.stack || "No stack trace available");
    } else {
      logger.error("An unknown error occurred during startup:", error);
    }
    logger.error("-------------------");
    // Ensure DB connection is closed if it was partially opened or if error occurred after connect
    await db.close();
    process.exit(1); // Exit if we can't connect to the DB or start the server
  }
}

// Graceful shutdown
process.on("SIGINT", async () => {
  logger.info("\nCaught interrupt signal (Ctrl+C).");
  logger.info("Closing SurrealDB connection...");
  await db.close();
  logger.info("Database connection closed.");
  logger.info("Shutting down MCP server...");
  await server.close(); // Close the MCP server itself
  logger.info("MCP server shut down.");
  process.exit(0);
});

// Start the main application logic
main().catch((error) => {
  // This catch is mainly for unexpected errors not caught within main's try/catch
  logger.error("Unhandled error in main execution:", error);
  process.exit(1);
});
