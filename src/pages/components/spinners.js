import { Button, Spinner } from "@trimbleinc/modus-react-bootstrap"
import CodeBlock from "../../common/CodeBlock"
import Overview from "../../common/Overview"
import React from "react"
import MainLayout from "../../layouts/MainLayout"
import { graphql } from "gatsby"
import ComponentApi from "../../api-docs/ComponentApi"
import LinkedHeading from "../../common/LinkedHeading"

const SpinnersPage = props => (
  <MainLayout {...props}>
    <Overview guidelink="https://modus.trimble.com/components/spinners/">
      <p>
        Our spinners are built entirely using HTML and CSS. You can toggle their
        visibility using JavaScript in you project. Their appearance, alignment,
        and sizing can be easily customized with our utility classes.
      </p>
      <p>
        For accessibility purposes, each loader here includes{" "}
        <code>role="status"</code> and a nested{" "}
        <code>&lt;span className="sr-only"&gt;Loading...&lt;/span&gt;</code>.
      </p>
    </Overview>

    <p>Expected ways to use spinners:</p>
    <ul>
      <li>Use the border spinners for a lightweight loading indicator.</li>
      <li>
        Spinners should be centered within its container unless inside of
        another element like a button and use flexbox utilities, or text
        alignment utilities for placement.
      </li>
    </ul>

    <CodeBlock
      title="Example"
      scope={{ Spinner, Button }}
      code={`
<div className="d-flex justify-content-start">
  <div className="pr-3">
    <Button variant="primary" className="display-active">
      <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
        className="mr-1"
      />
      <span className="sr-only">Loading...</span> Loading
    </Button>
  </div>
  <div className="px-3">
    <Spinner animation="border" role="status" variant="primary">
      <span className="sr-only">Loading...</span>
    </Spinner>
  </div>
  <div className="px-3">
    <div className="text-center">
      <Spinner animation="border" variant="primary" role="status" />
      <div className="h3 text-primary mt-3">Loading...</div>
    </div>
  </div>
</div>
`}
    ></CodeBlock>

    <LinkedHeading h="2" className="h1" id="spinners-api">
      API
    </LinkedHeading>
    <ComponentApi metadata={props.data.metadata} />
  </MainLayout>
)

export default SpinnersPage
export const query = graphql`
  query Spinner {
    metadata: componentMetadata(displayName: { eq: "Spinner" }) {
      displayName
      ...ComponentApi_metadata
    }
  }
`
