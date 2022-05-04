import React, { useCallback, useRef } from "react"
import { HeaderGroup, useAsyncDebounce, useTable } from "react-table"
import useDataTableContextMenu from "./useDataTableHeaderContextMenu"

const useDataTableInstance = (
  columns,
  data,
  options,
  hooks,
  dragItemTemplate
) => {
  const registeredColumns = useRef<{ id: string; ref: any }[]>([])
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
      ...options,
    },
    ...hooks
  )

  // Header Context Menu
  const {
    contextMenu,
    showContextMenu,
    handleHeaderContextMenu,
    handleContextMenuClose,
  } = useDataTableContextMenu(tableInstance)

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    allColumns,
    setFilter,
    setAllFilters,
    setGlobalFilter,
    toggleHideColumn,
    visibleColumns,
    setColumnOrder,
    page,
    pageOptions,
    gotoPage,
    setPageSize,
    selectedFlatRows,
    state: { pageIndex, pageSize, filters, globalFilter },
  } = tableInstance

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

  return {
    // tableinstance
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    allColumns,
    setFilter,
    setAllFilters,
    setColumnOrder,
    visibleColumns,
    setGlobalFilterCustom,
    toggleHideColumn,
    page,
    pageOptions,
    gotoPage,
    setPageSize,
    selectedFlatRows,
    state: { pageIndex, pageSize, filters, globalFilter },
    getAllHeadersInAGroup,

    // context menu
    contextMenu,
    showContextMenu,
    handleHeaderContextMenu,
    handleContextMenuClose,
  }
}

export default useDataTableInstance
