import * as React from "react"
import { useState, useCallback } from "react"
import {
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  NavDropdown,
  NavItem,
  NavLink,
  Pagination,
  Row,
  Spinner,
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
  TablePagination,
  DataTable,
} from "../common/Table"
import { MakeData as makeData } from "../examples/components/Table"
import styled from "styled-components"
import { ModusIconsListing } from "../common/ModusIconsListing"

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
      <DataTable columns={columns} data={data}>
        {({
          getTableProps,
          headerGroups,
          rows,
          prepareRow,
          gotoPage,
          pageIndex,
          pageSize,
          setPageSize,
          pageOptions,
        }) => (
          <>
            <TableContainer scrollable style={{ maxHeight: "400px" }}>
              <Table bordered hover {...getTableProps()}>
                <TableHead className="bg-gray-light sticky-top">
                  {headerGroups.map(headerGroup => (
                    <TableRow
                      {...headerGroup.getHeaderGroupProps()}
                      className="bg-gray-light"
                    >
                      {headerGroup.headers.map(header => (
                        <TableHeader
                          header={header}
                          isSortable={header.canSort}
                          isSorted={header.isSorted}
                          sortDirection={header.isSortedDesc ? "desc" : "asc"}
                          className="bg-gray-light"
                          {...header.getHeaderProps(
                            header.getSortByToggleProps()
                          )}
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
