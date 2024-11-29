import React from "react";
import type { MarkedOptions } from "marked";

export type MarkdownPreviewerProps = {
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

  /**
   * @description Options for marked
   */
  markedOptions?: MarkedOptions;
};

export type HtmlPreviewerProps = Omit<MarkdownPreviewerProps, "markedOptions">;

export type Plugin = {
  /**
   * @description Plugin name, unique
   */
  name: string;

  /**
   * @description Only works on `MarkdownPreviewer`
   */
  markedOptions?(options: MarkedOptions): void;

  /**
   * @param html sanitized html
   * @description transform html
   */
  transformHtml?(html: string): string;

  onRenderedHtml?(el?: HTMLDivElement | null): void;
};
