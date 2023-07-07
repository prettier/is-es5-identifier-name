import fs from "node:fs/promises";
import url from "node:url";
import esbuild from "esbuild";

const PROJECT_ROOT = new URL("../", import.meta.url);

const config = {
  entryPoints: [url.fileURLToPath(new URL("./src/index.js", PROJECT_ROOT))],
  bundle: true,
  format: "esm",
  outfile: url.fileURLToPath(new URL("./dist/index.js", PROJECT_ROOT)),
  plugins: [
    {
      name: "evaluate-regexp",
      setup(build) {
        build.onLoad({ filter: /regexp\.js$/ }, async ({ path }) => {
          const { default: regexp } = await import(url.pathToFileURL(path));
          return { contents: `export default ${regexp.toString()};` };
        });
      },
    },
  ],
};

// console.log(config)

await esbuild.build(config);

await fs.copyFile(
  new URL("src/index.d.ts", PROJECT_ROOT),
  new URL("dist/index.d.ts", PROJECT_ROOT),
);
