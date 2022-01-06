import * as React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

const TableRow = React.forwardRef(function Row(
  { children, className, ...props },
  ref
) {
  return (
    <tr className={className} {...props} ref={ref}>
      {children}
    </tr>
  )
})

TableRow.displayName = "TableRow"
TableRow.propTypes = {
  className: PropTypes.string,
}

export default TableRow
