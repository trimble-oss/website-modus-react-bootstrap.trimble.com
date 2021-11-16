import React from "react"
import { Button, Toast, Card } from "@trimbleinc/modus-react-bootstrap"
import CodeBlock from "../../common/CodeBlock"
import Overview from "../../common/Overview"
import MainLayout from "../../layouts/MainLayout"
import { graphql } from "gatsby"
import ComponentApi from "../../api-docs/ComponentApi"
import LinkedHeading from "../../common/LinkedHeading"

const defaultScope = { Button }
const ButtonPage = props => (
  <MainLayout {...props}>
    <Overview guidelink="https://modus.trimble.com/components/buttons/">
      Normally <code>&lt;Button&gt;</code> components will render a HTML{" "}
      <code>&lt;button&gt;</code> element. However, adding a href prop will
      automatically render an <code>&lt;a&gt;</code> element. React Bootstrap
      will take care of the proper ARIA roles for you.
    </Overview>

    <CodeBlock bigtitle="Button Types">
      Modify the <code>variant</code> prop to style the button.
    </CodeBlock>

    <CodeBlock
      title="Solid Buttons"
      scope={defaultScope}
      code={`
<div>
  <Button variant="primary" className="mr-2">
    Primary
  </Button>
  <Button variant="secondary" className="mr-2">
    Secondary
  </Button>
  <Button variant="tertiary">Tertiary</Button>
</div>`}
    >
      Solid buttons should only be used with the Primary, Secondary, and
      Tertiary theme colors.
    </CodeBlock>
    <CodeBlock
      title="Outline Buttons"
      scope={defaultScope}
      code={`
<div>
  <Button variant="outline-primary" className="mr-2">
    Primary
  </Button>
  <Button variant="outline-dark">Dark</Button>
</div>`}
    >
      Outline buttons should only be used with the Primary, and Dark theme
      colors.
    </CodeBlock>
    <CodeBlock
      title="Text Buttons"
      scope={defaultScope}
      code={`<Button variant="text-primary">Primary</Button>`}
    >
      Text buttons should only be used with the Primary theme color.
    </CodeBlock>
    <CodeBlock
      title="Text and Icons"
      scope={defaultScope}
      code={`
<Button variant="primary">
  <i className="modus-icon material-icons left-icon">settings</i>Button
</Button>`}
    >
      Icons can be used within buttons by giving the icon a class of{" "}
      <code>.modus-icon </code>
      in addition to a class of either <code>.left-icon</code> or{" "}
      <code>.right-icon</code>, depending on the desired position.
    </CodeBlock>
    <CodeBlock
      title="Icon Only Buttons "
      scope={defaultScope}
      code={`
<div>
  <Button variant="icon-only" className="btn-text-dark">
    <i className="modus-icon material-icons">settings</i>
  </Button>
  <Button variant="icon-only" className="btn-text-secondary">
    <i className="modus-icon material-icons">settings</i>
  </Button>
</div>`}
    >
      When using Icon Only Buttons, DO NOT add any additional text inside the
      button. Give the variant <code>icon-only</code> and give the icon a class
      of <code>.modus-icon</code>. <code>icon-only </code>buttons can be used
      with the Primary or Dark theme color.
    </CodeBlock>
    <h2>Button Sizes</h2>
    <p>
      Buttons default to “medium” size but there are also large and small
      options available.
    </p>
    <CodeBlock
      scope={defaultScope}
      title="Small Buttons"
      code={`
<div>
  <Button variant="primary" size="sm" className="mr-2">
    Button
  </Button>
  <Button variant="secondary" size="sm" className="mr-2">
    Button
  </Button>
  <Button variant="tertiary" size="sm" className="mr-2">
    Button
  </Button>
  <Button variant="outline-primary" size="sm" className="mr-2">
    Button
  </Button>
  <Button variant="outline-secondary" size="sm" className="mr-2">
    Button
  </Button>
  <Button variant="text-primary" size="sm" className="mr-2">
    Button
  </Button>
  <Button variant="primary" size="sm">
    <i className="modus-icon material-icons left-icon">settings</i>Button
  </Button>
  <Button variant="icon-only" size="sm" className="btn-text-dark">
    <i className="modus-icon material-icons">settings</i>
  </Button>
  <Button variant="icon-only" size="sm" className="btn-text-secondary">
    <i className="modus-icon material-icons">settings</i>
  </Button>
</div>`}
    ></CodeBlock>

    <CodeBlock
      scope={defaultScope}
      title="Large Buttons"
      code={`
<div className="bd-example">
  <Button variant="primary" size="lg" className="mr-2">
    Button
  </Button>
  <Button variant="secondary" size="lg" className="mr-2">
    Button
  </Button>
  <Button variant="tertiary" size="lg" className="mr-2">
    Button
  </Button>
  <Button variant="outline-primary" size="lg" className="mr-2">
    Button
  </Button>
  <Button variant="outline-secondary" size="lg" className="mr-2">
    Button
  </Button>
  <Button variant="text-primary" size="lg" className="mr-2">
    Button
  </Button>
  <Button variant="primary" size="lg">
    <i className="modus-icon material-icons left-icon">settings</i>Button
  </Button>
  <Button variant="icon-only" size="lg" className="btn-text-dark">
    <i className="modus-icon material-icons">settings</i>
  </Button>
  <Button variant="icon-only" size="lg" className="btn-text-secondary">
    <i className="modus-icon material-icons">settings</i>
  </Button>
</div>`}
    ></CodeBlock>
    <CodeBlock
      scope={defaultScope}
      title="Full-width (Block) Buttons"
      code={`
<div className="d-grid gap-2">
  <Button variant="primary" block>
    Button
  </Button>
  <Button variant="outline-primary" block>
    Button
  </Button>
  <Button variant="text-primary" block>
    Button
  </Button>
</div>`}
    >
      Create block level buttons—those that span the full width of a parent—by
      adding <code>block</code>.
    </CodeBlock>
    <h2>Special Use Cases</h2>
    <CodeBlock
      scope={defaultScope}
      title="Dark Backgrounds"
      code={`
<div>
  <Button variant="tertiary" className="mr-2">
    Button
  </Button>
  <Button variant="outline-tertiary" className="mr-2">
    Button
  </Button>
  <Button variant="text-tertiary" className="mr-2">
    Button
  </Button>
</div>`}
    >
      For specific use cases where a light colored button is needed against a
      dark background use a tertiary solid, outline, or text button.
    </CodeBlock>
    <p>Use case examples for light buttons.</p>
    <CodeBlock
      scope={{ Toast, Button, Card }}
      code={`
<div className="bd-example">
  <div className="row">
    <div className="col">
      <Toast className="toast-dark" show>
        A Dark Toast.
        <Button variant="tertiary">Close</Button>
      </Toast>
      <Toast className="toast-dark" show>
        A Dark Toast.
        <Button variant="outline-tertiary">Close</Button>
      </Toast>
      <Toast className="toast-dark" show>
        A Dark Toast.
        <Button variant="text-tertiary">Close</Button>
      </Toast>
    </div>
    <div className="col">
      <Card style={{ width: "18rem" }}>
        <Card.Body className="bg-trimble-blue-dark text-tertiary">
          <h4 className="card-title text-tertiary" id="card-title">
            Dark Element
          </h4>
          <p className="card-text">
            This can be any element with a dark colored background.
          </p>
          <Button href="#" variant="tertiary" className="mr-2">
            Regular
          </Button>
          <Button href="#" variant="outline-tertiary" className="mr-2">
            Outline
          </Button>
          <Button href="#" variant="text-tertiary">
            Text
          </Button>
        </Card.Body>
      </Card>
    </div>
  </div>
</div>`}
    ></CodeBlock>
    <CodeBlock
      scope={defaultScope}
      title="Danger Button"
      code={`
<div>
  <Button variant="danger" className="mr-2">
    Delete
  </Button>
  <Button variant="danger" className="btn-icon-only mr-2">
    <i className="modus-icons">trash</i>
  </Button>
  <Button variant="text-danger" className="mr-2">
    Delete
  </Button>
  <Button variant="text-danger" className="btn-icon-only mr-2">
    <i className="modus-icons">trash</i>
  </Button>
</div>`}
    >
      A danger button should be used for permanent, destructive actions like
      delete.
    </CodeBlock>
    <CodeBlock
      title="Yellow button"
      scope={defaultScope}
      code={`
<div>
  <Button variant="yellow" size="sm" className="mr-2">
    Trimble Button
  </Button>
  <Button variant="yellow" className="mr-2">
    Trimble Button
  </Button>
  <Button variant="yellow" size="lg">
    Trimble Button
  </Button>
</div>`}
    >
      A yellow button for the Trimble brand color is provided for special use
      cases.
    </CodeBlock>

    <LinkedHeading h="2" className="h1" id="buttons-api">
      API
    </LinkedHeading>
    <ComponentApi metadata={props.data.Button} />
    <ComponentApi metadata={props.data.ToggleButtonGroup} />
    <ComponentApi metadata={props.data.ToggleButton} />
  </MainLayout>
)

export default ButtonPage

export const query = graphql`
  query ButtonQuery {
    Button: componentMetadata(displayName: { eq: "Button" }) {
      displayName
      ...ComponentApi_metadata
    }
    ToggleButtonGroup: componentMetadata(
      displayName: { eq: "ToggleButtonGroup" }
    ) {
      displayName
      ...ComponentApi_metadata
    }
    ToggleButton: componentMetadata(displayName: { eq: "ToggleButton" }) {
      displayName
      ...ComponentApi_metadata
    }
  }
`
