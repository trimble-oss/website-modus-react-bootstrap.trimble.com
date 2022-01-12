import * as React from "react"
import PropTypes from "prop-types"
import { useEffect } from "react"
import { useTable, useSortBy, usePagination } from "react-table"
import { Badge, Table as BTable } from "@trimbleinc/modus-react-bootstrap"
import classNames from "classnames"
import styled from "styled-components"
import "./Table.css"

const DataTable = React.forwardRef(
  (
    {
      columns,
      data,
      hasSorting,
      hasPagination,
      hasManualPagination,
      pageCount: controlledPageCount,
      fetchData,
      ...props
    },
    ref
  ) => {
    //useSortBy hook enables sorting for all the columns
    //and disableSortBy is the only prop available at column configuration level
    const normalizedColumns = React.useMemo(
      () =>
        columns.map(col => {
          return {
            Header: col.Header,
            accessor: col.accessor,
            disableSortBy: !col.sortBy,
          }
        }),
      []
    )

    const defaultOptions = {
      columns: normalizedColumns,
      data: data,
      initialState: { pageIndex: 0, pageSize: 10 },
    }

    const paginationOptions = hasManualPagination
      ? {
          manualPagination: true,
          pageCount: controlledPageCount,
        }
      : {}

    const {
      getTableProps,
      headerGroups,
      prepareRow,
      page,
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      state: { pageIndex, pageSize },
    } = useTable(
      {
        ...defaultOptions,
        ...paginationOptions,
      },
      useSortBy,
      usePagination
    )

    useEffect(() => {
      if (fetchData) {
        fetchData({ pageIndex, pageSize })
      }
    }, [fetchData, pageIndex, pageSize])

    return (
      <div className="modus-data-table">
        {props.children({
          getTableProps,
          headerGroups,
          rows: page,
          prepareRow,
          gotoPage,
          pageIndex,
          pageOptions,
          pageSize,
          setPageSize,
        })}
      </div>
    )
  }
)

DataTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  hasSorting: PropTypes.bool,
  hasPagination: PropTypes.bool,
  hasManualPagination: PropTypes.bool,
  pageCount: PropTypes.number,
  fetchData: PropTypes.func,
}

export default DataTable
