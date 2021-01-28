import ts from "typescript";
import { defaultsDeep } from "./defaults-deep.js";

import type { Options, OptionFields } from "./types";
import deepFreeze from "@fal-works/deep-freeze";

/**
 * Default values for `Options`.
 */
export const defaultOptions = deepFreeze({
  clean: false,
  include: ["**/*.{ts,tsx}"],
  preTranspile: (code: string) => code,
  postTranspile: (code: string) => code,
  extensionMap: {
    ts: "js",
    tsx: "jsx",
  },
  write: true,
  transpileOptions: {
    compilerOptions: {
      target: ts.ScriptTarget.ES2015,
      module: ts.ModuleKind.ES2015,
    },
  },
} as OptionFields);

export const complementOptions = (partialOptions?: Options): OptionFields =>
  defaultsDeep(partialOptions || {}, defaultOptions);
