import React, { useState, useCallback, useEffect, useMemo } from "react"
import {
  Table,
  DataTable,
  Button,
  Dropdown,
  FormCheck,
  Form,
  TablePagination,
  Container,
  Toast,
  Popover,
  Row,
  Col,
  Chip,
  OverlayTrigger,
  Nav,
} from "@trimbleinc/modus-react-bootstrap"
import styled from "styled-components"
import {
  ModusIconsScripts,
  ModusLayoutScripts,
} from "../../common/ExternalDependencyHelper"
// for the data generator makeData function
const range = len => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const names = [
  "Mickey Mouse",
  "Bugs Bunny",
  "Homer Simpson",
  "Fred Flintstone",
  "Sponge Bob",
  "Daffy Duck",
  "Charlie Brown",
  "Scooby Doo",
  "Tom Cat",
  "Jerry Mouse",
  "Mighty Mouse",
  "Wile E Coyote",
  "Tweety Bird",
  "Pink Panther",
  "Road Runner",
  "Patrick Star",
  "Roger Rabbit",
  "Papa Smurf",
  "Buzz Lightyear",
]
const newPerson = () => {
  const rand = Math.random()
  const namesIndex = Math.floor(rand * (names.length - 1))
  const firstName = names[namesIndex].split(" ")[0]
  const lastName = names[namesIndex].split(" ")[1]
  return {
    firstName,
    lastName,
    age: Math.floor(rand * 30),
    visits: Math.floor(rand * 100),
    progress: Math.floor(rand * 100),
    status: rand > 0.66 ? "Verified" : rand > 0.33 ? "Pending" : "Rejected",
  }
}
function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth]
    return range(len).map(d => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}

// for the example section
const TableBasic = () => (
  <Table bordered>
    <thead>
      <tr>
        <th>#</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Username</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
      </tr>
      <tr>
        <td>3</td>
        <td>Larry </td>
        <td>the Bird</td>
        <td>@twitter</td>
      </tr>
    </tbody>
  </Table>
)

const TableHoverable = () => (
  <Table hover bordered>
    <thead>
      <tr>
        <th>#</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Username</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
      </tr>
      <tr>
        <td>3</td>
        <td>Larry </td>
        <td>the Bird</td>
        <td>@twitter</td>
      </tr>
    </tbody>
  </Table>
)

const TableIconsControls = () => (
  <Table bordered>
    <thead>
      <tr>
        <th scope="col" className="icon-only"></th>
        <th scope="col">First</th>
        <th scope="col">Last</th>
        <th scope="col">Handle</th>
        <th scope="col" className="icon-only"></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row" className="icon-only">
          <Button variant="icon-only" className="btn-text-dark rounded-circle">
            <i className="modus-icons">folder</i>
          </Button>
        </th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
        <td scope="row" className="icon-only">
          <Dropdown>
            <Dropdown.Toggle
              variant="text-dark"
              id="dropdown-basic1-tb1"
              bsPrefix
              className="btn-icon-only"
            >
              <i className="modus-icons">more_vertical</i>
            </Dropdown.Toggle>
            <Dropdown.Menu align="right">
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
      <tr>
        <th scope="row" className="icon-only">
          <FormCheck custom defaultChecked id="tableCheckbox1-tb1"></FormCheck>
        </th>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
        <td scope="row" className="icon-only">
          <Dropdown>
            <Dropdown.Toggle
              variant="text-dark"
              id="dropdown-basic2-tb1"
              bsPrefix
              className="btn-icon-only"
            >
              <i className="modus-icons">more_vertical</i>
            </Dropdown.Toggle>
            <Dropdown.Menu align="right">
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
      <tr>
        <th scope="row" className="icon-only">
          <Form.Check
            type="radio"
            custom
            defaultChecked
            id="tableradio1-tb1"
          ></Form.Check>
        </th>
        <td>John</td>
        <td>Snow</td>
        <td>@jsnow</td>
        <td scope="row" className="icon-only">
          <Dropdown>
            <Dropdown.Toggle
              variant="text-dark"
              id="dropdown-basic3-tb1"
              bsPrefix
              className="btn-icon-only"
            >
              <i className="modus-icons">more_vertical</i>
            </Dropdown.Toggle>
            <Dropdown.Menu align="right">
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
      <tr>
        <th scope="row" className="icon-only">
          <Form.Switch
            custom
            defaultChecked
            id="tableSwitch1-tb1"
          ></Form.Switch>
        </th>
        <td>Larry</td>
        <td>the Bird</td>
        <td>@twitter</td>
        <td scope="row" className="icon-only">
          <Dropdown>
            <Dropdown.Toggle
              variant="text-dark"
              id="dropdown-basic4-tb1"
              bsPrefix
              className="btn-icon-only"
            >
              <i className="modus-icons">more_vertical</i>
            </Dropdown.Toggle>
            <Dropdown.Menu align="right">
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    </tbody>
  </Table>
)

