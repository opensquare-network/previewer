import styled from "styled-components";
import { render } from "react-dom";
import type { Plugin } from "../types";
import { useState } from "react";

// TODO: container flag
const tag = "span";
const className = "identity-app";

export const dynamicIdentityPlugin: Plugin = {
  name: "dynamic-identity",

  collectCss(css) {
    return css`
      ${tag}.${className} {
        display: inline-block;
      }
    `;
  },

  markedOptions(options) {
    const renderer = options.renderer!;

    const origLink = renderer.link;

    renderer.link = function (href, title, text) {
      if (title) {
        return `<${tag} class="${className}" />`;
      }

      return origLink.call(this, href, title, text);
    };
  },

  onRenderedHtml(el) {
    const targets = el?.querySelectorAll?.(`${tag}.${className}`);
    targets?.forEach((t) => {
      if (t) {
        render(<IdentityUser />, t);
      }
    });
  },
};

const Identity = styled.div`
  display: inline-block;
`;

function IdentityUser() {
  const [text] = useState(Math.random().toFixed(2));
  return <Identity>{text}</Identity>;
}
