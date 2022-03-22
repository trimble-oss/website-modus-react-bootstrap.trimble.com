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

export interface TreeViewItemProps
  extends Omit<React.HTMLProps<HTMLLIElement>, "label"> {
  nodeId: number
  label: React.ReactNode | React.ReactElement | string
  collapseIcon?: React.ReactElement
  expandIcon?: React.ReactElement
  itemIcon?: React.ReactElement
  disableSelection?: boolean
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
    isIndeterminate,
    checkBoxSelection,
    multiSelectCheckBox,
    collapseIcon: defaultCollapseIcon,
    expandIcon: defaultExpandIcon,
    itemIcon: defaultItemIcon,
  } = useContext(TreeViewContext)

  const childNodes = useRef<TreeItem[]>([])
  const {
    parentId,
    level,
    registerDescendant: registerDescendantOnParent,
    unRegisterDescendant: unRegisterDescendantOnParent,
    updateDescendant: updateDescendantOnParent,
    onDescendantToggleCbSelection: onDescendantToggleCbSelectionOnParent,
  } = useContext(TreeViewItemContext)
  const forceUpdate = useForceUpdate()

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

  React.useEffect(() => {
    const node = { id: nodeId, parentId, label }
    registerNode && registerNode(node)
    multiSelectCheckBox &&
      registerDescendantOnParent &&
      registerDescendantOnParent(nodeId, childNodes.current)

    return () => {
      unRegisterNode && unRegisterNode(nodeId)
      multiSelectCheckBox &&
        unRegisterDescendantOnParent &&
        unRegisterDescendantOnParent(nodeId)
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
        const all = [...getChildren(childNodes.current), nodeId]
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

  const registerDescendant = React.useCallback(
    (id, children, index?: number) => {
      if (childNodes.current) {
        let nodeIndex = _findIndex(childNodes.current, node => node.id === id)
        if (nodeIndex >= 0) {
          if (index) {
            childNodes.current.splice(nodeIndex, 1)
            childNodes.current.splice(index, 0, {
              ...childNodes.current[nodeIndex],
              id,
              children,
            })
          } else {
            childNodes.current.splice(nodeIndex, 1, {
              ...childNodes.current[nodeIndex],
              id,
              children,
            })
          }
        } else {
          childNodes.current.push({ id, children, parentId: nodeId })
        }

        updateDescendantOnParent &&
          updateDescendantOnParent(nodeId, childNodes.current)
      }

      console.log(
        `Node ${nodeId} children after added: ${
          childNodes.current && childNodes.current.map(i => i.id).toString()
        }`
      )
    },
    [nodeId, updateDescendantOnParent]
  )

  const unRegisterDescendant = React.useCallback(id => {
    if (childNodes.current) {
      childNodes.current = childNodes.current.filter(node => node.id !== id)
    }

    console.log(
      `Node ${nodeId} children after added: ${
        childNodes.current && childNodes.current.map(i => i.id).toString()
      }`
    )
  }, [])

  const updateDescendant = React.useCallback(
    (id, children) => {
      if (childNodes.current) {
        let nodeIndex = _findIndex(childNodes.current, node => node.id === id)
        if (nodeIndex >= 0) {
          childNodes.current.splice(nodeIndex, 1, {
            ...childNodes.current[nodeIndex],
            id,
            children,
          })
        } else {
          childNodes.current.push({ id, parentId: nodeId, children })
        }

        // update also the parent
        updateDescendantOnParent &&
          updateDescendantOnParent(nodeId, childNodes.current)
      }

      console.log(
        `Node ${nodeId} children after updated: ${
          childNodes.current && childNodes.current.map(i => i.id).toString()
        }`
      )
    },
    [updateDescendantOnParent]
  )

  const onDescendantToggleCbSelection = React.useCallback(
    (event, descendantId, checkedArray, uncheckedArray) => {
      if (childNodes.current) {
        const childNodesFiltered = childNodes.current
          .map(node => node.id)
          .filter(id => id !== descendantId)

        let finalCheckedArray = [...checkedArray]
        let finalUnCheckedArray = [...uncheckedArray]
        childNodesFiltered.forEach(id => {
          if (isCheckBoxSelected(id)) finalCheckedArray.push(id)
          else finalUnCheckedArray.push(id)
        })

        // decides whether current node should be in the checked array or unchecked array
        if (finalUnCheckedArray.length > 0) finalUnCheckedArray.push(nodeId)
        else finalCheckedArray.push(nodeId)

        onDescendantToggleCbSelectionOnParent
          ? onDescendantToggleCbSelectionOnParent(
              event,
              nodeId,
              finalCheckedArray,
              finalUnCheckedArray
            )
          : toggleMultiCheckBoxSelection(
              event,
              finalCheckedArray,
              finalUnCheckedArray
            )
      }
    },
    [
      nodeId,
      isCheckBoxSelected,
      toggleMultiCheckBoxSelection,
      onDescendantToggleCbSelectionOnParent,
    ]
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
      >
        <li
          className={classNames(
            "modus-tree-view-item list-group-item list-item-leftright-control",
            nodeSelected && "active",
            className
          )}
          {...rest}
          ref={ref}
        >
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
