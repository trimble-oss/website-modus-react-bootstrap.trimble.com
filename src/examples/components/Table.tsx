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
          <FormCheck custom checked id="tableCheckbox1-tb1" readOnly></FormCheck>
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
          <FormCheck custom checked id="tableCheckbox1-tb2" readOnly></FormCheck>
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
            className="custom-control-sm" readOnly></FormCheck>
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
            className="custom-control-sm" readOnly></FormCheck>
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
      <DataTable id="tableSorting" columns={columns} data={data} hasSorting>
        {({prepareRow, rows}) => (
          <Table bordered hover>
            <TableHead className="bg-gray-light">
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
        width: 80,
      },
      {
        Header: "Last Name",
        accessor: "lastName",
        width: 80,
      },
      {
        Header: 'Age',
        accessor: 'age',
        width: 50,
      },
      {
        Header: 'Visits',
        accessor: 'visits',
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
        width: 70
      },
    ],
    []
  )

  const data = React.useMemo(() => makeData(30), [])

  return (
    <DataTable id="tableScroll" columns={columns} data={data}>
        {({prepareRow, rows}) => (
          <TableContainer scrollable style={{ maxHeight: "400px", borderBottom: "1px solid #b7b9c3" }}>
            <Table bordered hover>
              <TableHead className="bg-gray-light">
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
        width: 80,
      },
      {
        Header: "Last Name",
        accessor: "lastName",
        width: 80,
      },
      {
        Header: 'Age',
        accessor: 'age',
        width: 50,
      },
      {
        Header: 'Visits',
        accessor: 'visits',
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
        width: 70
      },
    ],
    []
  )

  const data = React.useMemo(() => makeData(30), [])

  return (
    <DataTable id="tableFixedHeader" columns={columns} data={data}>
        {({prepareRow, rows}) => (
          <TableContainer scrollable style={{ maxHeight: "400px", borderBottom: "1px solid #b7b9c3" }}>
            <Table bordered hover>
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
        Header: 'Age',
        accessor: 'age',
        width: 50,
        sortBy: true,
      },
      {
        Header: 'Visits',
        accessor: 'visits',
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

  const data = React.useMemo(() => makeData(175), [])

  return (
    <DataTable id="tablepagination" columns={columns} data={data} hasSorting hasPagination>
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
              <Table bordered hover>
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
  );
}

render(<Example />);`

export const TableWithServerPagination = `function Example() {
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

  const serverData = makeData(10000)

  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [pageCount, setPageCount] = React.useState(0)

  const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
    setLoading(true)
    setTimeout(() => {
      const startRow = pageSize * pageIndex
      const endRow = startRow + pageSize
      setData(serverData.slice(startRow, endRow))
      setPageCount(Math.ceil(serverData.length / pageSize))
      setLoading(false)
    }, 1000)
  }, [])

  return (
      <DataTable
        columns={columns}
        data={data}
        fetchData={fetchData}
        loading={loading}
        pageCount={pageCount}
        hasManualPagination={true}
      >
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
            <TableContainer scrollable style={{ height: "400px" }}>
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
                {loading ? (
                  <TableSpinner colSpan={headerGroups[0].headers.length} />
                ) : (
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
                )}
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

export const TableWithColumnResize = `function Example() {
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
        Header: 'Age',
        accessor: 'age',
        width: 60,
        minWidth:60,
        sortBy: true,
        disableResizing: true,
      },
      {
        Header: 'Visits',
        accessor: 'visits',
        width: 60,
        minWidth:60,
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
        width: 70
      },
    ],
    []
  )

  const data = React.useMemo(() => makeData(20), [])

  return (
    <DataTable id="tableResize" columns={columns} data={data} hasSorting hasPagination resizeColumns>
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
              <Table bordered hover>
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
                              <span style={{ whiteSpace: "nowrap", overflow: "hidden",textOverflow: "ellipsis"}}>{cell.render("Cell")}</span>
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

export const TableWithSingleRowSelection = `function Example() {
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
        Header: 'Age',
        accessor: 'age',
        width: 50,
      },
      {
        Header: 'Visits',
        accessor: 'visits',
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
        width: 70
      },
    ],
    []
  )

  const data = React.useMemo(() => makeData(20), [])

  return (
    <DataTable id="tableSingleRowSel" columns={columns} data={data}>
        {({prepareRow, rows, selectedRows}) => (
          <>
          <TableContainer scrollable style={{ maxHeight: "400px", borderBottom: "1px solid #b7b9c3" }}>
            <Table bordered hover>
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
                      <TableRow {...row.getRowProps()}
                        onClick={() => {
                          row.toggleRowSelected(!row.isSelected)
                        }}
                        className={row.isSelected && "selected"}>
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
  );
}

render(<Example />);`

export const TableWithMultiRowSelection = `function Example() {
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
        Header: 'Age',
        accessor: 'age',
        width: 50,
      },
      {
        Header: 'Visits',
        accessor: 'visits',
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
        width: 70
      },
    ],
    []
  )

  const data = React.useMemo(() => makeData(20), [])

  return (
    <DataTable id="tableMultiRowSel" columns={columns} data={data} hasSorting multipleRowSelection>
        {({prepareRow, rows, selectedRows}) => (
          <>
          <TableContainer scrollable style={{ maxHeight: "400px", borderBottom: "1px solid #b7b9c3" }}>
            <Table bordered hover>
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
                      <TableRow {...row.getRowProps()}
                        onClick={() => {
                          row.toggleRowSelected(!row.isSelected)
                        }}
                        className={row.isSelected && "selected"}>
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
          <br/>
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
  );
}

render(<Example />);`

export const TableWithCheckBoxSelection = `function Example() {
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
        Header: 'Age',
        accessor: 'age',
        width: 50,
      },
      {
        Header: 'Visits',
        accessor: 'visits',
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
        width: 70
      },
    ],
    []
  )

  const data = React.useMemo(() => makeData(20), [])

  return (
    <DataTable id="tableCbSingleRowSel" columns={columns} data={data} hasSorting checkBoxRowSelection>
        {({prepareRow, rows, selectedRows}) => (
          <>
          <TableContainer scrollable style={{ maxHeight: "400px", borderBottom: "1px solid #b7b9c3" }}>
            <Table bordered hover>
              <TableHead className="bg-gray-light sticky-top">
                <TableRow className="bg-gray-light">
                  <TableHeaderCell accessor="selector" className='icon-only' />
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
                      <TableRow {...row.getRowProps()}
                        className={row.isSelected && "selected"}>
                        {row.cells.map((cell, index) => {
                          return (
                            <TableCell {...cell.getCellProps()} className={index === 0 && 'icon-only'}>
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
  );
}

render(<Example />);`

export const TableWithCustomCheckBoxSelection = `function Example() {
  const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate,id, ...props }, ref) => {
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
          <IndeterminateCheckbox id="tableCbMultiRowSel_checkbox_header"
          {...getToggleAllRowsSelectedProps()} />
        ),
        Cell: ({ row }) => (
          <IndeterminateCheckbox id={"tableCbMultiRowSel_checkbox_".concat(row.id)}
          {...row.getToggleRowSelectedProps()} />
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
        Header: 'Age',
        accessor: 'age',
        width: 50,
      },
      {
        Header: 'Visits',
        accessor: 'visits',
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
        width: 70
      },
    ],
    []
  )

  const data = React.useMemo(() => makeData(20), [])

  return (
    <DataTable id="tableCbMultiRowSel" columns={columns} data={data} hasSorting checkBoxRowSelection multipleRowSelection>
        {({prepareRow, rows, selectedRows}) => (
          <>
          <TableContainer scrollable style={{ maxHeight: "400px", borderBottom: "1px solid #b7b9c3" }}>
            <Table bordered hover id="customCheckBoxTable">
              <TableHead className="bg-gray-light sticky-top">
                <TableRow className="bg-gray-light">
                  <TableHeaderCell accessor="selector" className='icon-only' />
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
                      <TableRow {...row.getRowProps()}
                        className={row.isSelected && "selected"}>
                        {row.cells.map((cell,index) => {
                          return (
                            <TableCell {...cell.getCellProps()} className={index === 0 && 'icon-only'}>
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
  );
}

render(<Example />);`

export const TableWithStickyFirstColumn = `function Example() {
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
        Header: 'Age',
        accessor: 'age',
        width: 50,
      },
      {
        Header: 'Visits',
        accessor: 'visits',
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
        width: 70
      },
    ],
    []
  )

  const data = React.useMemo(() => makeData(20), [])

  return (
      <DataTable
        id="stickyfirstcolumn"
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
              <Table bordered className="table-sticky-first-column">
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
  );
}

render(<Example />);`
