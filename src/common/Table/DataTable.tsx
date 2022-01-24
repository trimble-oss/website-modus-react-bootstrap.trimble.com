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
import "./Table.css"
import { TableContext } from "./TableContext"

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
   * Array of header data of type [[TableColumn]].
   */
  columns: PropTypes.array.isRequired,

  /**
   * Array of data to be displayed as Table Rows.
   */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,

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

    const tableInstance = useTable(
      {
        columns: normalizedColumns,
        data: data,
        initialState: { pageIndex: 0, pageSize: 10 } as TableState,
        // defaultColumn,
      },
      ...hooks
    )

    //TODO:
    //the reason why the params are put in a prop type is the row object passed from Tbody is dynamic
    //need to figure out a way and define the type for the params passed in CHildren Node, here and in <TableBody>
    return (
      <TableContext.Provider value={tableInstance}>
        <div className="modus-data-table" ref={ref} {...props}>
          {children({
            pageOptions: tableInstance.pageOptions,
            pageCount: tableInstance.pageCount,
            gotoPage: tableInstance.gotoPage,
            setPageSize: tableInstance.setPageSize,
            pageIndex: tableInstance.state.pageIndex,
            pageSize: tableInstance.state.pageSize,
          })}
        </div>
      </TableContext.Provider>
    )
  }
)

DataTable.propTypes = propTypes

export default DataTable
