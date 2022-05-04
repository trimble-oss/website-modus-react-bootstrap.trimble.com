import React from "react"
import styled from "styled-components"
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

export const TableWithSorting = `function Example()
{
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
  const data = React.useMemo(() => makeData(100), [])
  const {
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
    allColumns,
    page,
    pageOptions,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize, filters },
  } = useTable(
    {
      columns,
      data,
      initialState: {pageSize:7}
    },
    useSortBy,
    usePagination
  )

  const modusSortArrows = {
    asc: {
      icon: "sort_alpha_up",
      title: "Sort Descending",
    },
    desc: {
      icon: "sort_alpha_down",
      title: "Sort Ascending",
    },
  }
  const SortLabel = ({ sort, title, className }) => (
    <i
      className={"modus-icons material-icons ".concat(className)}
      data-toggle="tooltip"
      data-placement="top"
      title={title || modusSortArrows[sort].title}
    >
      {modusSortArrows[sort].icon}
    </i>
  )
  return (
    <Styles>
      <div>
        <Table bordered hover>
          <thead className="bg-gray-light sticky-top">
            {headerGroups.map(headerGroup => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className="bg-gray-light"
              >
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="bg-gray-light pr-2"
                    title=""
                  >
                    <div className="d-flex" style={{ width: "100%" }}>
                      <div className="flex-grow-1">
                        {column.render("Header")}
                      </div>
                      <div>
                        {column.canSort && (
                          <>
                            {column.isSorted ? (
                              <SortLabel
                                className="sorted"
                                sort={column.isSortedDesc ? "desc" : "asc"}
                              />
                            ) : (
                              <SortLabel
                                className="unsorted"
                                title="Sort Ascending"
                                sort="asc"
                              />
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {page.map((row, i) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
      <TablePagination
        totalPages={pageOptions.length}
        pageIndex={pageIndex}
        pageSize={pageSize}
        onPageChange={gotoPage}
        pageSizeOptions={[7, 10, 25, 50]}
        onPageSizeChange={setPageSize}
        className="border border-tertiary"
      ></TablePagination>
    </Styles>
  )
}

render(<Example />);`

export const Styles = styled.div`
  .container {
    padding: 0;
    width: 100%;
  }
  table {
    margin: 0;
    width: 100%;
    height: 100%;
  }
  th .modus-icons.material-icons.sorted,
  th .modus-icons.material-icons.unsorted {
    vertical-align: text-bottom;
    font-size: 1rem;
  }
  th .modus-icons.material-icons.unsorted {
    opacity: 0.5;
  }
  th .modus-icons.material-icons.unsorted:hover {
    opacity: 1;
  }
`

export const DataTableWithSorting = `function Example() {
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
  const data = React.useMemo(() => makeData(30), [])

  return (
    <DataTable
      id="dt_sorting"
      columns={columns} bordered hover
      pageSize={7}
      pageSizeOptions={[7, 10, 25, 50]}
      data={data}
    ></DataTable>
  );
}

render(<Example />);`

export const DataTableWithScroll = `function Example() {
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
  const data = React.useMemo(() => makeData(30), [])

  return (
    <DataTable
      id="dt_scroll"
      columns={columns} bordered hover
      data={data}
      pageSize={7}
      pageSizeOptions={[7, 10, 25, 50]}
      style={{ maxHeight: "400px" }}
    ></DataTable>
  );
}

render(<Example />);`

export const DataTableWithoutPagination = `function Example() {
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
  const data = React.useMemo(() => makeData(10), [])

  return (
    <DataTable
      id="dt_wo_pagination"
      columns={columns} bordered hover
      data={data}
      disablePagination
    ></DataTable>
  );
}
render(<Example />);`

export const DataTableWithColumnResize = `
function Example() {
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
  const data = React.useMemo(() => makeData(30), [])

  return (
    <DataTable
      id="dt_resize_columns"
      columns={columns} bordered hover
      data={data}
      pageSize={7}
      pageSizeOptions={[7, 10, 25, 50]}
      resizeColumns
    ></DataTable>
  );
}

render(<Example />);`

export const DataTableWithSingleRowSelection = `function Example() {
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
  const data = React.useMemo(() => makeData(30), [])
  const [selectedRows , setRowsSelected] = useState([])
  const handleOnRowSelection = (rows) => {
    setRowsSelected(rows)
  }

  return (
    <div>
        <DataTable
          id="dt_row_selection"
          columns={columns} bordered hover
          data={data}
          pageSize={7}
          pageSizeOptions={[7, 10, 25, 50]}
          onRowSelection={handleOnRowSelection}
        ></DataTable>
      {selectedRows &&
        selectedRows.map(row => {
          return (
            <Toast className="toast-primary" key={row.firstName}>
              Successfully selected {row.firstName}, Age - {row.age},
              Visits - {row.visits}, Status - {row.status} !!
            </Toast>
          )
        })}
    </div>
  );
}

render(<Example />);`

