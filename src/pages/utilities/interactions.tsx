import React from "react"
import CodeBlock from "../../common/CodeBlock"
import MainLayout from "../../layouts/MainLayout"

const InteractionsPage = props => (
  <MainLayout {...props}>
    <h2 id="text-selection" className="h1 font-weight-bold mt-3">
      Text selection
      <a
        className="header-link text-light text-decoration-none font-weight-normal"
        href="#text-selection"
        aria-label="anchor"
      ></a>
    </h2>
    <CodeBlock
      code={`
<div>
  <p className="user-select-all">
    This paragraph will be entirely selected when clicked by the user.
  </p>
  <p className="user-select-auto">This paragraph has default select behavior.</p>
  <p className="user-select-none">
    This paragraph will not be selectable when clicked by the user.
  </p>
</div>
`}
    >
      Change the way in which the content is selected when the user interacts
      with it.
    </CodeBlock>
  </MainLayout>
)

export default InteractionsPage
