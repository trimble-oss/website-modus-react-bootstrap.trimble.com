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
import TreeViewItemStyled from "./TreeViewItemStyled"

type DragDropProviderProps = {
  level: number
  styles: any
  isDragging: boolean
  label: React.ReactNode | React.ReactElement | string
}

const POSITION = { x: 0, y: 0 }
const StyledDiv = styled.div`
  cursor: -webkit-grabbing !important;
`
const DragDropProvider: React.FunctionComponent<
  React.PropsWithChildren<DragDropProviderProps>
> = ({ level, styles, label, isDragging, children }) => {
  const isDroppable = useContext(TreeViewDragContext)

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
          <TreeViewItemStyled
            level={level}
            isDraggable="true"
            id="drag-Item"
            className={classNames("list-group d-inline-block position-fixed")}
            style={styles}
            overrides={`
            opacity: 0.9;
            li.modus-tree-view-item {
              border: 1px dashed red !important;
              :hover{
                background: white;
              }
              &.droppable{
                border: 1px dashed #0063a3 !important;
              }
            }
            `}
          >
            <li
              className={classNames(
                "modus-tree-view-item list-group-item list-item-leftright-control",
                isDroppable ? "droppable" : ""
              )}
            >
              <div className="d-flex align-items-center">
                <i className="material-icons">drag_indicator</i>
              </div>
              {<i className="modus-icons">blank</i>}
              <div className="d-flex align-items-center">{label}</div>
            </li>
          </TreeViewItemStyled>,
          bodyRef.current
        )}
    </>
  )
}

export default DragDropProvider
