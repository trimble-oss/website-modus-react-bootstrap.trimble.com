import React, { useEffect, useRef } from "react"
import PropTypes from "prop-types"
import {
  useSortBy,
  usePagination,
  useResizeColumns,
  useFlexLayout,
  TableOptions,
  TableState,
  useRowSelect,
  useFilters,
  useGlobalFilter,
  Row,
  ColumnInstance,
  Filters,
  FilterValue,
  useColumnOrder,
} from "react-table"
import classNames from "classnames"
import Table from "./Table"
import TablePagination from "./TablePagination"
import DataTableHeaderCell from "./DataTableHeaderCell"
import DataTableStyled from "./DataTableStyled"
import ContextMenu from "./ContextMenu"
import {
  checkBoxSelectionHook,
  getCellStyles,
  stateReducer,
} from "./DataTableHelpers"
import { TableColumn } from "."
import useDataTableInstance from "./useDataTableInstance"

export interface DataTableProps
  extends Omit<React.HTMLProps<HTMLDivElement>, "data" | "size">,
    Omit<TableOptions<any>, "columns"> {
  id: string
  columns: ReadonlyArray<TableColumn>
  striped?: boolean
  bordered?: boolean
  borderless?: boolean
  hover?: boolean
  size?: string
  variant?: string
  responsive?: boolean | string
  pageSize?: number
  pageSizeOptions?: number[]
  resizeColumns?: boolean
  multipleRowSelection?: boolean
  checkBoxRowSelection?: boolean
  disableRowSelection?: boolean
  disablePagination?: boolean
  disableSorting?: boolean
  disableFiltering?: boolean
  disableDragging?: boolean
  filterPanel?: (
    allColumns: ColumnInstance<any>[],
    filters: Filters<any>,
    setFilter: (
      columnId: string,
      updater: ((filterValue: FilterValue) => FilterValue) | FilterValue
    ) => void,
    setAllFilters: (
      updater: Filters<any> | ((filters: Filters<any>) => Filters<any>)
    ) => void,
    globalFilter: any,
    setGlobalFilter: (filterValue: FilterValue) => void
  ) => React.ReactElement | React.ReactNode | null
  onRowSelection?: (rows: Array<Row>) => void
}

// TODO:
// Improve API details - callback function signature, more details on columns & row objects
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
   * Disabling Filtering removes filter panel.
   */
  disableFiltering: PropTypes.bool,

  /**
   * Disables dragging function on Table headers.
   */
  disableDragging: PropTypes.bool,

  /**
   * Adds zebra-striping to any table row within the `<tbody>`.
   */
  striped: PropTypes.bool,

  /**
   * Adds borders on all sides of the table and cells.
   */
  bordered: PropTypes.bool,

  /**
   * Removes all borders on the table and cells, including table header.
   */
  borderless: PropTypes.bool,

  /**
   * Enable a hover state on table rows within a `<tbody>`.
   */
  hover: PropTypes.bool,

  /**
   * Make tables more compact by cutting cell padding in half by setting
   * size as `sm`.
   */
  size: PropTypes.string,

  /**
   * Invert the colors of the table — with light text on dark backgrounds
   * by setting variant as `dark`.
   */
  variant: PropTypes.string,

  /**
   * Responsive tables allow tables to be scrolled horizontally with ease.
   * Across every breakpoint, use `responsive` for horizontally
   * scrolling tables. Responsive tables are wrapped automatically in a `div`.
   * Use `responsive="sm"`, `responsive="md"`, `responsive="lg"`, or
   * `responsive="xl"` as needed to create responsive tables up to
   * a particular breakpoint. From that breakpoint and up, the table will
   * behave normally and not scroll horizontally.
   */
  responsive: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),

  /**
   * Callback when a row is selected. If multipleRowSelection is enabled all rows selected will be available in the callback.
   */
  onRowSelection: PropTypes.bool,

  /**
   * Custom Filter panel function.
   */
  filterPanel: PropTypes.func,
}

