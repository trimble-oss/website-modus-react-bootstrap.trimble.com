import React from "react"
import PropTypes from "prop-types"
import TreeViewContext from "./TreeViewContext"
import { TreeItem } from "./types"
import TreeViewItemContext from "./TreeViewItemContext"
import classNames from "classnames"

export interface TreeViewProps extends React.HTMLProps<HTMLUListElement> {
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

    React.useEffect(() => {
      if (onNodeSelect) {
        onNodeSelect(selected)
      }
    }, [selected])

    React.useEffect(() => {
      if (onNodeToggle) {
        onNodeToggle(expanded)
      }
    }, [expanded])

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
      setExpanded(prevState => {
        if (prevState.indexOf(nodeId) !== -1) {
          newExpanded = prevState.filter(id => id !== nodeId)
        } else {
          newExpanded = [nodeId].concat(prevState)
        }
        return newExpanded
      })
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

    const toggleSelection = React.useCallback(
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
      const siblings = getChildren(getNodesArray(), id)

      const diff = siblings.filter(child => !isExpanded(child))

      const newExpanded = expanded.concat(diff)

      if (diff.length > 0) {
        setExpanded(newExpanded)
      }
    }

    const handleMultipleSelect = (event, value) => {
      let newSelected

      setSelected(prevState => {
        const array = getNodesArray()
        const siblings = getChildren(array, value)
        if (prevState.indexOf(value) !== -1) {
          //filter out parents

          let parents = getParents(value)

          // filter out parents & children
          let filtered = prevState.filter(
            id =>
              siblings.indexOf(id) < 0 &&
              id !== value &&
              parents.indexOf(id) < 0
          )

          newSelected = filtered
        } else {
          let filtered = prevState.filter(id => siblings.indexOf(id) < 0)
          newSelected = filtered.concat([value], siblings)
        }

        return newSelected
      })
    }

    const handleSingleSelect = (event, value) => {
      const newSelected = [value]

      setSelected(prevState => {
        return newSelected
      })
    }

    // Helpers
    const getNodesArray = () =>
      Object.keys(nodes.current).map(key => {
        return nodes.current[key]
      })

    function getChildren(array, nodeId) {
      return array.reduce((r, { id, parentId }) => {
        if (parentId === nodeId) {
          r.push(id, ...getChildren(array, id))
        }
        return r
      }, [])
    }

    function getParents(nodeId) {
      let { parentId } = nodes.current[nodeId]
      let parents = []
      while (parentId != null) {
        parents.push(parentId)
        parentId = nodes.current[parentId].parentId
      }

      return parents
    }

    return (
      <TreeViewContext.Provider
        value={{
          registerNode,
          unRegisterNode,
          isExpanded,
          isSelected,
          toggleExpansion,
          toggleSelection,
          multiSelect: multiSelect,
        }}
      >
        <TreeViewItemContext.Provider value={{ parentId: null, level: 1 }}>
          <ul className={classNames("list-group", className)} {...props}>
            {children}
          </ul>
        </TreeViewItemContext.Provider>
      </TreeViewContext.Provider>
    )
  }
)

TreeView.propTypes = propTypes
TreeView.displayName = "TreeView"

export default TreeView
