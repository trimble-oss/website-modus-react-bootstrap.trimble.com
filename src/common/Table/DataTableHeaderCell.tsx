import * as React from "react"
import { useContext, useCallback, useState } from "react"
import merge from "lodash/merge"
import PropTypes from "prop-types"
import classNames from "classnames"
import { TableContext, TableHeadersContext } from "./TableContext"
import { ColumnInstance } from "react-table"

export interface DataTableHeaderCellProps
  extends React.HTMLProps<HTMLTableCellElement> {
  header: any
  onHeaderContextMenu: (column: ColumnInstance, event) => void
  onToggleHideColumn: (columnId: string, hide: boolean) => void
}

const propTypes = {
  header: PropTypes.object.isRequired,
  onHeaderContextMenu: PropTypes.func.isRequired,
  onToggleHideColumn: PropTypes.func.isRequired,
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
      children,
      className,
      ...props
    },
    ref
  ) => {
    // handle right-click
    const handleContextMenuClick = useCallback((header, event) => {
      event.preventDefault()
      onHeaderContextMenu(event, header)
    }, [])

    const handleShowHiddenColumn = useCallback(event => {
      onToggleHideColumn(header.id, false)
    }, [])

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
    }

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
          header.id === "selector" && "icon-only"
        )}
        ref={ref}
        {...headerProps}
        {...props}
        onContextMenu={e => handleContextMenuClick(header, e)}
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
      </th>
    )
  }
)

DataTableHeaderCell.propTypes = propTypes

DataTableHeaderCell.displayName = "DataTableHeaderCell"

export default DataTableHeaderCell
