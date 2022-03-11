import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  Button,
  Chip,
  Col,
  Container,
  Nav,
  OverlayTrigger,
  Popover,
  Row,
} from "@trimbleinc/modus-react-bootstrap"
import { ColumnInstance, Filters, FilterValue } from "react-table"

interface DataTableFilterProps extends React.HTMLProps<HTMLDivElement> {
  allColumns: ColumnInstance<any>[]
  filters: Filters<any>
  setFilter: (
    columnId: string,
    updater: ((filterValue: FilterValue) => FilterValue) | FilterValue
  ) => void
  setAllFilters: (
    updater: Filters<any> | ((filters: Filters<any>) => Filters<any>)
  ) => void
}

const DataTableFilterPanel: React.FunctionComponent<DataTableFilterProps> = ({
  allColumns,
  filters,
  setFilter,
  setAllFilters,
}) => {
  const popover = props => (
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
          overlay={<div>Test</div>}
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

export default DataTableFilterPanel
