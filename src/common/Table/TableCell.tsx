import * as React from "react"
import PropTypes from "prop-types"

const propTypes = {
  /**
   * CSS class name
   */
  className: PropTypes.string,
}

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.HTMLProps<HTMLTableCellElement>
>(({ className, children, ...props }, ref) => {
  return (
    <td className={className} {...props} ref={ref}>
      {children}
    </td>
  )
})

TableCell.displayName = "TableCell"
TableCell.propTypes = propTypes

export default TableCell
