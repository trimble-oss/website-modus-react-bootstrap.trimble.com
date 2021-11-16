import React from "react"
import * as PropTypes from "prop-types"

const propTypes = {
  guidelink: PropTypes.string.isRequired,
}

const Overview = ({ guidelink, ...props }) => (
  <>
    <h2 className="h1 font-weight-bold" id="Overview">
      Overview
      <a
        className="header-link text-light text-decoration-none font-weight-normal ml-2"
        href={"#Overview"}
        aria-label="anchor"
      ></a>
    </h2>
    <p>{props.children}</p>

    <div className="alert alert-primary my-2 text-dark">
      View usage guidance on the
      <a href={guidelink} className="ml-1" target="_blank" rel="noopener">
        Modus Style Guide
      </a>
    </div>
  </>
)

Overview.prototype = propTypes

export default Overview
