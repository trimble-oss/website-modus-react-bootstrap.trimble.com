import React from "react"
import PropTypes from "prop-types"
import { CustomPropsWithDisplayName } from "./helpers"
import { TableContext, TableHeaderGroupsContext } from "./TableContext"
import { useContext } from "react"

export interface TableHeadProps<T extends object = {}>
  extends CustomPropsWithDisplayName {}

const propTypes = {
  /**
   * CSS class name
   */
  className: PropTypes.string,
}

const TableHead = React.forwardRef<HTMLTableSectionElement, TableHeadProps>(
  ({ children, className, ...props }, ref) => {
    const tableContext = useContext(TableContext)
    if (tableContext) {
      return (
        <TableHeaderGroupsContext.Provider value={tableContext.headerGroups}>
          <thead className={className} {...props} ref={ref}>
            {children}
          </thead>
        </TableHeaderGroupsContext.Provider>
      )
    } else {
      return (
        <thead className={className} {...props} ref={ref}>
          {children}
        </thead>
      )
    }
  }
)

TableHead.displayName = "TableHead"
TableHead.propTypes = propTypes

export default TableHead
