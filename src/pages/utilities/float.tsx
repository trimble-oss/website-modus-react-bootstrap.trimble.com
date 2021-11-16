import React from "react"
import CodeBlock from "../../common/CodeBlock"
import MainLayout from "../../layouts/MainLayout"

const FloatPage = props => (
  <MainLayout {...props}>
    <h3 id="overview" className="h2 font-weight-bold mt-3">
      Overview
      <a
        className="header-link text-light text-decoration-none font-weight-normal"
        href="#overview"
        aria-label="anchor"
      ></a>
    </h3>
    <p>
      These utility classes float an element to the left or right, or disable
      floating, based on the current viewport size using the CSS float property.{" "}
      <code>!important</code> is included to avoid specificity issues. These use
      the same viewport breakpoints as our grid system. Please be aware float
      utilities have no affect on flex items.
    </p>

    <h3 id="classes" className="h2 font-weight-bold mt-3">
      Classes
      <a
        className="header-link text-light text-decoration-none font-weight-normal"
        href="#classes"
        aria-label="anchor"
      ></a>
    </h3>
    <CodeBlock
      code={`
<div>
  <div className="float-left">Float left on all viewport sizes</div>
  <br />
  <div className="float-right">Float right on all viewport sizes</div>
  <br />
  <div className="float-none">Don't float on all viewport sizes</div>
</div>
`}
    >
      Toggle a float with a class:
    </CodeBlock>

    <h3 id="responsive" className="h2 font-weight-bold mt-3">
      Responsive
      <a
        className="header-link text-light text-decoration-none font-weight-normal"
        href="#responsive"
        aria-label="anchor"
      ></a>
    </h3>
    <CodeBlock
      code={`
<div>
  <div className="float-sm-left">
    Float left on viewports sized SM (small) or wider
  </div>
  <br />
  <div className="float-md-left">
    Float left on viewports sized MD (medium) or wider
  </div>
  <br />
  <div className="float-lg-left">
    Float left on viewports sized LG (large) or wider
  </div>
  <br />
  <div className="float-xl-left">
    Float left on viewports sized XL (extra-large) or wider
  </div>
  <br />
</div>
`}
    >
      Responsive variations also exist for each <code>float</code> value.
    </CodeBlock>

    <p>Here are all the support classes:</p>
    <ul>
      <li>
        <code>.float-left</code>
      </li>
      <li>
        <code>.float-right</code>
      </li>
      <li>
        <code>.float-none</code>
      </li>
      <li>
        <code>.float-sm-left</code>
      </li>
      <li>
        <code>.float-sm-right</code>
      </li>
      <li>
        <code>.float-sm-none</code>
      </li>
      <li>
        <code>.float-md-left</code>
      </li>
      <li>
        <code>.float-md-right</code>
      </li>
      <li>
        <code>.float-md-none</code>
      </li>
      <li>
        <code>.float-lg-left</code>
      </li>
      <li>
        <code>.float-lg-right</code>
      </li>
      <li>
        <code>.float-lg-none</code>
      </li>
      <li>
        <code>.float-xl-left</code>
      </li>
      <li>
        <code>.float-xl-right</code>
      </li>
      <li>
        <code>.float-xl-none</code>
      </li>
    </ul>
  </MainLayout>
)

export default FloatPage
