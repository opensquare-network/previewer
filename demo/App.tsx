import React, { useState } from "react";
import { HtmlPreviewer } from "../src/HtmlPreviewer";
import { MarkdownPreviewer } from "../src/MarkdownPreviewer";
import { renderMentionIdentityUserPlugin } from "../src/plugins";
import "./index.css";
import "../src/styles.css";

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
  - child list
  - child list
  - child list
  - child list

1. ordered
   1. child ordered
   2. child ordered
   3. child ordered

> Quote
> > nested quote
> > > nested quote


\`\`\`js
const name = "bar"
function foo() {
  return "foo"
}
\`\`\`

\`\`\`ts
export type Person = {
  name: string
  age: number
}
export function gerPerson(): Person {
  return {
    name: "name",
    age: 33,
  }
}
\`\`\`

\`\`\`rust
fn main() {
  // Statements here are executed when the compiled binary is called.

  // Print text to the console.
  println!("Hello World!");
}
\`\`\`

\`inline code\`

sim an address \`CwN2XPNZD72r7vZpD6UqTUt2s3gztvWLf7DuzoDtqnNbpZF\`

test github inline code css: \`bounty -> curator(OpenSquare) -> child bounties -> developers bounty -> curator(OpenSquare) -> child bounties -> developers bounty -> curator(OpenSquare) -> child bounties -> developers\`

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

<span class="mention" osn-polka-address="qAeY4WkoFMYGReUrt6e4N35NrS6DAm1eGBSm8KLnPy8hdbZ" osn-polka-network="karura" data-index="1" data-denotation-char="@" data-id="qAeY4WkoFMYGReUrt6e4N35NrS6DAm1eGBSm8KLnPy8hdbZ" data-value="OpenSquare" data-is-key-registered="true" data-chain="karura">﻿<span contenteditable="false"><span class="ql-mention-denotation-char">@</span>OpenSquare</span>﻿</span>
`;

function MentionIdentityUser({ address = "", network = "" }) {
  return (
    <a href={`/#/network/${network}/address/${address}`}>
      {address.slice(0, 3)}...{address.slice(address.length - 3)}
    </a>
  );
}

function App() {
  const [md, setMd] = useState(mdFeatures);

  return (
    <div className="App">
      <button onClick={() => setMd("## change md features")}>button</button>
      <div className="features">
        <div>
          <h2>Features</h2>
          <MarkdownPreviewer content={md} />
        </div>

        <div>
          <h2>html previewer</h2>
          <HtmlPreviewer
            content={html}
            plugins={[renderMentionIdentityUserPlugin(<MentionIdentityUser />)]}
          />
        </div>

        <div>
          <h2>markdown previewer</h2>
          <MarkdownPreviewer
            content={md}
            plugins={[renderMentionIdentityUserPlugin(<MentionIdentityUser />)]}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
