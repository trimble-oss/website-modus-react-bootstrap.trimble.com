import * as React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { CustomPropsWithDisplayName } from "./helpers"
import { ReactNode, useContext } from "react"
import { TableContext } from "./TableContext"

export interface TableBodyProps<T extends object = {}>
  extends Omit<CustomPropsWithDisplayName, "children"> {
  children?: (...props: any) => ReactNode
}

const propTypes = {
  /**
   * CSS class name
   */
  className: PropTypes.string,
}

const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, children, ...props }, ref) => {
    const tableContext = useContext(TableContext)
    const params = tableContext
      ? { prepareRow: tableContext.prepareRow, rows: tableContext.rows }
      : { prepareRow: null, rows: null }

    return (
      <tbody className={className} {...props} ref={ref}>
        {children({ ...params })}
      </tbody>
    )
  }
)

TableBody.displayName = "TableBody"
TableBody.propTypes = propTypes

export default TableBody
