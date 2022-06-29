import type { Plugin, PreviewerProps } from "../types";
import sanitizeHtml from "sanitize-html";

export function sanitizeHtmlPlugin(
  allowedTags: PreviewerProps["allowedTags"] = sanitizeHtml.defaults.allowedTags.concat(
    ["img", "iframe", "br", "ins", "del"],
  ),
): Plugin {
  return {
    name: "sanitize-html",

    transformHtml(html) {
      return sanitizeHtml(html, {
        allowedTags,
        allowedAttributes: {
          img: ["src", "size", "width", "height"],
          iframe: ["src", "width", "height"],
          a: ["href", "rel", "target"],
          "*": ["class"],
          td: ["align"],
          th: ["align"],
        },
      });
    },
  };
}
