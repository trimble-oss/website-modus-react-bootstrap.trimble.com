import * as React from "react"
import { useContext, useCallback, useState } from "react"
import merge from "lodash/merge"
import PropTypes from "prop-types"
import classNames from "classnames"
import { TableContext, TableHeadersContext } from "./TableContext"
import { ContextMenu } from "./types"
import ContextMenuPopUp from "./ContextMenu"

export interface TableHeaderCellProps
  extends React.HTMLProps<HTMLTableCellElement> {
  accessor?: string
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
  accessor: PropTypes.string,

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
  sort: string
  title?: string
  className?: string
}
const SortIcon: React.FunctionComponent<SortIconComponentProps> = ({
  sort,
  title,
  className,
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
  // get context
  const headersContext = useContext(TableHeadersContext)
  const tableContext = useContext(TableContext)

  // context menu variables
  // const [contextMenu, setContextMenu] = useState([])
  // const [contextMenuPositionX, setContextMenuPositionX] = useState(0)
  // const [contextMenuPositionY, setContextMenuPositionY] = useState(0)

  // handle right-click
  const handleContextMenuClick = useCallback(event => {
    event.preventDefault()
    // setContextMenu(tableContext.getContextMenu(accessor))

    debugger
    const rect = event.target.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    // setContextMenuPositionX(x)
    // setContextMenuPositionY(y)

    //  top: window.scrollY + e.nativeEvent.clientY,
    // left: e.nativeEvent.clientX,

    tableContext.onHeaderContextMenu(accessor, event)
  }, [])

  // if header context is present render with header props
  if (headersContext && accessor) {
    const header = headersContext && headersContext.find(h => h.id === accessor)
    if (!header) return

    const headerProps = merge(
      header.getHeaderProps(
        header.getSortByToggleProps && header.getSortByToggleProps()
      ),
      { title: "" }
    )
    const headerLabel = header.render("Header")

    return (
      <th
        className={classNames("pr-2", className)}
        ref={ref}
        {...headerProps}
        {...props}
        onContextMenu={handleContextMenuClick}
      >
        <div className="d-flex" style={{ width: "100%" }}>
          <div
            className="flex-grow-1"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            data-toggle="tooltip"
            data-placement="top"
            title={headerLabel}
          >
            {headerLabel}
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

        {/* {contextMenu.length > 0 && (
          <ContextMenuPopUp
            menu={contextMenu}
            anchorPointX={contextMenuPositionX}
            anchorPointY={contextMenuPositionY}
          />
        )} */}
      </th>
    )
  }
  return (
    <th className={className} {...props} ref={ref}>
      {children}
    </th>
  )
})

TableHeaderCell.propTypes = propTypes

TableHeaderCell.displayName = "TableHeaderCell"

export default TableHeaderCell
