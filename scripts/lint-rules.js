// Lint .rules/ for formatting, duplication, and deprecated references
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rulesDir = path.join(__dirname, "../.rules");

function checkRules() {
  const files = fs.readdirSync(rulesDir);
  const flagged = [];
  for (const file of files) {
    const fullPath = path.join(rulesDir, file);
    const content = fs.readFileSync(fullPath, "utf8");
    // Split into lines and check first 5 lines for standalone 'stub' or 'deprecated'
    const lines = content.split(/\r?\n/).slice(0, 5);
    for (const line of lines) {
      if (/\bstub\b/i.test(line) || /\bdeprecated\b/i.test(line)) {
        flagged.push(file);
        break;
      }
    }
  }
  if (flagged.length > 0) {
    throw new Error(
      `Rule hygiene failed: 'stub' or 'deprecated' found as a standalone word in the first 5 lines of: ${flagged.join(", ")}`
    );
  }
}

checkRules();
