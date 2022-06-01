import React, { useContext, useEffect, useMemo, useRef, useState } from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import _findIndex from "lodash/findIndex"
import _every from "lodash/every"
import _merge from "lodash/merge"
import { Form } from "@trimbleinc/modus-react-bootstrap"
import TreeViewItemStyled, {
  TreeViewItemGroupStyled,
} from "./TreeViewItemStyled"
import TreeViewContext from "./TreeViewContext"
import TreeViewItemContext from "./TreeViewItemContext"
import { TreeItem } from "./types"
import { useDescendant } from "./useDescendant"

export interface TreeViewItemProps
  extends Omit<React.HTMLAttributes<HTMLLIElement>, "label"> {
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

  /**
   * Disables the TreeItem and its content.
   */
  disabled: PropTypes.bool,
}

const IndeterminateCheckbox = React.forwardRef<
  HTMLInputElement,
  {
    id: string
    indeterminate?: any
    onClick?: (...args: any[]) => void
    onFocus?: (...args: any[]) => void
    onKeydown?: (...args: any[]) => void
    checked?: boolean
    tabIndex?: number
  }
>(
  (
    {
      id,
      indeterminate,
      checked,
      tabIndex,
      onFocus,
      onClick,
      onKeydown,
      ...props
    },
    ref
  ) => {
    const defaultRef = React.useRef<HTMLInputElement>(null)
    const resolvedRef = ref || defaultRef

    useEffect(() => {
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
        onKeyDown={onKeydown}
        onFocus={onFocus}
        tabIndex={tabIndex}
        {...props}
      />
    )
  }
)

const TreeViewItem = React.forwardRef<HTMLLIElement, TreeViewItemProps>(
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
      isNodeInFocus,
      isNodeSelected,
      isCheckBoxSelected,
      toggleExpansion,
      toggleNodeSelection,
      toggleSingleCheckBoxSelection,
      toggleMultiCheckBoxSelection,
      focusNode,
      onKeyPress,
      isIndeterminate,
      checkBoxSelection,
      multiSelectCheckBox,
      collapseIcon: defaultCollapseIcon,
      expandIcon: defaultExpandIcon,
      itemIcon: defaultItemIcon,
      dragIcon: defaultDragIcon,
    } = useContext(TreeViewContext)

    const defaultRef = React.useRef<HTMLDivElement>(null)
    const resolvedRef = (ref ||
      defaultRef) as React.MutableRefObject<HTMLLIElement>
    const focusSource = useRef(null)

    const [treeItemElement, setTreeItemElement] = useState(null)

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
    const inFocus = isNodeInFocus(nodeId)

    const finalExpandIcon = expandIcon || defaultExpandIcon || (
      <i className="modus-icons">chevron_down_thick</i>
    )
    const finalCollapseIcon = expandIcon || defaultCollapseIcon || (
      <i className="modus-icons">chevron_right</i>
    )
    const finalItemIcon = itemIcon || defaultItemIcon
    const finalDragIcon = dragIcon || defaultDragIcon
    const blankIcon = <i className="modus-icons">blank</i>

    const defaultTabIndex = disabled ? -1 : 0

    const {
      parentId,
      level,
      index,
      getChildNodes,
      registerDescendant,
      unRegisterDescendant,
      updateDescendant,
      onDescendantToggleCbSelection,
      onDescendantToggleCbSelectionOnParent,
    } = useDescendant(
      nodeId,
      treeItemElement,
      isCheckBoxSelected,
      toggleMultiCheckBoxSelection
    )

    useEffect(() => {
      if (registerNode)
        registerNode({ id: nodeId, parentId, label, disabled, index })

      return () => {
        unRegisterNode && unRegisterNode(nodeId)
      }
    }, [registerNode, unRegisterNode, nodeId, parentId, label, disabled, index])

    useEffect(() => {
      let ele = resolvedRef.current
      if (inFocus && !focusSource.current) {
        ele.focus()
      }
    }, [resolvedRef.current, inFocus])

    useEffect(() => {
      setTreeItemElement(resolvedRef.current)
    }, [resolvedRef.current])

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

    const handleFocus = React.useCallback(
      (e: any) => {
        // do not update focus state if it is in disabled state or already in focus
        if (disabled || inFocus) return

        if (e.target === e.currentTarget) {
          let ele = resolvedRef.current
          ele.focus({
            preventScroll: true,
          })
        }
        focusSource.current = e.target
        focusNode(e, nodeId)
      },
      [toggleExpansion]
    )

    const handleBlur = React.useCallback((e: any) => {
      focusSource.current = null
    }, [])

    const stopPropagation = React.useCallback(
      (e, flag) => flag && e.stopPropagation(),
      []
    )

    const getChildren = (array: TreeItem[]): number[] => {
      if (!array) return []
      return array.reduce((r, { id, children }) => {
        r.push(id, ...getChildren(children))
        return r
      }, [])
    }

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
          className={classNames(
            "list-group-item list-item-leftright-control",
            nodeSelected && "active",
            disabled && "disabled",
            className
          )}
          tabIndex={defaultTabIndex}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={e => {
            onKeyPress(e, () => toggleNodeSelection(e, nodeId))
          }}
          onClick={handleNodeSelection}
          ref={resolvedRef}
          {...rest}
        >
          <div className="d-flex align-items-center">
            <div
              className="drag-icon"
              style={{ display: "inline-flex" }}
              tabIndex={finalDragIcon ? defaultTabIndex : -1}
              onClick={e => stopPropagation(e, finalDragIcon)}
            >
              {finalDragIcon || blankIcon}
            </div>
            <span className="tree-item-level" />
            <div
              onClick={expandable ? handleExpansion : () => {}}
              style={{ display: "inline-flex" }}
              tabIndex={expandable ? defaultTabIndex : -1}
              onKeyDown={e => {
                onKeyPress(e, () => toggleExpansion(e, nodeId))
              }}
              onFocus={e => {}}
            >
              {expandable
                ? expanded
                  ? finalExpandIcon
                  : finalCollapseIcon
                : blankIcon}
            </div>
          </div>

          {checkBoxSelection && (
            <div
              className="d-flex align-items-center"
              onClick={e => stopPropagation(e, true)}
            >
              <IndeterminateCheckbox
                checked={checkBoxSelected}
                id={`${rootId}_cbselection_${nodeId}`}
                onClick={handleCheckBoxSelection}
                indeterminate={checkBoxIndeterminate}
                tabIndex={defaultTabIndex}
                onKeydown={e => {
                  if (e.key !== " ")
                    onKeyPress(e, () => handleCheckBoxSelection(e))
                }}
                onFocus={e => {}}
              />
            </div>
          )}

          {finalItemIcon && (
            <div
              className="d-flex align-items-center"
              tabIndex={defaultTabIndex}
              onClick={e => stopPropagation(e, true)}
            >
              {finalItemIcon}
            </div>
          )}
          <div className="d-flex align-items-center">{label}</div>
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
              className="list-group"
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
