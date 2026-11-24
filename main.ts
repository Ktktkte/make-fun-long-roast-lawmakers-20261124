import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The Long Roast: Lawmakers and the File They Cannot Convert — one satirical
// sentence about lawmakers and the file they cannot convert, written to
// /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt).
const here = dirname(fileURLToPath(import.meta.url));
const text = readFileSync(join(here, "entry.txt"), "utf8").trim();

if (text.length < 1 || text.length > 320) {
  throw new Error(`entry must be 1-320 characters, got ${text.length}`);
}
// Exactly one sentence: a single terminal period and no other sentence enders.
if (!text.endsWith(".") || /[.!?]/.test(text.slice(0, -1).replace(/\.csv/g, ""))) {
  throw new Error("entry must be exactly one sentence");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text);
