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
  const [dragNDrop, setDragNDrop] = useState({
    isDragging: false,
    origin: POSITION,
    translation: POSITION,
  })
  const dragRef = useRef(null)
  const dragCopyRef = useRef(null)
  const treeViewItemRef = useRef(null)

  const styles = useMemo(
    () => ({
      width: "100%",
      display: dragNDrop.isDragging ? "inline-block" : "none",
      cursor: dragNDrop.isDragging ? "-webkit-grabbing" : "-webkit-grab",
      transform: `translate(${dragNDrop.translation.x}px, ${dragNDrop.translation.y}px)`,
      transition: dragNDrop.isDragging ? "none" : "transform 500ms",
      zIndex: dragNDrop.isDragging ? 2 : 1,
      position: "fixed",
    }),
    [dragNDrop.isDragging, dragNDrop.translation]
  )

  const newStyles = useMemo(
    () => ({
      width: treeViewItemRef.current ? treeViewItemRef.current.width : "400px",
      transform: `translate(calc(${dragNDrop.translation.x}px - 50%), calc(${dragNDrop.translation.y}px - 50%))`,
      msTransform: `translateX(${dragNDrop.translation.x}px) translateX(-50%) translateY(${dragNDrop.translation.y}px) translateY(-50%)`,
      zIndex: 1000,
      left: 0,
      top: 0,
    }),
    [treeViewItemRef.current, dragNDrop.isDragging, dragNDrop.translation]
  )

  const handleDragStart = useCallback(event => {
    const { clientX, clientY } = event
    setDragNDrop(prevState => ({
      ...prevState,
      isDragging: true,
      origin: { x: clientX, y: clientY },
    }))

    const dummyImage = new Image()
    event.dataTransfer.effectAllowed = "move"
    event.dataTransfer.setDragImage(dummyImage, 0, 0)
  }, [])

  const handleDrag = useCallback(
    ({ clientX, clientY }) => {
      const translation = {
        x: clientX, // - dragNDrop.origin.x,
        y: clientY, // - dragNDrop.origin.y,
      }
      setDragNDrop(prevState => ({
        ...prevState,
        translation,
      }))
      // if (onDrag) onDrag({ translation, id })
    },
    [dragNDrop.origin]
  )

  const handleDragEnd = useCallback(() => {
    // setDragNDrop(prevState => ({
    //   ...prevState,
    //   isDragging: false,
    // }))
    // if (onDragEnd) onDragEnd()
  }, [])

  useEffect(() => {
    if (!dragNDrop.isDragging) {
      setDragNDrop(prevState => ({
        ...prevState,
        translation: POSITION,
      }))
    }
  }, [dragNDrop.isDragging])

  useEffect(() => {
    if (dragRef.current) {
      setDragNDrop(prevState => ({
        ...prevState,
        translation: POSITION,
      }))
    }
  }, [dragRef])

  useEffect(() => {
    if (treeViewItemRef.current) {
      debugger
    }
  }, [treeViewItemRef.current])

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
        ref={treeViewItemRef}
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
          <div
            className="d-flex align-items-center"
            // style={styles}
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            draggable
            ref={dragRef}
          >
            <i className="modus-icons">menu</i>
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
        {/* <div id="dummy" ref={dragCopyRef} style={styles}>
          <div style={{ background: "red" }}>Test</div>
        </div> */}
        {dragNDrop.isDragging &&
          createPortal(
            <div
              id="clone"
              style={newStyles}
              className="list-group d-inline-block position-fixed"
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
                <div
                  className="d-flex align-items-center"
                  // style={styles}
                  onDragStart={handleDragStart}
                  onDrag={handleDrag}
                  onDragEnd={handleDragEnd}
                  draggable
                  ref={dragRef}
                >
                  <i className="modus-icons">menu</i>
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
                  <div className="d-flex align-items-center">
                    {finalItemIcon}
                  </div>
                )}
                <div
                  onClick={handleNodeSelection}
                  className="d-flex align-items-center"
                >
                  {label}
                </div>
              </li>
            </div>,
            document.body
          )}
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
