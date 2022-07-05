import React from "react";
import { HtmlPreviewer } from "../src/HtmlPreviewer";
import { MarkdownPreviewer } from "../src/MarkdownPreviewer";
import { renderMentionIdentityUserPlugin } from "../src/plugins";
import "./index.css";

const mdFeatures = `
# heading 1
## heading 2
### heading 3
#### heading 4

Text

_Italic Text_

**Bold Text**

_**Bold Italic Text**_

---

~~Strikethrough~~

- list
- list
  - child list

1. ordered
2. ordered
  2.1 child ordered

> Quote
> > nested quote
> > > nested quote

\`\`\`sh
code block
\`\`\`

\`inline code\`

https://voting.opensquare.io/

|Syntax|Description|TestText|
|-|-|-|
|Header|Title|Hero|
|Header|Title|Hero|
`;

const md = `
## heading

[Google](https://google.com)

Render identity or addr: [@displayName1](Ff3u3eNGBjHyHqvPd3qEeZg51UqJa6AFJRRqJTTj29sp4ST-westend) [@displayName2](Ff3u3eNGBjHyHqvPd3qEeZg51UqJa6AFJRRqJTTj29sp4ST-karura)
`;

const html = `
<h2>heading</h2>

<p><a href="https://google.com">Google</a></p>

<p>
  Render identity or addr:
  <a href="https://google.com" osn-polka-address="Ff3u3eNGBjHyHqvPd3qEeZg51UqJa6AFJRRqJTTj29sp4ST" osn-polka-network="westend">
    @displayName1
  </a>
  <a href="https://google.com" osn-polka-address="Ff3u3eNGBjHyHqvPd3qEeZg51UqJa6AFJRRqJTTj29sp4ST" osn-polka-network="karura">
    @displayName2
  </a>
</p>
</div>
`;

function IdentityOrAddr({ address = "", network = "" }) {
  return (
    <a href={`/#/network/${network}/address/${address}`}>
      {address.slice(0, 3)}...{address.slice(address.length - 3)}
    </a>
  );
}

function App() {
  return (
    <div className="App">
      <div className="features">
        <div>
          <h2>Features</h2>
          <MarkdownPreviewer content={mdFeatures} />
        </div>

        <div>
          <h2>html previewer</h2>
          <HtmlPreviewer
            content={html}
            plugins={[renderMentionIdentityUserPlugin(<IdentityOrAddr />)]}
          />
        </div>

        <div>
          <h2>markdown previewer</h2>
          <MarkdownPreviewer
            content={md}
            plugins={[renderMentionIdentityUserPlugin(<IdentityOrAddr />)]}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
