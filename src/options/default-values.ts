import ts from "typescript";

import type { Options } from "./types";

const emptyObject = Object.freeze({});
const nullReplacer = (code: string) => code;

const baseOptions: Options = Object.freeze({
  cleanBuild: false,
  include: ["**/*.{ts,tsx}"],
  preTranspile: nullReplacer,
  postTranspile: nullReplacer,
  extensionMap: emptyObject,
  write: true,
  transpileOptions: emptyObject,
});

const defaultExtensionMap = Object.freeze({
  ts: "js",
  tsx: "jsx",
});

const defaultCompilerOptions: ts.CompilerOptions = Object.freeze({
  target: ts.ScriptTarget.ES2015,
  module: ts.ModuleKind.ES2015,
});

export const complementOptions = (
  partialOptions?: Partial<Options>
): Options => {
  // maybe there's a better way
  const options = { ...baseOptions, ...partialOptions };
  options.extensionMap = { ...defaultExtensionMap, ...options.extensionMap };
  options.transpileOptions.compilerOptions = {
    ...defaultCompilerOptions,
    ...options.transpileOptions.compilerOptions,
  };
  return options;
};
