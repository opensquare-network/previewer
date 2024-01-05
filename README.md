# @osn/previewer

Preview markdown/html.

### Usage

```console
yarn add @osn/previewer
```

```jsx
import { HtmlPreviewer, MarkdownPreviewer, renderMentionIdentityUserPlugin } from "@osn/previewer"
import "@osn/previewer/styles.css"

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
