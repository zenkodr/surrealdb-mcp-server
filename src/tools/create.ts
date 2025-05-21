import { ErrorCode, McpError } from "@modelcontextprotocol/sdk/types.js";
import type { Surreal } from "surrealdb";
import type { Logger, ToolHandlerResult } from "../types.js";

/**
 * Handler for the 'create' tool.
 */
export async function handleCreate(
  db: Surreal,
  args: Record<string, unknown>,
  _logger: Logger
): Promise<ToolHandlerResult> {
  const table = args.table;
  const data = args.data;
  if (typeof table !== "string" || !table.trim()) {
    throw new McpError(
      ErrorCode.InvalidParams,
      "Missing or invalid 'table' argument."
    );
  }
  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    throw new McpError(
      ErrorCode.InvalidParams,
      "Missing or invalid 'data' argument. Must be an object."
    );
  }
  try {
    _logger.info(`Executing create tool for table: ${table}`);
    const result = await db.create(table, data as { [key: string]: unknown });
    _logger.info(`Create executed successfully for table: ${table}.`);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  } catch (e) {
    _logger.error(`Error executing create tool for table ${table}:`, e);
    throw new McpError(
      ErrorCode.InternalError,
      `SurrealDB create failed for table ${table}: ${e instanceof Error ? e.message : String(e)}`
    );
  }
}
