import { markedHighlight } from "marked-highlight";
import Prism from "prismjs";
import "prismjs/components/prism-markup.js";
import "prismjs/components/prism-javascript.js";
import "prismjs/components/prism-jsx.js";
import "prismjs/components/prism-typescript.js";
import "prismjs/components/prism-tsx.js";
import "prismjs/components/prism-rust.js";

export function highlightCodeExtension() {
  return markedHighlight({
    highlight(code, lang) {
      if (!lang) {
        return code;
      }

      const syntax = Prism.languages[lang] ?? Prism.languages.markup;
      return Prism.highlight(code, syntax, lang || "markup");
    },
  });
}
