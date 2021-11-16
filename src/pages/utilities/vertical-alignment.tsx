import React from "react"
import CodeBlock from "../../common/CodeBlock"
import MainLayout from "../../layouts/MainLayout"

const VerticalAlignmentPage = props => (
  <MainLayout {...props}>
    <CodeBlock
      code={`
<div className="mcr-2">
  <span class="align-baseline">baseline</span>
  <span class="align-top">top</span>
  <span class="align-middle">middle</span>
  <span class="align-bottom">bottom</span>
  <span class="align-text-top">text-top</span>
  <span class="align-text-bottom">text-bottom</span>
</div>
`}
    >
      <p>
        Change the alignment of elements with the{" "}
        <code>vertical-alignment</code> utilities. Please note that
        vertical-align only affects inline, inline-block, inline-table, and
        table cell elements.
      </p>
      <p>
        Choose from <code>.align-baseline</code>, <code>.align-top</code>,{" "}
        <code>.align-middle</code>,<code>.align-bottom</code>,{" "}
        <code>.align-text-bottom</code>, and <code>.align-text-top</code> as
        needed.
      </p>
      <p>With inline elements:</p>
    </CodeBlock>

    <CodeBlock
      code={`
<table style={{height: "100px"}}>
  <tbody>
    <tr>
      <td class="align-baseline">baseline</td>
      <td class="align-top">top</td>
      <td class="align-middle">middle</td>
      <td class="align-bottom">bottom</td>
      <td class="align-text-top">text-top</td>
      <td class="align-text-bottom">text-bottom</td>
    </tr>
  </tbody>
</table>
    `}
      className="bd-example notranslate"
    >
      <p>With inline elements:</p>
    </CodeBlock>
  </MainLayout>
)

export default VerticalAlignmentPage
