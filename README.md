# ts-transpile-modules

Transpile [TypeScript](https://www.typescriptlang.org/) modules into JavaScript.

What it does is just calling `transpileModule()` of [TypeScript API](https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API) for multiple files in a given directory.

Optional features:

- Cleanup output directory before transpiling
- Replace any string in each code before/after transpiling
- Emit output files (either way you are able to use the transpilation results)

Not very well tested, though.


## API

```js
import { transpileModules } from "@fal-works/ts-transpile-modules";

const run = async () => {
  const srcDir = "src";
  const outDir = "out";
  const options = undefined; // Not required. See type declaration for option fields.

  const resultPerFile = await transpileModules(srcDir, outDir, options);
};

run();
```


## CLI

Use `ts-transpile-modules` command with the following options (limited functionality compared to the API).

```text
--srcDir   Source directory path. (default: src)
--outDir   Output directory path. (required)
--clean    Removes outDir before transpiling. (optional)
--target   Any key of ts.ScriptTarget e.g. ES2015. (optional)
--module   Any key of ts.ModuleKind e.g. ES2015. (optional)
```
