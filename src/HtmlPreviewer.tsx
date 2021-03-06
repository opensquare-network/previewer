import { useEffect, useRef, useState } from "react";
import { Html } from "./components/Html";
import type { HtmlProps, PreviewerProps } from "./types";
import { css } from "styled-components";
import { applyPlugins } from "./shared";
import { minHeightPlugin, sanitizeHtmlPlugin, maxLinesPlugin } from "./plugins";

export function HtmlPreviewer(props: PreviewerProps) {
  const {
    plugins = [],
    content = "",
    className = "html-body",
    allowedTags,
    minHeight,
    maxLines,
  } = props;

  const resolvedPlugins = [
    minHeightPlugin(minHeight),
    maxLinesPlugin(maxLines),
    ...plugins,
    sanitizeHtmlPlugin(allowedTags),
  ];

  const extraCss: HtmlProps["extraCss"] = [];
  applyPlugins(resolvedPlugins, "collectCss", css, (str) => extraCss.push(str));

  const ref = useRef<HTMLDivElement>(null);
  const [html, setHtml] = useState(content);

  useEffect(() => {
    applyPlugins(resolvedPlugins, "transformHtml", html, setHtml);
    applyPlugins(resolvedPlugins, "onRenderedHtml", ref.current);
  }, [html]);

  return (
    <div className="osn-previewer" ref={ref}>
      <Html
        className={className}
        extraCss={extraCss}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
