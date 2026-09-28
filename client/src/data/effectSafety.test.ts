import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

function sourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return sourceFiles(path);
    return /\.(ts|tsx)$/.test(entry.name) && !entry.name.endsWith(".test.ts") && !entry.name.endsWith(".test.tsx")
      ? [path]
      : [];
  });
}

describe("React effect safety", () => {
  it("uses block callbacks so effects cannot accidentally return promises or other values", () => {
    for (const path of sourceFiles("client/src")) {
      const source = readFileSync(path, "utf8");
      expect(source, path).not.toMatch(/(?:React\.)?useEffect\s*\(\s*async\b/);
      expect(source, path).not.toMatch(/(?:React\.)?useEffect\s*\(\s*\(\s*\)\s*=>\s*[^\s{]/);
    }
  });
});
