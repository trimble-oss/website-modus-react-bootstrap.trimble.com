import * as React from "react"
import { useState, useCallback } from "react"
import {
  Button,
  Chip,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  FormControl,
  Nav,
  OverlayTrigger,
  Popover,
  Row,
} from "@trimbleinc/modus-react-bootstrap"
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
import DataTablev2 from "../common/Table/DataTablev2"

const ReactTableContainer = props => {
  function TextFilter({
    column: { filterValue, preFilteredRows, setFilter, id, render },
  }) {
    const count = preFilteredRows.length
    return (
      <Form.Group controlId="formBasicEmail">
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
      <Form.Group controlId="formBasicRangeCustom" custom>
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
      <Form.Group controlId="exampleForm.SelectCustom">
        <Form.Label>{render("Header")}</Form.Label>
        <Form.Control
          as="select"
          custom
          value={filterValue}
          onChange={e => {
            setFilter(e.target.value || undefined)
          }}
        >
          <option value="">All</option>
          <option>single</option>
          <option>complicated</option>
          <option>relationship</option>
        </Form.Control>
      </Form.Group>
    )
  }

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
          allColumns,
          setFilter,
          filters,
          setAllFilters,
          prepareRow,
          rows,
          gotoPage,
          pageIndex,
          pageSize,
          setPageSize,
          pageOptions,
        }) => {
          const popover = (
            <Popover
              id="popover-basic"
              style={{ width: "500px", maxWidth: "500px" }}
            >
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

          return (
            <div className="d-flex flex-column">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  {filters && filters.length > 0 && (
                    <div>
                      Active Filters:
                      {allColumns.map(column => {
                        const filter = filters.find(f => f.id === column.id)
                        const value = filter && filter.value
                        return (
                          value && (
                            <DismissibleChip
                              key={column.id}
                              label={column
                                .render("Header")
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
              <div className="d-flex align-content-start flex-wrap"></div>
              <div className="d-flex justify-content-end align-items-center"></div>
              <div>
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
                        <TableHeaderCell
                          accessor="age"
                          className="bg-gray-light"
                        />
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
              </div>
              <div>
                <TablePagination
                  totalPages={pageOptions.length}
                  pageIndex={pageIndex}
                  pageSize={pageSize}
                  onPageChange={gotoPage}
                  pageSizeOptions={[10, 20, 30, 40, 50]}
                  onPageSizeChange={setPageSize}
                  className="border border-tertiary"
                ></TablePagination>
              </div>
            </div>
          )
        }}
      </DataTable>
    </>
  )
}

const ReactTableNextGen = props => {
  const EditableCell = ({
    value: initialValue,
    row: { index },
    column: { id },
  }) => {
    const [value, setValue] = React.useState(initialValue)
    const [editMode, setEditMode] = React.useState(false)

    const onKeyUp = e => {
      if (e.key === "Enter" || e.keyCode === 13) {
        setEditMode(false)
        UpdateMyData(index, id, value)
      } else {
        setValue(e.target.value)
      }
    }
    const onBlur = () => {
      setEditMode(false)
      UpdateMyData(index, id, value)
    }
    const onEdit = e => {
      e.preventDefault()
      setEditMode(true)
    }
    React.useEffect(() => {
      setValue(initialValue)
    }, [initialValue])

    return (
      <div onClick={onEdit}>
        {editMode ? (
          <Form.Control
            as="input"
            defaultValue={value}
            onKeyUp={onKeyUp}
            size="lg"
            style={{ height: "2.5rem" }}
            className="border-0"
            onBlur={onBlur}
            autoFocus
          />
        ) : (
          value
        )}
      </div>
    )
  }

  function TextFilter({
    column: { filterValue, preFilteredRows, setFilter, id, render },
  }) {
    const count = preFilteredRows.length
    return (
      <Form.Group controlId="formBasicEmail">
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
      <Form.Group controlId="formBasicRangeCustom" custom>
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
      <Form.Group controlId="exampleForm.SelectCustom">
        <Form.Label>{render("Header")}</Form.Label>
        <Form.Control
          as="select"
          custom
          value={filterValue}
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

  const columns = React.useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName",
        sortBy: true,
        Filter: TextFilter,
        width: 80,
        Cell: EditableCell,
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
  const [data, setData] = React.useState(() => makeData(20))

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

  return (
    <>
      <DataTablev2
        id="test"
        columns={columns}
        data={data}
        resizeColumns
        multipleRowSelection
        checkBoxRowSelection
        style={{ maxHeight: "400px" }}
      ></DataTablev2>
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
                {/* <ReactTableContainer /> */}
                <ReactTableNextGen />
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
