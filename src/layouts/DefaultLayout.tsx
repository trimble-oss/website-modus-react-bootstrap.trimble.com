import React from "react"
import * as PropTypes from "prop-types"
import Footer from "../common/Footer"
import Header from "../common/Header"
import "../assets/css/main.scss"

const propTypes = {
  location: PropTypes.object.isRequired,
}

function DefaultLayout({ children, location }) {
  return (
    <div>
      <Header location={location} />
      {children}
      <Footer />
    </div>
  )
}

export default DefaultLayout
