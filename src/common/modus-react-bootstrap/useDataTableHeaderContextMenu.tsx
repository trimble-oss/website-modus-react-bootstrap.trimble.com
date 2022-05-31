import React, { useCallback, useState } from "react"
import { Form } from "@trimbleinc/modus-react-bootstrap"
import { ContextMenuState } from "./types"
import { CHECKBOX_SELECTOR_ID } from "./DataTableHelpers"

const useDataTableContextMenu = ({
  allColumns,
  toggleHideColumn,
  toggleHideAllColumns,
}) => {
  const [contextMenu, setContextMenu] = useState<ContextMenuState>(null)
  const [showContextMenu, setShowContextMenu] = useState(false)

  const handleHeaderContextMenu = useCallback(
    (event, columnId, containerRef) => {
      if (!containerRef.current) return

      const columns = allColumns.filter(col => col.id !== CHECKBOX_SELECTOR_ID)
      const rect = containerRef.current.getBoundingClientRect()
      const contextMenu: ContextMenuState = {
        positionX: event.clientX - rect.left,
        positionY: event.clientY - rect.top,
        items: [
          {
            title: "Hide",
            onClick: () => {
              toggleHideColumn(columnId, true)
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
