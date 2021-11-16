import React from "react"
import { Form } from "@trimbleinc/modus-react-bootstrap"
import { graphql } from "gatsby"

import CodeBlock from "../../common/CodeBlock"
import Overview from "../../common/Overview"
import LinkedHeading from "../../common/LinkedHeading"

import MainLayout from "../../layouts/MainLayout"
import ComponentApi from "../../api-docs/ComponentApi"

const SwitchesPage = props => (
  <MainLayout {...props}>
    <Overview guidelink="https://modus.trimble.com/components/switches/">
      A custom switch has the markup of a custom checkbox but uses{" "}
      <code>type="switch"</code> to render a toggle switch. Switches also
      support the same customizable children as <code>&lt;FormCheck&gt;</code>.
      <p>
        You can also use the <code>&lt;Form.Switch&gt;</code> alias which
        encapsulates the above, in a very small component wrapper.
      </p>
    </Overview>

    <CodeBlock
      title="Example"
      scope={{ Form }}
      code={`
<Form>
  <Form.Check type="switch" id="custom-switch1" label="Switch" custom checked />
  <Form.Check type="switch" id="custom-switch2" label="Switch" custom />
  <Form.Switch
    disabled
    label="Disabled"
    id="disabled-custom-switch1"
    custom
    checked
  />
  <Form.Switch disabled label="Disabled" id="disabled-custom-switch2" custom />
</Form>
`}
    ></CodeBlock>

    <CodeBlock
      title="Inline"
      scope={{ Form }}
      code={`
<Form>
  <Form.Check
    type="switch"
    id="custom-inline-switch1"
    label="Switch"
    className="mr-4"
    custom
    checked
    inline
  />
  <Form.Check
    type="switch"
    id="custom-switch2"
    label="Switch"
    custom
    inline
    className="mr-4"
  />
  <Form.Switch
    disabled
    label="Disabled"
    id="disabled-custom-switch1"
    custom
    checked
    inline
    className="mr-4"
  />
  <Form.Switch
    disabled
    label="Disabled"
    id="disabled-custom-switch2"
    custom
    inline
    className="mr-4"
  />
</Form>
`}
    ></CodeBlock>

    <LinkedHeading h="2" className="h1" id="switches-api">
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
  </MainLayout>
)

export default SwitchesPage

export const query = graphql`
  query SwitchesQuery {
    Form: componentMetadata(displayName: { eq: "Form" }) {
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
