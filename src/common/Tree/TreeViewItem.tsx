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
    pushDroppableZone,
    popDroppableZone,
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
    const node = { id: nodeId, parentId, label }
    registerNode && registerNode(node)

    return () => {
      unRegisterNode && unRegisterNode(nodeId)
    }
  }, [registerNode, unRegisterNode, nodeId, parentId, label])

  function getChildren(array: TreeItem[]): number[] {
    if (!array) return []
    return array.reduce((r, { id, children }) => {
      r.push(id, ...getChildren(children))
      return r
    }, [])
  }

  // Drag-and-drop
  const POSITION = { x: 0, y: 0 }
  const [draggingState, setDraggingState] = useState({
    isDragging: false,
    origin: POSITION,
    translation: POSITION,
    width: "0px",
    height: "0px",
  })
  const bodyRef = useRef(null)
  const newStyles = useMemo(
    () => ({
      width: draggingState.width,
      height: draggingState.height,
      transform: `translate(calc(${draggingState.translation.x}px - 10%), calc(${draggingState.translation.y}px - 50%))`,
      msTransform: `translateX(${draggingState.translation.x}px) translateX(-50%) translateY(${draggingState.translation.y}px) translateY(-50%)`,
      zIndex: 1000,
      left: 0,
      top: 0,
      cursor: draggingState.isDragging ? "-webkit-grabbing" : "-webkit-grab",
    }),
    [draggingState]
  )
  const handleDragStart = useCallback(event => {
    const { clientX, clientY, target } = event
    setDraggingState(prevState => ({
      ...prevState,
      isDragging: true,
      origin: { x: clientX, y: clientY },
      width:
        (target && target.offsetParent && target.offsetParent.width) || "400px",
      height:
        (target && target.offsetParent && target.offsetParent.height) || "40px",
    }))

    // prevent default drag image
    const dummyImage = new Image()
    event.dataTransfer.setDragImage(dummyImage, 0, 0)
    event.dataTransfer.setData("text/plain", nodeId)
  }, [])

  const handleDrag = useCallback(
    event => {
      const { clientX, clientY } = event

      const translation = {
        x: clientX,
        y: clientY,
      }
      setDraggingState(prevState => ({
        ...prevState,
        translation,
      }))
    },
    [draggingState.origin]
  )

  const handleDragEnd = useCallback(event => {
    setDraggingState(prevState => ({
      ...prevState,
      isDragging: false,
    }))
  }, [])

  const handleDragOver = useCallback(event => {
    console.log("am dragged over " + nodeId)
    event.preventDefault()
  }, [])
  const handleDrop = useCallback(event => {
    const dropNodeId = event.dataTransfer.getData("text/plain")
    console.log(dropNodeId + " at drop zone over " + nodeId)
    event.preventDefault()
  }, [])

  useEffect(() => {
    bodyRef.current = document.body
  }, [])

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
      >
        <li
          className={classNames(
            "modus-tree-view-item list-group-item list-item-leftright-control",
            nodeSelected && "active",
            className
          )}
          {...rest}
          ref={ref}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          id={`treeitem_${nodeId}`}
        >
          <div
            className="d-flex align-items-center"
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDrag={handleDrag}
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

      {draggingState.isDragging &&
        bodyRef.current &&
        createPortal(
          <div
            id="clone"
            className={classNames("list-group d-inline-block position-fixed")}
          >
            <div>Test</div>
          </div>,
          bodyRef.current
        )}

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
