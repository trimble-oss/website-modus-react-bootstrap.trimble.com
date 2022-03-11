import React, { useCallback, useState, useRef } from "react"
import { Form } from "@trimbleinc/modus-react-bootstrap"
import { ColumnInstance } from "react-table"
import { ContextMenuState } from "./types"

const useDataTableContextMenu = tableInstance => {
  const { allColumns, toggleHideColumn, toggleHideAllColumns } = tableInstance

  const [contextMenu, setContextMenu] = useState<ContextMenuState>(null)
  const [showContextMenu, setShowContextMenu] = useState(false)

  const handleHeaderContextMenu = useCallback(
    (event, column: ColumnInstance, containerRef) => {
      if (!containerRef.current) return

      const [selector, ...columns] = allColumns
      const rect = containerRef.current.getBoundingClientRect()
      const contextMenu: ContextMenuState = {
        positionX: event.clientX - rect.left,
        positionY: event.clientY - rect.top,
        items: [
          {
            title: "Hide",
            onClick: () => {
              toggleHideColumn(column.id, true)
              setShowContextMenu(false)
            },
          },
          {
            title: "Show Columns",
            children: columns.map(column => {
              return {
                title: (
                  <Form.Check
                    label={column.render("Header")}
                    custom
                    id={column.id}
                    data-indeterminate="false"
                    {...(column.isVisible && { defaultChecked: true })}
                    onChange={() =>
                      toggleHideColumn(column.id, column.isVisible)
                    }
                  ></Form.Check>
                ),
              }
            }),
          },
          {
            title: "Show All Columns",
            onClick: () => {
              toggleHideAllColumns(false)
              setShowContextMenu(false)
            },
          },
        ],
      }
      setContextMenu(contextMenu)
      setShowContextMenu(true)
    },
    [allColumns, toggleHideColumn, toggleHideAllColumns]
  )

  const handleContextMenuClose = useCallback(
    e => {
      setShowContextMenu(false)
    },
    [setShowContextMenu]
  )
  return {
    contextMenu,
    showContextMenu,
    handleHeaderContextMenu,
    handleContextMenuClose,
  }
}

export default useDataTableContextMenu
