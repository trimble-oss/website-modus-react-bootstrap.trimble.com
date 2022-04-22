import React from "react"
import styled, { css } from "styled-components"

interface TreeViewItemStyleWrapperProps
  extends React.HTMLProps<HTMLDivElement> {
  level: number
  checkBoxSelection?: string
  itemIcon?: string
}

interface TreeViewItemGroupStyleWrapperProps
  extends React.HTMLProps<HTMLDivElement> {
  expanded: string
}

const TreeViewItemStyleWrapper = React.forwardRef<
  HTMLDivElement,
  TreeViewItemStyleWrapperProps
>(({ level, checkBoxSelection, itemIcon, children, ...props }, ref) => {
  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  )
})

const TreeViewItemGroupStyleWrapper = React.forwardRef<
  HTMLDivElement,
  TreeViewItemGroupStyleWrapperProps
>(({ expanded, children, ...props }, ref) => {
  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  )
})

const TreeViewItemStyled = styled(TreeViewItemStyleWrapper)`
  &:focus-visible,
  &.focus-visible,
  *:focus-visible {
    box-shadow: none !important;
    border: 2px solid #0063a3 !important;
    outline: none !important;
  }

  li.list-group-item {
    :first-child {
      padding: 5px 16px 5px 0 !important;
      cursor: pointer;

      grid-template-columns: min-content ${props =>
          props.checkBoxSelection == "true" && "min-content"} ${props =>
          props.itemIcon == "true" &&
          "min-content"} auto min-content !important;

      .modus-icons,
      .material-icons {
        cursor: pointer;
        font-size: 1.25rem !important;
      }
      .drag-icon > * {
        font-size: 1rem !important;
      }
      .tree-item-level {
        padding-left: ${props =>
          props.level > 0 ? (props.level - 1) * 0.5 : 0}rem !important;
      }
      align-items: stretch !important;
    }
  }
`
export const TreeViewItemGroupStyled = styled(TreeViewItemGroupStyleWrapper)`
  display: ${props => (props.expanded == "true" ? "block" : "none")};
`

export default TreeViewItemStyled
