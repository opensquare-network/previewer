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

  onRenderedHtml?(el?: HTMLDivElement | null): void;
};
