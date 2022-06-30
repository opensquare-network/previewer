// for business logic
// parse markdown link `[@DisplayName](Address-Network)`
// to `<IdentityOrAddr />` and pass address, network to the component

import { render } from "react-dom";
import type { Plugin } from "../types";
import React, { cloneElement } from "react";

const containerElement = {
  tag: "span",
  className: "identity-or-address-app",
};

const targetElement = {
  tag: "a",
  addressAttr: "osn-polka-address",
  networkAttr: "osn-polka-network",
};

// used in `sanitizeHtmlPlugin`
export const aExtraAttrs = [
  targetElement.addressAttr,
  targetElement.networkAttr,
];

function createAppContainer() {
  const el = document.createElement(containerElement.tag);
  el.className = containerElement.className;

  return {
    el,
  };
}

export function renderIdentityOrAddressPlugin(
  component: React.ReactElement,
): Plugin {
  const re_identityOrAddress = /^(?<address>\w+)-(?<network>\w+)$/;

  return {
    name: "render-identity-or-address",

    collectCss(css) {
      return css`
        ${containerElement.tag}.${containerElement.className} {
          display: inline-block;
        }
      `;
    },

    markedOptions(options) {
      const renderer = options.renderer!;

      const origLink = renderer.link;

      renderer.link = function (href, title, text) {
        const identity = <
          RegExpExecArray & {
            groups: {
              address: string;
              network: string;
            };
          }
        >re_identityOrAddress.exec(href ?? "");

        if (identity) {
          const { address, network } = identity.groups;
          return `<${targetElement.tag}
            ${targetElement.addressAttr}="${address}"
            ${targetElement.networkAttr}="${network}"
          >
            ${text}
          </${targetElement.tag}>`;
        }

        return origLink.call(this, href, title, text);
      };
    },

    onRenderedHtml(el) {
      const targets = el?.querySelectorAll?.(
        `${targetElement.tag}[${targetElement.addressAttr}][${targetElement.networkAttr}]`,
      );
      targets?.forEach((t) => {
        if (t) {
          const address = t.getAttribute(targetElement.addressAttr);
          const network = t.getAttribute(targetElement.networkAttr);

          const { el } = createAppContainer();
          render(
            cloneElement(component, {
              address,
              network,
            }),
            el,
          );

          t.replaceWith(el);
        }
      });
    },
  };
}