const TableSmall = () => (
  <Table bordered hover size="sm">
    <thead className="thead-light">
      <tr>
        <th scope="col" className="icon-only"></th>
        <th scope="col">First</th>
        <th scope="col">Last</th>
        <th scope="col">Handle</th>
        <th scope="col" className="icon-only"></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row" className="icon-only">
          <Button
            variant="icon-only"
            size="sm"
            className="btn-text-dark rounded-circle"
          >
            <i className="modus-icons">folder</i>
          </Button>
        </th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
        <td scope="row" className="icon-only">
          <Dropdown>
            <Dropdown.Toggle
              variant="text-dark"
              id="dropdown-basic1-tb2"
              bsPrefix
              className="btn-icon-only"
              size="sm"
            >
              <i className="modus-icons">more_vertical</i>
            </Dropdown.Toggle>
            <Dropdown.Menu align="right">
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
      <tr>
        <th scope="row" className="icon-only">
          <FormCheck
            custom
            defaultChecked
            id="tableCheckbox1-tb2"
            className="custom-control-sm"
            readOnly
          ></FormCheck>
        </th>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
        <td scope="row" className="icon-only">
          <Dropdown>
            <Dropdown.Toggle
              variant="text-dark"
              id="dropdown-basic2-tb2"
              bsPrefix
              className="btn-icon-only"
              size="sm"
            >
              <i className="modus-icons">more_vertical</i>
            </Dropdown.Toggle>
            <Dropdown.Menu align="right">
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
      <tr>
        <th scope="row" className="icon-only">
          <Form.Check
            type="radio"
            custom
            defaultChecked
            id="tableradio1-tb2"
            size="sm"
            className="custom-control-sm"
          ></Form.Check>
        </th>
        <td>John</td>
        <td>Snow</td>
        <td>@jsnow</td>
        <td scope="row" className="icon-only">
          <Dropdown>
            <Dropdown.Toggle
              variant="text-dark"
              id="dropdown-basic3-tb2"
              bsPrefix
              className="btn-icon-only"
              size="sm"
            >
              <i className="modus-icons">more_vertical</i>
            </Dropdown.Toggle>
            <Dropdown.Menu align="right">
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
      <tr>
        <th scope="row" className="icon-only">
          <Form.Switch
            custom
            defaultChecked
            id="tableSwitch1-tb2"
            className="custom-control-sm"
          ></Form.Switch>
        </th>
        <td>Larry</td>
        <td>the Bird</td>
        <td>@twitter</td>
        <td scope="row" className="icon-only">
          <Dropdown>
            <Dropdown.Toggle
              variant="text-dark"
              id="dropdown-basic4-tb2"
              bsPrefix
              className="btn-icon-only"
              size="sm"
            >
              <i className="modus-icons">more_vertical</i>
            </Dropdown.Toggle>
            <Dropdown.Menu align="right">
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    </tbody>
  </Table>
)

const TableStyled = styled(Table)`
  margin: 0;
  width: 100%;
  height: 100%;

  th .modus-icons.material-icons.sorted,
  th .modus-icons.material-icons.unsorted {
    vertical-align: text-bottom;
    font-size: 1rem;
    cursor: pointer;
  }
  th .modus-icons.material-icons.unsorted {
    opacity: 0.5;
  }
  th .modus-icons.material-icons.unsorted:hover {
    opacity: 1;
  }
`

