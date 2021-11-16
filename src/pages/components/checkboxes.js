import React from "react"
import { Form } from "@trimbleinc/modus-react-bootstrap"
import { graphql } from "gatsby"
import CodeBlock from "../../common/CodeBlock"
import Overview from "../../common/Overview"
import LinkedHeading from "../../common/LinkedHeading"
import MainLayout from "../../layouts/MainLayout"
import ComponentApi from "../../api-docs/ComponentApi"

const CheckboxesPage = props => {
  return (
    <MainLayout {...props}>
      <Overview guidelink="https://modus.trimble.com/components/checkboxes/">
        Checkboxes use the <code>Form.Check</code> as a wrapper and adding{" "}
        <code>custom</code> prop. Custom checkbox and radio styles are achieved
        with a resourceful use of the <code>:checked</code> selector and{" "}
        <code>:after</code> pseudo elements, but are Structurally similar to the
        default <code>FormCheck</code>. By default the checked and indeterminate
        icons use embedded svg icons from{" "}
        <a href="https://useiconic.com/open">Open Iconic</a>.
      </Overview>

      <CodeBlock
        scope={{ Form }}
        code={`
<Form>
  <div key="custom-checkbox">
    <Form.Check custom type="checkbox" id="custom-checkbox" label="Checkbox" />
    <Form.Check
      custom
      type="checkbox"
      id="custom-checkbox"
      label="Checkbox"
      checked
    />
    <Form.Check
      custom
      type="checkbox"
      id="custom-checkbox"
      label="Checkbox"
      disabled
    />
  </div>
</Form>
`}
      >
        <p>
          Apply Bootstrap's custom elements by adding the <code>custom</code>{" "}
          prop.
        </p>
      </CodeBlock>

      <CodeBlock
        scope={{ Form }}
        title="Inline"
        code={`
<Form>
  <div key="custom-inline-checkbox">
    <Form.Check
      custom
      inline
      type="checkbox"
      id="custom-inline-checkbox"
      label="Checkbox"
      className="mr-3"
    />
    <Form.Check
      custom
      inline
      type="checkbox"
      id="custom-inline-checkbox"
      label="Checkbox"
      checked
      className="mr-3"
    />
    <Form.Check
      custom
      inline
      type="checkbox"
      id="custom-inline-checkbox"
      label="Checkbox"
      disabled
      className="mr-3"
    />
  </div>
</Form>
`}
      ></CodeBlock>

      <LinkedHeading h="2" className="h1" id="cb-api">
        API
      </LinkedHeading>
      <ComponentApi metadata={props.data.Form} />
      <ComponentApi
        metadata={props.data.FormCheck}
        exportedBy={props.data.Form}
      />
      <ComponentApi
        metadata={props.data.FormCheckInput}
        exportedBy={props.data.FormCheck}
      />
      <ComponentApi
        metadata={props.data.FormCheckLabel}
        exportedBy={props.data.FormCheck}
      />
    </MainLayout>
  )
}

export default CheckboxesPage

export const query = graphql`
  query CheckBoxQuery {
    Form: componentMetadata(displayName: { eq: "Form" }) {
      ...ComponentApi_metadata
    }
    FormCheck: componentMetadata(displayName: { eq: "FormCheck" }) {
      ...ComponentApi_metadata
    }
    FormCheckInput: componentMetadata(displayName: { eq: "FormCheckInput" }) {
      ...ComponentApi_metadata
    }
    FormCheckLabel: componentMetadata(displayName: { eq: "FormCheckLabel" }) {
      ...ComponentApi_metadata
    }
  }
`
