import React, { useCallback, useState, useRef } from "react"
import useForceUpdate from "@restart/hooks/useForceUpdate"

const POSITION = { x: 0, y: 0 }
const useDataTableDragDrop = ({ visibleColumns, setColumnOrder }) => {
  const forceUpdate = useForceUpdate()
  const columnsRef = useRef([])
  const droppingState = useRef({ columnId: null, validTarget: false })
  const draggingState = useRef({
    isDragging: false,
    origin: POSITION,
    translation: POSITION,
    width: "0px",
    height: "0px",
    columnId: null,
    columnOrder: visibleColumns.map(d => d.id),
  })

  function clearDroppingState() {
    if (droppingState.current.columnId && columnsRef.current) {
      let droppableColumn = columnsRef.current.find(
        col => col.columnId === droppingState.current.columnId
      )
      if (droppableColumn && droppableColumn.ref) {
        droppableColumn.ref.classList.remove("drop-allow")
        droppableColumn.ref.classList.remove("drop-block")
      }
    }
    droppingState.current = { columnId: null, validTarget: false }
  }

  const handleDragStart = useCallback((event, columnId: string) => {
    const { clientX, clientY, target } = event
    const prevState = draggingState.current

    clearDroppingState()
    draggingState.current = {
      ...prevState,
      isDragging: true,
      origin: { x: clientX, y: clientY },
      columnId,
      width:
        (target && target.offsetParent && target.offsetParent.width) || "80px",
      height:
        (target && target.offsetParent && target.offsetParent.height) || "3rem",
      columnOrder: visibleColumns.map(d => d.id),
    }
  }, [])

  const handleDragOver = useCallback(
    (event, dropColumnId, allowDrop) => {
      const prevState = draggingState.current
      const { clientX, clientY } = event
      const translation = {
        x: clientX,
        y: clientY,
      }
      draggingState.current = {
        ...prevState,
        translation,
      }
      clearDroppingState()

      if (prevState.columnId) {
        droppingState.current.columnId = dropColumnId
        droppingState.current.validTarget = allowDrop
        let droppableColumn = columnsRef.current.find(
          col => col.columnId === dropColumnId
        )
        if (droppableColumn && droppableColumn.ref) {
          droppableColumn.ref.classList.add(
            allowDrop ? "drop-allow" : "drop-block"
          )
        }
        if (allowDrop) event.preventDefault()
      }
    },
    [draggingState.current.origin]
  )

  const handleDragEnter = useCallback((event, columnId, allowDrop) => {
    if (draggingState.current.columnId && allowDrop) event.preventDefault()
  }, [])

  const handleDrop = useCallback((event, dropColumnId) => {
    const prevDragState = draggingState.current
    draggingState.current = {
      ...prevDragState,
      isDragging: false,
    }
    if (dropColumnId !== prevDragState.columnId) {
      let columnIds = visibleColumns.map(d => d.id)

      //delete and insert the column at new index
      columnIds.splice(columnIds.indexOf(prevDragState.columnId), 1)
      columnIds.splice(
        columnIds.indexOf(dropColumnId),
        0,
        prevDragState.columnId
      )
      setColumnOrder(columnIds)
    }
  }, [])

  const handleDragEnd = useCallback((event, dropColumnId) => {
    const prevDragState = draggingState.current

    // If drop wasn't successful, reset the column order
    if (draggingState.current.isDragging) {
      setColumnOrder(draggingState.current.columnOrder)

      draggingState.current = {
        ...prevDragState,
        isDragging: false,
      }
    }
    clearDroppingState()
    forceUpdate()
  }, [])

  const registerColumnRef = useCallback((columnId: string, ref: any) => {
    let refs = columnsRef.current
      ? columnsRef.current.filter(col => col.columnId !== columnId)
      : []
    refs.push({ columnId, ref })

    columnsRef.current = refs
  }, [])

  return {
    handleDragStart,
    handleDragEnter,
    handleDragOver,
    handleDrop,
    handleDragEnd,
    registerColumnRef,
  }
}

export default useDataTableDragDrop
