import React, { useCallback, useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import {
  useTable,
  useSortBy,
  usePagination,
  useResizeColumns,
  useFlexLayout,
  TableOptions,
  TableState,
  Hooks,
  HeaderProps,
  CellProps,
  useRowSelect,
  useFilters,
  ColumnInstance,
} from "react-table"
import { TableContext } from "./TableContext"
import { StyledDataTable } from "./styleHelpers"
// import Form from './Form';
import Form from "@trimbleinc/modus-react-bootstrap/Form"
import { ContextMenuState, ContextMenuItem, TableColumn } from "./types"
import ContextMenu from "./ContextMenu"
import { OverlayTrigger, Popover } from "@trimbleinc/modus-react-bootstrap"

export interface DataTableProps
  extends Omit<React.HTMLProps<HTMLDivElement>, "data">,
    Omit<TableOptions<any>, "columns"> {
  id: string
  columns: ReadonlyArray<TableColumn>
  hasSorting?: boolean
  hasPagination?: boolean
  resizeColumns?: boolean
  checkBoxRowSelection?: boolean
  disableRowSelection?: boolean
  multipleRowSelection?: boolean
  children?: (...props: any) => React.ReactNode
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
   * Array of data to be displayed as Table Rows.
   */
  data: PropTypes.array.isRequired,

  /**
   * Enables sorting on Table rows.
   */
  hasSorting: PropTypes.bool,

  /**
   * Enables pagination on Table rows.
   */
  hasPagination: PropTypes.bool,

  /**
   * Enables Table header resizing.
   */
  resizeColumns: PropTypes.bool,

  /**
   * Enables row selection using checkbox.
   */
  checkBoxRowSelection: PropTypes.bool,

  /**
   * Disables row selection.
   */
  disableRowSelection: PropTypes.bool,

  /**
   * Enables multiple row selection.
   */
  multipleRowSelection: PropTypes.bool,
}

const IndeterminateCheckbox = React.forwardRef<
  HTMLInputElement,
  {
    id: string
    indeterminate?: any
  }
>(({ id, indeterminate, ...props }, ref) => {
  const defaultRef = React.useRef<HTMLInputElement>(null)
  const resolvedRef = ref || defaultRef

  React.useEffect(() => {
    ;(
      resolvedRef as React.MutableRefObject<HTMLInputElement>
    ).current.indeterminate = indeterminate
  }, [resolvedRef, indeterminate])

  return <Form.Check custom id={id} ref={resolvedRef} {...props} />
})

export function DataTable(
  props: React.PropsWithChildren<DataTableProps> & {
    ref?: React.Ref<HTMLDivElement>
  }
): React.ReactElement {
  const {
    id,
    columns,
    data,
    hasSorting,
    hasPagination,
    resizeColumns,
    children,
    checkBoxRowSelection,
    multipleRowSelection,
    disableRowSelection,
    ref,
    ...rest
  } = props

  // Convert the columns input array
  // useSortBy hook enables sorting for all the columns by default
  // and disableSortBy is the only control available at column configuration level
  const normalizedColumns = React.useMemo(
    () =>
      columns.map(col => {
        const { sortBy, ...columnProps } = col
        columnProps.disableSortBy = !sortBy

        return columnProps
      }),
    []
  )

  const selectionHook = (hooks: Hooks<any>) => {
    hooks.visibleColumns.push(columns => [
      {
        id: "selector",
        width: 30,
        disableResizing: true,
        disableGroupBy: true,
        Cell: ({ row }: CellProps<any>) => {
          return (
            <IndeterminateCheckbox
              {...row.getToggleRowSelectedProps()}
              id={`${id}_checkbox_"${row.id}`}
            />
          )
        },
        ...(multipleRowSelection && {
          Header: ({ getToggleAllRowsSelectedProps }: HeaderProps<any>) => {
            return (
              <IndeterminateCheckbox
                {...getToggleAllRowsSelectedProps()}
                id={`${id}_checkbox_header`}
              />
            )
          },
        }),
      },
      ...columns,
    ])
  }

  // Make conditional hooks array
  const hooks: any = [useFlexLayout, useFilters]
  if (hasSorting) hooks.push(useSortBy)
  if (hasPagination) hooks.push(usePagination)
  if (resizeColumns) hooks.push(useResizeColumns)
  if (!disableRowSelection) hooks.push(useRowSelect)
  if (
    checkBoxRowSelection &&
    !columns.find(col => col.accessor === "selector")
  ) {
    hooks.push(selectionHook)
  }

  // If Multi Row selection isn't enabled
  const rowStateReducer = !multipleRowSelection && {
    stateReducer: (newState, action) => {
      if (action.type === "toggleRowSelected") {
        newState.selectedRowIds = action.value && {
          [action.id]: true,
        }
      }

      return newState
    },
  }

  // Get Final Table instance
  const {
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
    allColumns,
    setFilter,
    setAllFilters,
    toggleHideColumn,
    toggleHideAllColumns,
    page,
    pageOptions,
    gotoPage,
    setPageSize,
    selectedFlatRows,
    state: { pageIndex, pageSize, filters },
  } = useTable(
    {
      columns: normalizedColumns,
      data,
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      initialState: { pageIndex: 0, pageSize: 10 } as TableState,
      ...rowStateReducer,
    },
    ...hooks
  )

  const [contextMenu, setContextMenu] = useState<ContextMenuState>(null)
  const [showContextMenu, setShowContextMenu] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleHeaderContextMenu = useCallback(
    (column: ColumnInstance, event) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const contextMenu: ContextMenuState = {
        positionX: event.clientX - rect.left,
        positionY: event.clientY - rect.top,
        items: [
          {
            title: "Hide",
            onClick: () => {
              toggleHideColumn(column.id, true)
              setShowContextMenu(false)
            },
          },
          {
            title: "Show Columns",
            children: allColumns.map(column => {
              return {
                title: (
                  <Form.Check
                    label={column.render("Header")}
                    custom
                    id={column.id}
                    data-indeterminate="false"
                    {...(column.isVisible && { defaultChecked: true })}
                    onChange={() =>
                      toggleHideColumn(column.id, column.isVisible)
                    }
                  ></Form.Check>
                ),
              }
            }),
          },
          {
            title: "Show All Columns",
            onClick: () => {
              toggleHideAllColumns(false)
              setShowContextMenu(false)
            },
          },
        ],
      }
      setContextMenu(contextMenu)
      setShowContextMenu(true)
    },
    [toggleHideColumn, toggleHideAllColumns]
  )

  const handleContextMenuClose = useCallback(
    e => {
      setShowContextMenu(false)
    },
    [setShowContextMenu]
  )

  return (
    <>
      <TableContext.Provider
        value={{
          getTableProps,
          headerGroups,
          onHeaderContextMenu: handleHeaderContextMenu,
          onToggleHiddenColumn: toggleHideColumn,
        }}
      >
        <StyledDataTable ref={containerRef}>
          <div {...rest} ref={ref}>
            {children &&
              children({
                allColumns,
                setFilter,
                setAllFilters,
                filters,
                headerGroups,
                rows: hasPagination ? page : rows,
                prepareRow,
                gotoPage,
                pageIndex,
                pageOptions,
                pageSize,
                setPageSize,
                selectedRows:
                  selectedFlatRows && selectedFlatRows.map(d => d.original),
              })}
          </div>
        </StyledDataTable>
      </TableContext.Provider>

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
