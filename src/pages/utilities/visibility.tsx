import React from "react"
import CodeBlock from "../../common/CodeBlock"
import MainLayout from "../../layouts/MainLayout"

const VisibilityPage = props => (
  <MainLayout {...props}>
    <CodeBlock
      code={`
<div>
  <div class="visible">Visible</div>
  <div class="invisible">Invisible</div>
</div>
  `}
    >
      <p>
        Set the <code>visibility</code> of elements with our visibility
        utilities. These utility classes do not modify the <code>display</code>{" "}
        value at all and do not affect layout – <code>.invisible</code> elements
        still take up space in the page. Content will be hidden both visually
        and for assistive technology/screen reader users.
      </p>
      <p>
        Apply <code>.visible</code> or <code>.invisible</code> as needed.
      </p>
    </CodeBlock>
  </MainLayout>
)

export default VisibilityPage
