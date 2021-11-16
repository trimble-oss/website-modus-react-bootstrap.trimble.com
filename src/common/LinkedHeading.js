import React from "react"
import Heading from "./Heading"
import classNames from "classnames"

function LinkedHeading({ h, id, children, ...props }) {
  return (
    <Heading h={h} id={id} title={children} {...props}>
      <a
        className="header-link text-light text-decoration-none font-weight-normal ml-2"
        target={id}
        aria-label="anchor"
      ></a>
    </Heading>
  )
}

export default LinkedHeading
