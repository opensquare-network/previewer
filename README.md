# @osn/previewer

Preview markdown/html.

### Usage

```console
yarn add @osn/previewer
```

```ts
import { HtmlPreviewer, MarkdownPreviewer } from "@osn/previewer"
import { dynamicIdentity } from '@osn/previewer/plugins'

<HtmlPreviewer
  content="<div>html content</div>"
  plugins={[dynamicIdentity]} // optional
/>

<MarkdownPreviewer
  content="markdown content"
/>
```
