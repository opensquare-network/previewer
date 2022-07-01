import React from "react";
import type { marked } from "marked";
import type {
  FlattenInterpolation,
  ThemedCssFunction,
} from "styled-components";

export type PreviewerProps = {
  plugins?: Plugin[];
  /**
   * @description The content to preview
   */
  content?: string;

  className?: React.HTMLAttributes<HTMLElement>["className"];

  allowedTags?: string[];

  /**
   * @description unit px
   */
  minHeight?: React.CSSProperties["minHeight"];

  /**
   * @description Max lines of markdown/html content displayed, ellipsis rest
   */
  maxLines?: number | string;
};

export type HtmlProps = React.PropsWithChildren<{
  extraCss?: (FlattenInterpolation<any> | string)[];
}>;

export type Plugin = {
  /**
   * @description Plugin name, unique
   */
  name: string;
  /**
   * @description Apply css in `HtmlPreview.html-body` or `MarkdownPreviewer.markdown-body`
   */
  collectCss?(css: ThemedCssFunction<any>): FlattenInterpolation<any> | string;

  /**
   * @description Only works on `MarkdownPreviewer`
   */
  markedOptions?(options: marked.MarkedOptions): void;

  /**
   * @param html sanitized html
   * @description transform html
   */
  transformHtml?(html: string): string;

  onRenderedHtml?(el?: HTMLDivElement | null): void;
};
