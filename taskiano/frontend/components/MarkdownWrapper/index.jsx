import React from "react";

import Markdown from "react-markdown";

const gfm = require("remark-gfm");
const math = require("remark-math");
const katex = require("rehype-katex");

function MarkdownWrapper({ note, className }) {
  return (
    <Markdown
      className={className}
      rehypePlugins={[katex]}
      remarkPlugins={[gfm, math]}
      skipHtml={true}
    >
      {note}
    </Markdown>
  );
}

export default MarkdownWrapper;
