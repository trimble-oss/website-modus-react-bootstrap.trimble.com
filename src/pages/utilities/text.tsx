import React from "react"
import CodeBlock from "../../common/CodeBlock"
import MainLayout from "../../layouts/MainLayout"

const TextPage = props => (
  <MainLayout {...props}>
    <h3 id="TextAlignment" className="font-weight-bold mt-3">
      Text Alignment
      <a
        className="header-link text-light text-decoration-none font-weight-normal ml-2"
        target="TextAlignment"
        aria-label="anchor"
      ></a>
    </h3>
    <CodeBlock
      code={`
<div>
  <p className="text-left">Left aligned text on all viewport sizes.</p>
  <p className="text-center">Center aligned text on all viewport sizes.</p>
  <p className="text-right">Right aligned text on all viewport sizes.</p>

  <p className="text-sm-left">
    Left aligned text on viewports sized SM (small) or wider.
  </p>
  <p className="text-md-left">
    Left aligned text on viewports sized MD (medium) or wider.
  </p>
  <p className="text-lg-left">
    Left aligned text on viewports sized LG (large) or wider.
  </p>
  <p className="text-xl-left">
    Left aligned text on viewports sized XL (extra-large) or wider.
  </p>
</div>
    `}
    >
      Easily realign text to components with text alignment classes.
    </CodeBlock>

    <CodeBlock
      title="Text Wrapping and Overflow"
      code={`
<div className="badge badge-primary text-wrap" style={{width: "6rem"}}>
  This text should wrap.
</div>
    `}
    >
      <p>
        Wrap text with a <code>.text-wrap</code> class.
      </p>
    </CodeBlock>

    <p>
      Prevent text from wrapping with a <code>.text-nowrap</code> class.
    </p>

    <CodeBlock
      title="Text Transform"
      code={`
<div>
  <p className="text-lowercase">Lowercased text.</p>
  <p className="text-uppercase">Uppercased text.</p>
  <p className="text-capitalize">CapiTaliZed text.</p>
</div>
    `}
    >
      Transform text in components with text capitalization classes.
    </CodeBlock>

    <CodeBlock
      title="Font Weight and Italics"
      code={`
<div>
  <p className="font-weight-bold">Bold text.</p>
  <p className="font-weight-bolder">
    Bolder weight text (relative to the parent element).
  </p>
  <p className="font-weight-normal">Normal weight text.</p>
  <p className="font-weight-light">Light weight text.</p>
  <p className="font-weight-lighter">
    Lighter weight text (relative to the parent element).
  </p>
  <p className="font-italic">Italic text.</p>
</div>
    `}
    >
      Quickly change the weight (boldness) of text or italicize text.
    </CodeBlock>

    <CodeBlock
      title="Monospace"
      code={`
<p className="text-monospace">This is in monospace</p>
    `}
    >
      <p>
        Change a selection to our monospace font stack with{" "}
        <code>.text-monospace</code>.
      </p>
    </CodeBlock>

    <CodeBlock
      title="Reset Color"
      code={`
<p className="text-muted">
  Muted text with a <a href="#" className="text-reset">reset link</a>.
</p>
    `}
    >
      <p>
        Reset a text or link’s color with <code>.text-reset</code>, so that it
        inherits the color from its parent.
      </p>
    </CodeBlock>

    <CodeBlock
      title="Text Decoration"
      code={`
<a href="#" className="text-decoration-none">Non-underlined link</a>`}
    >
      <p>
        Remove a text decoration with a <code>.text-decoration-none</code>{" "}
        class.
      </p>
    </CodeBlock>
  </MainLayout>
)

export default TextPage
