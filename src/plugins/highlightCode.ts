import { Plugin } from "../types";
import Prism from "prismjs";
import "prismjs/components/prism-javascript.js";
import "prismjs/components/prism-typescript.js";
import "prismjs/components/prism-rust.js";

export function highLightPlugin(): Plugin {
  return {
    name: "highlight-code",

    markedOptions(options) {
      options.highlight = function (code, lang) {
        if (!lang) {
          return code;
        }

        const grammer = Prism.languages[lang] ?? Prism.languages.markup;
        return Prism.highlight(code, grammer, lang || "markup");
      };
    },
  };
}
