import { useEffect, useRef, useState } from "react";
import { Html } from "./components/Html";
import type { HtmlProps, PreviewerProps } from "./types";
import { css } from "styled-components";
import { applyPlugins } from "./shared";
import { sanitizeHtmlPlugin } from "./plugins";

export function HtmlPreviewer(props: PreviewerProps) {
  const {
    plugins = [],
    content = "",
    className = "html-body",
    allowedTags,
  } = props;

  const resolvePlugins = [sanitizeHtmlPlugin(allowedTags), ...plugins];

  const extraCss: HtmlProps["extraCss"] = [];
  applyPlugins(resolvePlugins, "collectCss", css, (str) => extraCss.push(str));

  const ref = useRef<HTMLDivElement>(null);
  const [html, setHtml] = useState(content);

  useEffect(() => {
    applyPlugins(resolvePlugins, "transformHtml", html, setHtml);
    applyPlugins(resolvePlugins, "onRenderedHtml", ref.current);
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
