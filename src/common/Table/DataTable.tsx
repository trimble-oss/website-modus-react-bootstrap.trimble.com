import React, { useCallback, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import {
  useTable,
  useSortBy,
  usePagination,
  useResizeColumns,
  useFlexLayout,
  TableOptions,
  TableState,
  useRowSelect,
  useFilters,
  HeaderGroup,
  Row,
} from "react-table"
import classNames from "classnames"
import Table from "./Table"
import TablePagination from "./TablePagination"
import DataTableHeaderCell from "./DataTableHeaderCell"
import DataTableStyled from "./DataTableStyled"
import DataTableFilterPanel from "./DataTableFilterPanel"
import ContextMenu from "./ContextMenu"
import useDataTableContextMenu from "./useDataTableContextMenu"
import {
  checkBoxSelectionHook,
  getCellStyles,
  stateReducer,
} from "./DataTableHelpers"
import { TableColumn } from "."

export interface DataTableProps
  extends Omit<React.HTMLProps<HTMLDivElement>, "data">,
    Omit<TableOptions<any>, "columns"> {
  id: string
  columns: ReadonlyArray<TableColumn>
  pageSize?: number
  pageSizeOptions?: number[]
  resizeColumns?: boolean
  multipleRowSelection?: boolean
  checkBoxRowSelection?: boolean
  disableRowSelection?: boolean
  disablePagination?: boolean
  disableSorting?: boolean
  disableFiltering?: boolean
  onRowSelection?: (rows: Array<Row>) => void
}

const propTypes = {
  /**
   * DataTable identifier.
   */
  id: PropTypes.string.isRequired,

  /**
   * Array of header data of type TableColumn.
   */
  columns: PropTypes.array.isRequired,

  /**
   * Default page size for the pages if pagination isn't disabled.
   */
  pageSize: PropTypes.number,

  /**
   * An array of page size options
   */
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number),

  /**
   * Array of data to be displayed as Table Rows.
   */
  data: PropTypes.array.isRequired,

  /**
   * Enables Table header resizing.
   */
  resizeColumns: PropTypes.bool,

  /**
   * Enables row selection using checkbox.
   */
  checkBoxRowSelection: PropTypes.bool,

  /**
   * Enables multiple row selection.
   */
  multipleRowSelection: PropTypes.bool,

  /**
   * Disables on-click row selection.
   */
  disableRowSelection: PropTypes.bool,

  /**
   * Displays all the rows and hides pagination panel.
   */
  disablePagination: PropTypes.bool,

  /**
   * Removes sorting icons from the column header.
   */
  disableSorting: PropTypes.bool,

  /**
   * Removes the link to filter panel.
   */
  disableFiltering: PropTypes.bool,

  /**
   * Callback when a row is selected. If multipleRowSelection is enabled all rows selected will be available in the callback.
   */
  onRowSelection: PropTypes.bool,
}

