import {
  Column,
  UseResizeColumnsColumnOptions,
  UseSortByColumnOptions,
} from "react-table"

export { default as Table } from "./Table"
export type { TableProps } from "./Table"

export type TableColumn = Column<any> &
  UseResizeColumnsColumnOptions<any> &
  UseSortByColumnOptions<any> & {
    sortBy?: boolean
    allowDrop?: boolean
    allowDrag?: boolean
  }

export { default as DataTable } from "./DataTable"
export type { DataTableProps } from "./DataTable"

export { default as TablePagination } from "./TablePagination"
export type { TablePaginationProps } from "./TablePagination"
