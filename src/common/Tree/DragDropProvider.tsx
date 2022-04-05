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
import { TreeItem } from "./types"

type DragDropProviderProps = {
  isDragging: boolean
  width: string
  height: string
  clientX: any
  clientY: any
}

const DragDropProvider: React.FunctionComponent<
  React.PropsWithChildren<DragDropProviderProps>
> = ({ width, height, clientX, clientY, isDragging, children }) => {
  const bodyRef = useRef(null)
  useEffect(() => {
    bodyRef.current = document.body
  }, [])

  const dragItemStyle = {
    width,
    height,
    transform: `translate(calc(${clientX}px - 10%), calc(${clientY}px - 50%))`,
    msTransform: `translateX(${clientX}px) translateX(-10%) translateY(${clientY}px) translateY(-50%)`,
    zIndex: 1000,
    left: 0,
    top: 0,
    cursor: isDragging ? "-webkit-grabbing" : "-webkit-grab",
  }

  return (
    <>
      {/* {children} */}
      {isDragging &&
        bodyRef.current &&
        createPortal(
          <div
            className={classNames("list-group d-inline-block position-fixed")}
            style={dragItemStyle}
          >
            {children}
          </div>,
          bodyRef.current
        )}
    </>
  )
}

export default DragDropProvider
