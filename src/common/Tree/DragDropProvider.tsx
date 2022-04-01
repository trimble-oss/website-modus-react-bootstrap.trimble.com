import React, {
  useContext,
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react"
import { createPortal } from "react-dom"

type DragDropProviderProps = {
  styles: any
  isDragging: boolean
}

const POSITION = { x: 0, y: 0 }
const DragDropProvider: React.FunctionComponent<
  React.PropsWithChildren<DragDropProviderProps>
> = ({ styles, isDragging, children }) => {
  const bodyRef = useRef(null)
  useEffect(() => {
    bodyRef.current = document.body
  }, [])
  // Drag-and-drop

  return (
    <>
      {children}
      {isDragging &&
        bodyRef.current &&
        createPortal(
          <div style={styles}>
            <div style={{ backgroundColor: "red", width: "400px" }}>Test</div>
          </div>,
          bodyRef.current
        )}
    </>
  )
}

export default DragDropProvider
