// for business logic only, combine common ui <MentionIdentityUser />
// parse markdown link `[@DisplayName](Address-Network)`
// to `<MentionIdentityUser />` and pass address, network to the component

import { render } from "react-dom";
import type { Plugin } from "../types";
import React, { cloneElement } from "react";

const containerElement = {
  tag: "span",
  className: "mention-identity-user-app",
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

export function renderMentionIdentityUserPlugin(
  IdentityComponent: React.ReactElement,
): Plugin {
  const re_addressAndNetwork = /^(?<address>\w+)-(?<network>\w+)$/;

  return {
    name: "render-mention-identity-user",

    collectCss(css) {
      return css`
        ${containerElement.tag}.${containerElement.className} {
          display: inline-flex;
          /* do not know why, but works and looks normal */
          vertical-align: bottom;
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
        >re_addressAndNetwork.exec(href ?? "");

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
            cloneElement(IdentityComponent, {
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

/**
 * @deprecated use `renderMentionIdentityUserPlugin`
 */
export const renderIdentityOrAddressPlugin = renderMentionIdentityUserPlugin;
