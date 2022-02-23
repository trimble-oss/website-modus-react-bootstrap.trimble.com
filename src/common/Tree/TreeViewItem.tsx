import React, { Children, useContext } from "react"

import styled from "styled-components"
import last from "lodash/last"
import PropTypes from "prop-types"
import TreeViewContext from "./TreeViewContext"
import TreeViewItemContext from "./TreeViewItemContext"

const getPaddingLeft = (level, type) => {
  let paddingLeft = level * 20
  if (type === "file") paddingLeft += 20
  return paddingLeft
}

// const StyledTreeNode = styled.div`
//   display: flex;
//   flex-direction: row;
//   padding: 0 8px;
//   width: 100%;
//   align-items: center;
//   cursor: pointer;

//   &:hover {
//     background: #e0e1e9;
//   }
//   &.active {
//     background: #dcedf9;
//   }
// `

const StyledTreeNode = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 8px;
  pointer: cursor;
  padding-left: ${props => getPaddingLeft(props.level, props.type)}px;
  &:hover {
    background: lightgray;
  }
  &.active {
    background: #dcedf9;
  }
`

const NodeIcon = styled.div`
  font-size: 12px;
  margin-right: ${props => (props.marginRight ? props.marginRight : 5)}px;
`

export interface TreeViewItemProps extends React.HTMLProps<HTMLDivElement> {
  nodeId: number
  label: string
  collapseIcon?: React.ReactElement
  expandIcon?: React.ReactElement
}

const propTypes = {
  /**
   * Tree Node Id
   */
  nodeId: PropTypes.number.isRequired,

  /**
   * Tree Node Text
   */
  label: PropTypes.string.isRequired,

  /**
   * Collapse icon for the Tree node.
   */
  collapseIcon: PropTypes.element,

  /**
   * Expand icon for the Tree node.
   */
  expandIcon: PropTypes.element,
}

const TreeViewItem = React.forwardRef<HTMLDivElement, TreeViewItemProps>(
  (
    { className, children, nodeId, label, collapseIcon, expandIcon, ...props },
    ref
  ) => {
    const {
      registerNode,
      unRegisterNode,
      isExpanded,
      isSelected,
      toggleExpansion,
      selectNode,
      multiSelect,
    } = useContext(TreeViewContext)

    const { parentId, level } = useContext(TreeViewItemContext)

    const expandable = Boolean(
      Array.isArray(children) ? children.length : children
    )
    const expanded = isExpanded ? isExpanded(nodeId) : false
    const selected = isSelected ? isSelected(nodeId) : false

    React.useEffect(() => {
      if (registerNode) {
        registerNode({ id: nodeId, parentId, label })
        return () => {
          unRegisterNode && unRegisterNode(nodeId)
        }
      }
      return undefined
    }, [registerNode, unRegisterNode, nodeId, parentId, label])

    return (
      <>
        <StyledTreeNode className={selected && "active"} level={level}>
          <NodeIcon onClick={e => toggleExpansion(e, nodeId)}>
            {expanded ? (
              <i className="modus-icons">chevron_left</i>
            ) : (
              <i className="modus-icons">chevron_right</i>
            )}
          </NodeIcon>

          <span role="button" onClick={e => selectNode(e, nodeId, multiSelect)}>
            {label}
          </span>
        </StyledTreeNode>
        {expanded && children && (
          <TreeViewItemContext.Provider value={{ parentId, level: level + 1 }}>
            {children}
          </TreeViewItemContext.Provider>
        )}
      </>
    )
  }
)

TreeViewItem.displayName = "TreeViewItem"
TreeViewItem.propTypes = propTypes

export default TreeViewItem
