import React, { useCallback, useEffect, useRef } from "react"
import merge from "lodash/merge"
import PropTypes from "prop-types"
import classNames from "classnames"
import { ColumnInstance } from "react-table"

export interface DataTableHeaderCellProps
  extends React.HTMLProps<HTMLTableCellElement> {
  header: any
  allowDrag: boolean
  allowDrop: boolean
  onHeaderContextMenu: (event, column: ColumnInstance) => void
  onToggleHideColumn: (columnId: string, hide: boolean) => void
  onDragHeaderStart: (event, columnId: string) => void
  onDragHeaderOver: (event, columnId: string, allowDrop: boolean) => void
  onDropHeader: (event, columnId: string) => void
  onDragHeaderEnd: (event, columnId: string) => void
  onDragHeaderEnter: (event, columnId: string, allowDrop: boolean) => void
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
      allowDrop,
      onDragHeaderStart,
      onDragHeaderOver,
      onDragHeaderEnter,
      onDropHeader,
      onDragHeaderEnd,
      registerRef,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const defaultRef = useRef<HTMLTableCellElement>(null)
    const resolvedRef = ref || defaultRef
    const draggingProps = allowDrag
      ? {
          onDragStart: e => handleDragStart(e),
          onDragEnd: e => handleDragEnd(e),
          draggable: true,
        }
      : {}

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
    const handleDragStart = useCallback(
      event => {
        onDragHeaderStart(event, header.id)
      },
      [onDragHeaderStart, header]
    )

    const handleDragOver = useCallback(
      event => {
        onDragHeaderOver(event, header.id, allowDrop)
      },
      [onDragHeaderOver, header]
    )

    const handleDragEnter = useCallback(
      event => {
        onDragHeaderEnter(event, header.id, allowDrop)
      },
      [onDragHeaderEnter, header]
    )

    const handleDrop = useCallback(
      event => {
        onDropHeader(event, header.id)
      },
      [onDropHeader, header]
    )
    const handleDragEnd = useCallback(
      event => {
        onDragHeaderEnd(event, header.id)
      },
      [onDropHeader, header]
    )

    useEffect(() => {
      const columnRef = (
        resolvedRef as React.MutableRefObject<HTMLTableCellElement>
      ).current
      if (columnRef && header && registerRef) {
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
            "pr-2 pl-0",
            className,
            header.id === "selector" && "icon-only"
          )}
          ref={resolvedRef}
          {...headerProps}
          {...props}
          onContextMenu={handleContextMenuClick}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div
            className="d-flex w-100 h-100 align-items-center"
            style={{ paddingLeft: "1rem" }}
            {...draggingProps}
          >
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