function TableWithSorting() {
  const NUMBER_OF_ROWS = 50
  const columns = [
    {
      Header: "First Name",
      accessor: "firstName",
    },
    {
      Header: "Last Name",
      accessor: "lastName",
    },
    {
      Header: "Age",
      accessor: "age",
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
      Header: "Profile Progress Status",
      accessor: "progress",
    },
  ]

  const ModusSortArrows = {
    asc: {
      icon: "sort_alpha_up",
      title: "Sort Descending",
    },
    desc: {
      icon: "sort_alpha_down",
      title: "Sort Ascending",
    },
  }

  const SortIcon = ({ sort, title, className }) => (
    <i
      className={"modus-icons material-icons ".concat(className)}
      data-toggle="tooltip"
      data-placement="top"
      title={title || ModusSortArrows[sort].title}
    >
      {ModusSortArrows[sort].icon}
    </i>
  )

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1
    }
    if (b[orderBy] > a[orderBy]) {
      return 1
    }
    return 0
  }
  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy)
  }
  function sort(array, comparator) {
    const mapped = array.map((el, index) => [el, index])
    mapped.sort((a, b) => {
      const order = comparator(a[0], b[0])
      if (order !== 0) {
        return order
      }
      return a[1] - b[1]
    })
    return mapped.map(el => el[0])
  }

  function Example() {
    const [order, setOrder] = useState("asc")
    const [orderBy, setOrderBy] = useState(null)
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(10)

    // makeData: a custom helper function to generate random rows
    // for the demo purpose not implemented here in the example.
    const data = useMemo(() => makeData(NUMBER_OF_ROWS), [])

    const handlePageSizeChange = pageSize => {
      setPageSize(pageSize)
      setPage(0)
    }

    const handlePageChange = page => {
      setPage(page)
    }

    const handleSort = (event, sortBy) => {
      const isAsc = orderBy === sortBy && order === "asc"
      setOrder(isAsc ? "desc" : "asc")
      setOrderBy(sortBy)
    }

    /* Styled Component <TableStyled> :
  const TableStyled = styled(Table)
    margin: 0;
    width: 100%;
    height: 100%;

    th .modus-icons.material-icons.sorted,
    th .modus-icons.material-icons.unsorted {
      vertical-align: text-bottom;
      font-size: 1rem;
      cursor: pointer;
    }
    th .modus-icons.material-icons.unsorted {
      opacity: 0.5;
    }
    th .modus-icons.material-icons.unsorted:hover {
      opacity: 1;
    }
  */

    return (
      <Container className="w-100 p-0">
        <TableStyled bordered hover>
          <thead className="bg-gray-light sticky-top">
            <tr className="bg-gray-light">
              {columns.map((column, index) => (
                <th key={index} className="bg-gray-light pr-2" title="">
                  <div
                    className="d-flex flex-row justify-content-center"
                    style={{ width: "100%" }}
                  >
                    <div className="flex-grow-1">{column.Header}</div>
                    <div onClick={e => handleSort(e, column.accessor)}>
                      {column.accessor == orderBy ? (
                        <SortIcon className="sorted" sort={order} />
                      ) : (
                        <SortIcon
                          className="unsorted"
                          title="Sort Ascending"
                          sort="asc"
                        />
                      )}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sort(data, getComparator(order, orderBy))
              .slice(page * pageSize, page * pageSize + pageSize)
              .map((row, index) => {
                return (
                  <tr key={index}>
                    {columns.map(({ accessor }) => (
                      <td key={accessor}>{row[accessor]}</td>
                    ))}
                  </tr>
                )
              })}
          </tbody>
        </TableStyled>
        <TablePagination
          pageSize={pageSize}
          pageIndex={page}
          count={data.length}
          pageSizeOptions={[10, 20, 50]}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        ></TablePagination>
      </Container>
    )
  }

  return <Example />
}

function DataTableWithSorting() {
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

function DataTableWithScroll() {
  const columns = React.useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName",
        width: 80,
        sortBy: true,
      },
      {
        Header: "Last Name",
        accessor: "lastName",
        width: 80,
        sortBy: true,
      },
      {
        Header: "Age",
        accessor: "age",
        width: 50,
        sortBy: true,
      },
      {
        Header: "Visits",
        accessor: "visits",
        width: 50,
        sortBy: true,
      },
      {
        Header: "Status",
        accessor: "status",
        width: 70,
        sortBy: true,
      },
      {
        Header: "Profile Progress Status",
        accessor: "progress",
        width: 70,
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
      id="dt_scroll"
      columns={columns}
      bordered
      hover
      data={data}
      pageSize={7}
      pageSizeOptions={[7, 10, 25, 50]}
      style={{ maxHeight: "400px" }}
    ></DataTable>
  )
}

function DataTableWithoutPagination() {
  const columns = React.useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName",
        width: 80,
        sortBy: true,
      },
      {
        Header: "Last Name",
        accessor: "lastName",
        width: 80,
        sortBy: true,
      },
      {
        Header: "Age",
        accessor: "age",
        width: 50,
        sortBy: true,
      },
      {
        Header: "Visits",
        accessor: "visits",
        width: 50,
        sortBy: true,
      },
      {
        Header: "Status",
        accessor: "status",
        width: 70,
        sortBy: true,
      },
      {
        Header: "Profile Progress Status",
        accessor: "progress",
        width: 70,
        sortBy: true,
      },
    ],
    []
  )

  // makeData: a custom helper function to generate random rows
  // for the demo purpose not implemented here in the example.
  const data = React.useMemo(() => makeData(10), [])

  return (
    <DataTable
      id="dt_wo_pagination"
      columns={columns}
      bordered
      hover
      data={data}
      disablePagination
    ></DataTable>
  )
}

