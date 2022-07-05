# @osn/previewer

Preview markdown/html.

### Release

```console
git switch main
git pull # sync code
yarn release
```

### Usage

```console
yarn add @osn/previewer
```

```ts
import { HtmlPreviewer, MarkdownPreviewer, renderMentionAsIdentityPlugin } from "@osn/previewer"

function IdentityOrAddr({ address, network }) {
  return <a>{address}</a>
}

<HtmlPreviewer
  content="<div>html content</div>"
  plugins={[renderMentionAsIdentityPlugin(<IdentityOrAddr />)]} // optional
/>

<MarkdownPreviewer
  content="markdown content"
/>
```
