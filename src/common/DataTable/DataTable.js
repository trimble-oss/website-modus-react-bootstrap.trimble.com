import * as React from "react"
import PropTypes from "prop-types"
import { useTable, useSortBy, usePagination } from "react-table"
import { Badge, Table as BTable } from "@trimbleinc/modus-react-bootstrap"
import classNames from "classnames"
import styled from "styled-components"
import "./Table.css"

const propTypes = {
  /**
   * Set of columns of type [[TableColumn]].
   */
  columns: PropTypes.array.isRequired,

  /**
   * Set of rows matching the columns schema.
   */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,

  /**
   * Sets the sticky-top class on thead.
   */
  fixedHeader: PropTypes.bool,
}

const DataTable = React.forwardRef(
  ({ columns, data, fixedHeader, ...props }, ref) => {
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

    const { getTableProps, headerGroups, rows, prepareRow } = useTable(
      {
        columns: normalizedColumns,
        data,
      },
      useSortBy
    )

    const TableContainer = styled("div")`
      overflow: auto;
      padding: 0;
    `
    return (
      <TableContainer className="modus-data-table container" {...props}>
        {props.children({ getTableProps, headerGroups, rows, prepareRow })}
      </TableContainer>
    )
  }
)

DataTable.propTypes = propTypes

export default DataTable
