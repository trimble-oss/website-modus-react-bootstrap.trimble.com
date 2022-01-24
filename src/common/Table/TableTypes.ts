import { MouseEventHandler } from "react"
import {
  Column,
  TableInstance,
  UseColumnOrderInstanceProps,
  UseColumnOrderState,
  UseExpandedHooks,
  UseExpandedInstanceProps,
  UseExpandedOptions,
  UseExpandedRowProps,
  UseExpandedState,
  UseFiltersColumnOptions,
  UseFiltersColumnProps,
  UseFiltersInstanceProps,
  UseFiltersOptions,
  UseFiltersState,
  UseGlobalFiltersInstanceProps,
  UseGlobalFiltersOptions,
  UseGlobalFiltersState,
  UseGroupByCellProps,
  UseGroupByColumnOptions,
  UseGroupByColumnProps,
  UseGroupByHooks,
  UseGroupByInstanceProps,
  UseGroupByOptions,
  UseGroupByRowProps,
  UseGroupByState,
  UsePaginationInstanceProps,
  UsePaginationOptions,
  UsePaginationState,
  UseResizeColumnsColumnOptions,
  UseResizeColumnsColumnProps,
  UseResizeColumnsOptions,
  UseResizeColumnsState,
  UseRowSelectHooks,
  UseRowSelectInstanceProps,
  UseRowSelectOptions,
  UseRowSelectRowProps,
  UseRowSelectState,
  UseSortByColumnOptions,
  UseSortByColumnProps,
  UseSortByHooks,
  UseSortByInstanceProps,
  UseSortByOptions,
  UseSortByState,
} from "react-table"

// export interface CustomTableOptions<D extends object = {}>
//   extends UseExpandedOptions<D>,
//     UseFiltersOptions<D>,
//     UseFiltersOptions<D>,
//     UseGlobalFiltersOptions<D>,
//     UseGroupByOptions<D>,
//     UsePaginationOptions<D>,
//     UseResizeColumnsOptions<D>,
//     UseRowSelectOptions<D>,
//     UseSortByOptions<D> {}

// export interface CustomHooks<D extends object = {}>
//   extends UseExpandedHooks<D>,
//     UseGroupByHooks<D>,
//     UseRowSelectHooks<D>,
//     UseSortByHooks<D> {}

export interface CustomTableInstance<D extends object = {}>
  extends TableInstance<D>,
    UsePaginationInstanceProps<D>,
    UseRowSelectInstanceProps<D>,
    UseSortByInstanceProps<D> {}

// export interface CustomTableState<D extends object = {}>
//   extends UseColumnOrderState<D>,
//     UseExpandedState<D>,
//     UseFiltersState<D>,
//     UseGlobalFiltersState<D>,
//     UseGroupByState<D>,
//     UsePaginationState<D>,
//     UseResizeColumnsState<D>,
//     UseRowSelectState<D>,
//     UseSortByState<D> {
//   rowCount: number
// }

export type TableColumn<D extends object = {}> = Column<D> &
  // UseFiltersColumnOptions<D> &
  // UseGroupByColumnOptions<D> &
  UseResizeColumnsColumnOptions<D> &
  UseSortByColumnOptions<D> & {
    sortBy?: boolean
  }

// export interface ColumnInterface<D extends object = {}>
//   extends UseFiltersColumnOptions<D>,
//     UseGroupByColumnOptions<D>,
//     UseResizeColumnsColumnOptions<D>,
//     UseSortByColumnOptions<D> {
//   align?: string
//   sortBy?: boolean
// }

export interface ColumnInstance<
  D extends object = {}
> extends UseFiltersColumnProps<D>,
    UseGroupByColumnProps<D>,
    UseResizeColumnsColumnProps<D>,
    // UseFlexLayoutColumnProps<D>,
    UseSortByColumnProps<D> {}

// export interface Cell<D extends object = {}> extends UseGroupByCellProps<D> {}

// export interface Row<D extends object = {}>
//   extends UseExpandedRowProps<D>,
//     UseGroupByRowProps<D>,
//     UseRowSelectRowProps<D> {}

// export interface TableCommonProps {
//   title?: string
//   "aria-label"?: string
// }

// export interface TableSortByToggleProps {
//   title?: string
// }

// export interface TableGroupByToggleProps {
//   title?: string
// }

// export type TableMouseEventHandler = (instance: TableInstance<T>) => MouseEventHandler
