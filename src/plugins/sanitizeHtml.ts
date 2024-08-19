import type { Plugin } from "../types";
import sanitizeHtml from "sanitize-html";
import { getMentionIdentityUserTargetElementAttrs } from "./renderMentionIdentityUser";

export function sanitizeHtmlPlugin(options?: sanitizeHtml.IOptions): Plugin {
  const {
    allowedTags = sanitizeHtml.defaults.allowedTags.concat([
      "img",
      "iframe",
      "br",
      "ins",
      "del",
    ]),
    allowedAttributes = {},
    ...rest
  } = options ?? {};

  return {
    name: "sanitize-html",

    transformHtml(html) {
      return sanitizeHtml(html, {
        allowedTags,
        allowedAttributes: {
          img: ["src", "size", "width", "height"],
          iframe: ["src", "width", "height"],
          a: ["href", "rel", "target"],
          "*": ["class", ...getMentionIdentityUserTargetElementAttrs()],
          td: ["align", "colspan", "rowspan", "scope"],
          th: ["align", "colspan", "rowspan"],
          li: ["data-list"],
          ...allowedAttributes,
        },
        ...rest,
      });
    },
  };
}
