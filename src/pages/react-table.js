import * as React from "react"
import { useTable, useSortBy, usePagination } from "react-table"
import {
  Col,
  Container,
  Row,
  Table as BootstrapTable,
} from "@trimbleinc/modus-react-bootstrap"
import DefaultLayout from "../layouts/DefaultLayout"
import LinkedHeading from "../common/LinkedHeading"
import TableOfContents from "../common/TableOfContents"
import { ModusIconsReferences } from "../common/ExternalReferences"
import CodeBlock from "../common/CodeBlock"
import {
  TableHead,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Table,
  TableContainer,
} from "../common/Table"
import { MakeData as makeData } from "../examples/components/Table"

const ReactTableContainer = props => {
  const columns = React.useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName",
        sortBy: true,
      },
      {
        Header: "Last Name",
        accessor: "lastName",
        sortBy: true,
      },
      {
        Header: "Age",
        accessor: "age",
        sortBy: true,
      },
      {
        Header: "Visits",
        accessor: "visits",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Profile Progress",
        accessor: "progress",
      },
    ],
    []
  )

  const data = React.useMemo(() => makeData(100), [])

  return (
    <>
      <CodeBlock
        scope={{
          TableContainer,
          columns,
          data,
          TableHead,
          TableBody,
          TableCell,
          TableHeader,
          TableRow,
          Table,
        }}
        code={`
    <TableContainer
        columns={columns}
        data={data}
        style={{ width: "100%", height: "400px" }}>
        {({ getTableProps, headerGroups, rows, prepareRow }) => (

          <Table bordered hover {...getTableProps()}>
            <TableHead className="bg-gray-light sticky-top">
              {headerGroups.map(headerGroup => (

                <TableRow
                  {...headerGroup.getHeaderGroupProps()}
                  className="bg-gray-light">
                  {headerGroup.headers.map(header => (

                    <TableHeader
                      isSortable={header.canSort}
                      isSorted={header.isSorted}
                      sortDirection={header.isSortedDesc ? "desc" : "asc"}
                      className="bg-gray-light sticky-top"
                      {...header.getHeaderProps(header.getSortByToggleProps())}
                    >
                      {header.render("Header")}
                    </TableHeader>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {rows.map((row, i) => {
                prepareRow(row)
                return (

                  <TableRow {...row.getRowProps()}>
                    {row.cells.map(cell => {

                      return (
                        <TableCell {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )}
      </TableContainer>`}
      ></CodeBlock>
    </>
  )
}

const ReactTablePage = props => {
  return (
    <DefaultLayout location={props.location}>
      <ModusIconsReferences />
      <main id="main">
        <Container fluid className="pt-5">
          <Container>
            <Row>
              <Col className="col-12 col-md-3 col-lg-2 menu-left"></Col>
              <Col xs={12} md={9} xl={8} id="rb-docs-content" className="main">
                <LinkedHeading id="basicReactTable" h="2" className="h1">
                  React Table with sorting
                </LinkedHeading>
                {/* <CustomReactTable /> */}
                <ReactTableContainer />
              </Col>
              <Col className="d-none d-xl-block menu-right" xl={2}>
                <TableOfContents></TableOfContents>
              </Col>
            </Row>
          </Container>
        </Container>
      </main>
    </DefaultLayout>
  )
}

export default ReactTablePage
