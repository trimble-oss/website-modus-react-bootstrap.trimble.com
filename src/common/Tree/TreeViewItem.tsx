import React, { Children, useContext } from "react"

import styled, { css } from "styled-components"
import last from "lodash/last"
import PropTypes from "prop-types"
import TreeViewContext from "./TreeViewContext"
import TreeViewItemContext from "./TreeViewItemContext"
import classNames from "classnames"
import { Form } from "@trimbleinc/modus-react-bootstrap"

const StyledTreeNode = styled.li`
  padding: 5px 8px !important;
  ${props =>
    props.multiselect != "true" &&
    css`
      cursor: pointer;
    `}

  padding-left: ${props => props.level * 20}px !important;

  &.multiselect {
    grid-template-columns: min-content min-content auto min-content;
  }
`
const ExpandableTreeGroup = styled.div`
  display: ${props => (props.expanded == "true" ? "block" : "none")};
`

export interface TreeViewItemProps extends React.HTMLProps<HTMLDivElement> {
  nodeId: number
  label: string
  custom?: React.ReactElement
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
   * Custom Node element
   */
  custom: PropTypes.element,

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
    {
      className,
      children,
      nodeId,
      label,
      custom,
      collapseIcon,
      expandIcon,
      ...props
    },
    ref
  ) => {
    const {
      registerNode,
      unRegisterNode,
      isExpanded,
      isSelected,
      toggleExpansion,
      toggleSelection,
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
        <StyledTreeNode
          className={classNames(
            "list-group-item list-item-leftright-control",
            selected && "active",
            multiSelect && "multiselect",
            className
          )}
          level={level}
          multiselect={multiSelect ? "true" : "false"}
          {...(!multiSelect && {
            onClick: function (e) {
              toggleSelection(e, nodeId, multiSelect)
            },
          })}
        >
          <i
            className="modus-icons material-icons"
            onClick={e => {
              e.stopPropagation()
              toggleExpansion(e, nodeId)
            }}
            style={{ cursor: "pointer" }}
          >
            {expandable
              ? expanded
                ? "chevron_left"
                : "chevron_right"
              : "blank"}
          </i>

          {multiSelect && (
            <Form.Check
              checked={selected}
              custom
              id={`checkboxselection_${nodeId}`}
              onChange={e => {
                e.stopPropagation()
                toggleSelection(e, nodeId, multiSelect)
              }}
            />
          )}

          {custom || <span>{label}</span>}
        </StyledTreeNode>

        {children && (
          <TreeViewItemContext.Provider
            value={{ parentId: nodeId, level: level + 1 }}
          >
            <ExpandableTreeGroup expanded={expanded ? "true" : "false"}>
              {children}
            </ExpandableTreeGroup>
          </TreeViewItemContext.Provider>
        )}
      </>
    )
  }
)

TreeViewItem.displayName = "TreeViewItem"
TreeViewItem.propTypes = propTypes

export default TreeViewItem
