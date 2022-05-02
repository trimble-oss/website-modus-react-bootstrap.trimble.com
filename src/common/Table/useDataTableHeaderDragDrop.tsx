import React, { useCallback, useEffect, useMemo, useRef } from "react"
import useForceUpdate from "@restart/hooks/useForceUpdate"
import { isEqual } from "lodash"

const POSITION = { x: 0, y: 0 }
const useDataTableDragDrop = (
  { visibleColumns, setColumnOrder },
  registeredColumns: { id: string; ref: any }[]
) => {
  const forceUpdate = useForceUpdate()
  const droppingState = useRef<{
    column: { id: string; ref: any }
    validTarget: boolean
  }>({
    column: null,
    validTarget: false,
  })
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

  useEffect(() => {
    if (draggingState.current.isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
    } else {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [draggingState.current.isDragging])

  function clearDroppingState() {
    const prevDropState = droppingState.current
    if (droppingState.current.column) {
      droppingState.current.column.ref.classList.remove("drop-allow")
      droppingState.current.column.ref.classList.remove("drop-block")
    }
    droppingState.current = { column: null, validTarget: false }
    return prevDropState
  }
  function getDroppableColumn(x, y) {
    const column = registeredColumns.find(({ ref }) => {
      const rect = ref.getBoundingClientRect()
      return isWithInBounds(rect, x, y)
    })
    return column
  }
  function isWithInBounds(boundingClientRect, x, y) {
    if (boundingClientRect) {
      const inVerticalBounds =
        y >= boundingClientRect.top && y <= boundingClientRect.bottom
      const inHorizontalBounds =
        x >= boundingClientRect.left && x <= boundingClientRect.right
      return inVerticalBounds && inHorizontalBounds
    }
    return false
  }

  function getNewColumnOrder(columnIds, dragColumnId, dropColumnId): any[] {
    let newColumnOrder = columnIds
    newColumnOrder.splice(columnIds.indexOf(dragColumnId), 1)
    newColumnOrder.splice(newColumnOrder.indexOf(dropColumnId), 0, dragColumnId)

    return newColumnOrder
  }

  const getDragContent = useCallback(dragState => {
    if (dragState.isDragging && dragState.column) {
      const styles = {
        width: dragState.width,
        height: dragState.height,
        transform: `translate(calc(${dragState.translation.x}px - 10%), calc(${dragState.translation.y}px - 50%))`,
        msTransform: `translateX(${dragState.translation.x}px) translateX(-10%) translateY(${dragState.translation.y}px) translateY(-50%)`,
        zIndex: 9999,
        left: 0,
        top: 0,
        position: "absolute",
        cursor: dragState.isDragging ? "-webkit-grabbing" : "-webkit-grab",
        visibility: dragState.visible ? "visible" : "hidden",
      }
      return (
        <div className="d-flex bg-gray-light" style={styles}>
          {dragState.column.render("Header")}
        </div>
      )
    }

    return <></>
  }, [])

  const handleMouseDown = useCallback(
    (event, columnId) => {
      const { clientX, clientY, target, nativeEvent } = event
      if (nativeEvent.which !== 1) return

      const prevDragState = draggingState.current
      clearDroppingState()
      draggingState.current = {
        ...prevDragState,
        isDragging: true,
        origin: { x: clientX, y: clientY },
        column: visibleColumns.find(d => d.id === columnId),
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
      const prevDragState = draggingState.current
      const prevDropState = clearDroppingState()
      if (!prevDragState.column) return

      const translation = {
        x: clientX,
        y: clientY,
      }

      // const hasDropColumnChanged = !(
      //   prevDropState.column &&
      //   isWithInBounds(prevDropState.column.ref, clientX, clientY)
      // )
      if (true) {
        let droppableColumn = getDroppableColumn(clientX, clientY)

        if (droppableColumn) {
          let column = visibleColumns.find(d => d.id === droppableColumn.id)
          const isDroppable =
            column.allowDrop ||
            (column.allowDropForColumns || []).includes(prevDragState.column.id)

          droppingState.current.column = droppableColumn
          droppingState.current.validTarget = isDroppable
          droppableColumn.ref.classList.add(
            isDroppable ? "drop-allow" : "drop-block"
          )
        }
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

  const handleMouseUp = useCallback(
    event => {
      const prevDragState = draggingState.current
      const prevDropState = droppingState.current

      if (
        prevDropState.validTarget &&
        prevDropState.column &&
        prevDropState.column.id !== prevDragState.column.id
      ) {
        let columnIds = getNewColumnOrder(
          prevDragState.columnOrder,
          prevDragState.column.id,
          prevDropState.column.id
        )
        setColumnOrder(columnIds)
      }

      draggingState.current = {
        ...prevDragState,
        isDragging: false,
        visible: false,
        translation: POSITION,
        column: null,
      }
      clearDroppingState()
      forceUpdate()
    },
    [draggingState.current, droppingState.current, setColumnOrder]
  )

  return {
    handleMouseDown,
    isDragging: draggingState.current.isDragging,
    dragContent: getDragContent(draggingState.current),
  }
}

export default useDataTableDragDrop
