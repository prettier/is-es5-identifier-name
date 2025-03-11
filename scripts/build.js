import fs from "node:fs/promises";
import url from 'node:url';
import path from "node:path";
import esbuild from "esbuild";

const toPath = file => path.join(import.meta.dirname, file);

const config = {
  entryPoints: [toPath("../source/index.js")],
  bundle: true,
  format: "esm",
  outfile: toPath("../index.js"),
  target: ['es2024'],
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
