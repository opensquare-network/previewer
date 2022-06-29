import type { Plugin } from "./types";

export function noop(..._args: any[]) {}

export function applyPlugins(
  plugins: Plugin[],
  key: keyof Plugin,
  param?: any,
  cb = noop,
) {
  plugins.forEach((plugin) => {
    const fn = plugin[key];
    if (typeof fn === "function") {
      cb(fn(param));
    }
  });
}
