import deepCopy from "deepcopy";

import type { DeepFrozenObject } from "@fal-works/deep-freeze";

/**
 * Quite buggy
 */
export const defaultsDeep = <T extends Record<string, unknown>>(
  partial: Partial<T>,
  def: DeepFrozenObject<T>
): T => {
  const newObj: Record<string, unknown> = deepCopy(def);

  for (const [key, retainingValue] of Object.entries(partial)) {
    const defValue = def[key];

    // arrays and functions are treated like primitives
    if (
      Array.isArray(defValue) ||
      typeof retainingValue !== "object" ||
      typeof defValue !== "object" ||
      defValue === null
    ) {
      newObj[key] = retainingValue;
      continue;
    }

    if (retainingValue === null) {
      newObj[key] = defValue;
      continue;
    }

    newObj[key] = defaultsDeep(defValue, retainingValue);
  }

  return newObj as T;
};
