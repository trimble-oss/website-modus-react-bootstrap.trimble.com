import React from "react"
import PropTypes from "prop-types"
import TreeViewContext from "./TreeViewContext"
import { TreeItem } from "./types"
import TreeViewItemContext from "./TreeViewItemContext"

export interface TreeViewProps extends React.HTMLProps<HTMLDivElement> {
  collapseIcon?: React.ReactElement
  expandIcon?: React.ReactElement
  expandAll?: boolean
  selectAll?: boolean
  onNodeToggle?: (...args: any[]) => void
  onNodeSelect?: (...args: any[]) => void
  multiSelect?: boolean
}

const propTypes = {
  /**
   * Default Collapse icon for all the Tree items including root node.
   */
  collapseIcon: PropTypes.element,

  /**
   * Default Expand icon for all the Tree items including root node.
   */
  expandIcon: PropTypes.element,

  /**
   * Expand all the nodes.
   */
  expandAll: PropTypes.bool,

  /**
   * Select all the nodes.
   */
  selectAll: PropTypes.bool,

  /**
   * Callback when a node expands or collapse.
   */
  onNodeToggle: PropTypes.func,

  /**
   * Callback when a node is selected.
   */
  onNodeSelect: PropTypes.func,

  /**
   * Enables Multiple Node selection.
   */
  multiSelect: PropTypes.bool,
}

const TreeView = React.forwardRef<HTMLDivElement, TreeViewProps>(
  (
    {
      collapseIcon,
      expandIcon,
      expandAll,
      selectAll,
      onNodeToggle,
      onNodeSelect,
      multiSelect,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const nodes = React.useRef({})
    const [expanded, setExpanded] = React.useState<number[]>([])
    const [selected, setSelected] = React.useState<number[]>([])

    // Context values
    const registerNode = React.useCallback((node: TreeItem) => {
      nodes.current[node.id] = node
    }, [])

    const unRegisterNode = React.useCallback((nodeId: number) => {
      const newNodes = { ...nodes.current }
      delete newNodes[nodeId]
      nodes.current = newNodes
    }, [])

    const toggleExpansion = React.useCallback((event: any, nodeId: number) => {
      let newExpanded

      if (expanded.indexOf(nodeId) !== -1) {
        newExpanded = expanded.filter(id => id !== nodeId)
      } else {
        newExpanded = [nodeId].concat(expanded)
      }

      if (onNodeToggle) {
        onNodeToggle(event, newExpanded)
      }

      setExpanded(newExpanded)
    }, [])

    const isExpanded = React.useCallback(
      (nodeId: number) =>
        Array.isArray(expanded) ? expanded.indexOf(nodeId) !== -1 : false,
      [expanded]
    )

    const isSelected = React.useCallback(
      (nodeId: number) =>
        Array.isArray(selected)
          ? selected.indexOf(nodeId) !== -1
          : selected === nodeId,
      [selected]
    )

    const selectNode = React.useCallback(
      (event: any, nodeId: number, multiple = false) => {
        if (multiple) {
          handleMultipleSelect(event, nodeId)
        } else {
          handleSingleSelect(event, nodeId)
        }
      },
      []
    )

    const expandAllSiblings = (event, id) => {
      const siblings = getChildrenIds(id)

      const diff = siblings.filter(child => !isExpanded(child))

      const newExpanded = expanded.concat(diff)

      if (diff.length > 0) {
        setExpanded(newExpanded)

        if (onNodeToggle) {
          onNodeToggle(event, newExpanded)
        }
      }
    }

    const handleMultipleSelect = (event, value) => {
      let newSelected
      if (selected.indexOf(value) !== -1) {
        newSelected = selected.filter(id => id !== value)
      } else {
        newSelected = [value].concat(selected)
      }

      if (onNodeSelect) {
        onNodeSelect(event, newSelected)
      }

      setSelected(newSelected)
    }

    const handleSingleSelect = (event, value) => {
      const newSelected = [value]

      if (onNodeSelect) {
        onNodeSelect(event, newSelected)
      }

      setSelected(newSelected)
    }

    // Helpers
    const getChildrenIds = nodeId => {
      const array = Object.keys(nodes.current).map(key => {
        return nodes.current[key]
      })

      return getChildren(array, nodeId)
    }

    function getChildren(array, id) {
      return array.reduce((r, { menuId, parentId }) => {
        if (parentId === id) {
          r.push(menuId, ...getChildren(array, menuId))
        }
        return r
      }, [])
    }

    return (
      <TreeViewContext.Provider
        value={{
          registerNode,
          unRegisterNode,
          isExpanded,
          isSelected,
          toggleExpansion,
          selectNode,
          multiSelect: multiSelect,
        }}
      >
        <TreeViewItemContext.Provider value={{ parentId: null, level: 1 }}>
          <div {...props}>{children}</div>
        </TreeViewItemContext.Provider>
      </TreeViewContext.Provider>
    )
  }
)

TreeView.propTypes = propTypes
TreeView.displayName = "TreeView"

export default TreeView
