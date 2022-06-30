import { marked, Renderer } from "marked";

import { HtmlPreviewer } from "./HtmlPreviewer";
import { applyPlugins, registerPlugin } from "./shared";
import { PreviewerProps } from "./types";

export function MarkdownPreviewer(props: PreviewerProps) {
  const { content = "", className = "markdown-body", ...restProps } = props;

  const renderer = new Renderer();

  const markedOptions: marked.MarkedOptions = {
    breaks: true,
    renderer,
  };

  applyPlugins("markedOptions", markedOptions);

  const html = marked.parse(content, markedOptions);

  return <HtmlPreviewer className={className} content={html} {...restProps} />;
}

MarkdownPreviewer.plugin = registerPlugin;
