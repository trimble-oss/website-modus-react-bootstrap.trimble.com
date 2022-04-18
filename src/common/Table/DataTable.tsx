import React, { useCallback, useEffect, useMemo, useRef } from "react"
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
  useGlobalFilter,
  useAsyncDebounce,
  HeaderGroup,
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
import useDataTableContextMenu from "./useDataTableContextMenu"
import {
  checkBoxSelectionHook,
  getCellStyles,
  stateReducer,
} from "./DataTableHelpers"
import { TableColumn } from "."
import useForceUpdate from "@restart/hooks/useForceUpdate"
import { createPortal } from "react-dom"

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

const POSITION = { x: 0, y: 0 }
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
      checkBoxSelectionHook(hooks, id, multipleRowSelection)
    )
  }

  // Handle custom props such as - sortBy
  const normalizedColumns = React.useMemo(
    () =>
      columns.map(col => {
        const { sortBy, ...columnProps } = col
        columnProps.disableSortBy = !sortBy
        return columnProps
      }),
    [columns]
  )

  // Construct Table instance
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
    visibleColumns,
    setFilter,
    setAllFilters,
    setGlobalFilter,
    toggleHideColumn,
    page,
    pageOptions,
    gotoPage,
    setPageSize,
    selectedFlatRows,
    setColumnOrder,
    state: { pageIndex, pageSize, filters, globalFilter },
  } = tableInstance

  // Context Menu
  const {
    contextMenu,
    showContextMenu,
    handleHeaderContextMenu,
    handleContextMenuClose,
  } = useDataTableContextMenu(tableInstance)

  // Use useAsyncDebounce for Global filter https://react-table.tanstack.com/docs/faq#how-can-i-debounce-rapid-table-state-changes
  const setGlobalFilterCustom = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 50)

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

  // Callback APIs
  useEffect(() => {
    if (onRowSelection) onRowSelection(selectedFlatRows.map(d => d.original))
  }, [selectedFlatRows])

  // Drag and Drop
  const draggingState = useRef({
    isDragging: false,
    origin: POSITION,
    translation: POSITION,
    width: "0px",
    height: "0px",
    columnId: null,
  })
  const forceUpdate = useForceUpdate()

  const droppingState = useRef({ columnId: null, validTarget: false })
  const bodyRef = useRef(null)
  const columnsRef = useRef([])

  function clearDroppingState() {
    droppingState.current = { columnId: null, validTarget: false }
  }

  function getDroppableColumn(x: any, y: any) {
    const column = columnsRef.current.find(({ ref }) => {
      const rect = ref.getBoundingClientRect()
      if (rect) {
        const inVerticalBounds = y >= rect.top && y <= rect.bottom
        const inHorizontalBounds = x >= rect.left && x <= rect.right
        return inVerticalBounds && inHorizontalBounds
      }
      return false
    })
    return column
  }

  const handleMouseDown = (event, columnId: string) => {
    const { clientX, clientY, target } = event
    const prevState = draggingState.current

    debugger
    clearDroppingState()
    draggingState.current = {
      ...prevState,
      isDragging: true,
      origin: { x: clientX, y: clientY },
      columnId,
      width:
        (target && target.offsetParent && target.offsetParent.width) || "80px",
      height:
        (target && target.offsetParent && target.offsetParent.height) || "3rem",
    }
    forceUpdate()
  }

  const handleMouseMove = useCallback(
    ({ clientX, clientY }) => {
      const translation = {
        x: clientX,
        y: clientY,
      }
      const prevState = draggingState.current

      const dropColumn = getDroppableColumn(clientX, clientY)

      clearDroppingState()
      draggingState.current = {
        ...prevState,
        translation,
      }
      if (dropColumn) {
        droppingState.current.columnId = dropColumn.columnId
        // show columns reordering effect until the selected column is dropped
      }
      forceUpdate()
    },
    [draggingState.current.origin]
  )

  const handleMouseUp = useCallback(event => {
    const prevDragState = draggingState.current
    if (
      droppingState.current.validTarget &&
      droppingState.current.columnId &&
      draggingState.current.columnId
    ) {
      const dropNode = droppingState.current.columnId
      const dragNode = draggingState.current.columnId
      if (dropNode !== dragNode) {
        let columnIds = visibleColumns.map(d => d.id)

        //delete and insert the column at new index
        columnIds.splice(columnIds.indexOf(dragNode), 1)
        columnIds.splice(columnIds.indexOf(dropNode), 0, dragNode)

        setColumnOrder(columnIds)
      }
    }
    draggingState.current = {
      ...prevDragState,
      isDragging: false,
    }
  }, [])

  const pushColumnRef = useCallback((columnId: string, ref: any) => {
    let refs = columnsRef.current
      ? columnsRef.current.filter(col => col.columnId !== columnId)
      : []
    refs.push({ columnId, ref })

    columnsRef.current = refs
  }, [])

  useEffect(() => {
    bodyRef.current = document.body
  }, [])

  useEffect(() => {
    if (draggingState.current.isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
    } else {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)

      const prevState = draggingState.current
      draggingState.current = {
        ...prevState,
        translation: POSITION,
        columnId: null,
      }
      clearDroppingState()
      forceUpdate()
    }
  }, [draggingState.current.isDragging])

  const dragItemStyle = useMemo(
    () => ({
      width: draggingState.current.width,
      height: draggingState.current.height,
      transform: `translate(calc(${draggingState.current.translation.x}px - 10%), calc(${draggingState.current.translation.y}px - 50%))`,
      msTransform: `translateX(${draggingState.current.translation.x}px) translateX(-10%) translateY(${draggingState.current.translation.y}px) translateY(-50%)`,
      zIndex: 9999,
      left: 0,
      top: 0,
      position: "absolute",
      cursor: draggingState.current.isDragging
        ? "-webkit-grabbing"
        : "-webkit-grab",
    }),
    [draggingState.current]
  )

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
                          updateRef={(columnId, ref) =>
                            pushColumnRef(columnId, ref)
                          }
                          onHeaderContextMenu={(event, headerColumn) =>
                            handleHeaderContextMenu(
                              event,
                              headerColumn,
                              containerRef
                            )
                          }
                          onDragHeaderStart={(event, columnId) =>
                            handleMouseDown(event, columnId)
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

          {draggingState.current.isDragging &&
            bodyRef.current &&
            createPortal(
              <div className="d-flex bg-gray-light" style={dragItemStyle}>
                Header
              </div>,
              bodyRef.current
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
