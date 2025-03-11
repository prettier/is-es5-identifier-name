import fs from "node:fs/promises";
import url from "node:url";
import path from "node:path";
import regexp from "../source/regexp.js";

const content = await fs.readFile(
  new URL("../source/index.js", import.meta.url),
  "utf8",
);
const importDeclaration = 'import identifierRegexp from "./regexp.js";';

if (!content.startsWith(importDeclaration)) {
  throw new Error("Unexpected source.");
}

await fs.writeFile(
  new URL("../index.js", import.meta.url),
  content.replace(
    importDeclaration,
    `const identifierRegexp = ${regexp.toString()};`,
  ),
);

console.log("Build succeed!");