const checkBoxSelectorColumnId = "selector"
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
    disableDragging,
    striped,
    bordered,
    borderless,
    hover,
    size,
    variant,
    responsive,
    onRowSelection,
    ref,
    className,
    filterPanel,
    ...rest
  } = props
  const filterColumns = filterPanel && !disableFiltering ? true : false
  const enableRowSelection = !disableRowSelection && !checkBoxRowSelection
  const containerRef = useRef<HTMLDivElement>(null)

  // TODO: Need an alternative to handle Modus Bootstrap class for sticky first column
  const hasStickyFirstColumn = className
    ? className.split(" ").includes("table-sticky-first-column")
    : false

  // Conditional Table Hooks Array
  const conditionalHooks: any = [useFlexLayout]
  if (filterColumns) conditionalHooks.push(useFilters, useGlobalFilter)
  if (!disableSorting) conditionalHooks.push(useSortBy)
  if (!disablePagination) conditionalHooks.push(usePagination)
  if (resizeColumns) conditionalHooks.push(useResizeColumns)
  if (!disableRowSelection) conditionalHooks.push(useRowSelect)
  if (!disableDragging) conditionalHooks.push(useColumnOrder)
  if (
    checkBoxRowSelection &&
    !columns.find(col => col.accessor === "selector")
  ) {
    conditionalHooks.push(hooks =>
      checkBoxSelectionHook(
        hooks,
        id,
        checkBoxSelectorColumnId,
        multipleRowSelection
      )
    )
  }

  const tableOptions = {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    initialState: {
      pageIndex: 0,
      pageSize: pageSizeProp || 10,
    } as TableState,
    ...(!multipleRowSelection && stateReducer),
  }

  const {
    headerGroups,
    rows,
    allColumns,
    page,
    pageOptions,
    selectedFlatRows,
    contextMenu,
    showContextMenu,
    state: { pageIndex, pageSize, filters, globalFilter },
    prepareRow,
    getTableProps,
    getTableBodyProps,
    gotoPage,
    setPageSize,
    getAllHeadersInAGroup,
    setFilter,
    setAllFilters,
    setGlobalFilterCustom,
    toggleHideColumn,
    handleHeaderContextMenu,
    handleContextMenuClose,
    handleDragStart,
    handleDragEnter,
    handleDragOver,
    handleDrop,
    handleDragEnd,
    registerColumnRef,
  } = useDataTableInstance(columns, data, tableOptions, conditionalHooks)

  // Callback APIs
  useEffect(() => {
    if (onRowSelection) onRowSelection(selectedFlatRows.map(d => d.original))
  }, [selectedFlatRows])

  return (
    <>
      <DataTableStyled ref={containerRef}>
        <div
          className={classNames("d-flex flex-column", className)}
          ref={ref}
          style={{ overflow: "hidden" }}
          {...rest}
        >
          {filterColumns &&
            filterPanel(
              allColumns,
              filters,
              setFilter,
              setAllFilters,
              globalFilter,
              setGlobalFilterCustom
            )}
          <div style={{ overflow: "hidden" }} className="d-flex">
            <div className={classNames("scrollable", "container")}>
              <Table
                striped={striped}
                bordered={bordered}
                borderless={borderless}
                hover={hover}
                size={size}
                variant={variant}
                responsive={responsive}
                {...getTableProps()}
                className={classNames(
                  hasStickyFirstColumn && "table-sticky-first-column"
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
                          key={column.id}
                          header={column}
                          registerRef={(columnId, ref) =>
                            registerColumnRef(columnId, ref)
                          }
                          onHeaderContextMenu={(event, headerColumn) =>
                            handleHeaderContextMenu(
                              event,
                              headerColumn,
                              containerRef
                            )
                          }
                          onDragHeaderStart={handleDragStart}
                          onDragHeaderOver={handleDragOver}
                          onDropHeader={handleDrop}
                          onDragHeaderEnd={handleDragEnd}
                          onDragHeaderEnter={handleDragEnter}
                          onToggleHideColumn={toggleHideColumn}
                          allowDrag={
                            column.id !== checkBoxSelectorColumnId &&
                            column.allowDrag
                          }
                          allowDrop={
                            column.id !== checkBoxSelectorColumnId &&
                            column.allowDrop
                          }
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
                        onClick={() => {
                          enableRowSelection &&
                            row.toggleRowSelected(!row.isSelected)
                        }}
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
