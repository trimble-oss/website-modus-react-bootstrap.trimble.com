import React, { useContext } from "react"
import PropTypes from "prop-types"
import TreeViewContext from "./TreeViewContext"
import TreeViewItemContext from "./TreeViewItemContext"
import classNames from "classnames"
import { Form } from "@trimbleinc/modus-react-bootstrap"
import TreeViewItemStyled, {
  TreeViewItemGroupStyled,
} from "./TreeViewItemStyled"

export interface TreeViewItemProps extends React.HTMLProps<HTMLLIElement> {
  nodeId: number
  label: string
  collapseIcon?: React.ReactElement
  expandIcon?: React.ReactElement
  itemIcon?: React.ReactElement
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

  /**
   * Icon to appear before the label.
   */
  itemIcon: PropTypes.element,
}

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
    registerNode,
    unRegisterNode,
    isExpanded,
    isSelected,
    toggleExpansion,
    toggleSelection,
    multiSelect,
    collapseIcon: defaultCollapseIcon,
    expandIcon: defaultExpandIcon,
    itemIcon: defaultItemIcon,
  } = useContext(TreeViewContext)

  const { parentId, level } = useContext(TreeViewItemContext)

  const expandable = Boolean(
    Array.isArray(children) ? children.length : children
  )
  const expanded = isExpanded ? isExpanded(nodeId) : false
  const selected = isSelected ? isSelected(nodeId) : false

  const finalExpandIcon = expandIcon || defaultExpandIcon || (
    <i className="modus-icons">chevron_down_thick</i>
  )
  const finalCollapseIcon = expandIcon || defaultExpandIcon || (
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

  const handleSelection = React.useCallback(
    (e: any, stopPropagation = true) => {
      if (stopPropagation) e.stopPropagation()
      toggleSelection(e, nodeId, multiSelect)
    },
    [toggleSelection]
  )

  const handleExpansion = React.useCallback(
    (e: any, stopPropagation = true) => {
      if (stopPropagation) e.stopPropagation()
      toggleExpansion(e, nodeId)
    },
    [toggleExpansion]
  )

  return (
    <>
      <TreeViewItemStyled
        level={level}
        multiSelect={multiSelect ? "true" : "false"}
        itemIcon={itemIcon ? "true" : "false"}
        {...(!multiSelect && {
          onClick: function (e) {
            handleSelection(e, false)
          },
        })}
      >
        <li
          className={classNames(
            "list-group-item list-item-leftright-control",
            selected && "active",
            multiSelect && "checkbox",
            finalItemIcon && "item-icon",
            className
          )}
          {...(!multiSelect && {
            onClick: function (e) {
              handleSelection(e, false)
            },
          })}
          {...rest}
          ref={ref}
        >
          <div onClick={handleExpansion}>
            {expandable
              ? expanded
                ? finalExpandIcon
                : finalCollapseIcon
              : blankIcon}
          </div>

          {multiSelect && (
            <Form.Check
              checked={selected}
              custom
              id={`checkboxselection_${nodeId}`}
              onChange={handleSelection}
            />
          )}

          {finalItemIcon}
          <span>{label}</span>
        </li>
      </TreeViewItemStyled>

      {children && (
        <TreeViewItemContext.Provider
          value={{ parentId: nodeId, level: level + 1 }}
        >
          <TreeViewItemGroupStyled expanded={expanded ? "true" : "false"}>
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
