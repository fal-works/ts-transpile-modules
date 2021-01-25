import ts from "typescript";
import { transpileModules } from "../lib/index.js";

const srcDir = "src";
const outDir = "test/out";

transpileModules(srcDir, outDir, {
  transpileOptions: {
    compilerOptions: {
      target: ts.ScriptTarget.ES2019,
    },
  },
});
