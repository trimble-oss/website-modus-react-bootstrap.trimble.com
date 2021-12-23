import * as React from "react"
import PropTypes from "prop-types"
import { useTable, useSortBy, usePagination } from "react-table"
import { Badge, Table as BTable } from "@trimbleinc/modus-react-bootstrap"
import classNames from "classnames"
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

const SortIcon = ({ sort, title, className, ...props }) => (
  <Badge variant="text-dark" className="p-1">
    <i
      className={classNames("modus-icons material-icons", className)}
      data-toggle="tooltip"
      data-placement="top"
      title={title || SortArrows[sort].title}
    >
      <svg viewBox="0 0 24 24">{SortArrows[sort].path}</svg>
    </i>
  </Badge>
)

const Table = React.forwardRef(({ columns, data, ...props }, ref) => {
  const { getTableProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  )

  return (
    <BTable striped bordered hover {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                className="sticky-top"
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
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </BTable>
  )
})

Table.propTypes = propTypes

export default Table
