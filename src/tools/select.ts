import { ErrorCode, McpError } from "@modelcontextprotocol/sdk/types.js";
import type { Surreal } from "surrealdb";
import type { Logger, ToolHandlerResult } from "../types.js";

/**
 * Handler for the 'select' tool.
 */
function validateSelectArgs(args: Record<string, unknown>) {
  const { table, where, limit, order, fields } = args;
  if (typeof table !== "string" || !table.trim()) {
    throw new McpError(
      ErrorCode.InvalidParams,
      "Missing or invalid 'table' argument."
    );
  }
  if (where !== undefined && typeof where !== "object") {
    throw new McpError(
      ErrorCode.InvalidParams,
      "'where' argument must be an object if provided."
    );
  }
  if (limit !== undefined && typeof limit !== "number") {
    throw new McpError(
      ErrorCode.InvalidParams,
      "'limit' argument must be a number if provided."
    );
  }
  if (order !== undefined && typeof order !== "string") {
    throw new McpError(
      ErrorCode.InvalidParams,
      "'order' argument must be a string if provided."
    );
  }
  if (fields !== undefined && !Array.isArray(fields)) {
    throw new McpError(
      ErrorCode.InvalidParams,
      "'fields' argument must be an array if provided."
    );
  }
}

function buildSelectQuery(args: Record<string, unknown>): string {
  const { table, where, limit, order, fields } = args;
  let query = "SELECT";
  if (fields && Array.isArray(fields) && fields.length > 0) {
    query += ` ${(fields as string[]).join(", ")}`;
  } else {
    query += " *";
  }
  query += ` FROM ${table}`;
  if (where && typeof where === "object") {
    const whereClauses = Object.entries(where).map(
      ([k, v]) => `${k} = ${JSON.stringify(v)}`
    );
    if (whereClauses.length > 0) {
      query += ` WHERE ${whereClauses.join(" AND ")}`;
    }
  }
  if (order && typeof order === "string") {
    query += ` ORDER BY ${order}`;
  }
  if (limit && typeof limit === "number") {
    query += ` LIMIT ${limit}`;
  }
  return query;
}

export async function handleSelect(
  db: Surreal,
  args: Record<string, unknown>,
  _logger: Logger
): Promise<ToolHandlerResult> {
  validateSelectArgs(args);
  const query = buildSelectQuery(args);
  try {
    const result = await db.query(query);
    _logger.info(`Select executed successfully for table: ${args.table}`);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  } catch (e) {
    _logger.error(`Error executing select tool for table ${args.table}:`, e);
    throw new McpError(
      ErrorCode.InternalError,
      `SurrealDB select failed for table ${args.table}: ${e instanceof Error ? e.message : String(e)}`
    );
  }
}
