import React from "react"
import { Breadcrumb, Dropdown } from "@trimbleinc/modus-react-bootstrap"
import CodeBlock from "../../common/CodeBlock"
import Overview from "../../common/Overview"
import MainLayout from "../../layouts/MainLayout"
import { graphql } from "gatsby"
import ComponentApi from "../../api-docs/ComponentApi"
import LinkedHeading from "../../common/LinkedHeading"

const defaultScope = { Breadcrumb }
const behavioursScope = { Breadcrumb, Dropdown }
const BreadcrumbsPage = props => (
  <MainLayout {...props}>
    <Overview guidelink="https://modus.trimble.com/components/breadcrumbs/">
      Add <code>active</code> prop to active <code>Breadcrumb.Item</code>. Do
      not set both <code>active</code> and <code>href</code> attributes.{" "}
      <code>active</code>
      overrides <code>href</code> and <code>span</code> element is rendered
      instead of <code>a</code>.
    </Overview>

    <CodeBlock
      scope={defaultScope}
      title="Default"
      code={`
<Breadcrumb>
  <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
  <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
    Library
  </Breadcrumb.Item>
  <Breadcrumb.Item active>Data</Breadcrumb.Item>
</Breadcrumb>`}
    ></CodeBlock>
    <CodeBlock
      scope={defaultScope}
      title="Breadcrumbs with Icons"
      code={`
<Breadcrumb>
  <Breadcrumb.Item href="#">
    <i className="modus-icons">dashboard</i>Home
  </Breadcrumb.Item>
  <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
    <i className="material-icons">local_library</i>Library
  </Breadcrumb.Item>
  <Breadcrumb.Item active>
    <i className="modus-icons">clipboard</i>Data
  </Breadcrumb.Item>
</Breadcrumb>`}
    ></CodeBlock>
    <CodeBlock
      scope={defaultScope}
      title="Accessible Option"
      code={`
<Breadcrumb className="breadcrumb-underline">
  <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
  <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
    Library
  </Breadcrumb.Item>
  <Breadcrumb.Item active>Data</Breadcrumb.Item>
</Breadcrumb>`}
    >
      For accessible underlined links add class{" "}
      <code>breadcrumb-underline</code> to <code>Breadcrumb </code>.
    </CodeBlock>

    <CodeBlock
      scope={behavioursScope}
      title="Behavious"
      code={`
<Breadcrumb className="breadcrumb-underline">
  <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
  <Breadcrumb.Item>
    <Dropdown>
      <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
        ...
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Breadcrumb.Item>
  <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
    Library
  </Breadcrumb.Item>
  <Breadcrumb.Item active>Data</Breadcrumb.Item>
</Breadcrumb>`}
    >
      For implementations with large numbers of sub-directories, make use of
      dropdown that appears on click of ellipses as shown in the example below
    </CodeBlock>

    <LinkedHeading h="2" className="h1" id="bd-api">
      API
    </LinkedHeading>
    <ComponentApi metadata={props.data.Breadcrumb} />

    <ComponentApi
      metadata={props.data.BreadcrumbItem}
      exportedBy={props.data.Breadcrumb}
    />
  </MainLayout>
)

export default BreadcrumbsPage

export const query = graphql`
  query BreadcrumbQuery {
    BreadcrumbItem: componentMetadata(displayName: { eq: "BreadcrumbItem" }) {
      ...ComponentApi_metadata
    }
    Breadcrumb: componentMetadata(displayName: { eq: "Breadcrumb" }) {
      ...ComponentApi_metadata
    }
  }
`
