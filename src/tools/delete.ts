import { ErrorCode, McpError } from "@modelcontextprotocol/sdk/types.js";
import { RecordId, type Surreal } from "surrealdb";
import type { Logger, ToolHandlerResult } from "../types.js";

/**
 * Handler for the 'delete' tool.
 */
export async function handleDelete(
  db: Surreal,
  args: Record<string, unknown>,
  _logger: Logger
): Promise<ToolHandlerResult> {
  const thing = args.thing;
  if (typeof thing !== "string" || !thing.includes(":")) {
    throw new McpError(
      ErrorCode.InvalidParams,
      "Missing or invalid 'thing' argument. Must be a full record ID (e.g., 'table:id')."
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
    const result = await db.delete(recordId);
    const responseText =
      result && (!Array.isArray(result) || result.length > 0)
        ? JSON.stringify(result, null, 2)
        : "Record not found or already deleted.";
    return {
      content: [
        {
          type: "text",
          text: responseText,
        },
      ],
    };
  } catch (e) {
    throw new McpError(
      ErrorCode.InternalError,
      `SurrealDB delete failed for ${thing}: ${e instanceof Error ? e.message : String(e)}`
    );
  }
}
