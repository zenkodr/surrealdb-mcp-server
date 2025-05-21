// Shared logger type for tool handlers
export type Logger = {
  info: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
};

export interface ToolHandlerResult {
  content: Array<{ type: string; text: string }>;
  _meta?: { [key: string]: unknown };
}
