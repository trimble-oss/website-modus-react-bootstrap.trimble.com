import * as React from "react"
import PropTypes from "prop-types"
import {
  Column,
  useTable,
  useSortBy,
  usePagination,
  useResizeColumns,
  useFlexLayout,
  TableOptions,
  UseSortByColumnOptions,
  UseResizeColumnsColumnOptions,
  TableState,
  Hooks,
  HeaderProps,
  CellProps,
  useRowSelect,
} from "react-table"
import { TableContext } from "./TableContext"
import { StyledDataTable } from "./styleHelpers"
import { FormCheck, FormCheckProps } from "@trimbleinc/modus-react-bootstrap"

export type TableColumn = Column<any> &
  UseResizeColumnsColumnOptions<any> &
  UseSortByColumnOptions<any> & {
    sortBy?: boolean
  }

export interface DataTableProps
  extends Omit<React.HTMLProps<HTMLDivElement>, "data">,
    Omit<TableOptions<any>, "columns"> {
  columns: ReadonlyArray<TableColumn>
  hasSorting?: boolean
  hasPagination?: boolean
  resizeColumns?: boolean
  checkBoxRowSelection?: boolean
  disableRowSelection?: boolean
  multipleRowSelection?: boolean
  onRowSelect?: (...args: any[]) => void
  children?: (...props: any) => React.ReactNode
}

const propTypes = {
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

  /**
   * Callback fired when a row is selected.
   */
  onRowSelect: PropTypes.func,
}

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return <input type="checkbox" ref={resolvedRef} {...rest} />
  }
)
const checkBoxColumnConfig = {
  id: "selector",
  disableResizing: true,
  disableGroupBy: true,
  minWidth: 45,
  width: 45,
  maxWidth: 45,
  Cell: ({ row }: CellProps<any>) => (
    <div>
      <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
    </div>
  ),
}
const selectionHookWithHeader = (hooks: Hooks<any>) => {
  hooks.visibleColumns.push(columns => [
    {
      ...checkBoxColumnConfig,
      ...{
        Header: ({ getToggleAllRowsSelectedProps }: HeaderProps<any>) => (
          <div>
            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
          </div>
        ),
      },
    },
    ...columns,
  ])
}
const selectionHookWithoutHeader = (hooks: Hooks<any>) => {
  hooks.visibleColumns.push(columns => [
    {
      ...checkBoxColumnConfig,
    },
    ...columns,
  ])
}

export function DataTable(
  props: React.PropsWithChildren<DataTableProps> & {
    ref?: React.Ref<HTMLDivElement>
  }
): React.ReactElement {
  const {
    columns,
    data,
    hasSorting,
    hasPagination,
    resizeColumns,
    children,
    checkBoxRowSelection,
    multipleRowSelection,
    disableRowSelection,
    onRowSelect,
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
    hooks.push(
      multipleRowSelection
        ? selectionHookWithHeader
        : selectionHookWithoutHeader
    )
  }

  // If Multi Row selection isn't enabled
  const rowStateReducer = !multipleRowSelection && {
    stateReducer: (newState, action, previousState) => {
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
    page,
    pageOptions,
    gotoPage,
    setPageSize,
    selectedFlatRows,
    state: { pageIndex, pageSize, selectedRowIds },
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

  // TODO:
  // Params passed in the children are constructed dynamically decided by the hooks passed to useTable
  // Find a way to create type definition
  return (
    <TableContext.Provider
      value={{
        getTableProps,
        headerGroups,
      }}
    >
      <StyledDataTable resizecolumns={(resizeColumns && "true") || "false"}>
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
      </StyledDataTable>
    </TableContext.Provider>
  )
}

DataTable.propTypes = propTypes

export default DataTable
