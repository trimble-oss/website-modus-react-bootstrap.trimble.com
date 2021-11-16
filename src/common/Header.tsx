import * as PropTypes from "prop-types"
import React from "react"
import {
  Form,
  FormControl,
  Navbar,
  Nav,
  Container,
} from "@trimbleinc/modus-react-bootstrap"
import logo from "../assets/img/trimble-logo.svg"

const propTypes = { activePage: PropTypes.string }

const NAV_LINKS = [
  {
    link: "/getting-started",
    title: "Getting Started",
  },
  {
    link: "/layout",
    title: "Layout",
  },
  {
    link: "/foundations/typography",
    title: "Foundations",
  },
  {
    link: "/components",
    title: "Components",
  },
  {
    link: "/utilities/borders/",
    title: "Utilities",
  },
]

function Header({ activePage }) {
  return (
    <Container fluid className="bg-white">
      <Navbar
        expand
        collapseOnSelect
        className="fixed-top px-0 px-sm-1 px-md-2 px-lg-3"
      >
        <div className="container flex-column flex-md-row justify-content-end">
          <Navbar.Brand
            href="/"
            className="mr-left mr-lg-auto font-weight-bold"
          >
            <img
              src={logo}
              width="115"
              height="26"
              className="img-fluid"
              alt="home"
            ></img>
            <div>Modus React Bootstrap</div>
          </Navbar.Brand>

          <Nav
            role="navigation"
            navbarScroll
            id="top"
            className="d-none d-md-flex"
          >
            {NAV_LINKS.map(({ link, title }) => {
              return (
                <Nav.Link
                  key={link}
                  href={link}
                  active={activePage.startsWith(link)}
                  className="justify-content-end  mx-0 mx-lg-1 mx-xl-2"
                >
                  {title}
                </Nav.Link>
              )
            })}
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          </Form>
        </div>
      </Navbar>
    </Container>
  )
}

Header.propTypes = propTypes

export default Header
