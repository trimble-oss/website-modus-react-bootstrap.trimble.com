import React, { Children, useContext } from "react"

import styled from "styled-components"
import last from "lodash/last"
import PropTypes from "prop-types"
import TreeViewContext from "./TreeViewContext"
import TreeViewItemContext from "./TreeViewItemContext"
import classNames from "classnames"
import { Form } from "@trimbleinc/modus-react-bootstrap"

const getPaddingLeft = (level, type) => {
  let paddingLeft = level * 20
  if (type === "file") paddingLeft += 20
  return paddingLeft
}

const StyledTreeNode = styled.li`
  padding: 5px 8px !important;
  cursor: pointer;
  padding-left: ${props =>
    getPaddingLeft(props.level, props.type)}px !important;
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

    const selectNodeFn = {
      onClick: function (e) {
        selectNode(e, nodeId, multiSelect)
      },
    }

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
        <StyledTreeNode
          className={classNames(
            "list-group-item list-item-leftright-control",
            selected && "active",
            className
          )}
          level={level}
          {...(!multiSelect && selectNodeFn)}
        >
          <i
            className="modus-icons material-icons"
            onClick={e => {
              e.stopPropagation()
              toggleExpansion(e, nodeId)
            }}
          >
            {expandable
              ? expanded
                ? "chevron_left"
                : "chevron_right"
              : "blank"}
          </i>

          {multiSelect && (
            <Form.Check
              {...selectNodeFn}
              custom
              id={`checkboxselection_${nodeId}`}
            />
          )}

          <span>{label}</span>
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
