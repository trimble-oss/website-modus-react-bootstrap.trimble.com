import React from "react"
import MainLayout from "../../layouts/MainLayout"

const OverflowPage = props => (
  <MainLayout {...props}>
    <article id="main" className="pr-3">
      <p>
        Barebones <code>overflow</code> functionality is provided for two values
        by default, and they are not responsive.
      </p>
      <div className="bd-example bg-white d-md-flex">
        <div
          className="overflow-auto p-3 mb-3 mb-md-0 mr-md-3 bg-light"
          style={{ maxWidth: "260px", maxHeight: "100px" }}
        >
          This is an example of using `.overflow-auto` on an element with set
          width and height dimensions. By design, this content will vertically
          scroll.
        </div>
        <div
          className="overflow-hidden p-3 bg-light"
          style={{ maxWidth: "260px", maxHeight: "100px" }}
        >
          This is an example of using `.overflow-hidden` on an element with set
          width and height dimensions.
        </div>
      </div>
      <div className="highlight">
        <pre tabIndex={0} className="chroma">
          <code className="language-html" data-lang="html">
            <span className="p">&lt;</span>
            <span className="nt">div</span> <span className="na">class</span>
            <span className="o">=</span>
            <span className="s">"overflow-auto"</span>
            <span className="p">&gt;</span>...<span className="p">&lt;/</span>
            <span className="nt">div</span>
            <span className="p">&gt;</span>
            <br />
            <span className="p">&lt;</span>
            <span className="nt">div</span> <span className="na">class</span>
            <span className="o">=</span>
            <span className="s">"overflow-hidden"</span>
            <span className="p">&gt;</span>...<span className="p">&lt;/</span>
            <span className="nt">div</span>
            <span className="p">&gt;</span>
          </code>
        </pre>
      </div>
    </article>
  </MainLayout>
)

export default OverflowPage
