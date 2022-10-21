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
        build.onLoad({ filter: /regexps\.js$/ }, async ({ path }) => {
          const data = await import(url.pathToFileURL(path));
          const code = Object.entries(data)
            .map(
              ([specifier, regexp]) => `
            export const ${specifier} = ${regexp.toString()};
          `
            )
            .join("\n");

          return { contents: code };
        });
      },
    },
  ],
};

// console.log(config)

await esbuild.build(config);
