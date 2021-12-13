import * as PropTypes from "prop-types"
import React, { useContext } from "react"
import { Navbar, Nav, Container } from "@trimbleinc/modus-react-bootstrap"
import logo from "../assets/img/trimble-logo.svg"
import SearchBar from "./SearchBar"
// import { MenuContext } from "./MenuContext"

function Header({ activePage, navigationMenu }) {
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
            {navigationMenu.map(({ key, path, title }) => {
              return (
                <Nav.Link
                  key={key}
                  href={path}
                  active={activePage && activePage.path.startsWith(`/${key}`)}
                  className="justify-content-end  mx-0 mx-lg-1 mx-xl-2"
                >
                  {title}
                </Nav.Link>
              )
            })}
          </Nav>
          <SearchBar />
        </div>
      </Navbar>
    </Container>
  )
}

export default Header
