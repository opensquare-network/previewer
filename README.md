# @osn/previewer

Preview markdown/html.

### Usage

```console
yarn add @osn/previewer
```

```ts
import { HtmlPreviewer, MarkdownPreviewer, dynamicIdentityPlugin } from "@osn/previewer"

<HtmlPreviewer
  content="<div>html content</div>"
  plugins={[dynamicIdentityPlugin]} // optional
/>

<MarkdownPreviewer
  content="markdown content"
/>
```
