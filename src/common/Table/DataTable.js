import * as React from "react"
import PropTypes from "prop-types"
import { useEffect } from "react"
import {
  useTable,
  useSortBy,
  usePagination,
  useResizeColumns,
  useBlockLayout,
  useFlexLayout,
} from "react-table"
import { Badge, Table as BTable } from "@trimbleinc/modus-react-bootstrap"
import classNames from "classnames"
import styled from "styled-components"
import "./Table.css"
import { TableContext } from "./TableContext"

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

    // const defaultColumn = React.useMemo(
    //   () => ({
    //     minWidth: 30,
    //     width: 150,
    //     maxWidth: 400,
    //   }),
    //   []
    // )

    const defaultOptions = {
      columns: normalizedColumns,
      data: data,
      initialState: { pageIndex: 0, pageSize: 10 },
      // defaultColumn,
    }

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
      },
      useSortBy,
      usePagination,
      useFlexLayout,
      useResizeColumns
    )

    const tableContext = {
      // getTableProps: tableProps.getTableProps,
      // headerGroups: tableProps.headerGroups,
      // prepareRow: tableProps.prepareRow,
      // page: tableProps.page,
      // canPreviousPage: tableProps.canPreviousPage,
      // canNextPage: tableProps.canNextPage,
      // pageOptions: tableProps.pageOptions,
      // pageCount: tableProps.pageCount,
      // gotoPage: tableProps.gotoPage,
      // nextPage: tableProps.nextPage,
      // previousPage: tableProps.previousPage,
      // setPageSize: tableProps.setPageSize,
      // pageIndex: tableProps.state.pageIndex,
      // pageSize: tableProps.state.pageSize,
    }

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
