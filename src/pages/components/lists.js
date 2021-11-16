import {
  Badge,
  Form,
  FormCheck,
  ListGroup,
} from "@trimbleinc/modus-react-bootstrap"
import CodeBlock from "../../common/CodeBlock"
import Overview from "../../common/Overview"
import React from "react"
import MainLayout from "../../layouts/MainLayout"
import { graphql } from "gatsby"
import ComponentApi from "../../api-docs/ComponentApi"
import LinkedHeading from "../../common/LinkedHeading"

const ListsPage = props => (
  <MainLayout {...props}>
    <Overview guidelink="https://modus.trimble.com/components/lists/">
      Basic code structure involves using <code>&lt;ListGroup&gt;</code> and{" "}
      <code>&lt;ListGroup.Item&gt;</code>. Set the <code>active</code> prop to
      indicate the list groups current active selection.
    </Overview>

    <CodeBlock
      title="Basic List"
      scope={{ ListGroup }}
      code={`
<div>
  <h6>List Items</h6>
  <ListGroup style={{ maxWidth: "400px" }}>
    <ListGroup.Item>Cras justo odio</ListGroup.Item>
    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
    <ListGroup.Item>Morbi leo risus</ListGroup.Item>
    <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
  </ListGroup>
</div>
`}
    ></CodeBlock>

    <CodeBlock
      title="List Items"
      scope={{ Form, ListGroup, FormCheck, Badge }}
      code={`
<div>
  <h6>List Items</h6>
  <ListGroup style={{ maxWidth: "400px" }}>
    <ListGroup.Item active>List Item(active)</ListGroup.Item>
    <ListGroup.Item>
      <Form.Switch id="custom-switch" checked />
      <span>Left Switch</span>
    </ListGroup.Item>
    <ListGroup.Item className="list-item-right-control">
      <span>Right Switch</span>
      <Form.Switch id="custom-switch" checked />
    </ListGroup.Item>
    <ListGroup.Item>
      <FormCheck checked id="custom-checkbx" custom />
      <span>Left Checkbox</span>
    </ListGroup.Item>
    <ListGroup.Item>
      <Form.Check checked type="radio" id="custom-rb" custom />
      <span>Left Radio Button</span>
    </ListGroup.Item>
    <ListGroup.Item>
      <Form.Check disabled type="radio" id="custom-rb" custom />
      <span>Left Radio Button</span>
    </ListGroup.Item>
    <ListGroup.Item disabled>List Item (disabled)</ListGroup.Item>
    <ListGroup.Item className="list-item-left-control">
      <i className="modus-icon material-icons">settings</i>
      <span>Left Icon</span>
    </ListGroup.Item>
    <ListGroup.Item className="list-item-right-control">
      <span>Right Icon</span>
      <i className="modus-icon material-icons">settings</i>
    </ListGroup.Item>
    <ListGroup.Item className="list-item-leftright-control">
      <i className="modus-icon material-icons">settings</i>
      <span>Both Icons</span>
      <i className="icon modus-icons">check</i>
    </ListGroup.Item>
    <ListGroup.Item className="d-flex justify-content-between align-items-center">
      List with Text Badge
      <Badge pill variant="text-primary">
        14
      </Badge>
    </ListGroup.Item>
  </ListGroup>
</div>
`}
    >
      <p>
        The most basic list group is an unordered list with list items and the
        proper classes. Build upon it with the options that follow, or with your
        own CSS as needed.
      </p>
      <p>
        Use <code>.list-item-left-control</code>,
        <code>.list-item-right-control</code>, and
        <code>.list-item-leftright-control</code> to add custom controls,
        buttons, or icons to list items. Be sure to include{" "}
        <code>.modus-icon</code> for 3rd party icons.
      </p>
    </CodeBlock>

    <CodeBlock
      title="Borderless Lists "
      scope={{ Form, ListGroup, FormCheck, Badge }}
      code={`
<div>
  <h6>List Items</h6>
  <ListGroup className="list-group-borderless" style={{ maxWidth: "400px" }}>
    <ListGroup.Item active>List Item(active)</ListGroup.Item>
    <ListGroup.Item>
      <Form.Switch id="custom-switch" checked />
      <span>Left Switch</span>
    </ListGroup.Item>
    <ListGroup.Item className="list-item-right-control">
      <span>Right Switch</span>
      <Form.Switch id="custom-switch" checked />
    </ListGroup.Item>
    <ListGroup.Item>
      <FormCheck checked id="custom-checkbx" custom />
      <span>Left Checkbox</span>
    </ListGroup.Item>
    <ListGroup.Item>
      <Form.Check checked type="radio" id="custom-rb" custom />
      <span>Left Radio Button</span>
    </ListGroup.Item>
    <ListGroup.Item>
      <Form.Check disabled type="radio" id="custom-rb" custom />
      <span>Left Radio Button</span>
    </ListGroup.Item>
    <ListGroup.Item disabled>List Item (disabled)</ListGroup.Item>
    <ListGroup.Item className="list-item-left-control">
      <i className="modus-icon material-icons">settings</i>
      <span>Left Icon</span>
    </ListGroup.Item>
    <ListGroup.Item className="list-item-right-control">
      <span>Right Icon</span>
      <i className="modus-icon material-icons">settings</i>
    </ListGroup.Item>
    <ListGroup.Item className="list-item-leftright-control">
      <i className="modus-icon material-icons">settings</i>
      <span>Both Icons</span>
      <i className="icon modus-icons">check</i>
    </ListGroup.Item>
    <ListGroup.Item className="d-flex justify-content-between align-items-center">
      List with Text Badge
      <Badge pill variant="text-primary">
        14
      </Badge>
    </ListGroup.Item>
  </ListGroup>
</div>
`}
    >
      Add a class of <code>.list-group-borderless</code> to your List Group for
      a borderless variant.
    </CodeBlock>

    <CodeBlock
      title="Condensed Lists "
      scope={{ Form, ListGroup, FormCheck, Badge }}
      code={`
<div>
  <h6>List Items</h6>
  <ListGroup className="list-group-condensed" style={{ maxWidth: "400px" }}>
    <ListGroup.Item active>List Item(active)</ListGroup.Item>
    <ListGroup.Item>
      <Form.Switch id="custom-switch" checked />
      <span>Left Switch</span>
    </ListGroup.Item>
    <ListGroup.Item className="list-item-right-control">
      <span>Right Switch</span>
      <Form.Switch id="custom-switch" checked />
    </ListGroup.Item>
    <ListGroup.Item>
      <FormCheck checked id="custom-checkbx" custom />
      <span>Left Checkbox</span>
    </ListGroup.Item>
    <ListGroup.Item>
      <Form.Check checked type="radio" id="custom-rb" custom />
      <span>Left Radio Button</span>
    </ListGroup.Item>
    <ListGroup.Item>
      <Form.Check disabled type="radio" id="custom-rb" custom />
      <span>Left Radio Button</span>
    </ListGroup.Item>
    <ListGroup.Item disabled>List Item (disabled)</ListGroup.Item>
    <ListGroup.Item className="list-item-left-control">
      <i className="modus-icon material-icons">settings</i>
      <span>Left Icon</span>
    </ListGroup.Item>
    <ListGroup.Item className="list-item-right-control">
      <span>Right Icon</span>
      <i className="modus-icon material-icons">settings</i>
    </ListGroup.Item>
    <ListGroup.Item className="list-item-leftright-control">
      <i className="modus-icon material-icons">settings</i>
      <span>Both Icons</span>
      <i className="icon modus-icons">check</i>
    </ListGroup.Item>
    <ListGroup.Item className="d-flex justify-content-between align-items-center">
      List with Text Badge
      <Badge pill variant="text-primary">
        14
      </Badge>
    </ListGroup.Item>
  </ListGroup>
</div>
`}
    >
      Add a class of <code>.list-group-condensed </code> to your List Group for
      a smaller variant.
    </CodeBlock>

    <LinkedHeading h="2" className="h1" id="lists-api">
      API
    </LinkedHeading>
    <ComponentApi metadata={props.data.ListGroup} />
    <ComponentApi
      metadata={props.data.ListGroupItem}
      exportedBy={props.data.ListGroup}
    />
  </MainLayout>
)

export default ListsPage

export const query = graphql`
  query ListGroupQuery {
    ListGroup: componentMetadata(displayName: { eq: "ListGroup" }) {
      ...ComponentApi_metadata
    }
    ListGroupItem: componentMetadata(displayName: { eq: "ListGroupItem" }) {
      ...ComponentApi_metadata
    }
    ListGroupItemAction: componentMetadata(
      displayName: { eq: "ListGroupItemAction" }
    ) {
      ...ComponentApi_metadata
    }
  }
`
