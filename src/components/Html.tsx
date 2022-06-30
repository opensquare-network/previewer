import { forwardRef } from "react";
import styled, { css } from "styled-components";
import type { HtmlProps } from "../types";

const no_scroll_bar = css`
  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Wrapper = styled.div<HtmlProps>`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #1e2134;

  &.markdown-body,
  &.html-body {
    word-break: normal;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-weight: 600;

      :not(:first-child) {
        margin-top: 0.25em;
      }

      :not(:last-child) {
        margin-bottom: 0.25em;
      }

      :last-child {
        margin-bottom: 0;
      }
    }

    h1 {
      line-height: 28px;
      font-size: 20px;
    }

    h2 {
      line-height: 24px;
      font-size: 18px;
    }

    h3 {
      line-height: 24px;
      font-size: 16px;
    }

    h4 {
      line-height: 24px;
      font-size: 14px;
    }

    p {
      word-break: break-word;
    }

    ol,
    ul {
      padding-left: 1.25em;
    }

    ul {
      list-style-type: disc;
    }

    blockquote {
      margin: 0;
      padding-left: 0.75em;
      border-left: 4px solid #eee;
    }

    pre {
      ${no_scroll_bar};

      * {
        font-family: i-monospace, SFMono-Regular, SF Mono, Menlo, Consolas,
          Liberation Mono, monospace !important;
      }

      margin: 8px 0;
      padding: 0 8px;
      background-color: #f0f3f8 !important;
      border-radius: 4px;
      white-space: pre-wrap !important;
      overflow-x: scroll;

      > code {
        padding: 0 !important;
        background: transparent !important;
        white-space: pre-wrap !important;

        span.identifier {
          white-space: nowrap !important;
        }
      }
    }

    code {
      font-family: i-monospace, SFMono-Regular, SF Mono, Menlo, Consolas,
        Liberation Mono, monospace !important;
      ${no_scroll_bar};
      max-width: 100%;
      padding: 0 8px;
      background-color: #f0f3f8 !important;
      border-radius: 4px;
      white-space: nowrap !important;
      word-break: keep-all;
      overflow-x: scroll;
      display: inline-flex;
    }

    a {
      color: #1f70c7;
      cursor: pointer;
      text-decoration: none;
    }

    img {
      max-width: 100%;
    }

    p a::selection {
      background-color: transparent !important;
      color: inherit;
    }

    th,
    td {
      border: 1px solid #e2e8f0;
    }

    table {
      margin: 8px 0;
      border-collapse: collapse;
      max-width: 100%;
      overflow: auto;
      display: block;
    }

    th {
      padding: 10px 16px;
      background-color: #f0f3f8;
      font-weight: bold;
      color: #1e2134;
      min-width: 100px;
    }

    td {
      padding: 10px 16px;
      color: #1e2134;
    }

    hr {
      background-color: #e2e8f0;
      height: 1px;
      border: none;
    }
  }

  ${(p) => p?.extraCss?.map((s) => s)}
`;

export const Html = forwardRef((props: any = {}, ref) => {
  return (
    <Wrapper ref={ref} {...props}>
      {props.children}
    </Wrapper>
  );
});
