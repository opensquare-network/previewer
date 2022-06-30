# @osn/previewer

Preview markdown/html.

### Usage

```console
yarn add @osn/previewer
```

```ts
import { HtmlPreviewer, MarkdownPreviewer, renderIdentityOrAddressPlugin } from "@osn/previewer"

MarkdownPreviewer.plugin(renderIdentityOrAddressPlugin(<IdentityOrAddr />));
// HtmlPreviewer.plugin(renderIdentityOrAddressPlugin(<IdentityOrAddr />));

function IdentityOrAddr({ address, network }) {
  return <a>{address}</a>
}

<HtmlPreviewer
  content="<div>html content</div>"
/>

<MarkdownPreviewer
  content="markdown content"
/>
```

### Release

```console
yarn release
```
