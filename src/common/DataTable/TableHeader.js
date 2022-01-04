import * as React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { Badge } from "@trimbleinc/modus-react-bootstrap"

const ModusSortArrows = {
  asc: {
    icon: "sort_alpha_down",
    title: "Sort Descending",
  },
  desc: {
    icon: "sort_alpha_up",
    title: "Sort Ascending",
  },
}

const SortIcon = ({ sort, title, className, ...props }) => (
  <Badge variant="text-dark" className="p-1">
    <i
      className={classNames("modus-icons material-icons", className)}
      data-toggle="tooltip"
      data-placement="top"
      title={title || ModusSortArrows[sort].title}
    >
      {ModusSortArrows[sort].icon}
    </i>
  </Badge>
)

const TableHeader = React.forwardRef(function Header(
  { className, children, isSortable, isSorted, sortDirection, ...props },
  ref
) {
  return (
    <th className={className} {...props} ref={ref}>
      {children}
      {isSortable && (
        <>
          {isSorted ? (
            <SortIcon className="sorted" sort={sortDirection} />
          ) : (
            <SortIcon className="unsorted" title="Sort Ascending" sort="asc" />
          )}
        </>
      )}
    </th>
  )
})

TableHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isSorted: PropTypes.bool,
  isSortable: PropTypes.bool,
  sortDirection: PropTypes.string,
}

TableHeader.defaultProps = {
  isSortable: false,
}

TableHeader.displayName = "TableHeader"

export default TableHeader