function DataTableWithColumnResize() {
  const columns = React.useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName",
        minWidth: 80,
      },
      {
        Header: "Last Name",
        accessor: "lastName",
        sortBy: true,
        minWidth: 80,
      },
      {
        Header: "Age",
        accessor: "age",
        width: 60,
        minWidth: 60,
        sortBy: true,
        disableResizing: true,
      },
      {
        Header: "Visits",
        accessor: "visits",
        width: 60,
        minWidth: 60,
        disableResizing: true,
      },
      {
        Header: "Status",
        accessor: "status",
        sortBy: true,
        minWidth: 70,
      },
      {
        Header: "Profile Progress Status",
        accessor: "progress",
        width: 70,
      },
    ],
    []
  )

  // makeData: a custom helper function to generate random rows
  // for the demo purpose not implemented here in the example.
  const data = React.useMemo(() => makeData(30), [])

  return (
    <DataTable
      id="dt_resize_columns"
      columns={columns}
      bordered
      hover
      data={data}
      pageSize={7}
      pageSizeOptions={[7, 10, 25, 50]}
      resizeColumns
    ></DataTable>
  )
}

function DataTableWithSingleRowSelection() {
  const columns = React.useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName",
        width: 80,
        sortBy: true,
      },
      {
        Header: "Last Name",
        accessor: "lastName",
        width: 80,
        sortBy: true,
      },
      {
        Header: "Age",
        accessor: "age",
        width: 50,
        sortBy: true,
      },
      {
        Header: "Visits",
        accessor: "visits",
        width: 50,
        sortBy: true,
      },
      {
        Header: "Status",
        accessor: "status",
        width: 70,
        sortBy: true,
      },
      {
        Header: "Profile Progress Status",
        accessor: "progress",
        width: 70,
        sortBy: true,
      },
    ],
    []
  )

  // makeData: a custom helper function to generate random rows
  // for the demo purpose not implemented here in the example.
  const data = React.useMemo(() => makeData(30), [])

  const [selectedRows, setRowsSelected] = useState([])
  const handleOnRowSelection = React.useCallback(
    rows => {
      setRowsSelected(rows)
    },
    [setRowsSelected]
  )

  return (
    <div>
      <DataTable
        id="dt_row_selection"
        columns={columns}
        bordered
        hover
        data={data}
        pageSize={7}
        pageSizeOptions={[7, 10, 25, 50]}
        onRowSelectionChange={handleOnRowSelection}
      ></DataTable>
      {selectedRows &&
        selectedRows.map(row => {
          return (
            <Toast className="toast-primary" key={row.firstName}>
              Successfully selected {row.firstName}, Age - {row.age}, Visits -{" "}
              {row.visits}, Status - {row.status} !!
            </Toast>
          )
        })}
    </div>
  )
}

function DataTableWithMultiRowSelection() {
  const columns = React.useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName",
        width: 80,
        sortBy: true,
      },
      {
        Header: "Last Name",
        accessor: "lastName",
        width: 80,
        sortBy: true,
      },
      {
        Header: "Age",
        accessor: "age",
        width: 50,
        sortBy: true,
      },
      {
        Header: "Visits",
        accessor: "visits",
        width: 50,
        sortBy: true,
      },
      {
        Header: "Status",
        accessor: "status",
        width: 70,
        sortBy: true,
      },
      {
        Header: "Profile Progress Status",
        accessor: "progress",
        width: 70,
        sortBy: true,
      },
    ],
    []
  )

  // makeData: a custom helper function to generate random rows
  // for the demo purpose not implemented here in the example.
  const data = React.useMemo(() => makeData(30), [])

  const [selectedRows, setRowsSelected] = React.useState([])
  const handleOnRowSelection = React.useCallback(
    rows => {
      setRowsSelected(rows)
    },
    [setRowsSelected]
  )

  return (
    <div>
      <DataTable
        id="dt_multi_row_selection"
        columns={columns}
        bordered
        hover
        data={data}
        pageSize={7}
        pageSizeOptions={[7, 10, 25, 50]}
        multipleRowSelection
        onRowSelectionChange={handleOnRowSelection}
      ></DataTable>
      {selectedRows &&
        selectedRows.map(row => {
          return (
            <Toast className="toast-primary" key={row.firstName}>
              Successfully selected {row.firstName}, Age - {row.age}, Visits -{" "}
              {row.visits}, Status - {row.status} !!
            </Toast>
          )
        })}
    </div>
  )
}

