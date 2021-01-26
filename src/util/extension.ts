export const createExtensionReplacer = (
  extensionMap: Record<string, string>
): ((filepath: string) => string) => {
  const table = Array.from(Object.entries(extensionMap));
  const replacers = table.map(([from, to]) => {
    const regExp = new RegExp(`${from}$`);
    return (s: string) => s.replace(regExp, to);
  });

  return (filepath: string) => {
    for (const replace of replacers) filepath = replace(filepath);
    return filepath;
  };
};
