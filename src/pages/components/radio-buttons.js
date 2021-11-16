import React from "react"
import { Form, FormGroup } from "@trimbleinc/modus-react-bootstrap"
import { graphql } from "gatsby"
import CodeBlock from "../../common/CodeBlock"
import Overview from "../../common/Overview"
import LinkedHeading from "../../common/LinkedHeading"
import MainLayout from "../../layouts/MainLayout"
import ComponentApi from "../../api-docs/ComponentApi"

const RadioButtonsPage = props => (
  <MainLayout {...props}>
    <Overview guidelink="https://modus.trimble.com/components/radio-buttons/">
      Radio buttons use the <code>Form.Check</code> with <code>type</code> prop
      as <code>radio</code> as a wrapper and adding <code>custom</code> prop.
      Custom checkbox and radio styles are achieved with a resourceful use of
      the <code>:checked</code> selector and <code>:after</code> pseudo
      elements. By default the checked and indeterminate icons use embedded svg
      icons from <a href="https://useiconic.com/open">Open Iconic</a>.
    </Overview>

    <CodeBlock
      title="Radios"
      scope={{ Form, FormGroup }}
      code={`
<div className="d-flex">
  <FormGroup>
    <Form.Check type="radio" id="radio1" custom checked label="Radio 1" />
    <Form.Check type="radio" id="radio2" custom label="Radio 2" />
  </FormGroup>
  <FormGroup className="ml-3">
    <Form.Check
      type="radio"
      id="radio1"
      custom
      checked
      label="Disabled"
      disabled
    />
    <Form.Check type="radio" id="radio2" custom disabled label="Disabled" />
  </FormGroup>
</div>
`}
    ></CodeBlock>

    <LinkedHeading h="2" className="h1" id="rb-api">
      API
    </LinkedHeading>
    <ComponentApi metadata={props.data.Form} />
    <ComponentApi
      metadata={props.data.FormGroup}
      exportedBy={props.data.Form}
    />

    <ComponentApi
      metadata={props.data.FormCheck}
      exportedBy={props.data.Form}
    />
    <ComponentApi
      metadata={props.data.FormCheckInput}
      exportedBy={props.data.FormCheck}
    />
  </MainLayout>
)

export default RadioButtonsPage

export const query = graphql`
  query RadioButtonsQuery {
    Form: componentMetadata(displayName: { eq: "Form" }) {
      ...ComponentApi_metadata
    }
    FormGroup: componentMetadata(displayName: { eq: "FormGroup" }) {
      ...ComponentApi_metadata
    }
    FormCheck: componentMetadata(displayName: { eq: "FormCheck" }) {
      ...ComponentApi_metadata
    }
    FormCheckInput: componentMetadata(displayName: { eq: "FormCheckInput" }) {
      ...ComponentApi_metadata
    }
  }
`
