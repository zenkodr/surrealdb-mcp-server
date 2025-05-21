import { ErrorCode, McpError } from "@modelcontextprotocol/sdk/types.js";
import { type Patch, RecordId, type Surreal } from "surrealdb";
import type { Logger, ToolHandlerResult } from "../types.js";

/**
 * Handler for the 'patch' tool.
 */
export async function handlePatch(
  db: Surreal,
  args: Record<string, unknown>,
  _logger: Logger
): Promise<ToolHandlerResult> {
  const thing = args.thing;
  const patches = args.patches;
  if (typeof thing !== "string" || !thing.includes(":")) {
    throw new McpError(
      ErrorCode.InvalidParams,
      "Missing or invalid 'thing' argument. Must be a full record ID (e.g., 'table:id')."
    );
  }
  if (!Array.isArray(patches) || patches.length === 0) {
    throw new McpError(
      ErrorCode.InvalidParams,
      "Missing or invalid 'patches' argument. Must be a non-empty array of patch operations."
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
    const result = await db.patch(recordId, patches as Patch[]);
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
      `SurrealDB patch failed for ${thing}: ${e instanceof Error ? e.message : String(e)}`
    );
  }
}
