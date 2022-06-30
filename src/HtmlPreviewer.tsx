import { useEffect, useRef, useState } from "react";
import { Html } from "./components/Html";
import type { HtmlProps, PreviewerProps } from "./types";
import { css } from "styled-components";
import { applyPlugins, registerPlugin } from "./shared";
import { sanitizeHtmlPlugin } from "./plugins";

export function HtmlPreviewer(props: PreviewerProps) {
  const { content = "", className = "html-body", allowedTags } = props;

  registerPlugin(sanitizeHtmlPlugin(allowedTags));

  const extraCss: HtmlProps["extraCss"] = [];
  applyPlugins("collectCss", css, (str) => extraCss.push(str));

  const ref = useRef<HTMLDivElement>(null);
  const [html, setHtml] = useState(content);

  useEffect(() => {
    applyPlugins("transformHtml", html, setHtml);
    applyPlugins("onRenderedHtml", ref.current);
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

HtmlPreviewer.plugin = registerPlugin;
