import * as React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

const TableBody = React.forwardRef(function Body(
  { children, className, ...props },
  ref
) {
  return (
    <tbody className={className} {...props} ref={ref}>
      {children}
    </tbody>
  )
})

TableBody.displayName = "TableBody"
TableBody.propTypes = {
  className: PropTypes.string,
}

export default TableBody
