import React from "react"
import { Form } from "@trimbleinc/modus-react-bootstrap"
import { graphql } from "gatsby"
import CodeBlock from "../../common/CodeBlock"
import Overview from "../../common/Overview"
import LinkedHeading from "../../common/LinkedHeading"
import MainLayout from "../../layouts/MainLayout"
import ComponentApi from "../../api-docs/ComponentApi"

const SlidersPage = props => (
  <MainLayout {...props}>
    <Overview guidelink="https://modus.trimble.com/components/sliders/">
      Create custom range with{" "}
      <code>&lt;Form.Control type="range" custom /&gt;</code>
      <br />
      <br />
      Only IE and Firefox currently support “filling” in their track from the
      left of the thumb so only those browsers show that styling.
    </Overview>

    <CodeBlock
      title="Basic range"
      scope={{ Form }}
      code={`
<Form>
  <Form.Group controlId="formBasicRangeCustom" custom>
    <Form.Label>Example Range</Form.Label>
    <Form.Control type="range" custom />
  </Form.Group>
  <Form.Group controlId="formBasicRangeDisabled" custom>
    <Form.Label>Disabled Range</Form.Label>
    <Form.Control type="range" custom disabled />
  </Form.Group>
</Form>
`}
    ></CodeBlock>

    <CodeBlock
      title="Defining min and max"
      scope={{ Form }}
      code={`
<Form.Group controlId="formBasicRangeCustom" custom>
  <Form.Label>Example Range</Form.Label>
  <Form.Control type="range" custom min={0} max={5} />
</Form.Group>
`}
    >
      Range inputs have implicit values for <code>min</code> and{" "}
      <code>max</code> -<code>0</code> and <code>100</code>, respectfully. You
      may specify new values for those using the <code>min</code> and{" "}
      <code>max</code> attributes.
    </CodeBlock>

    <CodeBlock
      title="Defining steps"
      scope={{ Form }}
      code={`
<Form.Group controlId="formBasicRangeCustom" custom>
  <Form.Label>Example Range</Form.Label>
  <Form.Control type="range" custom min={0} max={5} step={0.5} />
</Form.Group>
`}
    >
      By default, range inputs “snap” to integer values. To change this, you can
      specify a <code>step</code> value. In the example below, we double the
      number of steps by using <code>step="0.5"</code>.
    </CodeBlock>

    <LinkedHeading h="2" className="h1" id="sliders-api">
      API
    </LinkedHeading>
    <ComponentApi metadata={props.data.Form} />
    <ComponentApi
      metadata={props.data.FormGroup}
      exportedBy={props.data.Form}
    />
    <ComponentApi
      metadata={props.data.FormLabel}
      exportedBy={props.data.Form}
    />
    <ComponentApi
      metadata={props.data.FormControl}
      exportedBy={props.data.Form}
    />
  </MainLayout>
)

export default SlidersPage

export const query = graphql`
  query SlidersQuery {
    Form: componentMetadata(displayName: { eq: "Form" }) {
      ...ComponentApi_metadata
    }
    FormGroup: componentMetadata(displayName: { eq: "FormGroup" }) {
      ...ComponentApi_metadata
    }
    FormControl: componentMetadata(displayName: { eq: "FormControl" }) {
      ...ComponentApi_metadata
    }
    FormLabel: componentMetadata(displayName: { eq: "FormLabel" }) {
      ...ComponentApi_metadata
    }
  }
`