function DataTableWithCheckBoxSelection() {
  const columns = React.useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName",
        width: 80,
      },
      {
        Header: "Last Name",
        accessor: "lastName",
        width: 80,
      },
      {
        Header: "Age",
        accessor: "age",
        width: 50,
      },
      {
        Header: "Visits",
        accessor: "visits",
        width: 50,
      },
      {
        Header: "Status",
        accessor: "status",
        width: 70,
      },
      {
        Header: "Profile Progress Status",
        accessor: "progress",
        width: 70,
      },
    ],
    []
  )

  // makeData: a custom helper function to generate random rows
  // for the demo purpose not implemented here in the example.
  const data = React.useMemo(() => makeData(20), [])
  const [selectedRows, setRowsSelected] = React.useState([])
  const handleOnRowSelection = React.useCallback(
    rows => {
      setRowsSelected(rows)
    },
    [setRowsSelected]
  )

  return (
    <div>
      <DataTable
        id="dt_cb_selection"
        columns={columns}
        bordered
        hover
        pageSize={7}
        pageSizeOptions={[7, 10, 25, 50]}
        multipleRowSelection
        checkBoxRowSelection
        data={data}
        onRowSelectionChange={handleOnRowSelection}
      ></DataTable>
      {selectedRows &&
        selectedRows.map(row => {
          return (
            <Toast className="toast-primary" key={row.firstName}>
              Successfully selected {row.firstName}, Age - {row.age}, Visits -{" "}
              {row.visits}, Status - {row.status} !!
            </Toast>
          )
        })}
    </div>
  )
}

function DataTableWithCustomCheckBoxSelection() {
  const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, id, ...props }, ref) => {
      const defaultRef = React.useRef()
      const resolvedRef = ref || defaultRef

      React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate
      }, [resolvedRef, indeterminate])

      return <Form.Check custom id={id} ref={resolvedRef} {...props} />
    }
  )

  const columns = React.useMemo(
    () => [
      {
        accessor: "selector",
        width: 25,
        Header: ({ getToggleAllRowsSelectedProps }) => (
          <IndeterminateCheckbox
            id="tableCbMultiRowSel_checkbox_header"
            {...getToggleAllRowsSelectedProps()}
          />
        ),
        Cell: ({ row }) => (
          <IndeterminateCheckbox
            id={"tableCbMultiRowSel_checkbox_".concat(row.id)}
            {...row.getToggleRowSelectedProps()}
          />
        ),
      },
      {
        Header: "First Name",
        accessor: "firstName",
        width: 80,
      },
      {
        Header: "Last Name",
        accessor: "lastName",
        width: 80,
      },
      {
        Header: "Age",
        accessor: "age",
        width: 50,
      },
      {
        Header: "Visits",
        accessor: "visits",
        width: 50,
      },
      {
        Header: "Status",
        accessor: "status",
        width: 70,
      },
      {
        Header: "Profile Progress Status",
        accessor: "progress",
        width: 70,
      },
    ],
    []
  )

  // makeData: a custom helper function to generate random rows
  // for the demo purpose not implemented here in the example.
  const data = React.useMemo(() => makeData(20), [])

  const [selectedRows, setRowsSelected] = React.useState([])
  const handleOnRowSelection = React.useCallback(
    rows => {
      setRowsSelected(rows)
    },
    [setRowsSelected]
  )

  return (
    <div>
      <DataTable
        id="dt_custom_cb_selection"
        columns={columns}
        bordered
        hover
        data={data}
        pageSize={7}
        pageSizeOptions={[7, 10, 25, 50]}
        multipleRowSelection
        checkBoxRowSelection
        onRowSelectionChange={handleOnRowSelection}
      ></DataTable>
      {selectedRows &&
        selectedRows.map(row => {
          return (
            <Toast className="toast-primary" key={row.firstName}>
              Successfully selected {row.firstName}, Age - {row.age}, Visits -{" "}
              {row.visits}, Status - {row.status} !!
            </Toast>
          )
        })}
    </div>
  )
}

function DataTableWithStickyFirstColumn() {
  const columns = React.useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
      },
      {
        Header: "Age",
        accessor: "age",
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
        Header: "Profile Progress Status",
        accessor: "progress",
      },
    ],
    []
  )

  // makeData: a custom helper function to generate random rows
  // for the demo purpose not implemented here in the example.
  const data = React.useMemo(() => makeData(7), [])

  return (
    <DataTable
      id="dt_sticky_column"
      columns={columns}
      bordered
      hover
      data={data}
      className="table-sticky-first-column"
    ></DataTable>
  )
}

