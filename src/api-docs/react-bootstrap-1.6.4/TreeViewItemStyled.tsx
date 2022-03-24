import React from "react"
import styled, { css } from "styled-components"

interface TreeViewItemStyleWrapperProps
  extends React.HTMLProps<HTMLDivElement> {
  level: number
  multiSelect: string
  itemIcon: string
}

interface TreeViewItemGroupStyleWrapperProps
  extends React.HTMLProps<HTMLDivElement> {
  expanded: string
}

const TreeViewItemStyleWrapper = React.forwardRef<
  HTMLDivElement,
  TreeViewItemStyleWrapperProps
>(({ level, multiSelect, itemIcon, children, ...props }, ref) => {
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
  li {
    padding: 5px 8px !important;
    ${props =>
      props.multiSelect != "true" &&
      css`
        cursor: pointer;
      `}

    padding-left: ${props => props.level * 20}px !important;

    &.checkbox {
      grid-template-columns: min-content min-content auto min-content;
    }

    &.item-icon {
      grid-template-columns: min-content ${props =>
          props.multiSelect == "true" && "min-content"} ${props =>
          props.itemIcon == "true" && "min-content"} auto min-content;
    }

    .modus-icons,
    .material-icons {
      cursor: pointer;
      font-size: 1.25rem !important;
    }
  }
`
export const TreeViewItemGroupStyled = styled(TreeViewItemGroupStyleWrapper)`
  display: ${props => (props.expanded == "true" ? "block" : "none")};
`

export default TreeViewItemStyled
