import React, { useCallback, useEffect, useRef } from "react"
import merge from "lodash/merge"
import PropTypes from "prop-types"
import classNames from "classnames"
import { ColumnInstance } from "react-table"

export interface DataTableHeaderCellProps
  extends React.HTMLProps<HTMLTableCellElement> {
  header: any
  allowDrag: boolean
  onHeaderContextMenu: (event, column: ColumnInstance) => void
  onToggleHideColumn: (columnId: string, hide: boolean) => void
  onHeaderMouseDown: (event, columnId: string) => void
  registerRef: (columnId: string, ref: any) => void
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

const DataTableHeaderCell = React.forwardRef<
  HTMLTableCellElement,
  DataTableHeaderCellProps
>(
  (
    {
      header,
      onHeaderContextMenu,
      onToggleHideColumn,
      allowDrag,
      onHeaderMouseDown,
      registerRef,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const defaultRef = useRef<HTMLTableCellElement>(null)
    const resolvedRef = ref || defaultRef

    // handle right-click
    const handleContextMenuClick = useCallback(
      (event, header) => {
        event.preventDefault()
        onHeaderContextMenu(event, header)
      },
      [onHeaderContextMenu, header]
    )

    const handleShowHiddenColumn = useCallback(
      event => {
        onToggleHideColumn(header.id, false)
      },
      [onToggleHideColumn, header]
    )

    // Note: Drag events are triggered on the content of th
    // th border changes based on its position and stick top

    useEffect(() => {
      const columnRef = (
        resolvedRef as React.MutableRefObject<HTMLTableCellElement>
      ).current
      if (registerRef && header && columnRef) {
        registerRef(header.id, columnRef)
      }
    }, [header, resolvedRef, registerRef])

    if (!header.isVisible) {
      return (
        <div className="hidden-column">
          <div
            className="d-flex flex-row align-items-center justify-content-center"
            onClick={handleShowHiddenColumn}
          >
            <i className="modus-icons triangle_left">triangle_left</i>
            <i className="modus-icons triangle_right">triangle_right</i>
          </div>
        </div>
      )
    } else {
      const headerProps = merge(
        header.getHeaderProps(
          header.getSortByToggleProps && header.getSortByToggleProps()
        ),
        {
          style: {
            flex: header.width ? `${header.width} 0 auto` : undefined,
          },
          title: "",
        }
      )
      const headerLabel = header.render("Header")
      return (
        <th
          className={classNames(
            "pr-2",
            className,
            allowDrag && "draggable",
            header.id === "selector" && "icon-only"
          )}
          ref={resolvedRef}
          {...headerProps}
          {...props}
          onContextMenu={handleContextMenuClick}
        >
          <div className="d-flex w-100 h-100 align-items-center th-content">
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
              onMouseDown={e => allowDrag && onHeaderMouseDown(e, header.id)}
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
            <div
              {...header.getResizerProps()}
              className="table-col-resizable"
            />
          )}
        </th>
      )
    }
  }
)

DataTableHeaderCell.propTypes = {
  header: PropTypes.object.isRequired,
  onHeaderContextMenu: PropTypes.func.isRequired,
  onToggleHideColumn: PropTypes.func.isRequired,
}

DataTableHeaderCell.displayName = "DataTableHeaderCell"

export default DataTableHeaderCell
