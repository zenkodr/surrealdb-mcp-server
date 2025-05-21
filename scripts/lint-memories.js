// Lint memories/ for existence of key files and up-to-date templates
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const memDir = path.join(__dirname, "../memories");
const required = [
  "activeContext.md",
  "prd.md",
  "productContext.md",
  "systemPatterns.md",
  "techContext.md",
  "progress.md",
  "tasklist.md",
  "features.md",
];

const missing = [];
for (const f of required) {
  if (!fs.existsSync(path.join(memDir, f))) {
    missing.push(f);
  }
}

if (missing.length) {
  throw new Error(`Missing required memory files: ${missing.join(", ")}`);
}
