import { ErrorCode, McpError } from "@modelcontextprotocol/sdk/types.js";
import type { Surreal } from "surrealdb";
import type { Logger, ToolHandlerResult } from "../types.js";

/**
 * Handler for the 'insert' tool.
 */
export async function handleInsert(
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
  if (
    !Array.isArray(data) ||
    data.length === 0 ||
    !data.every((item) => typeof item === "object" && item !== null)
  ) {
    throw new McpError(
      ErrorCode.InvalidParams,
      "Missing or invalid 'data' argument. Must be a non-empty array of objects."
    );
  }
  try {
    const result = await db.insert(table, data as { [key: string]: unknown }[]);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  } catch (e) {
    throw new McpError(
      ErrorCode.InternalError,
      `SurrealDB insert failed for table ${table}: ${e instanceof Error ? e.message : String(e)}`
    );
  }
}
