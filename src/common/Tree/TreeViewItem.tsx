import React, {
  useContext,
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react"
import { createPortal } from "react-dom"
import PropTypes, { node } from "prop-types"
import TreeViewContext, { TreeViewDragContext } from "./TreeViewContext"
import TreeViewItemContext from "./TreeViewItemContext"
import classNames from "classnames"
import { Form } from "@trimbleinc/modus-react-bootstrap"
import TreeViewItemStyled, {
  TreeViewItemGroupStyled,
} from "./TreeViewItemStyled"
import { TreeItem } from "./types"
import _findIndex from "lodash/findIndex"
import _every from "lodash/every"
import _merge from "lodash/merge"
import useForceUpdate from "@restart/hooks/useForceUpdate"
import { useDescendant } from "./useDescendant"
import DragDropProvider from "./DragDropProvider"

export interface TreeViewItemProps
  extends Omit<React.HTMLProps<HTMLLIElement>, "label"> {
  nodeId: number
  label: React.ReactNode | React.ReactElement | string
  collapseIcon?: React.ReactElement
  expandIcon?: React.ReactElement
  itemIcon?: React.ReactElement
  disableSelection?: boolean
  enableDrop?: boolean
  enableDrag?: boolean
}

const propTypes = {
  /**
   * Tree Node Id
   */
  nodeId: PropTypes.number.isRequired,

  /**
   * Tree Node Text
   */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

  /**
   * Collapse icon for the Tree node.
   */
  collapseIcon: PropTypes.element,

  /**
   * Expand icon for the Tree node.
   */
  expandIcon: PropTypes.element,

  /**
   * Icon to appear before the label.
   */
  itemIcon: PropTypes.element,

  /**
   * Enables Tree items to be dropped in it.
   */
  enableDrop: PropTypes.element,
  /**
   * Enables a Tree item to be dragged.
   */
  enableDrag: PropTypes.element,
}

const IndeterminateCheckbox = React.forwardRef<
  HTMLInputElement,
  {
    id: string
    indeterminate?: any
    onClick?: (...args: any[]) => void
    checked?: boolean
  }
>(({ id, indeterminate, checked, onClick, ...props }, ref) => {
  const defaultRef = React.useRef<HTMLInputElement>(null)
  const resolvedRef = ref || defaultRef

  React.useEffect(() => {
    ;(
      resolvedRef as React.MutableRefObject<HTMLInputElement>
    ).current.indeterminate = indeterminate
  }, [resolvedRef, indeterminate])

  return (
    <Form.Check
      custom
      id={id}
      checked={checked}
      ref={resolvedRef}
      onClick={onClick}
      {...props}
    />
  )
})

function TreeViewItem(
  props: React.PropsWithChildren<TreeViewItemProps> & {
    ref?: React.Ref<HTMLLIElement>
  }
): React.ReactElement {
  const {
    className,
    children,
    nodeId,
    label,
    collapseIcon,
    expandIcon,
    itemIcon,
    enableDrop,
    ref,
    ...rest
  } = props
  const {
    id: rootId,
    registerNode,
    unRegisterNode,
    isExpanded,
    isNodeSelected,
    isCheckBoxSelected,
    toggleExpansion,
    toggleNodeSelection,
    toggleSingleCheckBoxSelection,
    toggleMultiCheckBoxSelection,
    updateDroppableNode,
    getDroppableNode,
    handleMouseDown,
    isIndeterminate,
    checkBoxSelection,
    multiSelectCheckBox,
    collapseIcon: defaultCollapseIcon,
    expandIcon: defaultExpandIcon,
    itemIcon: defaultItemIcon,
  } = useContext(TreeViewContext)

  const expandable = Boolean(
    Array.isArray(children) ? children.length : children
  )
  const expanded = isExpanded ? isExpanded(nodeId) : false
  const nodeSelected = isNodeSelected ? isNodeSelected(nodeId) : false
  const checkBoxSelected = isCheckBoxSelected
    ? isCheckBoxSelected(nodeId)
    : false
  const checkBoxIndeterminate =
    checkBoxSelection && expandable && isIndeterminate
      ? isIndeterminate(nodeId)
      : false

  const finalExpandIcon = expandIcon || defaultExpandIcon || (
    <i className="modus-icons">chevron_down_thick</i>
  )
  const finalCollapseIcon = expandIcon || defaultCollapseIcon || (
    <i className="modus-icons">chevron_right</i>
  )
  const finalItemIcon = itemIcon || defaultItemIcon
  const blankIcon = <i className="modus-icons">blank</i>
  const {
    parentId,
    level,
    getChildNodes,
    registerDescendant,
    unRegisterDescendant,
    updateDescendant,
    onDescendantToggleCbSelection,
    onDescendantToggleCbSelectionOnParent,
  } = useDescendant(nodeId, isCheckBoxSelected, toggleMultiCheckBoxSelection)
  const treeItemContainer = useRef(null)

  const droppableNode = useContext(TreeViewDragContext)

  const handleNodeSelection = React.useCallback(
    (e: any) => {
      toggleNodeSelection(e, nodeId)
    },
    [toggleNodeSelection]
  )

  const handleCheckBoxSelection = React.useCallback(
    (e: any) => {
      e.stopPropagation()

      if (multiSelectCheckBox) {
        const all = [...getChildren(getChildNodes()), nodeId]
        let checked = []
        let unchecked = []

        // toggle
        if (isCheckBoxSelected(nodeId)) unchecked = all
        else checked = all

        onDescendantToggleCbSelectionOnParent
          ? onDescendantToggleCbSelectionOnParent(e, nodeId, checked, unchecked)
          : toggleMultiCheckBoxSelection(e, checked, unchecked)
      } else toggleSingleCheckBoxSelection(e, nodeId)
    },
    [
      getChildNodes,
      multiSelectCheckBox,
      isCheckBoxSelected,
      toggleSingleCheckBoxSelection,
      toggleMultiCheckBoxSelection,
      onDescendantToggleCbSelectionOnParent,
    ]
  )

  const handleExpansion = React.useCallback(
    (e: any) => {
      e.stopPropagation()
      toggleExpansion(e, nodeId)
    },
    [toggleExpansion]
  )

  useEffect(() => {
    if (treeItemContainer.current && registerNode) {
      const node = {
        id: nodeId,
        parentId,
        label,
        level,
        ref: treeItemContainer.current,
      }

      registerNode(node)
    }

    return () => {
      unRegisterNode && unRegisterNode(nodeId)
    }
  }, [
    registerNode,
    unRegisterNode,
    nodeId,
    parentId,
    label,
    treeItemContainer.current,
  ])

  function getChildren(array: TreeItem[]): number[] {
    if (!array) return []
    return array.reduce((r, { id, children }) => {
      r.push(id, ...getChildren(children))
      return r
    }, [])
  }

  // Issue with Drag and Drop API -
  // ondrop event on a droppable zone is not getting fired when the custom dragging element is displayed over it
  // As it fires the drop event on the custom dragging element
  return (
    <>
      <TreeViewItemStyled
        level={level}
        checkBoxSelection={checkBoxSelection ? "true" : "false"}
        itemIcon={finalItemIcon ? "true" : "false"}
        role="treeitem"
        aria-expanded={expandable ? expanded : null}
        aria-selected={nodeSelected}
        isDraggable="true"
        ref={treeItemContainer}
      >
        <li
          className={classNames(
            "modus-tree-view-item list-group-item list-item-leftright-control",
            nodeSelected && "active",
            className
            // draggingState.isDragging && droppableNode === nodeId
            //   ? enableDrop
            //     ? "drop-allow"
            //     : "drop-block"
            //   : ""
          )}
          {...rest}
          ref={ref}
          id={`treeitem_${nodeId}`}
        >
          <div
            className="d-flex align-items-center"
            onMouseDown={e => handleMouseDown(e, nodeId)}
          >
            <i className="material-icons">drag_indicator</i>
          </div>
          {expandable ? (
            <div
              onClick={handleExpansion}
              className="d-flex align-items-center"
            >
              {expanded ? finalExpandIcon : finalCollapseIcon}
            </div>
          ) : (
            blankIcon
          )}
          {checkBoxSelection && (
            <div className="d-flex align-items-center">
              <IndeterminateCheckbox
                checked={checkBoxSelected}
                id={`${rootId}_cbselection_${nodeId}`}
                onClick={handleCheckBoxSelection}
                indeterminate={checkBoxIndeterminate}
              />
            </div>
          )}

          {finalItemIcon && (
            <div className="d-flex align-items-center">{finalItemIcon}</div>
          )}
          <div
            onClick={handleNodeSelection}
            className="d-flex align-items-center"
          >
            {label}
          </div>
        </li>
      </TreeViewItemStyled>

      {children && (
        <TreeViewItemContext.Provider
          value={{
            level: level + 1,
            parentId: nodeId,
            registerDescendant,
            unRegisterDescendant,
            updateDescendant,
            onDescendantToggleCbSelection,
          }}
        >
          <TreeViewItemGroupStyled
            expanded={expanded ? "true" : "false"}
            role="group"
          >
            {children}
          </TreeViewItemGroupStyled>
        </TreeViewItemContext.Provider>
      )}
    </>
  )
}

TreeViewItem.displayName = "TreeViewItem"
TreeViewItem.propTypes = propTypes

export default TreeViewItem
