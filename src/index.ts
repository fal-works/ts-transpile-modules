import * as path from "path";
import ts from "typescript";

import { rm, readFile, writeFile } from "./util/fs.js";
import { glob } from "./util/glob.js";
import { createExtensionReplacer } from "./util/extension.js";
import { complementOptions } from "./options/index.js";

import type { Options } from "./options";

/**
 * Result of transpiling a single source file.
 */
export type Result = {
  code: string;
  filepath: string;
  tsOutput: ts.TranspileOutput;
};

/**
 * Transpile files in `srcDir` and save the outputs in `outDir`.
 */
export const transpileModules = async (
  srcDir: string,
  outDir: string,
  options?: Partial<Options>
): Promise<Result[]> => {
  const {
    clean,
    include,
    exclude,
    preTranspile,
    postTranspile,
    extensionMap,
    write,
    transpileOptions,
  } = complementOptions(options);

  const replaceExtension = createExtensionReplacer(extensionMap);

  if (clean) await rm(outDir);
  const files = await glob(srcDir, include, exclude);

  const transpileAll = files.map(async (srcFileRelPath) => {
    const srcFile = `${srcDir}/${srcFileRelPath}`;

    const srcContent = await readFile(srcFile);
    const srcCode = srcContent.toString();
    const srcInfo = path.parse(srcFile);
    const tsOut = ts.transpileModule(preTranspile(srcCode), {
      fileName: srcInfo.base,
      moduleName: srcInfo.name,
      ...transpileOptions,
    });

    const outFileRelPath = replaceExtension(srcFileRelPath);
    const outFile = `${outDir}/${outFileRelPath}`;
    const outCode = postTranspile(tsOut.outputText);
    if (write) await writeFile(outFile, outCode);

    return {
      code: outCode,
      filepath: outFile,
      tsOutput: tsOut,
    };
  });

  return Promise.all(transpileAll);
};
