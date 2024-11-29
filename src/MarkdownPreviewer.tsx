import { Marked, MarkedOptions, Renderer } from "marked";
import { useEffect, useState } from "react";

import { HtmlPreviewer } from "./HtmlPreviewer";
import { applyPlugins } from "./shared";
import { MarkdownPreviewerProps } from "./types";
import { highlightCodeExtension } from "./extensions/highlightCode";

const marked = new Marked();

marked.use(highlightCodeExtension());

export function MarkdownPreviewer(props: MarkdownPreviewerProps = {}) {
  const {
    plugins = [],
    content = "",
    className = "",
    markedOptions,
    ...restProps
  } = props;

  const renderer = new Renderer();

  const resolvedMarkedOptions: MarkedOptions = {
    ...markedOptions,
    renderer,
  };

  applyPlugins(plugins, "markedOptions", resolvedMarkedOptions);

  const [html, setHtml] = useState(
    marked.parse(content, resolvedMarkedOptions) as string,
  );
  useEffect(() => {
    setHtml(marked.parse(content, resolvedMarkedOptions) as string);
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
