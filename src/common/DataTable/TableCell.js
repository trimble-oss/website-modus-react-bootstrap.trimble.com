import * as React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

const TableCell = React.forwardRef(function Cell(
  { children, className, ...props },
  ref
) {
  return (
    <td className={className} {...props} ref={ref}>
      {children}
    </td>
  )
})

TableCell.displayName = "TableCell"
TableCell.propTypes = {
  className: PropTypes.string,
}

export default TableCell
