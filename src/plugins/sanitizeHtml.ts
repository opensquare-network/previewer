import type { Plugin, PreviewerProps } from "../types";
import sanitizeHtml from "sanitize-html";

export function sanitizeHtmlPlugin(
  allowedTags: PreviewerProps["allowedTags"]
): Plugin {
  return {
    name: "sanitize-html",

    processHtml(html) {
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
