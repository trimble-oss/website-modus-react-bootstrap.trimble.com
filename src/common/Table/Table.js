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

const SortArrows = {
  asc: {
    path: (
      <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
    ),
    title: "Sort Descending",
  },
  desc: {
    path: (
      <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
    ),
    title: "Sort Ascending",
  },
}

const ModusSortArrows = {
  asc: {
    icon: "sort_alpha_down",
    title: "Sort Descending",
  },
  desc: {
    icon: "sort_alpha_up",
    title: "Sort Ascending",
  },
}

const SortIcon = ({ sort, title, className, ...props }) => (
  <Badge variant="text-dark" className="p-1">
    <i
      className={classNames("modus-icons material-icons", className)}
      data-toggle="tooltip"
      data-placement="top"
      title={title || ModusSortArrows[sort].title}
    >
      {ModusSortArrows[sort].icon}
    </i>
  </Badge>
)

const Table = React.forwardRef(
  ({ columns, data, fixedHeader, ...props }, ref) => {
    const { getTableProps, headerGroups, rows, prepareRow } = useTable(
      {
        columns,
        data,
      },
      useSortBy
    )

    const TableContainer = styled("div")`
      overflow: auto;
      padding: 0;
    `
    return (
      <TableContainer className="container" {...props}>
        <BTable
          bordered
          hover
          {...getTableProps()}
          style={{
            tableLayout: "fixed",
            // borderCollapse: "separate",
            // borderSpacing: 0,
            margin: 0,
            width: "100%",
          }}
        >
          <thead
            className={classNames("bg-gray-light", fixedHeader && "sticky-top")}
          >
            {headerGroups.map(headerGroup => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className="bg-gray-light"
              >
                {headerGroup.headers.map(column => (
                  <th
                    className={classNames(
                      "bg-gray-light",
                      fixedHeader && "sticky-top"
                    )}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    title=""
                  >
                    {column.render("Header")}
                    {column.canSort && (
                      <>
                        {column.isSorted ? (
                          <SortIcon
                            className="sorted"
                            sort={column.isSortedDesc ? "desc" : "asc"}
                          />
                        ) : (
                          <SortIcon
                            className="unsorted"
                            title="Sort Ascending"
                            sort="asc"
                          />
                        )}
                      </>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {rows.map((row, i) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </BTable>
      </TableContainer>
    )
  }
)

Table.propTypes = propTypes

export default Table
