import * as React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import styled from "styled-components"

export interface TableContainerProps<T extends object = {}>
  extends React.HTMLProps<HTMLDivElement> {
  scrollable?: boolean
}

const propTypes = {
  /**
   * Enables scrolling for the Table component.
   */
  scrollable: PropTypes.bool,
}

const TableContainer = React.forwardRef<HTMLDivElement, TableContainerProps>(
  ({ scrollable, className, ...props }, ref) => {
    return (
      <div
        className={classNames(scrollable && "scrollable", "container")}
        {...props}
        ref={ref}
      >
        {props.children}
      </div>
    )
  }
)

TableContainer.propTypes = propTypes
TableContainer.displayName = "TableContainer"

export default TableContainer
