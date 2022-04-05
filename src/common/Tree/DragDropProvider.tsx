import classNames from "classnames"
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
import { TreeViewDragContext } from "./TreeViewContext"

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
  const isDroppable = useContext(TreeViewDragContext)
  const [draggingState, setDraggingState] = useState(isDragging)

  const bodyRef = useRef(null)
  useEffect(() => {
    bodyRef.current = document.body
  }, [])
  useEffect(() => {
    setDraggingState(isDragging)
  }, [isDragging])
  // Drag-and-drop

  return (
    <>
      {children}
      {draggingState &&
        bodyRef.current &&
        createPortal(
          <div
            id="clone"
            style={styles}
            className={classNames(
              "list-group d-inline-block position-fixed",
              isDroppable ? "w-10" : ""
            )}
          >
            <div>Test</div>
          </div>,
          bodyRef.current
        )}
    </>
  )
}

export default DragDropProvider
