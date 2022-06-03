import React from "react"
import styled from "styled-components"

interface TreeViewItemStyleWrapperProps extends React.HTMLProps<HTMLLIElement> {
  level: number
  checkBoxSelection?: string
  itemIcon?: string
}

interface TreeViewItemGroupStyleWrapperProps
  extends React.HTMLProps<HTMLUListElement> {
  expanded: string
}

const TreeViewItemStyleWrapper = React.forwardRef<
  HTMLLIElement,
  TreeViewItemStyleWrapperProps
>(({ level, checkBoxSelection, itemIcon, children, ...props }, ref) => {
  return (
    <li ref={ref} {...props}>
      {children}
    </li>
  )
})

const TreeViewItemGroupStyleWrapper = React.forwardRef<
  HTMLUListElement,
  TreeViewItemGroupStyleWrapperProps
>(({ expanded, children, ...props }, ref) => {
  return (
    <ul ref={ref} {...props}>
      {children}
    </ul>
  )
})

export const TreeViewStyled = styled.ul`
  .modus-icons,
  .material-icons {
    cursor: pointer;
    font-size: 16px !important;
  }
  &.list-group-condensed {
    .modus-icons,
    .material-icons {
      font-size: 12px !important;
    }
  }
`
export const TreeViewItemStyled = styled(TreeViewItemStyleWrapper)`
  &:focus-visible,
  &.focus-visible,
  *:focus-visible {
    outline: 2px auto #0063a3 !important;
  }
  .custom-control-input:focus-visible {
    & ~ .custom-control-label::before,
    & ~ .custom-control-label::after {
      outline: 2px auto #0063a3 !important;
    }
  }

  &.list-group-item {
    padding: 5px 16px 5px 0 !important;
    cursor: pointer;
    align-items: stretch !important;

    grid-template-columns: min-content ${props =>
        props.checkBoxSelection == "true" && "min-content"} ${props =>
        props.itemIcon == "true" && "min-content"} auto min-content !important;

    .tree-item-level {
      padding-left: ${props =>
        props.level > 0 ? (props.level - 1) * 0.5 : 0}rem !important;
    }
  }
`
export const TreeViewItemGroupStyled = styled(TreeViewItemGroupStyleWrapper)`
  display: ${props => (props.expanded == "true" ? "block" : "none")};
`

export default TreeViewStyled
