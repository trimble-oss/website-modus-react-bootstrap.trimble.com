import * as PropTypes from "prop-types"
import React, { useContext } from "react"
import { MenuContext } from "./MenuContext"

const Banner = () => {
  const context = useContext(MenuContext)
  const { title, subtitle } = context.current

  return (
    <header className="container-fluid px-0 border-bottom">
      <div className="container py-md-3">
        <div className="row py-lg-3">
          <div className="col-12 py-4 text-center">
            <h1 className="display-2 font-weight-bold pt-4 mt-5 text-white">
              {title}
            </h1>
            <h2 className="mt-4 col-12 col-sm-11 mx-auto text-white">
              {subtitle}
            </h2>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Banner
