export const help = (): never => {
  console.log();
  console.group();

  const argMap = {
    srcDir: "Source directory path. (default: src)",
    outDir: "Output directory path. (required)",
    clean: "Removes outDir before transpiling. (optional)",
    target: "Any key of ts.ScriptTarget e.g. ES2015. (optional)",
    module: "Any key of ts.ModuleKind e.g. ES2015. (optional)",
  };

  for (const [name, description] of Object.entries(argMap))
    console.log(`--${name.padEnd(9)}${description}`);

  console.groupEnd();
  console.log();
  process.exit(0);
};
