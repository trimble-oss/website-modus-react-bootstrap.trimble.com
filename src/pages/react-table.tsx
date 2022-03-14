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
import { Table, TablePagination, DataTable } from "../common/Table"
import { MakeData as makeData } from "../examples/components/Table"
import styled from "styled-components"

import { useTable, useSortBy, usePagination } from "react-table"

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
      <DataTable
        id="test"
        columns={columns}
        data={data}
        resizeColumns
        multipleRowSelection
        checkBoxRowSelection
        style={{ maxHeight: "400px" }}
      ></DataTable>
    </>
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
                <ReactTableBasic />
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
