import React, {
  useContext,
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react"
import { createPortal } from "react-dom"
import styled, { css } from "styled-components"

type DragDropProviderProps = {
  styles: any
  isDragging: boolean
}

const POSITION = { x: 0, y: 0 }
const StyledDiv = styled.div`
  cursor: -webkit-grabbing !important;
`
const DragDropProvider: React.FunctionComponent<
  React.PropsWithChildren<DragDropProviderProps>
> = ({ styles, isDragging, children }) => {
  const bodyRef = useRef(null)
  useEffect(() => {
    bodyRef.current = document.body
  }, [])
  // Drag-and-drop
  debugger
  return (
    <>
      {children}
      {isDragging &&
        bodyRef.current &&
        createPortal(
          <div
            id="clone"
            style={styles}
            className="list-group d-inline-block position-fixed"
          >
            {children}
          </div>,
          bodyRef.current
        )}
    </>
  )
}

export default DragDropProvider
