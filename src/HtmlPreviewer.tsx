import { useEffect, useRef, useState } from "react";
import type { PreviewerProps } from "./types";
import { applyPlugins } from "./shared";
import { sanitizeHtmlPlugin } from "./plugins";

export function HtmlPreviewer(props: PreviewerProps) {
  const {
    plugins = [],
    content = "",
    className = "",
    allowedTags,
    minHeight,
    maxLines,
  } = props;

  const resolvedPlugins = [...plugins, sanitizeHtmlPlugin({ allowedTags })];

  const ref = useRef<HTMLDivElement>(null);
  const [html, setHtml] = useState(content);
  useEffect(() => setHtml(content), [content]);

  useEffect(() => {
    applyPlugins(resolvedPlugins, "transformHtml", html, setHtml);
    applyPlugins(resolvedPlugins, "onRenderedHtml", ref.current);
  }, [html]);

  return (
    <div className="osn-previewer" ref={ref}>
      <div
        className={`markdown-body ${className}`}
        style={{
          ...(maxLines && {
            display: "-webkit-box",
            overflow: "hidden",
            WebkitLineClamp: maxLines,
            WebkitBoxOrient: "vertical",
          }),
          ...(minHeight && { minHeight }),
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
