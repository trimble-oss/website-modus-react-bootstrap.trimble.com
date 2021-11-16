import React from "react"
import {
  Badge,
  Button,
  Card,
  ListGroup,
  ListGroupItem,
} from "@trimbleinc/modus-react-bootstrap"
import CodeBlock from "../../common/CodeBlock"
import Overview from "../../common/Overview"
import MainLayout from "../../layouts/MainLayout"

import { graphql } from "gatsby"
import ComponentApi from "../../api-docs/ComponentApi"
import LinkedHeading from "../../common/LinkedHeading"

const CardsPage = props => (
  <MainLayout {...props}>
    <Overview guidelink="https://modus.trimble.com/components/cards/">
      Cards provide a flexible and extensible content container with multiple
      variants and options.
    </Overview>

    <CodeBlock
      scope={{ Button, Card }}
      title="Card Example"
      code={`
<Card style={{ width: "18rem" }}>
  <Card.Body>
    <Card.Title as="h4">Card title</Card.Title>
    <Card.Title as="h5">Card subtitle</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
    <Button variant="primary" href="#">
      Go somewhere
    </Button>
  </Card.Body>
</Card>
`}
    >
      Cards use a wrapper <code>&lt;Card&gt;</code> followed by a{" "}
      <code>&lt;Card.Body&gt;</code> container. <code>&lt;Card.Title&gt;</code>{" "}
      and <code>&lt;Card.Subtitle&gt;</code> are used to space out the title and
      subtitle appropriately, and they can be customized to render heading tags
      by passing
      <code> &lt;h4&gt;, &lt;h5&gt;</code> to the <code>as</code> prop.
    </CodeBlock>
    <CodeBlock
      title="Card with Image"
      scope={{ Card }}
      code={`
<Card style={{ width: "18rem" }}>
  <Card.Img variant="top" src="https://fakeimg.pl/286x150/" />
  <Card.Body>
    <Card.Title as="h4">Card title</Card.Title>
    <Card.Title as="h5">Card subtitle</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
  </Card.Body>
</Card>
`}
    >
      To add an image to the top of the card, use <code>&lt;Card.Img&gt;</code>{" "}
      with a variant <code>top</code>.
    </CodeBlock>

    <CodeBlock
      title="Header and Footer"
      scope={{ Card }}
      code={`
<Card style={{ width: "18rem" }}>
  <Card.Header>Card Header</Card.Header>
  <Card.Body>
    <Card.Title as="h4">Card title</Card.Title>
    <Card.Title as="h5">Card subtitle</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
  </Card.Body>
  <Card.Footer>Card Footer</Card.Footer>
</Card>
`}
    >
      Use <code>&lt;Card.Header&gt;, &lt;Card.Footer&gt;</code> to add header
      and footer content.
    </CodeBlock>
    <CodeBlock
      title="Customizing Cards"
      scope={{ Card, Button, ListGroupItem, ListGroup, Badge }}
      code={`
<Card style={{ width: "18rem" }} border="dark" className="shadow">
  <Card.Img variant="top" src="https://fakeimg.pl/286x150/" />
  <Card.Body>
    <Card.Title as="h3">Card Title</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
  </Card.Body>
  <ListGroup className="list-group-flush">
    <ListGroupItem>List Item</ListGroupItem>
    <li className="list-group-item d-flex justify-content-between align-items-center">
      List with Badge
      <Badge pill variant="primary">
        14
      </Badge>
    </li>
    <ListGroupItem>List Item</ListGroupItem>
  </ListGroup>
  <Card.Body className="text-right">
    <Card.Link href="#">Link</Card.Link>
    <Button href="#" style={{ marginLeft: "10px" }}>
      Button
    </Button>
  </Card.Body>
</Card>
`}
    >
      Cards primarily serve as containers to organize content for your needs.
      They can be combined with other UI elements and utility classes for a
      broad range of customization.
    </CodeBlock>

    <LinkedHeading h="2" className="h1" id="cards-api">
      API
    </LinkedHeading>
    <ComponentApi metadata={props.data.Card} />
    <ComponentApi metadata={props.data.CardBody} exportedBy={props.data.Card} />
    <ComponentApi metadata={props.data.CardImg} exportedBy={props.data.Card} />
    <ComponentApi
      metadata={props.data.CardImgOverlay}
      exportedBy={props.data.Card}
    />

    <ComponentApi metadata={props.data.CardDeck} />
    <ComponentApi metadata={props.data.CardGroup} />
    <ComponentApi metadata={props.data.CardColumns} />
  </MainLayout>
)

export default CardsPage

export const query = graphql`
  query CardQuery {
    Card: componentMetadata(displayName: { eq: "Card" }) {
      ...ComponentApi_metadata
    }
    CardBody: componentMetadata(displayName: { eq: "CardBody" }) {
      ...ComponentApi_metadata
    }
    CardImg: componentMetadata(displayName: { eq: "CardImg" }) {
      ...ComponentApi_metadata
    }
    CardImgOverlay: componentMetadata(displayName: { eq: "CardImgOverlay" }) {
      ...ComponentApi_metadata
    }
    CardDeck: componentMetadata(displayName: { eq: "CardDeck" }) {
      ...ComponentApi_metadata
    }
    CardGroup: componentMetadata(displayName: { eq: "CardGroup" }) {
      ...ComponentApi_metadata
    }
    CardColumns: componentMetadata(displayName: { eq: "CardColumns" }) {
      ...ComponentApi_metadata
    }
  }
`
