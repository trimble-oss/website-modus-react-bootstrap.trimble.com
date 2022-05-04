import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  CSSProperties,
} from "react"
import PropTypes from "prop-types"
import useForceUpdate from "@restart/hooks/useForceUpdate"
import renderUsingPortal from "./renderUsingPortal"

const POSITION = { x: 0, y: 0 }

function getNewColumnOrder(columnIds, dragColumnId, dropColumnId): any[] {
  let newColumnOrder = columnIds
  newColumnOrder.splice(columnIds.indexOf(dragColumnId), 1)
  newColumnOrder.splice(newColumnOrder.indexOf(dropColumnId), 0, dragColumnId)

  return newColumnOrder
}

function getDragContent(dragState, dragItemTemplate) {
  if (dragState.isDragging && dragState.column) {
    const dragContainerStyle: CSSProperties = {
      width: dragState.width,
      height: dragState.height,
      transform: `translate(calc(${dragState.translation.x}px - 10%), calc(${dragState.translation.y}px - 50%))`,
      msTransform: `translateX(${dragState.translation.x}px) translateX(-10%) translateY(${dragState.translation.y}px) translateY(-50%)`,
      zIndex: 9999,
      left: 0,
      top: 0,
      position: "fixed",
      cursor: dragState.isDragging ? "-webkit-grabbing" : "-webkit-grab",
      visibility: dragState.visible ? "visible" : "hidden",
      opacity: "0.9",
    }
    const dragContentStyle: CSSProperties = {
      width: dragState.width,
      height: dragState.height,
    }

    return (
      <div style={dragContainerStyle}>
        {dragItemTemplate ? (
          dragItemTemplate(dragState.column)
        ) : (
          <div style={dragContentStyle} className="bg-gray-light p-2">
            {dragState.column.render("Header")}
          </div>
        )}
      </div>
    )
  }

  return <></>
}

export const DataTableDragDropContext = React.createContext<{
  dragColumnId: any
  onHeaderDragStart: (event: any, column: any) => void
  onHeaderDragEnter: (event: any, allowDrop: boolean, ref: any) => void
  onHeaderDragLeave: (event: any, ref: any) => void
  onHeaderDrop: (event: any, columnId: any, allowDrop: any, ref: any) => void
}>(null)

export default function DataTableDragDropProvider(props) {
  const { children, visibleColumns, setColumnOrder, dragItemTemplate } = props
  const forceUpdate = useForceUpdate()
  const draggingState = useRef({
    isDragging: false,
    visible: false,
    origin: POSITION,
    translation: POSITION,
    width: "0px",
    height: "0px",
    column: null,
    columnOrder: visibleColumns.map(d => d.id),
  })

  const bodyRef = useRef(null)
  useEffect(() => {
    bodyRef.current = document.body
  }, [])

  useEffect(() => {
    if (draggingState.current.isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
    } else {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [draggingState.current.isDragging])

  const handleMouseDown = useCallback(
    (event, column) => {
      const { clientX, clientY, target, nativeEvent } = event
      if (nativeEvent.which !== 1) return

      const prevDragState = draggingState.current
      // clearDroppingState()
      draggingState.current = {
        ...prevDragState,
        isDragging: true,
        origin: { x: clientX, y: clientY },
        column,
        width:
          (target && target.offsetParent && target.offsetParent.width) ||
          "80px",
        height:
          (target && target.offsetParent && target.offsetParent.height) ||
          "3rem",
        columnOrder: visibleColumns.map(d => d.id),
      }

      forceUpdate()
    },
    [draggingState.current, visibleColumns]
  )

  const handleMouseMove = useCallback(
    ({ clientX, clientY }) => {
      if (!draggingState.current.column) return
      const prevDragState = draggingState.current
      const translation = {
        x: clientX,
        y: clientY,
      }

      draggingState.current = {
        ...prevDragState,
        visible: true,
        translation,
      }
      forceUpdate()
    },
    [draggingState.current]
  )

  const handleMouseEnter = useCallback(
    (e, allowDrop, dropColumnref) => {
      console.log("Mouse entered")
      if (!draggingState.current.column) return
      dropColumnref.classList.add(allowDrop ? "drop-allow" : "drop-block")
    },
    [draggingState.current]
  )

  const handleMouseLeave = useCallback((e, dropColumnref) => {
    console.log("On Drop column:" + dropColumnref)
    dropColumnref.classList.remove("drop-allow")
    dropColumnref.classList.remove("drop-block")
  }, [])

  const handleMouseUp = useCallback(
    (e, columnId, allowDrop, dropColumnref) => {
      const prevDragState = draggingState.current
      dropColumnref.classList.remove("drop-allow")
      dropColumnref.classList.remove("drop-block")

      if (
        allowDrop &&
        prevDragState.column &&
        columnId !== prevDragState.column.id
      ) {
        let newOrder = getNewColumnOrder(
          prevDragState.columnOrder,
          prevDragState.column.id,
          columnId
        )
        setColumnOrder(newOrder)
      }

      draggingState.current = {
        ...prevDragState,
        isDragging: false,
        visible: false,
        translation: POSITION,
        column: null,
      }
      forceUpdate()
    },
    [draggingState.current, setColumnOrder]
  )

  const value = React.useMemo(
    () => ({
      dragColumnId: draggingState.current.column
        ? draggingState.current.column.id
        : null,
      onHeaderDragStart: handleMouseDown,
      onHeaderDragEnter: handleMouseEnter,
      onHeaderDragLeave: handleMouseLeave,
      onHeaderDrop: handleMouseUp,
    }),
    [
      draggingState.current.column,
      handleMouseDown,
      handleMouseEnter,
      handleMouseLeave,
      handleMouseUp,
    ]
  )

  return (
    <DataTableDragDropContext.Provider value={value}>
      {children}
      {draggingState.current.isDragging &&
        renderUsingPortal(
          getDragContent(draggingState.current, dragItemTemplate),
          bodyRef
        )}
    </DataTableDragDropContext.Provider>
  )
}

DataTableDragDropProvider.propTypes = {
  children: PropTypes.node,
  visibleColumns: PropTypes.any,
  setColumnOrder: PropTypes.func,
  dragItemTemplate: PropTypes.func,
}
