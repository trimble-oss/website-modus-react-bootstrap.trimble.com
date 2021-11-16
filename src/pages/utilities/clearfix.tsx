import React from "react"
import CodeBlock from "../../common/CodeBlock"
import MainLayout from "../../layouts/MainLayout"

const ClearFixPage = props => (
  <MainLayout {...props}>
    <CodeBlock code={`<div className="clearfix">...</div>`}>
      Easily clear floats by adding .clearfix to the parent element.
    </CodeBlock>

    <CodeBlock
      code={`
<div class="bg-dark clearfix">
  <button class="btn btn-secondary float-left">
    Example Button Floated Left
  </button>
  <button class="btn btn-secondary float-right">
    Example Button Floated Right
  </button>
</div>
`}
    >
      The following example shows how the clearfix can be used. Without the
      clearfix, the wrapping div would not span the buttons, which would cause a
      broken layout.
    </CodeBlock>
  </MainLayout>
)

export default ClearFixPage
