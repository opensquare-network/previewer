import React from "react";
import { HtmlPreviewer } from "../src/HtmlPreviewer";
import { MarkdownPreviewer } from "../src/MarkdownPreviewer";
import { renderIdentityOrAddressPlugin } from "../src/plugins";
import "./index.css";

function IdentityOrAddr({ address = "", network = "" }) {
  return (
    <a href={`/#/network/${network}/address/${address}`}>
      {address.slice(0, 3)}...{address.slice(address.length - 3)}
    </a>
  );
}

MarkdownPreviewer.plugin(renderIdentityOrAddressPlugin(<IdentityOrAddr />));
// HtmlPreviewer.plugin(renderIdentityOrAddressPlugin(<IdentityOrAddr />));

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

function App() {
  return (
    <div className="App">
      <div>
        <h2>html previewer</h2>
        <HtmlPreviewer content={html} />
      </div>

      <div>
        <h2>markdown previewer</h2>
        <MarkdownPreviewer content={md} />
      </div>
    </div>
  );
}

export default App;
