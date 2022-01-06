import * as React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { Badge } from "@trimbleinc/modus-react-bootstrap"
import styled from "styled-components"

const ModusSortArrows = {
  asc: {
    icon: "sort_alpha_up",
    title: "Sort Descending",
  },
  desc: {
    icon: "sort_alpha_down",
    title: "Sort Ascending",
  },
}

const IconButton = styled("button")`
  background: none;
  border: 0;
`

const SortIcon = ({ sort, title, className, ...props }) => (
  <i
    className={classNames("modus-icons material-icons", className)}
    data-toggle="tooltip"
    data-placement="top"
    title={title || ModusSortArrows[sort].title}
  >
    {ModusSortArrows[sort].icon}
  </i>
)

const TableHeader = React.forwardRef(function Header(
  { className, children, isSortable, isSorted, sortDirection, ...props },
  ref
) {
  return (
    <th className={classNames("pr-2", className)} {...props} title="" ref={ref}>
      <div class="d-flex">
        <div className="flex-grow-1">{children}</div>
        <div>
          {isSortable && (
            <>
              {isSorted ? (
                <SortIcon className="sorted" sort={sortDirection} />
              ) : (
                <SortIcon
                  className="unsorted"
                  title="Sort Ascending"
                  sort="asc"
                />
              )}
            </>
          )}
        </div>
      </div>
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
