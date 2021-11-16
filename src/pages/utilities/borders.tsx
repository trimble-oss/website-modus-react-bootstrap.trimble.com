import React from "react"
import CodeBlock from "../../common/CodeBlock"
import MainLayout from "../../layouts/MainLayout"

const BordersPage = props => (
  <MainLayout {...props}>
    <h2 id="border" className="h1 font-weight-bold">
      Border
      <a
        className="header-link text-light text-decoration-none font-weight-normal"
        href="#border"
        aria-label="anchor"
      ></a>
    </h2>
    <p>
      Use border utilities to add or remove an element’s borders. Choose from
      all borders or one at a time.
    </p>
    <CodeBlock
      title="Additive"
      code={`
<div className="bd-example bd-example-border-utils">
  <span className="border"></span>
  <span className="border-top"></span>
  <span className="border-right"></span>
  <span className="border-bottom"></span>
  <span className="border-left"></span>
</div>
    `}
    ></CodeBlock>

    <CodeBlock
      title="Subtractive"
      code={`
<div className="bd-example bd-example-border-utils border-sample subtractive-sample">
  <div class="border-0"></div>
  <div class="border-top-0"></div>
  <div class="border-right-0"></div>
  <div class="border-bottom-0"></div>
  <div class="border-left-0"></div>
</div>
    `}
    ></CodeBlock>

    <CodeBlock
      title="Border Color"
      code={`
<div className="bd-example guide-sample border-sample">
  <div class="border border-primary"></div>
  <div class="border border-secondary"></div>
  <div class="border border-tertiary"></div>
  <div class="border border-dark"></div>
  <div class="border border-success"></div>
  <div class="border border-warning"></div>
  <div class="border border-danger"></div>
</div>
    `}
    >
      Change the border color using utilities built on our theme colors.
    </CodeBlock>

    <CodeBlock
      title="Border Radius"
      code={`
<div className="bd-example guide-sample border-sample border-radius-sample">
  <div class="rounded"></div>
  <div class="rounded-top"></div>
  <div class="rounded-right"></div>
  <div class="rounded-bottom"></div>
  <div class="rounded-left"></div>
  <div class="rounded-circle"></div>
  <div class="rounded-pill"></div>
  <div class="rounded-0"></div>
</div>
    `}
    >
      Add classes to an element to easily round its corners.
    </CodeBlock>
  </MainLayout>
)

export default BordersPage
