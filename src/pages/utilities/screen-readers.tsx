import React from "react"
import CodeHighlight from "../../common/CodeHighlight"
import MainLayout from "../../layouts/MainLayout"

const ScreenReadersPage = props => (
  <MainLayout {...props}>
    <p>
      Hide an element to all devices <strong>except screen readers</strong> with{" "}
      <code>.sr-only</code>. Combine <code>.sr-only</code> with{" "}
      <code>.sr-only-focusable</code> to show the element again when it’s
      focused (e.g. by a keyboard-only user). Can also be used as mixins.
    </p>

    <CodeHighlight
      code={`<a class="sr-only sr-only-focusable" href="#content">Skip to main content</a>`}
      className="highlight"
    ></CodeHighlight>
    <br />
    <CodeHighlight
      code={`
// Usage as a mixin
.skip-navigation {
  @include sr-only;
  @include sr-only-focusable;
}`}
      language="scss"
      className="highlight"
    ></CodeHighlight>
  </MainLayout>
)

export default ScreenReadersPage
