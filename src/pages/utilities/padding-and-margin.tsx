import React from "react"
import CodeBlock from "../../common/CodeBlock"
import Overview from "../../common/Overview"
import MainLayout from "../../layouts/MainLayout"

const PaddingAndMarginPage = props => (
  <MainLayout {...props}>
    <h2 id="overview" className="h1 font-weight-bold mt-3">
      Overview
      <a
        className="header-link text-light text-decoration-none font-weight-normal"
        href="#overview"
        aria-label="anchor"
      ></a>
    </h2>
    <p>
      Assign responsive-friendly <code>margin</code> or <code>padding</code>{" "}
      values to an element or a subset of its sides with shorthand classes.
      Includes support for individual properties, all properties, and vertical
      and horizontal properties. Classes are built from a default Sass map
      ranging from <code>.25rem</code> to
      <code>3rem</code>.
    </p>
    <h3 id="notation" className="h2 font-weight-bold mt-3">
      Notation
      <a
        className="header-link text-light text-decoration-none font-weight-normal"
        href="#notation"
        aria-label="anchor"
      ></a>
    </h3>
    <p>
      Spacing utilities that apply to all breakpoints, from <code>xs</code> to{" "}
      <code>xl</code>, have no breakpoint abbreviation in them. This is because
      those classes are applied from <code>min-width: 0</code> and up, and thus
      are not bound by a media query. The remaining breakpoints, however, do
      include a breakpoint abbreviation.
    </p>
    <p>
      The classes are named using the format{" "}
      <code>{`{property}{sides}-{size}`}</code> for <code>xs</code> and{" "}
      <code>{`{property}{sides}-{breakpoint}-{size}`}</code> for <code>sm</code>
      , <code>md</code>, <code>lg</code>, and <code>xl</code>.
    </p>
    <p>
      Where <em>property</em> is one of:
    </p>
    <ul>
      <li>
        <code>m</code> - for classes that set <code>margin</code>
      </li>
      <li>
        <code>p</code> - for classes that set <code>padding</code>
      </li>
    </ul>
    <p>
      Where <em>sides</em> is one of:
    </p>
    <ul>
      <li>
        <code>t</code> - for classes that set <code>margin-top</code> or{" "}
        <code>padding-top</code>
      </li>
      <li>
        <code>b</code> - for classes that set <code>margin-bottom</code> or{" "}
        <code>padding-bottom</code>
      </li>
      <li>
        <code>l</code> - for classes that set <code>margin-left</code> or{" "}
        <code>padding-left</code>
      </li>
      <li>
        <code>r</code> - for classes that set <code>margin-right</code> or{" "}
        <code>padding-right</code>
      </li>
      <li>
        <code>x</code> - for classes that set both <code>*-left</code> and{" "}
        <code>*-right</code>
      </li>
      <li>
        <code>y</code> - for classes that set both <code>*-top</code> and{" "}
        <code>*-bottom</code>
      </li>
      <li>
        blank - for classes that set a <code>margin</code> or{" "}
        <code>padding</code> on all 4 sides of the element
      </li>
    </ul>
    <p>
      Where <em>size</em> is one of:
    </p>
    <ul>
      <li>
        <code>0</code> - for classes that eliminate the <code>margin</code> or{" "}
        <code>padding</code> by setting it to
        <code>0</code>
      </li>
      <li>
        <code>1</code> - (by default) for classes that set the{" "}
        <code>margin</code> or <code>padding</code> to
        <code>$spacer * .25</code>
      </li>
      <li>
        <code>2</code> - (by default) for classes that set the{" "}
        <code>margin</code> or <code>padding</code> to
        <code>$spacer * .5</code>
      </li>
      <li>
        <code>3</code> - (by default) for classes that set the{" "}
        <code>margin</code> or <code>padding</code> to
        <code>$spacer</code>
      </li>
      <li>
        <code>4</code> - (by default) for classes that set the{" "}
        <code>margin</code> or <code>padding</code> to
        <code>$spacer * 1.5</code>
      </li>
      <li>
        <code>5</code> - (by default) for classes that set the{" "}
        <code>margin</code> or <code>padding</code> to
        <code>$spacer * 3</code>
      </li>
      <li>
        <code>auto</code> - for classes that set the <code>margin</code> to auto
      </li>
    </ul>
    <p>
      (You can add more sizes by adding entries to the <code>$spacers</code>{" "}
      Sass map variable.)
    </p>

    <CodeBlock
      title="Examples"
      code={`
<div className="bd-example d-sm-flex example-padding text-white" style={{padding: "0rem"}}>
  <div className="p-0">p-0</div>
  <div className="p-1">p-1</div>
  <div className="p-2">p-2</div>
  <div className="p-3">p-3</div>
  <div className="p-4">p-4</div>
  <div className="p-5">p-5</div>
</div>
`}
    >
      Here are some examples with <code>padding</code>:
    </CodeBlock>

    <CodeBlock
      code={`
<div className="bd-example text-white example-margin" style={{padding: "0rem"}}>
  <div className="m-0">m-0</div>
  <div className="m-1">m-1</div>
  <div className="m-2">m-2</div>
  <div className="m-3">m-3</div>
  <div className="m-4">m-4</div>
  <div className="m-5">m-5</div>
</div>
`}
    >
      Here are some examples with <code>margin</code>.
    </CodeBlock>

    <CodeBlock
      title="Horizontal Centering"
      code={`
<div className="mx-auto bg-light" style={{width: "200px"}}>
  Centered element
</div>
`}
    >
      <p>
        Additionally, Bootstrap also includes an <code>.mx-auto</code> class for
        horizontally centering fixed-width block level content—that is, content
        that has <code>display: block</code> and a <code>width</code> set—by
        setting the horizontal margins to <code>auto</code>.
      </p>
    </CodeBlock>
  </MainLayout>
)

export default PaddingAndMarginPage