export function DataTable(
  props: React.PropsWithChildren<DataTableProps> & {
    ref?: React.Ref<HTMLDivElement>
  }
): React.ReactElement {
  const {
    id,
    columns,
    pageSize: pageSizeProp,
    pageSizeOptions,
    data,
    resizeColumns,
    checkBoxRowSelection,
    multipleRowSelection,
    disableRowSelection,
    disablePagination,
    disableSorting,
    disableFiltering,
    onRowSelection,
    ref,
    className,
    ...rest
  } = props

  const filterColumns =
    columns.find(col => col.Filter != null) && !disableFiltering ? true : false
  // To convert custom column props: sortBy
  const normalizedColumns = React.useMemo(
    () =>
      columns.map(col => {
        const { sortBy, ...columnProps } = col
        columnProps.disableSortBy = !sortBy
        return columnProps
      }),
    []
  )

  // Conditional Table Hooks Array
  const conditionalHooks: any = [useFlexLayout]
  if (filterColumns) conditionalHooks.push(useFilters)
  if (!disableSorting) conditionalHooks.push(useSortBy)
  if (!disablePagination) conditionalHooks.push(usePagination)
  if (resizeColumns) conditionalHooks.push(useResizeColumns)
  if (!disableRowSelection) conditionalHooks.push(useRowSelect)
  if (
    checkBoxRowSelection &&
    !columns.find(col => col.accessor === "selector")
  ) {
    conditionalHooks.push(hooks =>
      checkBoxSelectionHook(hooks, id, multipleRowSelection)
    )
  }

  // Table instance
  const tableInstance = useTable(
    {
      columns: normalizedColumns,
      data,
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      initialState: {
        pageIndex: 0,
        pageSize: pageSizeProp || 10,
      } as TableState,
      ...(!multipleRowSelection && stateReducer),
    },
    ...conditionalHooks
  )
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    allColumns,
    setFilter,
    setAllFilters,
    toggleHideColumn,
    page,
    pageOptions,
    gotoPage,
    setPageSize,
    selectedFlatRows,
    state: { pageIndex, pageSize, filters },
  } = tableInstance

  // Context Menu
  const containerRef = useRef<HTMLDivElement>(null)
  const {
    contextMenu,
    showContextMenu,
    handleHeaderContextMenu,
    handleContextMenuClose,
  } = useDataTableContextMenu(tableInstance)

  // Helpers
  // To add invisible columns
  const getAllHeadersInAGroup = useCallback(
    (curr: HeaderGroup[], headerGroupid: any) => {
      return allColumns
        .filter(
          col =>
            col.id === "selector" ||
            !headerGroupid ||
            (col.parent ? col.parent.id === headerGroupid : false)
        )
        .map(col => {
          let newCol = curr.find(c => c.id === col.id)
          return newCol || col
        })
    },
    [allColumns]
  )

  useEffect(() => {
    if (onRowSelection) onRowSelection(selectedFlatRows)
  }, [selectedFlatRows])

  // Special css classes
  // TODO: need an alternative to handle custom css classes for Table and other elements
  const classesArray = className ? className.split(" ") : []

  return (
    <>
      <DataTableStyled ref={containerRef}>
        <div
          className="d-flex flex-column"
          ref={ref}
          style={{ overflow: "hidden" }}
          {...rest}
        >
          {filterColumns && (
            <DataTableFilterPanel
              allColumns={allColumns}
              filters={filters}
              setFilter={setFilter}
              setAllFilters={setAllFilters}
            />
          )}
          <div style={{ overflow: "hidden" }} className="d-flex">
            <div className={classNames("scrollable", "container")}>
              <Table
                bordered
                hover
                {...getTableProps()}
                className={classNames(
                  classesArray.includes("table-sticky-first-column") &&
                    "table-sticky-first-column"
                )}
              >
                <thead className="bg-gray-light sticky-top">
                  {headerGroups.map(headerGroup => (
                    <tr
                      {...headerGroup.getHeaderGroupProps()}
                      className="bg-gray-light"
                    >
                      {getAllHeadersInAGroup(
                        headerGroup.headers,
                        headerGroup.id
                      ).map(column => (
                        <DataTableHeaderCell
                          header={column}
                          onHeaderContextMenu={(event, header) =>
                            handleHeaderContextMenu(event, header, containerRef)
                          }
                          onToggleHideColumn={toggleHideColumn}
                          className={classNames(
                            checkBoxRowSelection &&
                              column.id === "selector" &&
                              "icon-only",
                            "bg-gray-light"
                          )}
                        >
                          {column.render("Header")}
                        </DataTableHeaderCell>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {(disablePagination ? rows : page).map((row, i) => {
                    prepareRow(row)
                    return (
                      <tr
                        {...row.getRowProps()}
                        className={row.isSelected && "selected"}
                      >
                        {row.cells.map((cell, index) => {
                          return (
                            <td
                              {...cell.getCellProps(getCellStyles)}
                              className={
                                checkBoxRowSelection &&
                                index === 0 &&
                                "icon-only"
                              }
                            >
                              {cell.render("Cell")}
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </div>
          </div>

          {!disablePagination && (
            <TablePagination
              totalPages={pageOptions.length}
              pageIndex={pageIndex}
              pageSize={pageSize}
              onPageChange={gotoPage}
              pageSizeOptions={pageSizeOptions || [10, 20, 30, 40, 50]}
              onPageSizeChange={setPageSize}
              className="border border-tertiary"
            ></TablePagination>
          )}
        </div>
      </DataTableStyled>

      {showContextMenu && (
        <ContextMenu
          menu={contextMenu.items}
          anchorPointX={contextMenu.positionX}
          anchorPointY={contextMenu.positionY}
          onClose={handleContextMenuClose}
        />
      )}
    </>
  )
}

DataTable.propTypes = propTypes

export default DataTable
