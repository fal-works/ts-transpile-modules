import ts from "typescript";

/**
 * Options for `transpileModules()`.
 */
export type Options = {
  /**
   * `true` for removing `outDir` before transpilation.
   *
   * Default: `false`
   */
  clean: boolean;

  /**
   * Glob pattern for source files to include.
   *
   * Default: All `*.ts`/`*.tsx` files (recursive).
   *
   * *Note:* These should be relative from `srcDir`.
   */
  include: string[];

  /**
   * Glob pattern for source files to exclude.
   *
   * *Note:* These should be relative from `srcDir`.
   */
  exclude?: string[];

  /**
   * Default: No operation.
   */
  preTranspile: (code: string) => string;

  /**
   * Default: No operation.
   */
  postTranspile: (code: string) => string;

  /**
   * Mapping of extensions before/after transpilation.
   *
   * Default: `.ts`=>`.js`, `.tsx`=>`.jsx`
   */
  extensionMap: Record<string, string>;

  /**
   * `true` (default) for emitting output files.
   */
  write: boolean;

  /**
   * Default: `compilerOptions` as follows.
   *
   * ```json
   * { "target": "ES2015", "module": "ES2015" }
   * ```
   */
  transpileOptions: ts.TranspileOptions;
};
