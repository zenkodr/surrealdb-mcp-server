import { ErrorCode, McpError } from "@modelcontextprotocol/sdk/types.js";
import { RecordId, type Surreal } from "surrealdb";
import type { Logger, ToolHandlerResult } from "../types.js";

/**
 * Handler for the 'merge' tool.
 */
export async function handleMerge(
  db: Surreal,
  args: Record<string, unknown>,
  _logger: Logger
): Promise<ToolHandlerResult> {
  const thing = args.thing;
  const data = args.data;
  if (typeof thing !== "string" || !thing.includes(":")) {
    throw new McpError(
      ErrorCode.InvalidParams,
      "Missing or invalid 'thing' argument. Must be a full record ID (e.g., 'table:id')."
    );
  }
  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    throw new McpError(
      ErrorCode.InvalidParams,
      "Missing or invalid 'data' argument. Must be an object."
    );
  }
  const [table, idPart] = thing.split(":");
  if (!table || !idPart) {
    throw new McpError(
      ErrorCode.InvalidParams,
      "Invalid 'thing' format. Must be 'table:id'."
    );
  }
  const recordId = new RecordId(table, idPart);
  try {
    const result = await db.merge(recordId, data as { [key: string]: unknown });
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
      `SurrealDB merge failed for ${thing}: ${e instanceof Error ? e.message : String(e)}`
    );
  }
}
