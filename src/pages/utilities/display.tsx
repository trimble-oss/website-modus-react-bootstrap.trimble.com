import React from "react"
import CodeBlock from "../../common/CodeBlock"
import MainLayout from "../../layouts/MainLayout"

const DisplayPage = props => (
  <MainLayout {...props}>
    <h3 id="how-it-works" className="h2 font-weight-bold mt-3">
      How it works
      <a
        className="header-link text-light text-decoration-none font-weight-normal"
        href="#how-it-works"
        aria-label="anchor"
      ></a>
    </h3>
    <p>
      Change the value of the{" "}
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/CSS/display"
        target="_blank"
        rel="noopener"
      >
        <code>display</code> property
      </a>{" "}
      with our responsive display utility classes. We purposely support only a
      subset of all possible values for <code>display</code>. Classes can be
      combined for various effects as you need.
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
      Display utility classes that apply to all breakpoints, from{" "}
      <code>xs</code> to <code>xl</code>, have no breakpoint abbreviation in
      them. This is because those classes are applied from{" "}
      <code>min-width: 0;</code> and up, and thus are not bound by a media
      query. The remaining breakpoints, however, do include a breakpoint
      abbreviation.
    </p>
    <p>As such, the classes are named using the format:</p>
    <ul>
      <li>
        <code>{`.d-{value}`}</code> for <code>xs</code>
      </li>
      <li>
        <code>{`.d-{breakpoint}-{value}`}</code> for <code>sm</code>,{" "}
        <code>md</code>, <code>lg</code> and <code>xl</code>.
      </li>
    </ul>
    <p>
      Where <em>value</em> is one of:
    </p>
    <ul>
      <li>
        <code>none</code>
      </li>
      <li>
        <code>inline</code>
      </li>
      <li>
        <code>inline-block</code>
      </li>
      <li>
        <code>block</code>
      </li>
      <li>
        <code>table</code>
      </li>
      <li>
        <code>table-cell</code>
      </li>
      <li>
        <code>table-row</code>
      </li>
      <li>
        <code>flex</code>
      </li>
      <li>
        <code>inline-flex</code>
      </li>
    </ul>
    <p>
      The media queries affect screen widths with the given breakpoint or
      larger. For example, <code>{`.d-lg-none`}</code> sets{" "}
      <code>display: none;</code> on both <code>lg</code> and <code>xl</code>{" "}
      screens.
    </p>

    <CodeBlock
      title="Examples"
      code={`
<div>
  <div className="d-inline p-2 bg-primary text-white mr-1">d-inline</div>
  <div className="d-inline p-2 bg-dark text-white">d-inline</div>
</div>
    `}
    ></CodeBlock>

    <CodeBlock
      code={`
<div>
  <span className="d-block p-2 bg-primary text-white">d-block</span>
  <span className="d-block p-2 bg-dark text-white">d-block</span>
</div>
    `}
    ></CodeBlock>

    <h3 id="hiding-elements" className="h2 font-weight-bold mt-3">
      Hiding Elements
      <a
        className="header-link text-light text-decoration-none font-weight-normal"
        href="#hiding-elements"
        aria-label="anchor"
      ></a>
    </h3>
    <p>
      For faster mobile-friendly development, use responsive display classes for
      showing and hiding elements by device. Avoid creating entirely different
      versions of the same site, instead hide elements responsively for each
      screen size.
    </p>
    <p>
      To hide elements simply use the <code>{`.d-none`}</code> class or one of
      the <code>{`.d-{(sm, md, lg, xl)}-none`}</code> classes for any responsive
      screen variation.
    </p>
    <p>
      To show an element only on a given interval of screen sizes you can
      combine one <code>{`.d-*-none`}</code> class with a{" "}
      <code>{`.d-*-*`}</code> class, for example{" "}
      <code>{`.d-none .d-md-block .d-xl-none`}</code> will hide the element for
      all screen sizes except on medium and large devices.
    </p>

    <table style={{ width: "100%" }}>
      <thead>
        <tr>
          <th>Screen size</th>
          <th>Class</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Hidden on all</td>
          <td>
            <code>{`.d-none`}</code>
          </td>
        </tr>
        <tr>
          <td>Hidden only on xs</td>
          <td>
            <code>{`.d-none .d-sm-block`}</code>
          </td>
        </tr>
        <tr>
          <td>Hidden only on sm</td>
          <td>
            <code>{`.d-sm-none .d-md-block`}</code>
          </td>
        </tr>
        <tr>
          <td>Hidden only on md</td>
          <td>
            <code>{`.d-md-none .d-lg-block`}</code>
          </td>
        </tr>
        <tr>
          <td>Hidden only on lg</td>
          <td>
            <code>{`.d-lg-none .d-xl-block`}</code>
          </td>
        </tr>
        <tr>
          <td>Hidden only on xl</td>
          <td>
            <code>{`.d-xl-none`}</code>
          </td>
        </tr>
        <tr>
          <td>Visible on all</td>
          <td>
            <code>{`.d-block`}</code>
          </td>
        </tr>
        <tr>
          <td>Visible only on xs</td>
          <td>
            <code>{`.d-block .d-sm-none`}</code>
          </td>
        </tr>
        <tr>
          <td>Visible only on sm</td>
          <td>
            <code>{`.d-none .d-sm-block .d-md-none`}</code>
          </td>
        </tr>
        <tr>
          <td>Visible only on md</td>
          <td>
            <code>{`.d-none .d-md-block .d-lg-none`}</code>
          </td>
        </tr>
        <tr>
          <td>Visible only on lg</td>
          <td>
            <code>{`.d-none .d-lg-block .d-xl-none`}</code>
          </td>
        </tr>
        <tr>
          <td>Visible only on xl</td>
          <td>
            <code>{`.d-none .d-xl-block`}</code>
          </td>
        </tr>
      </tbody>
    </table>
    <br />

    <CodeBlock
      code={`
<div>
  <div className="d-lg-none">hide on screens wider than lg</div>
  <div className="d-none d-lg-block">hide on screens smaller than lg</div>
</div>
    `}
    ></CodeBlock>
  </MainLayout>
)

export default DisplayPage
