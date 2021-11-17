import React from "react"
import { Accordion, Card, Container } from "@trimbleinc/modus-react-bootstrap"
import CodeBlock from "../../common/CodeBlock"
import Overview from "../../common/Overview"
import MainLayout from "../../layouts/MainLayout"
import ComponentApi from "../../api-docs/ComponentApi"
import { graphql } from "gatsby"
import LinkedHeading from "../../common/LinkedHeading"
import Helmet from "react-helmet"

const scope = { Accordion, Card, Container }
const basicExample = `
<Accordion defaultActiveKey="0">
  <Card>
    <Accordion.Toggle as={Card.Header} eventKey="0">
      <h6 className="mb-0" id="collapsible-group-item-1">
        Collapsible Group Item #1
      </h6>
    </Accordion.Toggle>
    <Accordion.Collapse eventKey="0">
      <Card.Body>
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
        terry richardson ad squid. 3 wolf moon officia aute, non cupidatat
        skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
      </Card.Body>
    </Accordion.Collapse>
  </Card>
  <Card>
    <Accordion.Toggle as={Card.Header} eventKey="1">
      <h6 className="mb-0" id="collapsible-group-item-2">
        Collapsible Group Item #2
      </h6>
    </Accordion.Toggle>
    <Accordion.Collapse eventKey="1">
      <Card.Body>
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
        terry richardson ad squid. 3 wolf moon officia aute, non cupidatat
        skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
      </Card.Body>
    </Accordion.Collapse>
  </Card>
  <Card>
    <Accordion.Toggle as={Card.Header} eventKey="2">
      <h6 className="mb-0" id="collapsible-group-item-3">
        Collapsible Group Item #3
      </h6>
    </Accordion.Toggle>
    <Accordion.Collapse eventKey="2">
      <Card.Body>
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
        terry richardson ad squid. 3 wolf moon officia aute, non cupidatat
        skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
      </Card.Body>
    </Accordion.Collapse>
  </Card>
</Accordion>`

const borderlessExample = `
<Accordion defaultActiveKey="0" className="borderless">
  <Card>
    <Accordion.Toggle as={Card.Header} eventKey="0">
      <h6 className="mb-0" id="collapsible-group-item-1">
        Collapsible Group Item #1
      </h6>
    </Accordion.Toggle>
    <Accordion.Collapse eventKey="0">
      <Card.Body>
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
        terry richardson ad squid. 3 wolf moon officia aute, non cupidatat
        skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
      </Card.Body>
    </Accordion.Collapse>
  </Card>
  <Card>
    <Accordion.Toggle as={Card.Header} eventKey="1">
      <h6 className="mb-0" id="collapsible-group-item-2">
        Collapsible Group Item #2
      </h6>
    </Accordion.Toggle>
    <Accordion.Collapse eventKey="1">
      <Card.Body>
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
        terry richardson ad squid. 3 wolf moon officia aute, non cupidatat
        skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
      </Card.Body>
    </Accordion.Collapse>
  </Card>
  <Card>
    <Accordion.Toggle as={Card.Header} eventKey="2">
      <h6 className="mb-0" id="collapsible-group-item-3">
        Collapsible Group Item #3
      </h6>
    </Accordion.Toggle>
    <Accordion.Collapse eventKey="2">
      <Card.Body>
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
        terry richardson ad squid. 3 wolf moon officia aute, non cupidatat
        skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
      </Card.Body>
    </Accordion.Collapse>
  </Card>
</Accordion>
`

