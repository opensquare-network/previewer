// for business logic only, combine common ui <MentionIdentityUser />
// parse markdown link `[@DisplayName](Address-Network)`
// to `<MentionIdentityUser />` and pass address, network to the component

import { createRoot } from "react-dom/client";
import type { Plugin } from "../types";
import React, { cloneElement } from "react";

type TargetElement = {
  tag: keyof HTMLElementTagNameMap;
  addressAttr: string;
  networkAttr: string;
};

type Options = {
  targetElement?: Partial<Pick<TargetElement, "tag">>;
};

const containerElement = {
  tag: "span",
  className: "mention-identity-user-app",
};

const targetElement: TargetElement = {
  tag: "a",
  addressAttr: "osn-polka-address",
  networkAttr: "osn-polka-network",
};

function createAppContainer() {
  const el = document.createElement(containerElement.tag);
  el.className = containerElement.className;

  return {
    el,
  };
}

export function renderMentionIdentityUserPlugin(
  IdentityComponent: React.ReactElement,
  options: Options = {},
): Plugin {
  targetElement.tag = options.targetElement?.tag ?? targetElement.tag;

  const re_addressAndNetwork = /^(?<address>\w+)-(?<network>\w+)$/;

  return {
    name: "render-mention-identity-user",

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
          const targetRoot = createRoot(el);
          targetRoot.render(
            // @ts-ignore
            cloneElement(IdentityComponent, {
              address,
              network,
            }),
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

// used in `sanitizeHtmlPlugin`
export function getMentionIdentityUserTargetElementAttrs() {
  return [targetElement.addressAttr, targetElement.networkAttr];
}
