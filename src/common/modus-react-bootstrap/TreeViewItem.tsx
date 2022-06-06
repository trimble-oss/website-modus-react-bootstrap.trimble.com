import React, { useContext, useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import TreeViewContext from "./TreeViewContext"
import TreeViewItemContext from "./TreeViewItemContext"
import { TreeItem } from "./types"
import { TreeViewItemStyled, TreeViewItemGroupStyled } from "./TreeViewStyled"
import useTreeViewDescendant from "./useTreeViewDescendants"
import IndeterminateCheckbox from "./IndeterminateCheckbox"

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
  /** An unique numerical id for Tree Item */
  nodeId: PropTypes.number.isRequired,

  /** Tree Item label */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

  /** Collapse icon for the Tree node. */
  collapseIcon: PropTypes.element,

  /** Expand icon for the Tree node. */
  expandIcon: PropTypes.element,

  /** Icon to appear before the label. */
  itemIcon: PropTypes.element,

  /** Drag icon to appear before collapse/expand icon. */
  dragIcon: PropTypes.element,

  /** Disables the Tree node and its children. */
  disabled: PropTypes.bool,
}

const TreeViewContent: React.FunctionComponent<
  React.HTMLProps<HTMLDivElement>
> = ({ className, children, ...props }) => {
  return (
    <div
      className={classNames("d-flex align-items-center", className)}
      {...props}
    >
      {children}
    </div>
  )
}
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

    const resolvedRef = (ref ||
      React.useRef<HTMLLIElement>(
        null
      )) as React.MutableRefObject<HTMLLIElement>

    // Used for tracking whether the focus is triggered from a tab key focus event or driven by Tree view state
    const focusSource = useRef(null)

    // Used by descendant context to find the index of repositioned elements
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
      descendants,
      updateCheckboxSelectionOnParent,
      ...descendantContext
    } = useTreeViewDescendant({
      nodeId,
      element: treeItemElement,
      hasCheckBoxSelected: isCheckBoxSelected,
      handleCheckboxSelection: toggleMultiCheckBoxSelection,
    })

    useEffect(() => {
      if (registerNode)
        registerNode({ id: nodeId, parentId, label, disabled, index })

      return () => {
        unRegisterNode && unRegisterNode(nodeId)
      }
    }, [registerNode, unRegisterNode, nodeId, parentId, label, disabled, index])

    // This effect is used to bring focus on the Tree Item manually
    // Triggered from keyboard interaction such as arrow up/down key press
    useEffect(() => {
      let ele = resolvedRef.current

      if (inFocus && !focusSource.current) {
        console.log("am here too inside!!")
        ele.focus()
      }
      console.log(`Node id ${nodeId} is in focus${inFocus}`)
      console.log(focusSource.current)
      console.log("am here too outside!!")
    }, [inFocus])

    useEffect(() => {
      console.log(`re-render ${nodeId}`)
    }, [])

    useEffect(() => {
      setTreeItemElement(resolvedRef.current)
    }, [resolvedRef.current])

    const handleNodeSelection = React.useCallback(
      (e: any) => {
        console.log("node selection")
        console.log(e.target)
        console.log(e.currentTarget)
        toggleNodeSelection(e, nodeId)
      },
      [toggleNodeSelection]
    )

    const handleCheckBoxSelection = React.useCallback(
      (e: any) => {
        e.stopPropagation()
        if (multiSelectCheckBox) {
          const all = [...getChildrenNodeIds(descendants), nodeId]
          let checked = []
          let unchecked = []

          // toggle checkbox selection on children
          if (isCheckBoxSelected(nodeId)) unchecked = all
          else checked = all

          // if parent is not the root update checkbox selection at the parent node
          if (updateCheckboxSelectionOnParent)
            updateCheckboxSelectionOnParent(e, nodeId, checked, unchecked)
          else toggleMultiCheckBoxSelection(e, checked, unchecked)
        } else toggleSingleCheckBoxSelection(e, nodeId)
      },
      [
        descendants,
        multiSelectCheckBox,
        isCheckBoxSelected,
        toggleSingleCheckBoxSelection,
        toggleMultiCheckBoxSelection,
        updateCheckboxSelectionOnParent,
      ]
    )

    const handleExpansion = React.useCallback(
      (e: any) => {
        e.stopPropagation()
        toggleExpansion(e, nodeId)
      },
      [toggleExpansion]
    )

    //using handlefocus breaks add & edit functionalities
    const handleFocus = React.useCallback(
      (e: any) => {
        // console.log("focus")
        // console.log(e.target)
        // console.log(e.currentTarget)
        // console.log("in focus?" + inFocus)

        // do not update focus state if it is in a disabled state or if already in focus
        if (disabled || inFocus) return

        if (e.target === e.currentTarget) {
          console.log("here am inside!!")
          let ele = resolvedRef.current
          ele.focus({
            preventScroll: true,
          })
        }
        focusSource.current = e.target
        console.log(focusSource.current)
        console.log("here am outside!!")
        focusNode(e, nodeId)
        e.preventDefault()
      },
      [disabled, inFocus, focusNode]
    )

    const handleBlur = React.useCallback((e: any) => {
      console.log("blur")
      console.log(e.target)
      console.log(e.currentTarget)
      focusSource.current = null
    }, [])

    const stopPropagation = React.useCallback(
      (e, flag) => flag && e.stopPropagation(),
      []
    )

    const getChildrenNodeIds = (array: TreeItem[]): number[] => {
      if (!array) return []
      return array.reduce((r, { id, children }) => {
        r.push(id, ...getChildrenNodeIds(children))
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
            console.log("key down")
            console.log(e.target)
            console.log(e.currentTarget)

            if (e.target === e.currentTarget)
              onKeyPress(e, () => toggleNodeSelection(e, nodeId))
          }}
          onClick={handleNodeSelection}
          ref={resolvedRef}
          {...rest}
        >
          <TreeViewContent>
            <div
              style={{ display: "inline-flex" }}
              tabIndex={finalDragIcon ? defaultTabIndex : -1}
              onClick={e => stopPropagation(e, finalDragIcon ? true : false)}
            >
              {finalDragIcon || blankIcon}
            </div>
            <span className="tree-item-level" />
            <div
              style={{ display: "inline-flex" }}
              tabIndex={expandable ? defaultTabIndex : -1}
              onKeyDown={e => {
                onKeyPress(e, () => toggleExpansion(e, nodeId))
              }}
              onClick={expandable ? handleExpansion : () => {}}
              onFocus={e => {}} // to retain focus
            >
              {expandable
                ? expanded
                  ? finalExpandIcon
                  : finalCollapseIcon
                : blankIcon}
            </div>
          </TreeViewContent>

          {checkBoxSelection && (
            <TreeViewContent onClick={e => stopPropagation(e, true)}>
              <IndeterminateCheckbox
                checked={checkBoxSelected}
                id={`${rootId}_cbselection_${nodeId}`}
                indeterminate={checkBoxIndeterminate}
                tabIndex={defaultTabIndex}
                onKeyDown={e => {
                  if (e.key !== " ")
                    onKeyPress(e, () => handleCheckBoxSelection(e))
                }}
                onClick={handleCheckBoxSelection}
                onFocus={e => {}} // to retain focus
              />
            </TreeViewContent>
          )}

          {finalItemIcon && (
            <TreeViewContent
              tabIndex={defaultTabIndex}
              onClick={e => stopPropagation(e, true)}
            >
              {finalItemIcon}
            </TreeViewContent>
          )}
          <div className="d-flex align-items-center">{label}</div>
        </TreeViewItemStyled>

        {children && (
          <TreeViewItemContext.Provider
            value={{
              level: level + 1,
              parentId: nodeId,
              ...descendantContext,
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
