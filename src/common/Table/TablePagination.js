import * as React from "react"
import PropTypes from "prop-types"
import { useState, useCallback } from "react"
import {
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  NavDropdown,
  NavItem,
  NavLink,
  Pagination,
  Row,
  Table as BootstrapTable,
} from "@trimbleinc/modus-react-bootstrap"
import merge from "lodash/merge"
import classNames from "classnames"

function getRange(start, end) {
  /* generate a range : [start, start+1, ..., end-1, end] */
  const len = end - start + 1
  let a = new Array(len)
  for (let i = 0; i < len; i++) a[i] = start + i
  return a
}

function getPaginationGroup(currentPage, totalPages, pageLimit = 5) {
  const start = Math.floor((currentPage - 1) / pageLimit) * pageLimit
  const len =
    totalPages < Math.ceil(currentPage / pageLimit) * pageLimit
      ? totalPages % pageLimit
      : pageLimit

  return new Array(len).fill().map((_, idx) => start + idx + 1)
}

const MorePagesDropdown = ({ pages, onPageSelection }) => {
  return (
    <Dropdown as={NavItem}>
      <Dropdown.Toggle as={NavLink} variant="text-primary" bsPrefix>
        <i className="modus-icons">more_horizontal</i>
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu-sm">
        {pages.map(item => {
          return (
            <Dropdown.Item
              onClick={e => {
                onPageSelection(e, item)
              }}
            >
              {item}
            </Dropdown.Item>
          )
        })}
      </Dropdown.Menu>
    </Dropdown>
  )
}

const TablePagination = React.forwardRef(
  (
    {
      totalPages,
      pageIndex,
      onPageChange,
      pageSize,
      pageSizeOptions,
      onPageSizeChange,
      pageLimit = 5,
      className,
      ...props
    },
    ref
  ) => {
    const paginationGroup = getPaginationGroup(
      pageIndex + 1,
      totalPages,
      pageLimit
    )
    const firstPage = paginationGroup[0]
    const lastPage = paginationGroup[paginationGroup.length - 1]
    const morePagesLeft = firstPage > 1 && getRange(1, firstPage - 1)
    const morePagesRight =
      lastPage != totalPages && getRange(lastPage + 1, totalPages)

    const handlePreviousPage = useCallback(
      event => {
        onPageChange(pageIndex - 1)
      },
      [pageIndex]
    )
    const handleNextPage = useCallback(
      event => {
        onPageChange(pageIndex + 1)
      },
      [pageIndex]
    )
    const handleGotoPage = useCallback((event, page) => {
      onPageChange(page - 1)
    }, [])

    return (
      <div
        className={classNames(
          className,
          "modus-table-pagination d-flex justify-content-end "
        )}
        {...props}
      >
        <div className="d-inline-flex align-items-center mr-2">
          <span className="mr-2">Page Size:</span>
          <div>
            <Form.Control
              as="select"
              custom
              value={pageSize}
              onChange={e => {
                onPageSizeChange(Number(e.target.value))
              }}
            >
              {pageSizeOptions.map(size => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </Form.Control>
          </div>
        </div>
        <div>
          <nav aria-label="Pagination">
            <Pagination className="mb-0">
              <Pagination.Item
                disabled={pageIndex === 0}
                onClick={handlePreviousPage}
              >
                <i className="modus-icons">chevron_left</i>
              </Pagination.Item>

              {morePagesLeft && (
                <Pagination.Item id="morePagesLeft" className="p-0">
                  <MorePagesDropdown
                    pages={morePagesLeft}
                    onPageSelection={handleGotoPage}
                  />
                </Pagination.Item>
              )}

              {paginationGroup.map(item => {
                return (
                  <Pagination.Item
                    active={item === pageIndex + 1}
                    onClick={e => {
                      handleGotoPage(e, item)
                    }}
                  >
                    {item}
                  </Pagination.Item>
                )
              })}

              {morePagesRight && (
                <Pagination.Item id="morePagesRight" className="p-0">
                  <MorePagesDropdown
                    pages={morePagesRight}
                    onPageSelection={handleGotoPage}
                  />
                </Pagination.Item>
              )}

              <Pagination.Item
                disabled={pageIndex + 1 === totalPages}
                onClick={handleNextPage}
              >
                <i className="modus-icons">chevron_right</i>
              </Pagination.Item>
            </Pagination>
          </nav>
        </div>
      </div>
    )
  }
)

TablePagination.propTypes = {
  totalPages: PropTypes.number,
  pageIndex: PropTypes.number,
  onPageChange: PropTypes.func,
  pageSize: PropTypes.number,
  pageSizeOptions: PropTypes.array,
  onPageSizeChange: PropTypes.func,
  pageLimit: PropTypes.number,
}

TablePagination.displayName = "TablePagination"

export default TablePagination
