import PropTypes from "prop-types"
import React from "react"
import { MDXProvider } from "@mdx-js/react"

import MainContent from "../common/MainContent"
import Banner from "../common/Banner"

import Default from "./DefaultLayout"

import CodeBlock from "../common/CodeBlock"
import Overview from "../common/Overview"
import LinkedHeading from "../common/LinkedHeading"
import ComponentApi from "../api-docs/ComponentApi"

//Modus Icon scripts not required for Home page
import { ModusIcons } from "../common/ExternalReferences"

const propTypes = {
  location: PropTypes.object.isRequired,
}

const components = { CodeBlock, Overview, LinkedHeading, ComponentApi }

function MainLayout({ children, ...props }) {
  if (props.location.pathname.endsWith("/components/")) {
    return (
      <Default location={props.location}>
        <Banner />
        {children}
      </Default>
    )
  } else {
    return (
      <Default location={props.location}>
        <ModusIcons />
        <Banner />
        <MainContent>
          <MDXProvider components={components}>{children}</MDXProvider>
        </MainContent>
      </Default>
    )
  }
}

MainLayout.propTypes = propTypes

export default MainLayout
