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
} from "react-table"
import { TableContext } from "./TableContext"
import { StyledDataTable } from "./DataTableStyles"

export type TableColumn<D extends object = {}> = Column<D> &
  UseResizeColumnsColumnOptions<D> &
  UseSortByColumnOptions<D> & {
    sortBy?: boolean
  }

export interface DataTableProps<T extends object = {}>
  extends Omit<React.HTMLProps<HTMLDivElement>, "data">,
    Omit<TableOptions<T>, "columns"> {
  columns: ReadonlyArray<TableColumn<T>>
  hasSorting?: boolean
  hasPagination?: boolean
  resizeColumns?: boolean
  hasRowSelection?: boolean
  hasCheckBoxRowSelection?: boolean
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
   * Enables row selection on Table rows.
   */
  hasRowSelection: PropTypes.bool,

  /**
   * Enables row selection on Table rows using checkbox.
   */
  hasCheckBoxRowSelection: PropTypes.bool,
}

const DataTable = React.forwardRef<HTMLDivElement, DataTableProps>(
  (
    {
      columns,
      data,
      hasSorting,
      hasPagination,
      resizeColumns,
      hasCheckBoxRowSelection,
      hasRowSelection,
      children,
      ...props
    },
    ref
  ) => {
    //useSortBy hook enables sorting for all the columns by default
    //and disableSortBy is the only control available at column configuration level
    const normalizedColumns = React.useMemo(
      () =>
        columns.map(col => {
          let { sortBy, ...columnProps } = col
          columnProps.disableSortBy = !col.sortBy

          return columnProps
        }),
      []
    )

    const hooks = []
    if (hasSorting) hooks.push(useSortBy)
    if (hasPagination) hooks.push(usePagination)
    if (resizeColumns) hooks.push(useFlexLayout, useResizeColumns)

    const {
      getTableProps,
      headerGroups,
      prepareRow,
      rows,
      page,
      pageOptions,
      pageCount,
      gotoPage,
      setPageSize,
      state: { pageIndex, pageSize },
    } = useTable(
      {
        columns: normalizedColumns,
        data: data,
        initialState: { pageIndex: 0, pageSize: 10 } as TableState,
        // defaultColumn,
      },
      ...hooks
    )

    //TODO:
    //Params passed in the children are constructed dynamically decided by the hooks passed to useTable
    //Find a way to create type definition
    return (
      <TableContext.Provider
        value={{
          getTableProps,
          headerGroups,
        }}
      >
        <StyledDataTable resizeColumns={resizeColumns} ref={ref} {...props}>
          {children({
            rows: hasPagination ? page : rows,
            prepareRow,
            gotoPage,
            pageIndex,
            pageOptions,
            pageSize,
            setPageSize,
          })}
        </StyledDataTable>
      </TableContext.Provider>
    )
  }
)

DataTable.propTypes = propTypes

export default DataTable
