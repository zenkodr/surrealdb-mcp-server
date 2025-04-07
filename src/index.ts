#!/usr/bin/env node

/**
 * This is a template MCP server that implements a simple notes system.
 * It demonstrates core MCP concepts like resources and tools by allowing:
 * - Listing notes as resources
 * - Reading individual notes
 * - Creating new notes via a tool
 * - Connecting to SurrealDB
 * - (Future) Exposing tools for DB operations
 */

// MCP SDK Imports
// MCP SDK Imports
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListToolsRequestSchema, // Added
  CallToolRequestSchema,  // Added
  McpError,               // Added
  ErrorCode,              // Added
} from "@modelcontextprotocol/sdk/types.js";

// SurrealDB Import
import { Surreal } from 'surrealdb';

// --- Database Configuration ---
// TODO: Move these to environment variables managed by MCP host settings
const DB_ENDPOINT = 'ws://localhost:8000';
const DB_NAMESPACE = 'n8n';
const DB_DATABASE = 'AIWorld';
const DB_USER = 'root';
const DB_PASS = 'root';
// -----------------------------

// Instantiate the SurrealDB client
const db = new Surreal();

/**
 * Create an MCP server instance.
 * Capabilities will be added as tools are implemented.
 */
const server = new Server(
    {
      // Name and version from package.json are used by default,
      // but you can override them here if needed.
      name: "surrealdb-mcp-server",
      version: "0.1.0",
    },
    {
    // No capabilities defined yet
    capabilities: {},
  }
);

// --- MCP Request Handlers ---

// Handler for listing available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "query",
        description: "Execute a raw SurrealQL query against the connected database.",
        inputSchema: {
          type: "object",
          properties: {
            query_string: {
              type: "string",
              description: "The SurrealQL query string to execute."
            }
          },
          required: ["query_string"]
        }
      }
      // Add more tools here later (e.g., select, create, update, delete)
    ]
  };
});

// Handler for executing tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  switch (request.params.name) {
    case "query": {
      // Validate input arguments
      const queryString = request.params.arguments?.query_string;
      if (typeof queryString !== 'string' || !queryString.trim()) {
        throw new McpError(ErrorCode.InvalidParams, "Missing or invalid 'query_string' argument.");
      }

      try {
        console.log(`Executing query tool with: ${queryString}`);
        // Execute the query using the globally connected db instance
        const result = await db.query(queryString);
        console.log("Query executed successfully via tool.");

        // Return the result (SurrealDB returns an array of results per query)
        return {
          content: [{
            type: "text",
            // Convert result to JSON string for transport
            text: JSON.stringify(result, null, 2)
          }]
        };
      } catch (e) {
        console.error(`Error executing query tool: ${e instanceof Error ? e.message : e}`);
        // Rethrow as an MCPError for the client
        throw new McpError(
          ErrorCode.InternalError,
          `SurrealDB query failed: ${e instanceof Error ? e.message : String(e)}`
        );
      }
    }

    default:
      // Use McpError for unknown tools
      throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${request.params.name}`);
  }
});

// --------------------------


/**
 * Main function to start the server.
 * Connects to SurrealDB first, then starts the MCP server transport.
 */
async function main() {
  try {
    console.log(`Attempting to connect to SurrealDB at ${DB_ENDPOINT}...`);
    // Connect to SurrealDB using the validated method
    await db.connect(DB_ENDPOINT, {
      namespace: DB_NAMESPACE,
      database: DB_DATABASE,
      auth: {
        username: DB_USER,
        password: DB_PASS,
      },
    });
    console.log(`Successfully connected to SurrealDB (NS: ${DB_NAMESPACE}, DB: ${DB_DATABASE})`);

    // Start the MCP server communication
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.log("SurrealDB MCP Server connected via stdio transport.");

  } catch (error) {
    console.error("--- FATAL ERROR ---");
    if (error instanceof Error) {
      console.error("Failed to connect to SurrealDB or start MCP server:", error.message);
      console.error(error.stack);
    } else {
      console.error("An unknown error occurred during startup:", error);
    }
    console.error("-------------------");
    // Ensure DB connection is closed if it was partially opened or if error occurred after connect
    await db.close();
    process.exit(1); // Exit if we can't connect to the DB or start the server
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log("\nCaught interrupt signal (Ctrl+C).");
  console.log("Closing SurrealDB connection...");
  await db.close();
  console.log("Database connection closed.");
  console.log("Shutting down MCP server...");
  await server.close(); // Close the MCP server itself
  console.log("MCP server shut down.");
  process.exit(0);
});

// Start the main application logic
main().catch((error) => {
  // This catch is mainly for unexpected errors not caught within main's try/catch
  console.error("Unhandled error in main execution:", error);
  process.exit(1);
});
