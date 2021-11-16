import {
  ButtonGroup,
  Button,
  Dropdown,
  DropdownButton,
  Form,
} from "@trimbleinc/modus-react-bootstrap"
import React from "react"
import CodeBlock from "../../common/CodeBlock"
import Overview from "../../common/Overview"
import MainLayout from "../../layouts/MainLayout"
import { graphql } from "gatsby"
import ComponentApi from "../../api-docs/ComponentApi"
import LinkedHeading from "../../common/LinkedHeading"

const defaultScope = { DropdownButton, Dropdown }
const DropdownsPage = props => (
  <MainLayout {...props}>
    <Overview guidelink="https://modus.trimble.com/components/dropdowns/">
      <p>
        Please read this article when using dropdown menu for more styles and
        JavaScript calls.{" "}
        <a href="https://react-bootstrap-v4.netlify.app/components/dropdowns/">
          React Bootstrap Dropdown
        </a>
        .
      </p>
      <p>
        The basic Dropdown is composed of a wrapping Dropdown and inner{" "}
        <code>&lt;DropdownMenu&gt;</code>, and{" "}
        <code>&lt;DropdownToggle&gt;</code>. By default the{" "}
        <code>&lt;DropdownToggle&gt;</code> will render a <code>Button</code>{" "}
        component and accepts all the same props and adding a href prop will
        render an <code>&lt;a&gt; </code>
        element.
      </p>
      <p>
        React bootstrap also provides the <code>&lt;DropdownButton&gt;</code>{" "}
        component to help reduce typing, provide a title prop and some{" "}
        <code>DropdownItem</code>s.
      </p>
    </Overview>

    <CodeBlock
      title="Simple Button Dropdowns"
      scope={defaultScope}
      code={`
<div className="d-flex">
  <Dropdown>
    <Dropdown.Toggle variant="primary" id="dropdown-basic">
      Dropdown Button 1
    </Dropdown.Toggle>
    <Dropdown.Menu>
      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>

  <DropdownButton
    variant="primary"
    id="dropdown-basic-button"
    title="Dropdown button 2"
    className="ml-3"
  >
    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  </DropdownButton>

  <DropdownButton
    variant="primary"
    id="dropdown-basic-button"
    title="Anchor Tag"
    className="ml-3"
    href="#"
  >
    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  </DropdownButton>
</div>
`}
    ></CodeBlock>

    <CodeBlock
      scope={defaultScope}
      title="Color Variants"
      code={`
<div>
  <div className="d-flex">
    <DropdownButton
      variant="primary"
      id="dropdown-basic-button"
      title="Button"
      className="ml-3"
    >
      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
    </DropdownButton>
    <DropdownButton
      variant="secondary"
      id="dropdown-basic-button"
      title="Button"
      className="ml-3"
    >
      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
    </DropdownButton>
    <DropdownButton
      variant="dark"
      id="dropdown-basic-button"
      title="Button"
      className="ml-3"
    >
      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
    </DropdownButton>
  </div>
  <div className="d-flex mt-3">
    <DropdownButton
      variant="outline-primary"
      id="dropdown-basic-button"
      title="Button"
      className="ml-3"
    >
      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
    </DropdownButton>
    <DropdownButton
      variant="outline-secondary"
      id="dropdown-basic-button"
      title="Button"
      className="ml-3"
    >
      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
    </DropdownButton>
    <DropdownButton
      variant="outline-dark"
      id="dropdown-basic-button"
      title="Button"
      className="ml-3"
    >
      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
    </DropdownButton>
  </div>
  <div className="d-flex">
    <DropdownButton
      variant="text-primary"
      id="dropdown-basic-button"
      title="Button"
      className="ml-3"
    >
      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
    </DropdownButton>
    <DropdownButton
      variant="text-secondary"
      id="dropdown-basic-button"
      title="Button"
      className="ml-3"
    >
      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
    </DropdownButton>
    <DropdownButton
      variant="text-dark"
      id="dropdown-basic-button"
      title="Button"
      className="ml-3"
    >
      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
    </DropdownButton>
  </div>
</div>
`}
    >
      Button Dropdowns can be any variety of button style and color. Simply use
      the desired <code>variant</code>.
    </CodeBlock>

    <CodeBlock
      scope={{ Button, ButtonGroup, ...defaultScope }}
      title="Split Button"
      code={`
<Dropdown as={ButtonGroup}>
  <Button variant="primary">Split Button</Button>
  <Dropdown.Toggle split variant="primary" id="dropdown-split-basic" />
  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
`}
    >
      Split dropdown can be created by combining the <code>Dropdown</code>{" "}
      components with another <code>Button</code>
      and a <code>ButtonGroup</code>.
    </CodeBlock>

    <h3>Dropdown Button Sizing</h3>
    <p>
      To change the size of the dropdown button use the prop{" "}
      <code>size=sm, size=lg</code>.
    </p>

    <CodeBlock
      scope={{ Dropdown }}
      title="Icon Button Dropdowns"
      code={`
<Dropdown>
  <Dropdown.Toggle
    variant="text-dark"
    id="dropdown-basic"
    size="lg"
    bsPrefix
    className="btn-icon-only"
  >
    <i className="modus-icon material-icons">settings</i>
  </Dropdown.Toggle>
  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
`}
    >
      Icon buttons can also function as dropdowns. Simply set{" "}
      <code>bsPrefix</code> to nothing to remove <code>dropdown-toggle</code>{" "}
      class and eliminate the caret icon.
    </CodeBlock>

    <CodeBlock
      scope={defaultScope}
      title="Dropdown Directions"
      code={`
<div className="d-flex">
  <DropdownButton
    variant="primary"
    id="dropdown-basic-button"
    title="Down"
    className="mr-3"
    drop="down"
  >
    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  </DropdownButton>
  <DropdownButton
    variant="primary"
    id="dropdown-basic-button"
    title="Up"
    drop="up"
  >
    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  </DropdownButton>
</div>
`}
    >
      Trigger dropdown menus above, below, left, or to the right of their toggle
      elements, with the <code>drop </code>prop and the values{" "}
      <code>'up', 'down', 'left', 'right'</code>.
    </CodeBlock>

    <CodeBlock
      title="Menu Alignment"
      scope={defaultScope}
      code={`
<DropdownButton
  menuAlign="right"
  title="Dropdown right"
  id="dropdown-menu-align-right"
>
  <Dropdown.Item eventKey="1">Action</Dropdown.Item>
  <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
  <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
  <Dropdown.Divider />
  <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
</DropdownButton>
`}
    >
      By default, a dropdown menu is aligned to the left, but you can switch it
      by passing right to the <code>align </code> prop on a{" "}
      <code>DropdownMenu </code> or passing right to the <code>menuAlign </code>{" "}
      prop on the <code>DropdownButton</code> or <code>SplitButton</code> as
      seen below.
    </CodeBlock>

    <CodeBlock
      bigtitle="Dropdown Menus"
      scope={defaultScope}
      code={`
<DropdownButton
  id="dropdown-item-button"
  variant="primary"
  title="Dropdown button"
>
  <Dropdown.Item as="button">Action</Dropdown.Item>
  <Dropdown.Item as="button">Another action</Dropdown.Item>
  <Dropdown.Item as="button">Something else</Dropdown.Item>
</DropdownButton>
`}
    >
      You can optionally use <code>button</code> elements in your dropdowns
      instead of links.
    </CodeBlock>

    <CodeBlock
      title="Sizes"
      scope={{ Dropdown }}
      code={`
<div className="static-dropdown-menu">
  <Dropdown.Menu show className="dropdown-menu-sm">
    <Dropdown.Item eventKey="1">Regular link</Dropdown.Item>
    <Dropdown.Item eventKey="2" active>
      Active link
    </Dropdown.Item>
    <Dropdown.Item eventKey="3">Another link</Dropdown.Item>
    <Dropdown.Item eventKey="4">Another link</Dropdown.Item>
    <Dropdown.Item eventKey="5">Another link</Dropdown.Item>
    <Dropdown.Item eventKey="6">Another link</Dropdown.Item>
    <Dropdown.Item eventKey="7">Another link</Dropdown.Item>
    <Dropdown.Item eventKey="8">Another link</Dropdown.Item>
    <Dropdown.Item eventKey="9">Another link</Dropdown.Item>
    <Dropdown.Item eventKey="10">Another link</Dropdown.Item>
    <Dropdown.Item eventKey="11">Another link</Dropdown.Item>
    <Dropdown.Item eventKey="12">Another link</Dropdown.Item>
    <Dropdown.Item eventKey="13">Another link</Dropdown.Item>
    <Dropdown.Item eventKey="14">Another link</Dropdown.Item>
  </Dropdown.Menu>

  <Dropdown.Menu show className="dropdown-menu-md">
    <Dropdown.Item eventKey="1">Regular link</Dropdown.Item>
    <Dropdown.Item eventKey="2" active>
      Active link
    </Dropdown.Item>
    <Dropdown.Item eventKey="3">Another link</Dropdown.Item>
    <Dropdown.Item eventKey="4">Another link</Dropdown.Item>
    <Dropdown.Item eventKey="5">Another link</Dropdown.Item>
    <Dropdown.Item eventKey="6">Another link</Dropdown.Item>
    <Dropdown.Item eventKey="7">Another link</Dropdown.Item>
    <Dropdown.Item eventKey="8">Another link</Dropdown.Item>
    <Dropdown.Item eventKey="9">Another link</Dropdown.Item>
    <Dropdown.Item eventKey="10">Another link</Dropdown.Item>
    <Dropdown.Item eventKey="11">Another link</Dropdown.Item>
    <Dropdown.Item eventKey="12">Another link</Dropdown.Item>
    <Dropdown.Item eventKey="13">Another link</Dropdown.Item>
    <Dropdown.Item eventKey="14">Another link</Dropdown.Item>
  </Dropdown.Menu>

  <Dropdown.Menu show className="dropdown-menu-lg">
    <Dropdown.Item eventKey="1">Regular link</Dropdown.Item>
    <Dropdown.Item eventKey="2" active>
      Active link
    </Dropdown.Item>
    <Dropdown.Item eventKey="3">Another link</Dropdown.Item>
    <Dropdown.Item eventKey="4">Another link</Dropdown.Item>
    <Dropdown.Item eventKey="5">Another link</Dropdown.Item>
    <Dropdown.Item eventKey="6">Another link</Dropdown.Item>
    <Dropdown.Item eventKey="7">Another link</Dropdown.Item>
    <Dropdown.Item eventKey="8">Another link</Dropdown.Item>
    <Dropdown.Item eventKey="9">Another link</Dropdown.Item>
    <Dropdown.Item eventKey="10">Another link</Dropdown.Item>
    <Dropdown.Item eventKey="11">Another link</Dropdown.Item>
    <Dropdown.Item eventKey="12">Another link</Dropdown.Item>
    <Dropdown.Item eventKey="13">Another link</Dropdown.Item>
    <Dropdown.Item eventKey="14">Another link</Dropdown.Item>
  </Dropdown.Menu>
</div>
`}
    >
      <p>
        For niche cases, dropdown menus can be given a max-height using the
        following classes:
      </p>
      <ul>
        <li>
          <code>.dropdown-menu-sm</code>- 140px
        </li>
        <li>
          <code>.dropdown-menu-md</code> - 240px
        </li>
        <li>
          <code>.dropdown-menu-lg</code> - 400px
        </li>
      </ul>
    </CodeBlock>

    <CodeBlock
      title="Active"
      scope={{ Dropdown }}
      code={`
<div className="static-dropdown-menu">
  <Dropdown.Menu show className="dropdown-menu-sm">
    <Dropdown.Item eventKey="1">Regular link</Dropdown.Item>
    <Dropdown.Item eventKey="2" active>
      Active link
    </Dropdown.Item>
    <Dropdown.Item eventKey="3">Another link</Dropdown.Item>
  </Dropdown.Menu>
</div>
`}
    >
      Add an <code>active </code> prop to items to style them as active.
    </CodeBlock>

    <CodeBlock
      title="Disabled"
      scope={{ Dropdown }}
      code={`
<div className="static-dropdown-menu">
  <Dropdown.Menu show className="dropdown-menu-sm">
    <Dropdown.Item eventKey="1">Regular link</Dropdown.Item>
    <Dropdown.Item eventKey="2" disabled>
      Disabled link
    </Dropdown.Item>
    <Dropdown.Item eventKey="3">Another link</Dropdown.Item>
  </Dropdown.Menu>
</div>
`}
    >
      Add an <code>disabled </code> prop to items to style them as disabled.
    </CodeBlock>

    <CodeBlock
      title="Headers"
      scope={{ Dropdown }}
      code={`
<div className="static-dropdown-menu">
  <Dropdown.Menu show className="dropdown-menu-sm">
    <Dropdown.Header>Dropdown header</Dropdown.Header>
    <Dropdown.Item eventKey="2">Active link</Dropdown.Item>
    <Dropdown.Item eventKey="3">Another link</Dropdown.Item>
  </Dropdown.Menu>
</div>
`}
    >
      Add a header to label sections of actions in any dropdown menu.
    </CodeBlock>

    <CodeBlock
      title="Dividers"
      code={`
<div className="static-dropdown-menu">
  <Dropdown.Menu show>
    <Dropdown.Item eventKey="1">Action</Dropdown.Item>
    <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
    <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
    <Dropdown.Divider />
    <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
  </Dropdown.Menu>
</div>
`}
      scope={{ Dropdown }}
    >
      Separate groups of related menu items with a divider.
    </CodeBlock>

    <CodeBlock
      title="Text"
      scope={{ Dropdown }}
      code={`
<div className="static-dropdown-menu">
  <Dropdown.Menu show className="p-4 text-muted" style={{ maxWidth: "200px" }}>
    <p>Some example text that's free-flowing within the dropdown menu.</p>
    <p className="mb-0">And this is more example text.</p>
  </Dropdown.Menu>
</div>
`}
    >
      Place any freeform text within a dropdown menu with text.{" "}
      <strong>Note:</strong> you’ll likely need additional sizing styles to
      constrain the menu width.
    </CodeBlock>

    <CodeBlock
      title="Forms"
      scope={{ Dropdown, Form, Button }}
      code={`
<div className="static-dropdown-menu">
  <Dropdown.Menu show>
    <Form className="px-4 py-3">
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Remember me" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Sign in
      </Button>
    </Form>
    <Dropdown.Divider />
    <Dropdown.Item eventKey="2">New around here? Sign up</Dropdown.Item>
    <Dropdown.Item eventKey="3">Forgot password?</Dropdown.Item>
  </Dropdown.Menu>
</div>
`}
    >
      Put a form within a dropdown menu, or make it into a dropdown menu, and
      use
      <a href="/utilities/padding-and-margin/">
        margin or padding utilities
      </a>{" "}
      to give it the negative space you require.
    </CodeBlock>

    <LinkedHeading h="2" className="h1" id="dd-api">
      API
    </LinkedHeading>

    <ComponentApi metadata={props.data.DropdownButton} />

    <ComponentApi metadata={props.data.SplitButton} />

    <ComponentApi metadata={props.data.Dropdown} />

    <ComponentApi
      metadata={props.data.DropdownToggle}
      exportedBy={props.data.Dropdown}
    />

    <ComponentApi
      metadata={props.data.DropdownMenu}
      exportedBy={props.data.Dropdown}
    />

    <ComponentApi
      metadata={props.data.DropdownItem}
      exportedBy={props.data.Dropdown}
    />
    <ComponentApi
      metadata={props.data.DropdownHeader}
      exportedBy={props.data.Dropdown}
    />
    <ComponentApi
      metadata={props.data.DropdownDivider}
      exportedBy={props.data.Dropdown}
    />
  </MainLayout>
)

export default DropdownsPage

export const query = graphql`
  query DropdownMDXQuery {
    DropdownButton: componentMetadata(displayName: { eq: "DropdownButton" }) {
      displayName
      ...ComponentApi_metadata
    }
    SplitButton: componentMetadata(displayName: { eq: "SplitButton" }) {
      displayName
      ...ComponentApi_metadata
    }
    Dropdown: componentMetadata(displayName: { eq: "Dropdown" }) {
      displayName
      ...ComponentApi_metadata
    }
    DropdownToggle: componentMetadata(displayName: { eq: "DropdownToggle" }) {
      displayName
      ...ComponentApi_metadata
    }
    DropdownMenu: componentMetadata(displayName: { eq: "DropdownMenu" }) {
      displayName
      ...ComponentApi_metadata
    }
    DropdownItem: componentMetadata(displayName: { eq: "DropdownItem" }) {
      displayName
      ...ComponentApi_metadata
    }
    DropdownHeader: componentMetadata(displayName: { eq: "DropdownHeader" }) {
      displayName
      ...ComponentApi_metadata
    }
    DropdownDivider: componentMetadata(displayName: { eq: "DropdownDivider" }) {
      displayName
      ...ComponentApi_metadata
    }
  }
`
