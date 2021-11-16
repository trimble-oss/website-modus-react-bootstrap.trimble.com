import {
  Button,
  Nav,
  Navbar,
  NavDropdown,
  OverlayTrigger,
  Tooltip,
} from "@trimbleinc/modus-react-bootstrap"
import React from "react"
import CodeBlock from "../../common/CodeBlock"
import MainLayout from "../../layouts/MainLayout"
import { graphql } from "gatsby"
import ComponentApi from "../../api-docs/ComponentApi"
import LinkedHeading from "../../common/LinkedHeading"

const NavbarPage = props => (
  <MainLayout {...props}>
    <h2 className="h1 font-weight-bold" id="Overview">
      Overview
    </h2>
    <CodeBlock
      scope={{ Nav, NavDropdown, Navbar, Button, OverlayTrigger, Tooltip }}
      style={{ padding: "0px" }}
      code={`
<Navbar collapseOnSelect expand="sm" bg="white">
  <Button
    variant="text-dark"
    id="menuButton"
    size="lg"
    className="btn-icon-only"
    data-modus-item="menu-btn"
    data-toggle="#"
  >
    <i className="modus-icon material-icons">menu</i>
  </Button>
  <Navbar.Brand className=" mr-auto ml-2" href="#">
    <img
      src="https://modus-bootstrap.trimble.com/img/trimble-logo.svg"
      width="107"
      height="25"
      className="img-fluid d-none d-sm-block"
      alt="home"
    />
    <img
      src="https://modus-bootstrap.trimble.com/img/trimble-icon.svg"
      className="d-block d-sm-none"
      height="25"
      width="25"
      alt="home"
    />
  </Navbar.Brand>
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="ml-auto">
      <OverlayTrigger
        key="notification"
        placement="bottom"
        overlay={<Tooltip id="notifytooltip">Notifications</Tooltip>}
      >
        <Button
          variant="text-dark"
          id="notifybtn"
          size="lg"
          className="btn-icon-only"
        >
          <i className="modus-icon material-icons">notifications</i>
        </Button>
      </OverlayTrigger>

      <OverlayTrigger
        key="help"
        placement="bottom"
        overlay={<Tooltip id="helptooltip">Help</Tooltip>}
      >
        <Button
          variant="text-dark"
          id="helpbtn"
          size="lg"
          className="btn-icon-only"
        >
          <i className="modus-icon material-icons">help</i>
        </Button>
      </OverlayTrigger>
      <OverlayTrigger
        key="apps"
        placement="bottom"
        overlay={<Tooltip id="appstooltip">Apps</Tooltip>}
      >
        <Button
          variant="text-dark"
          id="appsbtn"
          size="lg"
          className="btn-icon-only"
        >
          <i className="modus-icon material-icons">apps</i>
        </Button>
      </OverlayTrigger>
      <OverlayTrigger
        key="account"
        placement="bottom"
        overlay={
          <Tooltip id="notifytooltip">
            <div className="text-left">
              MyTrimble
              <br />
              Stephanie Carter
              <br />
              stephanie_carter@example.com
            </div>
          </Tooltip>
        }
      >
        <Button
          variant="text-dark"
          id="acntbtn"
          size="lg"
          className="btn-icon-only"
        >
          <i className="modus-icon material-icons">account_circle</i>
        </Button>
      </OverlayTrigger>
    </Nav>
  </Navbar.Collapse>
</Navbar>
`}
    >
      The navbar or the app header provides context through globally accessible
      menu options and positions a consistent component to connect various
      Trimble applications and contains the main navigation for your
      application.
    </CodeBlock>

    <LinkedHeading h="2" className="h1" id="navbar-api">
      API
    </LinkedHeading>

    <ComponentApi metadata={props.data.Navbar} />
    <ComponentApi
      metadata={props.data.NavbarBrand}
      exportedBy={props.data.Navbar}
    />
    <ComponentApi
      metadata={props.data.NavbarToggle}
      exportedBy={props.data.Navbar}
    />
    <ComponentApi
      metadata={props.data.NavbarCollapse}
      exportedBy={props.data.Navbar}
    />
  </MainLayout>
)

export default NavbarPage
export const query = graphql`
  query NavbarQuery {
    Navbar: componentMetadata(displayName: { eq: "Navbar" }) {
      ...ComponentApi_metadata
    }
    NavbarBrand: componentMetadata(displayName: { eq: "NavbarBrand" }) {
      ...ComponentApi_metadata
    }
    NavbarToggle: componentMetadata(displayName: { eq: "NavbarToggle" }) {
      ...ComponentApi_metadata
    }
    NavbarCollapse: componentMetadata(displayName: { eq: "NavbarCollapse" }) {
      ...ComponentApi_metadata
    }
  }
`
