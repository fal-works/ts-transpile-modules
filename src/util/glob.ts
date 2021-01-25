import fastGlob from "fast-glob";
import type { Pattern } from "fast-glob";

export type { Pattern };

export const glob = async (
  directory: string,
  include: Pattern[],
  exclude?: Pattern[]
): Promise<string[]> =>
  fastGlob(include, {
    ignore: exclude,
    onlyFiles: true,
    cwd: directory,
  });
