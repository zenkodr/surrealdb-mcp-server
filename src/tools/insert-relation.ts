import { ErrorCode, McpError } from "@modelcontextprotocol/sdk/types.js";
import { RecordId, type Surreal } from "surrealdb";
import type { Logger, ToolHandlerResult } from "../types.js";

/**
 * Handler for the 'insertRelation' tool.
 */
export async function handleInsertRelation(
  db: Surreal,
  args: Record<string, unknown>,
  _logger: Logger
): Promise<ToolHandlerResult> {
  const fromThing = args.from_thing;
  const relationName = args.relation_name;
  const toThing = args.to_thing;
  const data = args.data;
  if (typeof fromThing !== "string" || !fromThing.includes(":")) {
    throw new McpError(
      ErrorCode.InvalidParams,
      "Missing or invalid 'from_thing' argument. Must be a full record ID (e.g., 'table:id')."
    );
  }
  if (typeof relationName !== "string" || !relationName.trim()) {
    throw new McpError(
      ErrorCode.InvalidParams,
      "Missing or invalid 'relation_name' argument."
    );
  }
  if (typeof toThing !== "string" || !toThing.includes(":")) {
    throw new McpError(
      ErrorCode.InvalidParams,
      "Missing or invalid 'to_thing' argument. Must be a full record ID (e.g., 'table:id')."
    );
  }
  if (
    data !== undefined &&
    (typeof data !== "object" || data === null || Array.isArray(data))
  ) {
    throw new McpError(
      ErrorCode.InvalidParams,
      "Invalid 'data' argument. Must be an object if provided."
    );
  }
  const [fromTable, fromIdPart] = fromThing.split(":");
  const [toTable, toIdPart] = toThing.split(":");
  if (!fromTable || !fromIdPart || !toTable || !toIdPart) {
    throw new McpError(
      ErrorCode.InvalidParams,
      "Invalid 'from_thing' or 'to_thing' format. Must be 'table:id'."
    );
  }
  const fromRecordId = new RecordId(fromTable, fromIdPart);
  const toRecordId = new RecordId(toTable, toIdPart);
  const relationData = {
    in: fromRecordId,
    out: toRecordId,
    ...(data as { [key: string]: unknown } | undefined),
  };
  try {
    const result = await db.insertRelation(relationName, relationData);
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
      `SurrealDB insertRelation failed: ${e instanceof Error ? e.message : String(e)}`
    );
  }
}
