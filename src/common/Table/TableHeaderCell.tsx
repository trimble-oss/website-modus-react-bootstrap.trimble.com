import * as React from "react"
import { useContext } from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { TableContext, TableHeadersContext } from "./TableContext"
import merge from "lodash/merge"

export interface TableHeaderCellProps<T extends object = {}>
  extends React.HTMLProps<HTMLTableCellElement> {
  accessor: string
  renderer?: (header: any) => React.ReactElement
}

const propTypes = {
  /**
   * CSS class name
   */
  className: PropTypes.string,

  /**
   * Header Accessor key
   */
  accessor: PropTypes.string.isRequired,

  /**
   * Custom Header cell renderer function
   */
  renderer: PropTypes.func,
}

const modusSortArrows = {
  asc: {
    icon: "sort_alpha_up",
    title: "Sort Descending",
  },
  desc: {
    icon: "sort_alpha_down",
    title: "Sort Ascending",
  },
}
type SortIconComponentProps = {
  sort?: string
  title?: string
  className?: string
}
const SortIcon: React.FunctionComponent<SortIconComponentProps> = ({
  sort,
  title,
  className,
  ...props
}) => (
  <i
    className={classNames("modus-icons material-icons", className)}
    data-toggle="tooltip"
    data-placement="top"
    title={title || modusSortArrows[sort].title}
  >
    {modusSortArrows[sort].icon}
  </i>
)

const TableHeaderCell = React.forwardRef<
  HTMLTableCellElement,
  TableHeaderCellProps
>(({ accessor, renderer, children, className, ...props }, ref) => {
  const headersContext = useContext(TableHeadersContext)
  const header = headersContext && headersContext.find(h => h.id == accessor)

  const headerProps = merge(
    header.getSortByToggleProps && header.getSortByToggleProps(),
    { title: "" }
  )

  return (
    <th
      className={classNames("pr-2", className)}
      ref={ref}
      {...headerProps}
      {...props}
    >
      <div className="d-flex" style={{ width: "100%" }}>
        <div className="flex-grow-1">
          {renderer ? renderer(header) : header.render("Header")}
        </div>
        <div>
          {header.canSort && (
            <>
              {header.isSorted ? (
                <SortIcon
                  className="sorted"
                  sort={header.isSortedDesc ? "desc" : "asc"}
                />
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
      {header.getResizerProps && (
        <div {...header.getResizerProps()} className="table-col-resizable" />
      )}
    </th>
  )
})

TableHeaderCell.propTypes = propTypes

TableHeaderCell.displayName = "TableHeaderCell"

export default TableHeaderCell
