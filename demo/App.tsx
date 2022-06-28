import React from "react";
import { HtmlPreviewer } from "../src/HtmlPreviewer";
import { MarkdownPreviewer } from "../src/MarkdownPreviewer";
import { dynamicIdentityPlugin } from "../src/plugins/dynamicIdentity";
import "./index.css";
const md = `
## heading

[Google](https://google.com)

Render as React Component with random number: [github](https://github.com "github")
`;

const html = `
<h2>heading</h2>

<p><a href="https://google.com">Google</a></p>

<p>Render as React Component with random number: <span data-identity-container /></p>
</div>
`;

function App() {
  return (
    <div className="App">
      <div>
        <h2>html previewer</h2>
        <HtmlPreviewer content={html} plugins={[dynamicIdentityPlugin]} />
      </div>

      <div>
        <h2>markdown previewer</h2>
        <MarkdownPreviewer content={md} plugins={[dynamicIdentityPlugin]} />
      </div>
    </div>
  );
}

export default App;
