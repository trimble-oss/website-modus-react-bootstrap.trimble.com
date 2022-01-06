import * as React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

const TableHead = React.forwardRef(function Head(
  { children, className, ...props },
  ref
) {
  return (
    <thead className={className} {...props} ref={ref}>
      {children}
    </thead>
  )
})

TableHead.displayName = "TableHead"
TableHead.propTypes = {
  className: PropTypes.string,
}

export default TableHead
