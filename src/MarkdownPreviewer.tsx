import { marked, Renderer } from "marked";
import { useEffect, useState } from "react";

import { HtmlPreviewer } from "./HtmlPreviewer";
import { highLightPlugin } from "./plugins";
import { applyPlugins } from "./shared";
import { PreviewerProps } from "./types";

export function MarkdownPreviewer(props: PreviewerProps) {
  const { plugins = [], content = "", className = "", ...restProps } = props;

  const resolvePlugins = [...plugins, highLightPlugin()];

  const renderer = new Renderer();

  const markedOptions: marked.MarkedOptions = {
    breaks: true,
    renderer,
  };

  applyPlugins(resolvePlugins, "markedOptions", markedOptions);

  const [html, setHtml] = useState(marked.parse(content, markedOptions));
  useEffect(() => setHtml(marked.parse(content, markedOptions)), [content]);

  return (
    <HtmlPreviewer
      className={className}
      content={html}
      plugins={resolvePlugins}
      {...restProps}
    />
  );
}
