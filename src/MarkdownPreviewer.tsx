import { marked, MarkedOptions, Renderer } from "marked";
import { useEffect, useState } from "react";

import { HtmlPreviewer } from "./HtmlPreviewer";
import { applyPlugins } from "./shared";
import { PreviewerProps } from "./types";
import { highlightCodeExtension } from "./extensions/highlightCode";

marked.use(highlightCodeExtension());

export function MarkdownPreviewer(props: PreviewerProps) {
  const { plugins = [], content = "", className = "", ...restProps } = props;

  const renderer = new Renderer();

  const markedOptions: MarkedOptions = {
    breaks: true,
    renderer,
  };

  applyPlugins(plugins, "markedOptions", markedOptions);

  const [html, setHtml] = useState(
    marked.parse(content, markedOptions) as string,
  );
  useEffect(() => {
    setHtml(marked.parse(content, markedOptions) as string);
  }, [content]);

  return (
    <HtmlPreviewer
      className={className}
      content={html}
      plugins={plugins}
      {...restProps}
    />
  );
}
