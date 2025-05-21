import { ErrorCode, McpError } from "@modelcontextprotocol/sdk/types.js";
import type { Surreal } from "surrealdb";
import type { Logger, ToolHandlerResult } from "../types.js";

export async function handleQuery(
  db: Surreal,
  args: Record<string, unknown>,
  _logger: Logger
): Promise<ToolHandlerResult> {
  const queryString =
    typeof args.query_string === "string" ? args.query_string : undefined;
  if (!queryString || !queryString.trim()) {
    throw new McpError(
      ErrorCode.InvalidParams,
      "Missing or invalid 'query_string' argument."
    );
  }
  try {
    const result = await db.query(queryString);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  } catch (err: unknown) {
    throw new McpError(
      ErrorCode.InternalError,
      `SurrealDB query error: ${err instanceof Error ? err.message : String(err)}`
    );
  }
}
