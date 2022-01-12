import * as React from "react"

export const TableBasic = `
<Table>
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
`

export const TableDark = `
<Table variant="dark">
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
`

export const TableHeadOptions = `
<div>
  <Table>
    <thead className="thead-light">
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
  <Table>
    <thead className="thead-dark">
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
</div>
`

export const TableBordered = `
<div>
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
  <Table bordered variant="dark">
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
</div>
`

export const TableBorderless = `
<div>
  <Table borderless>
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
  <Table borderless variant="dark">
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
</div>
`

export const TableHoverable = `
<div>
  <Table hover>
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
  <Table hover variant="dark">
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
</div>
`

export const TableIconsControls = `
<div>
  <Table striped bordered>
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
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
      <tr>
        <th scope="row" className="icon-only">
          <FormCheck custom checked id="tableCheckbox1-tb1"></FormCheck>
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
            <Dropdown.Menu>
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
            checked
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
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
      <tr>
        <th scope="row" className="icon-only">
          <Form.Switch custom checked id="tableSwitch1-tb1"></Form.Switch>
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
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    </tbody>
  </Table>

  <Table striped bordered variant="dark">
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
          <Button
            variant="icon-only"
            className="btn-text-tertiary rounded-circle"
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
            >
              <i className="modus-icons">more_vertical</i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
      <tr>
        <th scope="row" className="icon-only">
          <FormCheck custom checked id="tableCheckbox1-tb2"></FormCheck>
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
            >
              <i className="modus-icons">more_vertical</i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
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
            checked
            id="tableradio1-tb2"
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
            >
              <i className="modus-icons">more_vertical</i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
      <tr>
        <th scope="row" className="icon-only">
          <Form.Switch custom checked id="tableSwitch1-tb2"></Form.Switch>
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
            >
              <i className="modus-icons">more_vertical</i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    </tbody>
  </Table>
</div>
`

export const TableSmall = `
<div>
  <Table striped bordered hover size="sm">
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
              id="dropdown-basic1-tb1"
              bsPrefix
              className="btn-icon-only"
              size="sm"
            >
              <i className="modus-icons">more_vertical</i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
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
            checked
            id="tableCheckbox1-tb1"
            className="custom-control-sm"
          ></FormCheck>
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
              size="sm"
            >
              <i className="modus-icons">more_vertical</i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
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
            checked
            id="tableradio1-tb1"
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
              id="dropdown-basic3-tb1"
              bsPrefix
              className="btn-icon-only"
              size="sm"
            >
              <i className="modus-icons">more_vertical</i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
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
            checked
            id="tableSwitch1-tb1"
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
              id="dropdown-basic4-tb1"
              bsPrefix
              className="btn-icon-only"
              size="sm"
            >
              <i className="modus-icons">more_vertical</i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    </tbody>
  </Table>

  <Table striped bordered hover variant="dark" size="sm">
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
            className="btn-text-tertiary rounded-circle"
            size="sm"
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
              variant="text-tertiary"
              id="dropdown-basic1-tb2"
              bsPrefix
              className="btn-icon-only"
              size="sm"
            >
              <i className="modus-icons">more_vertical</i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
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
            checked
            id="tableCheckbox1-tb2"
            className="custom-control-sm"
          ></FormCheck>
        </th>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
        <td scope="row" className="icon-only">
          <Dropdown>
            <Dropdown.Toggle
              variant="text-tertiary"
              id="dropdown-basic2-tb2"
              bsPrefix
              className="btn-icon-only"
              size="sm"
            >
              <i className="modus-icons">more_vertical</i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
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
            checked
            id="tableradio1-tb2"
            className="custom-control-sm"
          ></Form.Check>
        </th>
        <td>John</td>
        <td>Snow</td>
        <td>@jsnow</td>
        <td scope="row" className="icon-only">
          <Dropdown>
            <Dropdown.Toggle
              variant="text-tertiary"
              id="dropdown-basic3-tb2"
              bsPrefix
              className="btn-icon-only"
              size="sm"
            >
              <i className="modus-icons">more_vertical</i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
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
            checked
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
              variant="text-tertiary"
              id="dropdown-basic4-tb2"
              bsPrefix
              className="btn-icon-only"
              size="sm"
            >
              <i className="modus-icons">more_vertical</i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    </tbody>
  </Table>
</div>
`

const range = len => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newPerson = () => {
  const statusChance = Math.random()
  return {
    firstName: "React",
    lastName: "Table",
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status:
      statusChance > 0.66
        ? "relationship"
        : statusChance > 0.33
        ? "complicated"
        : "single",
  }
}

export function MakeData(...lens) {
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

export const TableWithSorting = `function Example() {
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
      },
    ],
    []
  )

  const data = [
    {
      firstName: "Mark",
      lastName: "Otto",
      age: "25",
    },
    {
      firstName: "Jacob",
      lastName: "Thornton",
      age: "22",
    },
    {
      firstName: "John",
      lastName: "Snow",
      age: "23",
    },
    {
      firstName: "Lary",
      lastName: "the Bird",
      age: "31",
    },
  ]

  return (
      <DataTable columns={columns} data={data}>
        {({ getTableProps, headerGroups, rows, prepareRow }) => (
          <Table bordered hover {...getTableProps()}>
            <TableHead className="bg-gray-light">
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
      </DataTable>
  );
}

render(<Example />);`

export const TableWithScroll = `function Example() {
  const columns = React.useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName",
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
        Header: "Profile Progress",
        accessor: "progress",
      },
    ],
    []
  )

  const data = React.useMemo(() => makeData(100), [])

  return (
      <DataTable columns={columns} data={data}>
        {({ getTableProps, headerGroups, rows, prepareRow }) => (
          <TableContainer scrollable style={{ maxHeight: "400px" }}>
            <Table bordered hover {...getTableProps()}>
              <TableHead className="bg-gray-light">
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
          </TableContainer>
        )}
      </DataTable>
  );
}

render(<Example />);`

export const TableWithFixedHeader = `function Example() {
  const columns = React.useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName",
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
        Header: "Profile Progress",
        accessor: "progress",
      },
    ],
    []
  )

  const data = React.useMemo(() => makeData(100), [])

  return (
      <DataTable columns={columns} data={data}>
        {({ getTableProps, headerGroups, rows, prepareRow }) => (
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
        )}
      </DataTable>
  );
}

render(<Example />);`

export const TableWithPagination = `function Example() {
  const columns = React.useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName",
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
        Header: "Profile Progress",
        accessor: "progress",
      },
    ],
    []
  )

  const data = React.useMemo(() => makeData(175), [])

  return (
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
  );
}

render(<Example />);`