function TextFilter({
  column: { filterValue, preFilteredRows, setFilter, id, render },
}) {
  const count = preFilteredRows.length
  return (
    <Form.Group controlId="textFilter">
      <Form.Label>{render("Header")}</Form.Label>
      <div className="input-with-icon-left">
        <Form.Control
          as="input"
          placeholder={render("Header")}
          value={filterValue || ""}
          onChange={e => {
            setFilter(e.target.value || undefined)
          }}
        ></Form.Control>
        <div className="input-icon">
          <i className="modus-icons material-icons">search</i>
        </div>
      </div>
    </Form.Group>
  )
}

function SliderFilter({
  column: { filterValue, preFilteredRows, setFilter, id, render },
}) {
  return (
    <Form.Group controlId="sliderFilter" custom>
      <Form.Label>{render("Header")}</Form.Label>
      <Form.Control
        type="range"
        min={0}
        max={100}
        value={filterValue || 0}
        onChange={e => {
          setFilter(parseInt(e.target.value, 10))
        }}
        custom
      />
    </Form.Group>
  )
}

function SelectFilter({
  column: { filterValue, preFilteredRows, setFilter, id, render },
}) {
  return (
    <Form.Group controlId="selectFilter">
      <Form.Label>{render("Header")}</Form.Label>
      <Form.Control
        as="select"
        custom
        value={filterValue || ""}
        onChange={e => {
          setFilter(e.target.value || undefined)
        }}
      >
        <option value="">All</option>
        <option>Pending</option>
        <option>Verified</option>
        <option>Rejected</option>
      </Form.Control>
    </Form.Group>
  )
}

function FilterPanel(
  columns,
  activeFilters,
  resetFilter,
  resetAllFilters,
  globalFilter,
  setGlobalFilter
) {
  const popover = (
    <Popover id="popover-basic" style={{ width: "500px", maxWidth: "500px" }}>
      <Popover.Content>
        <Container style={{ width: "100%" }} className="p-1">
          <Row xs={1} md={2}>
            {columns.map(column => (
              <div key={column.id}>
                <Col>{column.render("Filter")}</Col>
              </div>
            ))}
          </Row>
          <Row className="d-flex justify-content-end mr-2">
            <Button onClick={e => resetAllFilters()}>RESET</Button>
          </Row>
        </Container>
      </Popover.Content>
    </Popover>
  )

  const DismissibleChip = ({ label, onClose, ...props }) => {
    const [show, setShow] = useState(true)
    const handleClose = useCallback(() => {
      setShow(!show)
      onClose()
    }, [setShow])
    return (
      <Chip
        label={label}
        onClose={handleClose}
        show={show}
        variant="outline"
        type="input"
        className="m-1"
      ></Chip>
    )
  }

  return (
    <div className="d-flex align-items-center">
      <div className="flex-grow-1">
        {activeFilters && activeFilters.length > 0 && (
          <div>
            Active Filters:
            {columns.map(column => {
              const filter = activeFilters.find(f => f.id === column.id)
              const value = filter && filter.value
              return (
                value && (
                  <DismissibleChip
                    key={column.id}
                    label={column
                      .render("Header")
                      .toString()
                      .concat(": ", filter.value)}
                    onClose={e => resetFilter(column.id)}
                  />
                )
              )
            })}
          </div>
        )}
      </div>
      <div style={{ minWidth: "170px", lineHeight: 2 }}>
        <OverlayTrigger
          trigger="click"
          placement="bottom"
          overlay={popover}
          rootClose
        >
          <Nav.Link eventKey="1" className="p-0">
            <i
              className="modus-icons material-icons left-icon p-1"
              style={{ top: "5px", fontSize: "20px" }}
            >
              filter
            </i>
            FILTER COLUMNS
          </Nav.Link>
        </OverlayTrigger>
      </div>
    </div>
  )
}
function DataTableWithColumnFilter() {
  const columns = React.useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName",
        sortBy: true,
        Filter: TextFilter,
        width: 80,
      },
      {
        Header: "Last Name",
        accessor: "lastName",
        sortBy: true,
        Filter: TextFilter,
        width: 80,
      },
      {
        Header: "Age",
        accessor: "age",
        Filter: SliderFilter,
        width: 50,
        sortBy: true,
      },
      {
        Header: "Visits",
        accessor: "visits",
        width: 50,
        sortBy: true,
      },
      {
        Header: "Status",
        accessor: "status",
        Filter: SelectFilter,
        width: 70,
        sortBy: true,
      },
      {
        Header: "Profile Progress Status",
        accessor: "progress",
        width: 70,
        sortBy: true,
      },
    ],
    []
  )

  // makeData: a custom helper function to generate random rows
  // for the demo purpose not implemented here in the example.
  const data = React.useMemo(() => makeData(7), [])

  return (
    <DataTable
      id="dt_filter"
      columns={columns}
      bordered
      hover
      data={data}
      filterPanel={FilterPanel}
    ></DataTable>
  )
}

