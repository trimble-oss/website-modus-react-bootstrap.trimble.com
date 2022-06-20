import * as React from "react"
import DataTable from "@trimbleinc/modus-react-bootstrap/DataTable"
import { ModusIconsScripts } from "../../common/ExternalDependencyHelper"
import { MakeData as makeData } from "../../examples/components/Table"

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
      style={{ width: "800px" }}
      columns={columns}
      bordered
      hover
      pageSize={7}
      pageSizeOptions={[7, 10, 25, 50]}
      multipleRowSelection
      checkBoxRowSelection
      data={data}
    ></DataTable>
  )
}
const ReactTablePage = props => {
  return (
    <main id="main">
      <ModusIconsScripts />
      <Example />
    </main>
  )
}

export default ReactTablePage
