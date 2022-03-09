import React, { useContext } from "react"
import PropTypes, { node } from "prop-types"
import TreeViewContext from "./TreeViewContext"
import TreeViewItemContext from "./TreeViewItemContext"
import classNames from "classnames"
import { Form } from "@trimbleinc/modus-react-bootstrap"
import TreeViewItemStyled, {
  TreeViewItemGroupStyled,
} from "./TreeViewItemStyled"

export interface TreeViewItemProps
  extends Omit<React.HTMLProps<HTMLLIElement>, "label"> {
  nodeId: number
  label: React.ReactNode
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
  label: PropTypes.element,

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
    toggleCheckBoxSelection,
    isIndeterminate,
    checkBoxSelection,
    collapseIcon: defaultCollapseIcon,
    expandIcon: defaultExpandIcon,
    itemIcon: defaultItemIcon,
  } = useContext(TreeViewContext)

  const { parentId, level } = useContext(TreeViewItemContext)

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
    if (registerNode) {
      registerNode({ id: nodeId, parentId, label })
      return () => {
        unRegisterNode && unRegisterNode(nodeId)
      }
    }
    return undefined
  }, [registerNode, unRegisterNode, nodeId, parentId, label])

  const handleNodeSelection = React.useCallback(
    (e: any) => {
      toggleNodeSelection(e, nodeId)
    },
    [toggleNodeSelection]
  )

  const handleCheckBoxSelection = React.useCallback(
    (e: any) => {
      e.stopPropagation()
      toggleCheckBoxSelection(e, nodeId)
    },
    [toggleCheckBoxSelection]
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
          value={{ parentId: nodeId, level: level + 1 }}
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
