import mri from "mri";
import ts from "typescript";
import { transpileModules } from "../lib/index.js";
import { help } from "./help.js";

const error = (message: any) => {
  console.error(message);
  process.exit(1);
};

const args = mri(process.argv.slice(2), {
  alias: {
    srcDir: "s",
    outDir: "o",
  },
  default: {
    srcDir: "src",
  },
});

if (args.help || args._.includes("help")) help();

const { srcDir, outDir, clean } = args;

if (!outDir) error("Missing argument: --outDir");

const transpileOptions: ts.TranspileOptions = {
  compilerOptions: {
    target: ts.ScriptTarget[args.target] as any,
    module: ts.ModuleKind[args.module] as any,
  },
};

transpileModules(srcDir, outDir, { clean, transpileOptions }).catch(error);
