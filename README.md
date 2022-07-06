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
import { HtmlPreviewer, MarkdownPreviewer, renderMentionIdentityUserPlugin } from "@osn/previewer"

function MentionIdentityUser({ address, network }) {
  return <a>{address}</a>
}

<HtmlPreviewer
  content="<div>html content</div>"
  plugins={[renderMentionIdentityUserPlugin(<MentionIdentityUser />)]} // optional
/>

<MarkdownPreviewer
  content="markdown content"
/>
```
