import * as React from "react"
import { useState, useCallback } from "react"
import { Col, Container, Row } from "@trimbleinc/modus-react-bootstrap"
import DefaultLayout from "../layouts/DefaultLayout"
import LinkedHeading from "../common/LinkedHeading"
import TableOfContents from "../common/TableOfContents"
import { ModusIconsScripts } from "../common/ExternalDependencyHelper"
import {
  TableHead,
  TableBody,
  TableCell,
  TableHeaderCell,
  TableRow,
  Table,
  TableContainer,
  TablePagination,
  DataTable,
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

  const data = React.useMemo(() => makeData(125), [])

  return (
    <>
      <DataTable
        id="test"
        columns={columns}
        data={data}
        hasSorting
        hasPagination
        resizeColumns
      >
        {({
          prepareRow,
          rows,
          gotoPage,
          pageIndex,
          pageSize,
          setPageSize,
          pageOptions,
        }) => (
          <>
            <TableContainer scrollable style={{ maxHeight: "400px" }}>
              <Table bordered hover className="table-sticky-first-column">
                <TableHead className="bg-gray-light sticky-top">
                  <TableRow className="bg-gray-light">
                    <TableHeaderCell
                      accessor="firstName"
                      className="bg-gray-light"
                    />
                    <TableHeaderCell
                      accessor="lastName"
                      className="bg-gray-light"
                    />
                    <TableHeaderCell accessor="age" className="bg-gray-light" />
                    <TableHeaderCell
                      accessor="visits"
                      className="bg-gray-light"
                    />
                    <TableHeaderCell
                      accessor="status"
                      className="bg-gray-light"
                    />
                    <TableHeaderCell
                      accessor="progress"
                      className="bg-gray-light"
                    />
                  </TableRow>
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
            </TableContainer>
            <TablePagination
              totalPages={pageOptions.length}
              pageIndex={pageIndex}
              pageSize={pageSize}
              onPageChange={gotoPage}
              pageSizeOptions={[10, 20, 30, 40, 50]}
              onPageSizeChange={setPageSize}
              className="border border-tertiary"
            ></TablePagination>
          </>
        )}
      </DataTable>
    </>
  )
}

const ReactTablePage = props => {
  return (
    <DefaultLayout location={props.location}>
      <ModusIconsScripts />
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
