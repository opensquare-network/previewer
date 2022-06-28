import { marked, Renderer } from "marked";

import { HtmlPreviewer } from "./HtmlPreviewer";
import { applyPlugins } from "./shared";
import { PreviewerProps } from "./types";

export function MarkdownPreviewer(props: PreviewerProps) {
  const { plugins = [], content = "" } = props;

  const renderer = new Renderer();

  applyPlugins(plugins, "extendMarkedRenderer", renderer);
  marked.use({ renderer });

  const html = marked.parse(content);

  return (
    <HtmlPreviewer className="markdown-body" content={html} plugins={plugins} />
  );
}