export const DataTableWithMultiRowSelection = `function Example() {
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
  const data = React.useMemo(() => makeData(30), [])
  const [selectedRows, setRowsSelected] = React.useState([])
  const handleOnRowSelection = (rows) => {
    setRowsSelected(rows)
  }

  return (
    <div>
        <DataTable
          id="dt_multi_row_selection"
          columns={columns} bordered hover
          data={data}
          pageSize={7}
          pageSizeOptions={[7, 10, 25, 50]}
          onRowSelection={handleOnRowSelection}
          multipleRowSelection
        ></DataTable>
      {selectedRows &&
        selectedRows.map(row => {
          return (
            <Toast className="toast-primary" key={row.firstName}>
              Successfully selected {row.firstName}, Age - {row.age},
              Visits - {row.visits}, Status - {row.status} !!
            </Toast>
          )
        })}
    </div>
  );
}
render(<Example />);`

export const DataTableWithCheckBoxSelection = `function Example() {
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
  const [selectedRows, setRowsSelected] = React.useState([])
  const handleOnRowSelection = (rows) => {
    setRowsSelected(rows)
  }

  return (
    <div>
        <DataTable
          id="dt_cb_selection"
          columns={columns} bordered hover
          data={data}
          pageSize={7}
          pageSizeOptions={[7, 10, 25, 50]}
          onRowSelection={handleOnRowSelection}
          multipleRowSelection
          checkBoxRowSelection
        ></DataTable>
      {selectedRows &&
        selectedRows.map(row => {
          return (
            <Toast className="toast-primary" key={row.firstName}>
              Successfully selected {row.firstName}, Age - {row.age},
              Visits - {row.visits}, Status - {row.status} !!
            </Toast>
          )
        })}
    </div>
  );
}

render(<Example />);`

export const DataTableWithCustomCheckBoxSelection = `function Example() {
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
    <div>
        <DataTable
          id="dt_custom_cb_selection"
          columns={columns} bordered hover
          data={data}
          pageSize={7}
          pageSizeOptions={[7, 10, 25, 50]}
          multipleRowSelection
          checkBoxRowSelection
        ></DataTable>
    </div>
  );
}

render(<Example />);`

export const DataTableWithStickyFirstColumn = `function Example() {
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
        Header: 'Age',
        accessor: 'age',
      },
      {
        Header: 'Visits',
        accessor: 'visits',
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

  const data = React.useMemo(() => makeData(7), [])

  return (
    <DataTable
      id="dt_sticky_column"
      columns={columns} bordered hover
      data={data}
      className="table-sticky-first-column"
    ></DataTable>
  );
}

render(<Example />);`

export const DataTableWithColumnFilter = `
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
  allColumns,
  activeFilters,
  setFilter,
  setAllFilters,
  globalFilter,
  setGlobalFilter
) {
  const popover = (
    <Popover id="popover-basic" style={{ width: "500px", maxWidth: "500px" }}>
      <Popover.Content>
        <Container style={{ width: "100%" }} className="p-1">
          <Row xs={1} md={2}>
            {allColumns
              .filter(it => it.canFilter && it.Filter)
              .map(column => (
                <div key={column.id}>
                  <Col>{column.render("Filter")}</Col>
                </div>
              ))}
          </Row>
          <Row className="d-flex justify-content-end mr-2">
            <Button onClick={e => setAllFilters([])}>RESET</Button>
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
            {allColumns.map(column => {
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
                    onClose={e => setFilter(column.id, undefined)}
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
function Example() {
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

  const data = React.useMemo(() => makeData(7), [])

  return (
      <DataTable
        id="dt_filter"
        columns={columns} bordered hover
        data={data}
        filterPanel={FilterPanel}
      ></DataTable>
  )
}

render(<Example />);`

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

export const DataTableWithCellEditable = `function Example() {
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
          <span data-toggle="tooltip" data-placement="top" title={value}>{value}</span>
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

  //Editable--CSS
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
        columns={columns} bordered hover
        data={data}
        disableRowSelection
      ></DataTable>
    </Editable>
  )
}

render(<Example />);`

export const DataTableWithGlobalFilter = `
function GlobalFilterPanel(
  allColumns,
  filters,
  setFilter,
  setAllFilters,
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
function Example() {
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
  const [data, setData] = React.useState(() => makeData(10000))

  return (
    <DataTable
      id="dt_global_filter"
      columns={columns} bordered hover
      data={data}
      filterPanel={GlobalFilterPanel}
    ></DataTable>
  )
}

render(<Example />);`

export const DataTableWithDragAndDrop = `
function GlobalFilterPanel(
  allColumns,
  filters,
  setFilter,
  setAllFilters,
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
function Example() {
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
  const [data, setData] = React.useState(() => makeData(10000))

  return (
    <DataTable
      id="dt_drag_drop"
      columns={columns} bordered hover
      data={data}
      resizeColumns
      multipleRowSelection
      checkBoxRowSelection
      filterPanel={GlobalFilterPanel}
    ></DataTable>
  )
}

render(<Example />);`
