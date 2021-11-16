import React from "react"
import CodeBlock from "../../common/CodeBlock"
import MainLayout from "../../layouts/MainLayout"

const EmbedPage = props => (
  <MainLayout {...props}>
    <h3 id="about" className="h2 font-weight-bold mt-3">
      About
      <a
        className="header-link text-light text-decoration-none font-weight-normal"
        href="#about"
        aria-label="anchor"
      ></a>
    </h3>
    <p>
      Rules are directly applied to <code>&lt;iframe&gt;</code>,{" "}
      <code>&lt;embed&gt;</code>,<code>&lt;video&gt;</code>, and{" "}
      <code>&lt;object&gt;</code> elements; optionally use an explicit
      descendant class <code>.embed-responsive-item</code> when you want to
      match the styling for other attributes.
    </p>
    <p>
      <strong>Pro-Tip!</strong> You don’t need to include{" "}
      <code>frameborder-"0"</code> in your
      <code>&lt;iframe&gt;</code> as we override that for you.
    </p>

    <CodeBlock
      title="Example"
      code={`
<div className="embed-responsive embed-responsive-16by9">
  <iframe
    className="embed-responsive-item"
    src="https://player.vimeo.com/video/315750638"
    allowfullscreen=""
    title="Introducing Trimble Maps video"
    loading="lazy"
  ></iframe>
</div>
    `}
    >
      Wrap any embed like an <code>&lt;iframe&gt;</code> in a parent element
      with <code>.embed-responsive</code> and an aspect ratio. The{" "}
      <code>.embed-responsive-item </code>isn’t strictly required, but we
      encourage it.
    </CodeBlock>

    <h3 id="aspect-ratios" className="h2 font-weight-bold mt-3">
      Aspect Ratios
      <a
        className="header-link text-light text-decoration-none font-weight-normal"
        href="#aspect-ratios"
        aria-label="anchor"
      ></a>
    </h3>
    <p>
      Aspect ratios can be customized with modifier classes. By default, the
      following ratio classes are provided:
    </p>
    <div className="highlight">
      <pre tabIndex={0} className="chroma">
        <code className="language-text" data-lang="text">
          {`
<div className="embed-responsive embed-responsive-16by9">
  <!-- 21:9 aspect ratio -->
  <div className="embed-responsive embed-responsive-21by9">
    <iframe className="embed-responsive-item" src="..."></iframe>
  </div>

  <!-- 16:9 aspect ratio -->
  <div className="embed-responsive embed-responsive-16by9">
    <iframe className="embed-responsive-item" src="..."></iframe>
  </div>

  <!-- 4:3 aspect ratio -->
  <div className="embed-responsive embed-responsive-4by3">
    <iframe className="embed-responsive-item" src="..."></iframe>
  </div>

  <!-- 1:1 aspect ratio -->
  <div className="embed-responsive embed-responsive-1by1">
    <iframe className="embed-responsive-item" src="..."></iframe>
  </div>
</div>
`.trim()}
        </code>
      </pre>
    </div>
  </MainLayout>
)

export default EmbedPage
