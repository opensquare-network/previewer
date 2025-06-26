import type { Plugin } from "../types";

export function renderExternalLinkPlugin(): Plugin {
  return {
    name: "render-external-link",
    onRenderedHtml(el) {
      const links = el?.querySelectorAll?.("a") || [];
      links?.forEach((link) => {
        const href = link.getAttribute("href");
        if (!href) {
          return;
        }
        const isExternal = isExternalLink(href);
        if (!isExternal) {
          return;
        }

        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
      });
    },
  };
}

function isExternalLink(href: string): boolean {
  if (!href?.startsWith("http") || typeof window === "undefined") {
    return false;
  }

  try {
    return new URL(href).origin !== window.location.origin;
  } catch {
    return false;
  }
}
