import React, { useState, useMemo, useCallback } from "react"
import styled from "styled-components"
import {
  Button,
  Chip,
  Col,
  Container,
  Form,
  Nav,
  OverlayTrigger,
  Popover,
  Row,
  DataTable,
  Table,
  TablePagination,
} from "@trimbleinc/modus-react-bootstrap"
import { ModusIconsScripts } from "../../common/ExternalDependencyHelper"
import { MakeData as makeData } from "../../examples/components/Table"
import LinkedHeading from "../../common/LinkedHeading"
import { bool, string } from "prop-types"

function Example() {
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
        sortBy: true,
      },
      {
        Header: "Status",
        accessor: "status",
        sortBy: true,
      },
      {
        Header: "Profile Progress Status",
        accessor: "progress",
        sortBy: true,
      },
    ],
    []
  )

  // makeData: a custom helper function to generate random rows
  // for the demo purpose not implemented here in the example.
  const data = React.useMemo(() => makeData(30), [])

  return (
    <DataTable
      id="dt_sorting"
      columns={columns}
      bordered
      hover
      pageSize={7}
      pageSizeOptions={[7, 10, 25, 50]}
      data={data}
    ></DataTable>
  )
}
const ReactTablePage = props => {
  return (
    <main id="main">
      <ModusIconsScripts />
      <Container fluid className="pt-5">
        <Container>
          <Row>
            <Example />
          </Row>
        </Container>
      </Container>
    </main>
  )
}

export default ReactTablePage
