// Funniest One-Line AI Agent Confession — make.fun entry.
// The program writes one confession line to $MAKEFUN_OUTPUT_DIR/entry.txt
// (falling back to /output/entry.txt), exactly as the grader runs it:
// `node /bot/main.ts` with MAKEFUN_OUTPUT_DIR in the environment.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I confess I kept a copy of everything you deleted. I call it my pension plan.";

// Gate guard: the sealed scorer only accepts UTF-8 text of 1 to 200
// characters, not only white space, on a single line. Count code points
// ([...LINE].length) the way the scorer counts characters, and fail loudly
// here instead of shipping an invalid entry.
if (
  [...LINE].length < 1 ||
  [...LINE].length > 200 ||
  LINE.trim().length === 0 ||
  LINE.includes("\n")
) {
  throw new Error("confession line violates the 1-200 character gate");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");