export const Editable = styled.div`
  td:nth-child(-n + 3) {
    padding: 0;
  }

  td div.cell-editable {
    width: 100%;
    * {
      padding: 0.25rem 1rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .form-control:focus {
      border: 0 !important;
      height: 3rem;
    }
    &.cell-editing {
      border: 2px solid #217cbb;
    }
  }
`

function DataTableWithCellEditable() {
  const EditableCell = ({
    value: initialValue,
    row: { index },
    column: { id },
  }) => {
    const [value, setValue] = React.useState(initialValue)
    const [editMode, setEditMode] = React.useState(false)

    React.useEffect(() => {
      setValue(initialValue)
    }, [initialValue])

    const handleEdit = e => {
      e.preventDefault()
      setEditMode(true)
    }

    const handleKeyUp = e => {
      if (e.key === "Enter" || e.keyCode === 13) {
        exitEditMode()
      } else {
        setValue(e.target.value)
      }
    }

    const handleBlur = e => {
      exitEditMode()
    }

    const exitEditMode = () => {
      setEditMode(false)
      UpdateMyData(index, id, value)
    }

    return (
      <div
        onClick={handleEdit}
        className={"d-flex align-items-center cell-editable".concat(
          editMode ? " cell-editing" : ""
        )}
      >
        {editMode ? (
          <Form.Control
            as="input"
            defaultValue={value}
            size="lg"
            className="border-0"
            autoFocus
            onKeyUp={handleKeyUp}
            onBlur={handleBlur}
          />
        ) : (
          <span data-toggle="tooltip" data-placement="top" title={value}>
            {value}
          </span>
        )}
      </div>
    )
  }

  const columns = React.useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName",
        sortBy: true,
        width: 80,
        Cell: EditableCell,
      },
      {
        Header: "Last Name",
        accessor: "lastName",
        sortBy: true,
        width: 80,
        Cell: EditableCell,
      },
      {
        Header: "Age",
        accessor: "age",
        width: 50,
        sortBy: true,
        Cell: EditableCell,
      },
      {
        Header: "Visits",
        accessor: "visits",
        width: 50,
        sortBy: true,
      },
      {
        Header: "Status",
        accessor: "status",
        width: 70,
        sortBy: true,
      },
      {
        Header: "Profile Progress Status",
        accessor: "progress",
        width: 70,
        sortBy: true,
      },
    ],
    []
  )

  // makeData: a custom helper function to generate random rows
  // for the demo purpose not implemented here in the example.
  const [data, setData] = React.useState(() => makeData(7))

  function UpdateMyData(rowIndex, columnId, value) {
    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          }
        }
        return row
      })
    )
  }

  // Styled component <Editable> :
  // td:nth-child(-n + 3) {
  //   padding: 0;
  // }
  // td div.cell-editable {
  // width: 100%;
  // * {
  //   padding: 0.25rem 1rem;
  //   overflow: hidden;
  //   text-overflow: ellipsis;
  //   display: -webkit-box;
  //   -webkit-line-clamp: 2;
  //   -webkit-box-orient: vertical;
  // }
  // .form-control:focus {
  //   border: 0 !important;
  //   height: 3rem;
  // }
  // &.cell-editing {
  //   border: 2px solid #217cbb;
  // }
  // }

  return (
    <Editable>
      <DataTable
        id="dt_editable"
        columns={columns}
        bordered
        hover
        data={data}
      ></DataTable>
    </Editable>
  )
}

