import React from "react"
import CodeBlock from "../../common/CodeBlock"
import MainLayout from "../../layouts/MainLayout"

const CloseIconPage = props => (
  <MainLayout {...props}>
    <CodeBlock
      code={`
<button type="button" className="close" aria-label="Close">
  <i className="modus-icon material-icons" aria-hidden="true">close</i>
</button>
  `}
    >
      <strong>Be sure to include text for screen readers</strong>, as we’ve done
      with <code>aria-label</code>.
    </CodeBlock>
  </MainLayout>
)

export default CloseIconPage
