import * as React from "react"
import { useState, useCallback } from "react"
import {
  Col,
  Container,
  Row,
  FormCheck,
  Pagination,
  Button,
  Toast,
  Form,
} from "@trimbleinc/modus-react-bootstrap"
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
import DefaultLayout from "../layouts/DefaultLayout"
import LinkedHeading from "../common/LinkedHeading"
import TableOfContents from "../common/TableOfContents"
import { ModusIconsReferences } from "../common/ExternalReferences"
import CodeBlock from "../common/CodeBlock"

import { MakeData as makeData } from "../examples/components/Table"

const ReactTableContainer = props => {
  const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef()
      const resolvedRef = ref || defaultRef

      React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate
      }, [resolvedRef, indeterminate])

      return <input type="checkbox" ref={resolvedRef} {...rest} />
    }
  )

  const columns = React.useMemo(
    () => [
      {
        accessor: "selector",
        minWidth: 45,
        width: 45,
        maxWidth: 45,
        Header: ({ getToggleAllRowsSelectedProps }) => (
          <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
        ),
        Cell: ({ row }) => (
          <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
        ),
      },
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
        disableResizing: true,
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
      <DataTable columns={columns} data={data} hasSorting checkBoxRowSelection>
        {({ prepareRow, rows, selectedRows }) => (
          <>
            <TableContainer scrollable style={{ maxHeight: "400px" }}>
              <Table bordered hover>
                <TableHead className="bg-gray-light sticky-top">
                  <TableRow className="bg-gray-light">
                    <TableHeaderCell accessor="selector" />
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
                      <TableRow
                        {...row.getRowProps()}
                        className={row.isSelected && "selected"}
                      >
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
            <br />
            {selectedRows &&
              selectedRows.map(row => {
                return (
                  <Toast className="toast-primary" key={row.firstName}>
                    Successfully selected {row.firstName}, Age - {row.age},
                    Visits - {row.visits}, Status - {row.status} !!
                  </Toast>
                )
              })}
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
