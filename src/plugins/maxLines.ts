import { Plugin, PreviewerProps } from "../types";

export function maxLinesPlugin(line: PreviewerProps["maxLines"]): Plugin {
  return {
    name: "max-lines",

    collectCss(css) {
      if (!line) {
        return "";
      }

      return css`
        display: -webkit-box;
        -webkit-line-clamp: ${line};
        -webkit-box-orient: vertical;
        overflow: hidden;
      `;
    },
  };
}
