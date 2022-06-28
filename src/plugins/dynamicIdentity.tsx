import styled from "styled-components";
import { render } from "react-dom";
import type { Plugin } from "../types";
import { useState } from "react";

// TODO: container flag
const tag = "span";
const attr = "data-identity-container";

export const dynamicIdentity: Plugin = {
  name: "dynamic-identity",

  collectCss(css) {
    return css`
      ${tag}[${attr}] {
        display: inline-block;
      }
    `;
  },

  extendMarkedRenderer(renderer) {
    const origLink = renderer.link;

    renderer.link = function (href, title, text) {
      if (title) {
        return `<${tag} ${attr} />`;
      }

      return origLink.call(this, href, title, text);
    };
  },

  onRenderedHtml(el) {
    const targets = el?.querySelectorAll?.(`${tag}[${attr}]`);
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
