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
} from "react-table"
import { TableContext } from "./TableContext"
import { StyledDataTable } from "./styleHelpers"
// import Form from './Form';
import Form from "@trimbleinc/modus-react-bootstrap/Form"
import { ContextMenu, TableColumn } from "./types"
import ContextMenuPopUp from "./ContextMenu"

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
  id: PropTypes.array.isRequired,

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
  const hooks: any = []
  if (hasSorting) hooks.push(useSortBy)
  if (hasPagination) hooks.push(usePagination)
  if (resizeColumns) hooks.push(useFlexLayout, useResizeColumns)
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
    toggleHideColumn,
    toggleHideAllColumns,
    page,
    pageOptions,
    gotoPage,
    setPageSize,
    selectedFlatRows,
    state: { pageIndex, pageSize },
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

  const [contextMenu, setContextMenu] = useState([])
  const [contextPosX, setContextPosX] = useState(0)
  const [contextPosY, setContextPosY] = useState(0)
  const [showContextMenu, setShowContextMenu] = useState(false)
  const contextMenuRef = useRef(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleHeaderContextMenu = useCallback((columnId: string, event) => {
    const contextMenu: ContextMenu[] = [
      {
        title: "Hide",
        onClick: () => {
          toggleHideColumn(columnId, true)
        },
      },
      {
        title: "Show Columns",
        onClick: () => {
          toggleHideAllColumns(false)
        },
      },
    ]

    let x = 0,
      y = 0
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      x = event.clientX - rect.left
      y = event.clientY - rect.top
    }

    setContextMenu(contextMenu)
    setShowContextMenu(true)
    setContextPosX(x)
    setContextPosY(y)

    if (!(typeof window === "undefined" || !window.document)) {
      window.document.addEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleClickOutside = useCallback(
    e => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(e.target)
      ) {
        if (!(typeof window === "undefined" || !window.document)) {
          window.document.removeEventListener("mousedown", handleClickOutside)
        }
        setShowContextMenu(false)
      }
    },
    [setShowContextMenu]
  )

  // TODO:
  // Params passed in the children are constructed dynamically decided by the hooks passed to useTable
  // Find a way to create type definition
  return (
    <TableContext.Provider
      value={{
        getTableProps,
        headerGroups,
        onHeaderContextMenu: handleHeaderContextMenu,
      }}
    >
      <StyledDataTable
        resizecolumns={(resizeColumns && "true") || "false"}
        ref={containerRef}
      >
        <div {...rest} ref={ref}>
          {children &&
            children({
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
        {showContextMenu && (
          <ContextMenuPopUp
            ref={contextMenuRef}
            menu={contextMenu}
            anchorPointX={contextPosX}
            anchorPointY={contextPosY}
          />
        )}
      </StyledDataTable>
    </TableContext.Provider>
  )
}

DataTable.propTypes = propTypes

export default DataTable
