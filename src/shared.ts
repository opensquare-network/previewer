import type { Plugin } from "./types";

export function noop(..._args: any[]) {}

// plugins
export const registeredPlugins: Plugin[] = [];

export function applyPlugins(hook: keyof Plugin, param?: any, cb = noop) {
  registeredPlugins.forEach((plugin) => {
    const fn = plugin[hook];
    if (typeof fn === "function") {
      cb(fn(param));
    }
  });
}

/**
 * @description Register a plugin, the registered plugins will share to `MarkdownPreviewer` and `HtmlPreviewer`
 */
export function registerPlugin(plugin: Plugin) {
  if (registeredPlugins.some((p) => p.name === plugin.name)) {
    return;
  }

  registeredPlugins.push(plugin);
}
