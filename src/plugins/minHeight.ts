import { Plugin, PreviewerProps } from "../types";

export function minHeightPlugin(
  minHeight: PreviewerProps["minHeight"],
): Plugin {
  return {
    name: "min-height",

    collectCss(css) {
      if (!minHeight) {
        return "";
      }

      return css`
        min-height: ${minHeight}px;
      `;
    },
  };
}
