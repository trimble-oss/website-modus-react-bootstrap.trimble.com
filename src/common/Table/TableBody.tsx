import * as React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { CustomPropsWithDisplayName } from "./helpers"
import { ReactNode, useContext } from "react"
import { TableContext } from "./TableContext"
import { Tab } from "@trimbleinc/modus-react-bootstrap"

export interface TableBodyProps<T extends object = {}>
  extends CustomPropsWithDisplayName {}

const propTypes = {
  /**
   * CSS class name
   */
  className: PropTypes.string,
}

const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <tbody className={className} {...props} ref={ref}>
        {children}
      </tbody>
    )
  }
)

TableBody.displayName = "TableBody"
TableBody.propTypes = propTypes

export default TableBody
