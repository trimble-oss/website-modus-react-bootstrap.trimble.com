import * as React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import styled from "styled-components"

const TableContainer = React.forwardRef(({ scrollable, ...props }, ref) => {
  return (
    <div
      className={classNames(scrollable && "scrollable", "container")}
      {...props}
    >
      {props.children}
    </div>
  )
})

TableContainer.propTypes = {
  /**
   * Enables scrolling for the Table component.
   */
  scrollable: PropTypes.bool,
}

export default TableContainer
