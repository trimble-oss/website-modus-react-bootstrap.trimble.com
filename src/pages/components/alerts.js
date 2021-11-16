import React from "react"
import { Alert, AlertDismissible } from "@trimbleinc/modus-react-bootstrap"
import { graphql } from "gatsby"
import CodeBlock from "../../common/CodeBlock"
import Overview from "../../common/Overview"
import LinkedHeading from "../../common/LinkedHeading"
import MainLayout from "../../layouts/MainLayout"
import ComponentApi from "../../api-docs/ComponentApi"

const basicAlert = `
<div>
  <Alert key="a1" variant="primary">
    <i className="modus-icon material-icons alert-icon">info</i>A basic Primary
    alert
  </Alert>
  <Alert key="a2" variant="secondary">
    <i className="modus-icon material-icons alert-icon">help</i>A basic
    secondary alert with a button
    <a href="#" className="btn btn-sm btn-text-secondary">
      Button
    </a>
  </Alert>
  <Alert key="a3" variant="dark">
    <i className="modus-icon material-icons alert-icon">info</i>A basic{" "}
    <u>dark alert</u> with <em>text formatting</em>
  </Alert>
  <AlertDismissible key="a4" variant="success">
    <i className="material-icons alert-icon">check_circle</i>Success! A basic
    success alert with a dismiss icon
  </AlertDismissible>
  <AlertDismissible key="a5" variant="danger">
    <i className="material-icons alert-icon">error</i>Error! A basic error alert
    with a dismiss icon
  </AlertDismissible>
  <AlertDismissible key="a6" variant="warning">
    <i className="modus-icon material-icons alert-icon">warning</i>Warning! A
    basic warning alert with dark text and a dismiss icon
  </AlertDismissible>
</div>
`
const alertWithLink = `
<Alert key="a1" variant="primary">
  This is a primary alert with <Alert.Link href="#">an example link</Alert.Link>
  . Give it a click if you like.
</Alert>
`
const alertWithButton = `
<Alert key="a2" variant="primary">
  <i className="modus-icon material-icons alert-icon">info</i>A basic primary
  alert with a button
  <a href="#" className="btn btn-sm btn-text-primary">
    Button
  </a>
</Alert>
`
const dismissibleAlert = `
<AlertDismissible key="a2" variant="primary">
  A basic primary alert with a dismiss icon
</AlertDismissible>
`

const AlertPage = props => (
  <MainLayout {...props}>
    <Overview guidelink="https://modus.trimble.com/components/alerts/">
      Alerts are available for any length of text, as well as an optional
      dismiss button. For proper styling, use one of the eight variants.
    </Overview>

    <CodeBlock
      title="Basic Alerts"
      code={basicAlert}
      scope={{ Alert, AlertDismissible }}
    ></CodeBlock>

    <CodeBlock title="Alerts with Links" code={alertWithLink} scope={{ Alert }}>
      For links, use the <code>&lt;Alert.Link&gt;</code> component to provide
      matching colored links within any alert.
    </CodeBlock>

    <CodeBlock
      title="Alerts with Buttons"
      code={alertWithButton}
      scope={{ Alert }}
    ></CodeBlock>

    <CodeBlock
      title="Dismissible Alerts"
      code={dismissibleAlert}
      scope={{ Alert, AlertDismissible }}
    >
      Use the custom react component <code>AlertDismissible</code>.
    </CodeBlock>

    <LinkedHeading h="2" className="h1" id="alerts-api">
      API
    </LinkedHeading>
    <ComponentApi metadata={props.data.Alert} />
    <ComponentApi
      metadata={props.data.AlertHeading}
      exportedBy={props.data.Alert}
    />
    <ComponentApi
      metadata={props.data.AlertLink}
      exportedBy={props.data.Alert}
    />
    <ComponentApi metadata={props.data.AlertDismissible} />
  </MainLayout>
)

export default AlertPage

export const query = graphql`
  query AlertQuery {
    Alert: componentMetadata(displayName: { eq: "Alert" }) {
      ...ComponentApi_metadata
    }
    AlertLink: componentMetadata(displayName: { eq: "AlertLink" }) {
      ...ComponentApi_metadata
    }
    AlertHeading: componentMetadata(displayName: { eq: "AlertHeading" }) {
      ...ComponentApi_metadata
    }
    AlertLink: componentMetadata(displayName: { eq: "AlertLink" }) {
      ...ComponentApi_metadata
    }
    AlertDismissible: componentMetadata(
      displayName: { eq: "AlertDismissible" }
    ) {
      ...ComponentApi_metadata
    }
  }
`