const smallExample = `
<Accordion defaultActiveKey="0" className="accordion-sm">
  <Card>
    <Accordion.Toggle as={Card.Header} eventKey="0">
      <h6 className="mb-0" id="collapsible-group-item-1">
        Collapsible Group Item #1
      </h6>
    </Accordion.Toggle>
    <Accordion.Collapse eventKey="0">
      <Card.Body>
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
        terry richardson ad squid. 3 wolf moon officia aute, non cupidatat
        skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
      </Card.Body>
    </Accordion.Collapse>
  </Card>
  <Card>
    <Accordion.Toggle as={Card.Header} eventKey="1">
      <h6 className="mb-0" id="collapsible-group-item-2">
        Collapsible Group Item #2
      </h6>
    </Accordion.Toggle>
    <Accordion.Collapse eventKey="1">
      <Card.Body>
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
        terry richardson ad squid. 3 wolf moon officia aute, non cupidatat
        skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
      </Card.Body>
    </Accordion.Collapse>
  </Card>
  <Card>
    <Accordion.Toggle as={Card.Header} eventKey="2">
      <h6 className="mb-0" id="collapsible-group-item-3">
        Collapsible Group Item #3
      </h6>
    </Accordion.Toggle>
    <Accordion.Collapse eventKey="2">
      <Card.Body>
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
        terry richardson ad squid. 3 wolf moon officia aute, non cupidatat
        skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
      </Card.Body>
    </Accordion.Collapse>
  </Card>
</Accordion>
`

const listExample = `
<ul className="list-group">
  <li className="list-group-item">List Item</li>
  <li className="list-group-item">List Item</li>
  <li className="list-group-item py-0">
    <Accordion className="borderless" style={{width:"100%"}}>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0">
          <h6 className="mb-0" id="collapsible-group-item-1">
            Collapsible Group Item #1
          </h6>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
            terry richardson ad squid. 3 wolf moon officia aute, non cupidatat
            skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  </li>
  <li className="list-group-item">List Item</li>
  <li className="list-group-item">List Item</li>
</ul>
`
const AccordionPage = props => (
  <MainLayout {...props}>
    <Helmet>
      <title>Accordion</title>
      <meta
        name="description"
        content="The accordion component delivers large amounts of content in a small space through progressive disclosure. That is, the user gets key details about the underlying content and can choose to expand that content within the constraints of the accordion. Accordions work especially well on mobile interfaces or whenever vertical space is at a premium."
      ></meta>
    </Helmet>
    <Overview guidelink="https://modus.trimble.com/components/accordions/">
      Accordions use <code>Card</code> components to provide styling of the
      <code> Accordion</code> components. Use <code>Accordion.Toggle</code> to
      provide a button that switches between each{" "}
      <code>Accordion.Collapse</code> component.
    </Overview>

    <CodeBlock bigtitle="Examples">
      If you want your Accordion to start in a fully-collapsed state, then
      simply don't pass in a <code>defaultActiveKey</code> prop to{" "}
      <code>Accordion</code>.
    </CodeBlock>

    <CodeBlock
      title="Collapsible Cards"
      code={basicExample}
      scope={scope}
    ></CodeBlock>

    <CodeBlock
      title="Borderless Variant"
      code={borderlessExample}
      scope={scope}
    >
      Add the <code>.borderless </code>class to the Accordion component to
      create a borderless variant.
    </CodeBlock>

    <CodeBlock title="Small Variant" code={smallExample} scope={scope}>
      Add the <code>.accordion-sm</code> class to the Accordion component to
      create a smaller variant.
    </CodeBlock>

    <CodeBlock title="Collapsible Lists" code={listExample} scope={scope}>
      You can use Accordion combination with other UI Elements to create
      collapsible content.
    </CodeBlock>

    <LinkedHeading h="2" className="h1" id="accordions-api">
      API
    </LinkedHeading>
    <ComponentApi metadata={props.data.Accordion} />
    <ComponentApi
      metadata={props.data.AccordionToggle}
      exportedBy={props.data.Accordion}
    />
    <ComponentApi
      metadata={props.data.AccordionCollapse}
      exportedBy={props.data.Accordion}
    />
  </MainLayout>
)

export default AccordionPage

export const query = graphql`
  query AccordionQuery {
    Accordion: componentMetadata(displayName: { eq: "Accordion" }) {
      ...ComponentApi_metadata
    }
    AccordionToggle: componentMetadata(displayName: { eq: "AccordionToggle" }) {
      ...ComponentApi_metadata
    }
    AccordionCollapse: componentMetadata(
      displayName: { eq: "AccordionCollapse" }
    ) {
      ...ComponentApi_metadata
    }
  }
`