function GlobalFilterPanel(
  columns,
  filters,
  resetFilter,
  resetAllFilters,
  globalFilter,
  setGlobalFilter
) {
  return (
    <Form.Group controlId="globalFilter" className="w-50">
      <div className="d-flex input-with-icon-left">
        <Form.Control
          as="input"
          type="search"
          placeholder="Search"
          value={globalFilter || ""}
          size="lg"
          onChange={e => setGlobalFilter(e.target.value || undefined)}
        ></Form.Control>
        <div className="input-icon">
          <i className="material-icons">search</i>
        </div>
      </div>
    </Form.Group>
  )
}
function DataTableWithGlobalFilter() {
  const columns = React.useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName",
        sortBy: true,
        width: 80,
      },
      {
        Header: "Last Name",
        accessor: "lastName",
        sortBy: true,
        width: 80,
      },
      {
        Header: "Age",
        accessor: "age",
        width: 50,
        sortBy: true,
      },
      {
        Header: "Visits",
        accessor: "visits",
        width: 50,
        sortBy: true,
      },
      {
        Header: "Status",
        accessor: "status",
        width: 70,
        sortBy: true,
      },
      {
        Header: "Profile Progress Status",
        accessor: "progress",
        width: 70,
        sortBy: true,
      },
    ],
    []
  )

  // makeData: a custom helper function to generate random rows
  // for the demo purpose not implemented here in the example.
  const [data, setData] = React.useState(() => makeData(10000))

  return (
    <DataTable
      id="dt_global_filter"
      columns={columns}
      bordered
      hover
      data={data}
      filterPanel={GlobalFilterPanel}
    ></DataTable>
  )
}

function DataTableWithDragAndDrop() {
  const columns = React.useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName",
        width: 80,
        sortBy: true,
        allowDrag: true,
        allowDrop: true,
      },
      {
        Header: "Last Name",
        accessor: "lastName",
        width: 80,
        sortBy: true,
        allowDrag: true,
        allowDrop: true,
      },
      {
        Header: "Age",
        accessor: "age",
        width: 50,
        sortBy: true,
        allowDrag: true,
        allowDrop: true,
      },
      {
        Header: "Visits",
        accessor: "visits",
        width: 50,
        sortBy: true,
        allowDrag: true,
        allowDrop: true,
      },
      {
        Header: "Status",
        accessor: "status",
        width: 70,
        allowDrag: true,
        allowDrop: true,
      },
      {
        Header: "Profile Progress Status",
        accessor: "progress",
        width: 70,
        allowDropForColumns: ["status"],
      },
    ],
    []
  )

  // makeData: a custom helper function to generate random rows
  // for the demo purpose not implemented here in the example.
  const [data, setData] = React.useState(() => makeData(10000))

  return (
    <DataTable
      id="dt_drag_drop"
      columns={columns}
      bordered
      hover
      data={data}
      resizeColumns
      multipleRowSelection
      checkBoxRowSelection
      filterPanel={GlobalFilterPanel}
    ></DataTable>
  )
}

const Content = ({ title, content }) => (
  <div className="grid-item bg-white">
    <h3 id={`title-${title.replace(" ", "")}`}>{title}</h3>
    {content}
  </div>
)

export default function TablePage(props) {
  return (
    <div className="grid-layout">
      {!props.excludeIconScript && <ModusIconsScripts />}
      {!props.excludeLayoutScript && <ModusLayoutScripts />}

      <Content title="Basic" content={<TableBasic />} />
      <Content title="Hoverable" content={<TableHoverable />} />
      <Content title="With Icons" content={<TableIconsControls />} />
      <Content title="Small" content={<TableSmall />} />
      <Content title="Table with Sorting" content={<TableWithSorting />} />
      <Content
        title="DataTable with Sorting"
        content={<DataTableWithSorting />}
      />
      <Content
        title="DataTable with Scroll"
        content={<DataTableWithScroll />}
      />
      <Content
        title="DataTable without Pagination"
        content={<DataTableWithoutPagination />}
      />
      <Content
        title="DataTable with Column resize"
        content={<DataTableWithColumnResize />}
      />
      <Content
        title="DataTable with single row selection"
        content={<DataTableWithSingleRowSelection />}
      />
      <Content
        title="DataTable with multiple row selection"
        content={<DataTableWithMultiRowSelection />}
      />
      <Content
        title="DataTable with Checkbox row selection"
        content={<DataTableWithCheckBoxSelection />}
      />
      <Content
        title="DataTable With Custom CheckBox Selection"
        content={<DataTableWithCustomCheckBoxSelection />}
      />
      <Content
        title="DataTable With Sticky First Column"
        content={<DataTableWithStickyFirstColumn />}
      />
      <Content
        title="DataTable With Column Filter"
        content={<DataTableWithColumnFilter />}
      />
      <Content
        title="DataTable With Cell Editable"
        content={<DataTableWithCellEditable />}
      />
      <Content
        title="DataTable With Global Filter"
        content={<DataTableWithGlobalFilter />}
      />
      <Content
        title="DataTable With Drag And Drop"
        content={<DataTableWithDragAndDrop />}
      />
    </div>
  )
}
