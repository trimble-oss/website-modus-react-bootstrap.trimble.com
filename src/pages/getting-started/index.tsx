import React from "react"
import CodeHighlight from "../../common/CodeHighlight"
import MainLayout from "../../layouts/MainLayout"

const GettingStartedPage = props => (
  <MainLayout {...props}>
    <article id="main" className="pr-3">
      <p>
        The Modus React Bootstrap is a React-based component library extended
        from react-bootstrap component library developed as a common, open
        source platform for all of Trimble’s web applications built on React.
        The framework is designed and managed by the Trimble UX Council.
      </p>
      <h2 id="background" className="h1 font-weight-bold mt-5">
        Background
        <a
          className="header-link text-light text-decoration-none font-weight-normal"
          href="#background"
          aria-label="anchor"
        ></a>
      </h2>
      <p>
        Modus React Bootstrap is built upon and extends the React Bootstrap
        v1.6.x code framework combined with Modus CSS. You can use the Modus CSS
        files as is, or integrate the SASS files into your own application if
        you wish to modify it further.
      </p>

      <h2 id="install-with-npm" className="h1 font-weight-bold mt-5">
        Install with npm
        <a
          className="header-link text-light text-decoration-none font-weight-normal"
          href="#install-with-npm"
          aria-label="anchor"
        ></a>
      </h2>
      <p>
        Install the Modus React Bootstrap framework in your Node.js powered apps
        with npm (or yarn):
      </p>
      <div className="highlight" style={{ marginBottom: "10px" }}>
        <pre tabIndex={0} className="chroma">
          <code className="language-bash" data-lang="bash">
            npm install @trimbleinc/modus-react-bootstrap
          </code>
        </pre>
      </div>
      <p>
        Please note that <a href="https://www.npmjs.com/package/react">react</a>{" "}
        &gt;= 16.8.0 and{" "}
        <a href="https://www.npmjs.com/package/react-dom">react-dom</a> &gt;=
        16.8.0 are peer dependencies.
      </p>

      <h3 id="stylesheets" className="font-weight-bold mt-3">
        Stylesheets
        <a
          className="header-link text-light text-decoration-none font-weight-normal"
          href="#stylesheets"
          aria-label="anchor"
        ></a>
      </h3>
      <p>
        Modus Bootstrap stylesheet is required to use the Modus React
        components:
      </p>

      <CodeHighlight
        code={`
{/* The following line can be included in your src/index.js or App.js file*/}

import '@trimbleinc/modus-bootstrap/dist/modus.min.css';
`}
      />

      <p>
        More information about customizing the Modus CSS and advanced use cases
        can be found on the{" "}
        <a
          href="https://modus-bootstrap.trimble.com/getting-started/#customize-using-sass"
          target="_blank"
          rel="noopener"
        >
          Modus Bootstrap page
        </a>
      </p>

      <h2 id="import-components" className="h1 font-weight-bold mt-5">
        Importing Components
        <a
          className="header-link text-light text-decoration-none font-weight-normal"
          href="#import-components"
          aria-label="anchor"
        ></a>
      </h2>
      <p>
        Import individual components like:
        <code>{`@trimbleinc/modus-react-bootstrap/Button`}</code> rather than
        the entire library. Doing so pulls in only the specific components that
        you use, which can significantly reduce the amount of code you end up
        sending to the client.
      </p>

      <CodeHighlight
        code={`
import Button from '@trimbleinc/modus-react-bootstrap/Button';

// or less ideally
import {Button} from '@trimbleinc/modus-react-bootstrap';
`}
      />

      <h2 id="browser-support" className="h1 font-weight-bold mt-5">
        Browser Support
        <a
          className="header-link text-light text-decoration-none font-weight-normal"
          href="#browser-support"
          aria-label="anchor"
        ></a>
      </h2>
      <p>
        Modus React Bootstrap supports all browsers supported by{" "}
        <a href="https://modus-bootstrap.trimble.com/device-support/">
          Modus Bootstrap
        </a>
        .
      </p>
    </article>
  </MainLayout>
)

export default GettingStartedPage
