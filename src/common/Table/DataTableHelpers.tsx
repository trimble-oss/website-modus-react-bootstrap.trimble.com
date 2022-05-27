import React, { useCallback, useEffect, useRef, useState } from "react"
import Form from "@trimbleinc/modus-react-bootstrap/Form"
import { Cell, CellProps, HeaderProps, Hooks, Meta } from "react-table"

export const CHECKBOX_SELECTOR_ID = "selector"
const IndeterminateCheckbox = React.forwardRef<
  HTMLInputElement,
  {
    id: string
    indeterminate?: any
  }
>(({ id, indeterminate, ...props }, ref) => {
  const defaultRef = React.useRef<HTMLInputElement>(null)
  const resolvedRef = ref || defaultRef

  React.useEffect(() => {
    ;(
      resolvedRef as React.MutableRefObject<HTMLInputElement>
    ).current.indeterminate = indeterminate
  }, [resolvedRef, indeterminate])

  return <Form.Check custom id={id} ref={resolvedRef} {...props} />
})

export const checkBoxSelectionHook = (
  hooks: Hooks<any>,
  tableId: string,
  multipleRowSelection
) => {
  hooks.visibleColumns.push(columns => [
    {
      id: CHECKBOX_SELECTOR_ID,
      width: 25,
      minWidth: 25,
      disableResizing: true,
      disableGroupBy: true,
      Cell: ({ row }: CellProps<any>) => {
        return (
          <IndeterminateCheckbox
            {...row.getToggleRowSelectedProps()}
            id={`${tableId}_${CHECKBOX_SELECTOR_ID}_row"${row.id}`}
          />
        )
      },
      ...(multipleRowSelection && {
        Header: ({ getToggleAllRowsSelectedProps }: HeaderProps<any>) => {
          return (
            <IndeterminateCheckbox
              {...getToggleAllRowsSelectedProps()}
              id={`${tableId}_${CHECKBOX_SELECTOR_ID}_header`}
            />
          )
        },
      }),
    },
    ...columns,
  ])
}

export const stateReducer = {
  stateReducer: (newState, action) => {
    if (action.type === "toggleRowSelected") {
      newState.selectedRowIds = action.value && {
        [action.id]: true,
      }
    }

    return newState
  },
}

export const getCellStyles = <T extends Record<string, unknown>>(
  props: any,
  { cell }: Meta<T, { cell: Cell<T> }>
) => [
  props,
  {
    style: {
      flex: cell.column.width ? `${cell.column.width} 0 auto` : undefined,
    },
  },
]
