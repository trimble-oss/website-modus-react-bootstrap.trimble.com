import React, { useContext, useRef } from "react"
import PropTypes, { node } from "prop-types"
import TreeViewContext from "./TreeViewContext"
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

export interface TreeViewItemProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "label"> {
  nodeId: number
  label: React.ReactNode | React.ReactElement | string
  collapseIcon?: React.ReactElement
  expandIcon?: React.ReactElement
  itemIcon?: React.ReactElement
  dragIcon?: React.ReactElement
  disableSelection?: boolean
  disabled?: boolean
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
   * Drag icon to appear before collapse/expand icon.
   */
  dragIcon: PropTypes.element,
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

const TreeViewItem = React.forwardRef<HTMLDivElement, TreeViewItemProps>(
  (
    {
      className,
      children,
      nodeId,
      label,
      collapseIcon,
      expandIcon,
      itemIcon,
      dragIcon,
      disabled,
      ...rest
    }: TreeViewItemProps,
    ref
  ) => {
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
      isIndeterminate,
      checkBoxSelection,
      multiSelectCheckBox,
      collapseIcon: defaultCollapseIcon,
      expandIcon: defaultExpandIcon,
      itemIcon: defaultItemIcon,
      dragIcon: defaultDragIcon,
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
    const finalDragIcon = dragIcon || defaultDragIcon
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

    React.useEffect(() => {
      const node = { id: nodeId, parentId, label }
      registerNode && registerNode(node)

      return () => {
        unRegisterNode && unRegisterNode(nodeId)
      }
    }, [registerNode, unRegisterNode, nodeId, parentId, label])

    const handleNodeSelection = React.useCallback(
      (e: any) => {
        toggleNodeSelection(e, nodeId)
      },
      [toggleNodeSelection]
    )

    function getChildren(array: TreeItem[]): number[] {
      if (!array) return []
      return array.reduce((r, { id, children }) => {
        r.push(id, ...getChildren(children))
        return r
      }, [])
    }

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
            ? onDescendantToggleCbSelectionOnParent(
                e,
                nodeId,
                checked,
                unchecked
              )
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

    return (
      <>
        <TreeViewItemStyled
          level={level}
          checkBoxSelection={checkBoxSelection ? "true" : "false"}
          itemIcon={finalItemIcon ? "true" : "false"}
          role="treeitem"
          aria-expanded={expandable ? expanded : null}
          aria-selected={nodeSelected}
          aria-disabled={disabled}
          aria-level={level}
          className={classNames(disabled && "disabled", className)}
          ref={ref}
          {...rest}
        >
          <li
            className={classNames(
              "list-group-item list-item-leftright-control",
              nodeSelected && "active",
              disabled && "disabled"
            )}
          >
            <div className="d-flex">
              <div className="d-flex align-items-center drag-icon">
                {finalDragIcon || blankIcon}
              </div>
              <div
                onClick={expandable ? handleExpansion : () => {}}
                className="d-flex align-items-center expand-icon"
              >
                {expandable
                  ? expanded
                    ? finalExpandIcon
                    : finalCollapseIcon
                  : blankIcon}
              </div>
            </div>

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
)

TreeViewItem.displayName = "TreeViewItem"
TreeViewItem.propTypes = propTypes

export default TreeViewItem
