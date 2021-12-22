// import classNames from "classnames"
// import * as React from "react"
// import PropTypes from "prop-types"
// import { useTable, useSortBy, usePagination, Column } from "react-table"
// import Table, { TableProps } from "../../api-docs/react-bootstrap-1.6.4/Table"

// export interface AdvancedTableProps extends TableProps {
//   columns: Array<Column>
//   data: Array<object>
// }

// const propTypes = {
//   /**
//    * @default 'table'
//    */
//   bsPrefix: PropTypes.string,

//   /**
//    * Set of columns of type [[TableColumn]].
//    */
//   columns: PropTypes.array.isRequired,

//   /**
//    * Set of rows matching the columns schema.
//    */
//   data: PropTypes.arrayOf(PropTypes.object).isRequired,

//   /**
//    * Adds zebra-striping to any table row within the `<tbody>`.
//    */
//   striped: PropTypes.bool,

//   /**
//    * Adds borders on all sides of the table and cells.
//    */
//   bordered: PropTypes.bool,

//   /**
//    * Removes all borders on the table and cells, including table header.
//    */
//   borderless: PropTypes.bool,

//   /**
//    * Enable a hover state on table rows within a `<tbody>`.
//    */
//   hover: PropTypes.bool,

//   /**
//    * Make tables more compact by cutting cell padding in half by setting
//    * size as `sm`.
//    */
//   size: PropTypes.string,

//   /**
//    * Invert the colors of the table — with light text on dark backgrounds
//    * by setting variant as `dark`.
//    */
//   variant: PropTypes.string,

//   /**
//    * Responsive tables allow tables to be scrolled horizontally with ease.
//    * Across every breakpoint, use `responsive` for horizontally
//    * scrolling tables. Responsive tables are wrapped automatically in a `div`.
//    * Use `responsive="sm"`, `responsive="md"`, `responsive="lg"`, or
//    * `responsive="xl"` as needed to create responsive tables up to
//    * a particular breakpoint. From that breakpoint and up, the table will
//    * behave normally and not scroll horizontally.
//    */
//   responsive: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
// }

// const AdvancedTable = React.forwardRef<
//   HTMLTableElement,
//   AdvancedTableProps
// >(
//   (
//     {
//       columns,
//       data,
//       ...props
//     }: AdvancedTableProps,
//     ref
//   ) => {
//     const { getTableProps, headerGroups, rows, prepareRow } = useTable(
//     {
//       columns,
//       data,
//     },
//     useSortBy
//   )

//    return (
//      // apply the table props
//      <Table striped bordered hover size="sm" {...getTableProps()}>
//        <thead>
//          {
//            // Loop over the header rows & Apply the header row props
//            headerGroups.map(headerGroup => (
//              <tr {...headerGroup.getHeaderGroupProps()}>
//                {
//                  // Loop over the headers in each row & Apply the header cell props
//                  headerGroup.headers.map(column => (
//                    // Add the sorting props to control sorting
//                    <th
//                      {...column.getHeaderProps(column.getSortByToggleProps())}
//                    >
//                      {
//                        // Render the header
//                        column.render("Header")
//                      }
//                      {/* Add a sort direction indicator */}
//                      <span>
//                        {column.isSorted
//                          ? column.isSortedDesc
//                            ? " 🔽"
//                            : " 🔼"
//                          : ""}
//                      </span>
//                    </th>
//                  ))
//                }
//              </tr>
//            ))
//          }
//        </thead>
//        <tbody>
//          {rows.map((row, i) => {
//            prepareRow(row)
//            return (
//              <tr {...row.getRowProps()}>
//                {row.cells.map(cell => {
//                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
//                })}
//              </tr>
//            )
//          })}
//        </tbody>
//      </Table>
//    )
//   }
// )

// AdvancedTable.propTypes = propTypes

// export default AdvancedTable
