import React, { useContext, useCallback } from "react"
import PropTypes from "prop-types"
import { CustomPropsWithDisplayName } from "./helpers"
import { TableContext, TableHeaderGroupsContext } from "./TableContext"

export type TableHeadProps = CustomPropsWithDisplayName

const propTypes = {
  /**
   * CSS class name
   */
  className: PropTypes.string,
}

const TableHead = React.forwardRef<HTMLTableSectionElement, TableHeadProps>(
  ({ children, className, ...props }, ref) => {
    const tableContext = useContext(TableContext)

    if (tableContext && tableContext.headerGroups) {
      return (
        <TableHeaderGroupsContext.Provider value={tableContext.headerGroups}>
          <thead className={className} {...props} ref={ref}>
            {children}
          </thead>
        </TableHeaderGroupsContext.Provider>
      )
    }
    return (
      <thead className={className} {...props} ref={ref}>
        {children}
      </thead>
    )
  }
)

TableHead.displayName = "TableHead"
TableHead.propTypes = propTypes

export default TableHead
