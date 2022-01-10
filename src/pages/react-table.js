import * as React from "react"
import { useTable, useSortBy, usePagination } from "react-table"
import { useState, useCallback } from "react"
import {
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  Pagination,
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
import styled from "styled-components"
import { ModusIconsListing } from "../common/ModusIconsListing"

function range(start, total, count = 5) {
  /* generate a range : [start, start+1, ..., end-1, end] */
  const end = total <= count ? total : start + count - 1
  const len = end - start + 1
  let a = new Array(len)
  for (let i = 0; i < len; i++) a[i] = start + i
  return a
}

const TablePagination = ({
  totalPages,
  page,
  onPageChange,
  visiblePageRange = 5,
}) => {
  debugger
  const firstPage = React.useMemo(
    () => (totalPages <= visiblePageRange ? 1 : page + 1),
    []
  )
  const lastPage = React.useMemo(() => {
    return totalPages <= visiblePageRange ? totalPages : page + visiblePageRange
  }, [])

  const handlePreviousPage = useCallback(event => {
    onPageChange(page - 1)
  }, [])
  const handleNextPage = useCallback(event => {
    onPageChange(page + 1)
  }, [])

  return (
    <nav aria-label="...">
      <Pagination style={{ marginBottom: "0" }}>
        <Pagination.Item disabled={page === 0} onClick={handlePreviousPage}>
          <i className="modus-icons">chevron_left</i>
        </Pagination.Item>

        {firstPage > 1 && (
          <Pagination.Item>
            <i className="modus-icons">more_horizontal</i>
          </Pagination.Item>
        )}
        {range(firstPage, lastPage).map(item => {
          return (
            <Pagination.Item active={item === page + 1}>{item}</Pagination.Item>
          )
        })}

        {lastPage != totalPages && (
          <Pagination.Item>
            <i className="modus-icons">more_horizontal</i>
          </Pagination.Item>
        )}
        <Pagination.Item
          disabled={lastPage === totalPages}
          onClick={handleNextPage}
        >
          <i className="modus-icons">chevron_right</i>
        </Pagination.Item>
      </Pagination>
    </nav>
  )
}

const DummyTablePagination = props => {
  return (
    <nav aria-label="...">
      <Pagination style={{ marginBottom: "0" }}>
        <Pagination.Item>
          <i className="modus-icons">chevron_left</i>
        </Pagination.Item>
        <Pagination.Item>
          <i className="modus-icons">more_horizontal</i>
        </Pagination.Item>

        <Pagination.Item>{3}</Pagination.Item>
        <Pagination.Item>{4}</Pagination.Item>
        <Pagination.Item active>{5}</Pagination.Item>
        <Pagination.Item>{6}</Pagination.Item>
        <Pagination.Item>{7}</Pagination.Item>

        <Pagination.Item>
          <i className="modus-icons">more_horizontal</i>
        </Pagination.Item>
        <Pagination.Item>
          <i className="modus-icons">chevron_right</i>
        </Pagination.Item>
      </Pagination>
    </nav>
  )
}

const ReactTableContainer = props => {
  const Container = styled("div")`
    overflow: auto;
    padding: 0;
    width: 100%;
  `

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
      <TableContainer columns={columns} data={data}>
        {({
          getTableProps,
          headerGroups,
          rows,
          prepareRow,
          gotoPage,
          pageIndex,
          pageOptions,
        }) => (
          <>
            <Container
              className="modus-data-table container"
              style={{ width: "100%" }}
            >
              <Table bordered hover {...getTableProps()}>
                <TableHead className="bg-gray-light sticky-top">
                  {headerGroups.map(headerGroup => (
                    <TableRow
                      {...headerGroup.getHeaderGroupProps()}
                      className="bg-gray-light"
                    >
                      {headerGroup.headers.map(header => (
                        <TableHeader
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
            </Container>

            <div
              style={{
                padding: "2px",
                border: "1px solid #b7b9c3",
                marginBottom: "1rem",
                padding: "0.5rem",
              }}
              className="d-flex justify-content-end"
            >
              <div className="d-inline-flex align-items-center mr-2">
                <span className="mr-2">Page Size:</span>
                <div>
                  <Form.Control as="select" custom>
                    <option>10</option>
                    <option>20</option>
                    <option>50</option>
                  </Form.Control>
                </div>
              </div>
              <div>
                <TablePagination
                  totalPages={pageOptions.length}
                  page={pageIndex}
                  onPageChange={gotoPage}
                ></TablePagination>
              </div>
            </div>
          </>
        )}
      </TableContainer>

      {/* <CodeBlock
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
    `}
      ></CodeBlock> */}
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
