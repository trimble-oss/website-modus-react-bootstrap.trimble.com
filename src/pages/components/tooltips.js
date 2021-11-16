import {
  Button,
  OverlayTrigger,
  Tooltip,
} from "@trimbleinc/modus-react-bootstrap"
import CodeBlock from "../../common/CodeBlock"
import Overview from "../../common/Overview"
import React from "react"
import MainLayout from "../../layouts/MainLayout"
import { graphql } from "gatsby"
import ComponentApi from "../../api-docs/ComponentApi"
import LinkedHeading from "../../common/LinkedHeading"

const TooltipsPage = props => (
  <MainLayout {...props}>
    <Overview guidelink="https://modus.trimble.com/components/tooltips/">
      <ul>
        <li>
          The <code>&lt;Tooltip&gt;</code> component do not position itself.
          Instead the <code>&lt;Overlay&gt;</code> (or{" "}
          <code>&lt;OverlayTrigger&gt;</code>) components, inject{" "}
          <code>ref</code> and <code>style</code> props.
        </li>
        <li>
          Tooltip expects specific props injected by the{" "}
          <code>&lt;Overlay&gt;</code> component
        </li>
        <li>
          Tooltips for <code>disabled</code> elements must be triggered on a
          wrapper element.
        </li>
        <li>
          <code>Overlay</code> is the fundamental component for positioning and
          controlling tooltip visibility. It's a wrapper around Popper.js, that
          adds support for transitions, and visibility toggling.
        </li>
      </ul>
    </Overview>

    <CodeBlock
      title="Tooltip examples"
      scope={{ Tooltip, OverlayTrigger, Button }}
      code={`
<div className="d-flex">
  <OverlayTrigger
    key="overlay1"
    placement="top"
    overlay={<Tooltip id="btntooltip">Button Tooltip</Tooltip>}
  >
    <Button variant="primary">Button</Button>
  </OverlayTrigger>

  <OverlayTrigger
    key="overlay2"
    placement="top"
    overlay={<Tooltip id="icontooltip">Icon Tooltip</Tooltip>}
  >
    <i className="modus-icon material-icons ml-3">settings</i>
  </OverlayTrigger>

  <p className="ml-3 mb-0">
    Tooltips can even be used with{" "}
    <OverlayTrigger
      key="overlay3"
      placement="top"
      overlay={<Tooltip id="texttooltip">Text Tooltip</Tooltip>}
    >
      <strong> text</strong>
    </OverlayTrigger>
  </p>
</div>
`}
    >
      You can pass the <code>Overlay</code> injected props directly to the
      Tooltip component as shown in{" "}
      <a
        href="https://react-bootstrap-v4.netlify.app/components/overlays/#tooltips"
        target="_blank"
        rel="noopener"
      >
        React Bootstrap
      </a>{" "}
      Or pass a Tooltip element to <code>OverlayTrigger</code> instead.
    </CodeBlock>

    <CodeBlock
      title="Tooltip placement"
      scope={{ OverlayTrigger, Tooltip, Button }}
      code={`
<div className="d-flex">
  <OverlayTrigger
    key="overlay1"
    placement="top"
    overlay={<Tooltip id="toptooltip">Tooltip on top</Tooltip>}
  >
    <Button variant="primary" id="toptooltipbtn" className="mr-3">
      Tooltip on top
    </Button>
  </OverlayTrigger>
  <OverlayTrigger
    key="overlay2"
    placement="bottom"
    overlay={<Tooltip id="bottomtooltip">Tooltip on bottom</Tooltip>}
  >
    <Button variant="primary" id="bottomtooltipbtn" className="mr-3">
      Tooltip on bottom
    </Button>
  </OverlayTrigger>
  <OverlayTrigger
    key="overlay3"
    placement="left"
    overlay={<Tooltip id="lefttooltip">Tooltip on left</Tooltip>}
  >
    <Button variant="primary" id="lefttooltipbtn" className="mr-3">
      Tooltip on left
    </Button>
  </OverlayTrigger>
  <OverlayTrigger
    key="overlay4"
    placement="right"
    overlay={<Tooltip id="righttooltip">Tooltip on right</Tooltip>}
  >
    <Button variant="primary" id="righttooltipbtn">
      Tooltip on right
    </Button>
  </OverlayTrigger>
</div>
`}
    >
      Use <code>placement</code> prop on <code>OverlayTrigger</code> to set the
      position for tooltip.
    </CodeBlock>

    <CodeBlock
      scope={{ OverlayTrigger, Button, Tooltip }}
      title="Tooltip with HTML"
      code={`
<OverlayTrigger
  key="overlay1"
  placement="top"
  overlay={
    <Tooltip id="toptooltip">
      <em>Tooltip</em> <u>with</u> <b>HTML</b>
    </Tooltip>
  }
>
  <Button variant="primary" id="toptooltipbtn" className="mr-3">
    Tooltip with HTML
  </Button>
</OverlayTrigger>
`}
    >
      <code>Tooltip</code> by default supports custom HTML.
    </CodeBlock>

    <LinkedHeading h="2" id="overlays-api" className="h1">
      API
    </LinkedHeading>

    <ComponentApi metadata={props.data.OverlayTrigger} />
    <ComponentApi metadata={props.data.Tooltip} />
  </MainLayout>
)

export default TooltipsPage

export const query = graphql`
  query OverlayQuery {
    Tooltip: componentMetadata(displayName: { eq: "Tooltip" }) {
      ...ComponentApi_metadata
    }
    OverlayTrigger: componentMetadata(displayName: { eq: "OverlayTrigger" }) {
      ...ComponentApi_metadata
    }
  }
`
