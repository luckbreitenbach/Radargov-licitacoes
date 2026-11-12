// Copies the static site into dist/ so Netlify can publish it.
// No dependencies: works with both netlify.toml and the UI build settings
// (npm run build -> dist).
import { cpSync, mkdirSync, rmSync, readdirSync } from "node:fs";

const SKIP = new Set(["dist", "node_modules", "scripts", ".git", ".netlify",
  "package.json", "package-lock.json", "netlify.toml", "README.md"]);

rmSync("dist", { recursive: true, force: true });
mkdirSync("dist");
for (const entry of readdirSync(".")) {
  if (SKIP.has(entry) || entry.startsWith(".")) continue;
  cpSync(entry, `dist/${entry}`, { recursive: true });
}
console.log("Static site copied to dist/");
