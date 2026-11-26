import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const line =
  "Tonight in Drayle: scattered showers, none expected over Drayle itself. The rain has chosen the suburbs. Low 41, winds calm, radar confident anyway.";

if (line.length < 1 || line.length > 160) {
  throw new Error(`entry is ${line.length} chars, gate requires 1..160`);
}
if (line.trim().length === 0) {
  throw new Error("entry is blank");
}
if (line.includes("\n") || line.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (!line.isWellFormed()) {
  throw new Error("entry must be well-formed UTF-16 without lone surrogates");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), line, { encoding: "utf-8" });
