import { marked, Renderer } from "marked";

import { HtmlPreviewer } from "./HtmlPreviewer";
import { applyPlugins } from "./shared";
import { PreviewerProps } from "./types";

export function MarkdownPreviewer(props: PreviewerProps) {
  const {
    plugins = [],
    content = "",
    className = "markdown-body",
    ...restProps
  } = props;

  const renderer = new Renderer();

  const markedOptions: marked.MarkedOptions = {
    breaks: true,
    renderer,
  };

  applyPlugins(plugins, "markedOptions", markedOptions);

  const html = marked.parse(content, markedOptions);

  return (
    <HtmlPreviewer
      className={className}
      content={html}
      plugins={plugins}
      {...restProps}
    />
  );
}
