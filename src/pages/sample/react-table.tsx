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
  InputGroup,
  Nav,
  OverlayTrigger,
  Popover,
  Row,
} from "@trimbleinc/modus-react-bootstrap"
import DefaultLayout from "../../layouts/DefaultLayout"
import LinkedHeading from "../../common/LinkedHeading"
import TableOfContents from "../../common/TableOfContents"
import { ModusIconsScripts } from "../../common/ExternalDependencyHelper"
import { Table, TablePagination, DataTable } from "../../common/Table"
import { MakeData as makeData } from "../../examples/components/Table"
import styled from "styled-components"

import { useTable, useSortBy, usePagination } from "react-table"

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

function ReactTableNextGen() {
  const columns = React.useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName",
        sortBy: true,
        Filter: TextFilter,
        width: 80,
        allowDrag: true,
        allowDrop: true,
      },
      {
        Header: "Last Name",
        accessor: "lastName",
        sortBy: true,
        Filter: TextFilter,
        width: 80,
        allowDrag: true,
        allowDrop: true,
      },
      {
        Header: "Age",
        accessor: "age",
        Filter: SliderFilter,
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
        Filter: SelectFilter,
        width: 70,
        sortBy: true,
        allowDrag: true,
        allowDrop: true,
      },
      {
        Header: "Profile Progress Status",
        accessor: "progress",
        width: 70,
        sortBy: true,
        allowDrag: false,
        allowDrop: false,
      },
    ],
    []
  )

  const data = React.useMemo(() => makeData(10000), [])

  return (
    <DataTable
      id="dt_filter"
      columns={columns}
      bordered
      hover
      data={data}
      filterPanel={FilterPanel}
      // filterPanel={GlobalFilterPanel}
      pageSize={7}
      pageSizeOptions={[7, 10, 25, 50]}
      resizeColumns
      multipleRowSelection
      checkBoxRowSelection
      style={{ maxHeight: "400px" }}
    ></DataTable>
  )
}

const ReactTableBasic = props => {
  const Styles = styled.div`
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
  const data = React.useMemo(() => makeData(175), [])
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

  // Render the UI for your table
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
        pageSizeOptions={[10, 20, 30, 40, 50]}
        onPageSizeChange={setPageSize}
        className="border border-tertiary"
      ></TablePagination>
    </Styles>
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
                {/* <ReactTableBasic /> */}
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
