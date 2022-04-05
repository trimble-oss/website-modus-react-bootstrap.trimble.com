import React, { useState } from "react"
import PropTypes from "prop-types"
import TreeViewContext, { TreeViewDragContext } from "./TreeViewContext"
import { TreeItem } from "./types"
import TreeViewItemContext from "./TreeViewItemContext"
import classNames from "classnames"
import _merge from "lodash/merge"

export interface TreeViewProps
  extends Omit<React.HTMLProps<HTMLUListElement>, "expanded" | "selected"> {
  id: string
  collapseIcon?: React.ReactElement
  expandIcon?: React.ReactElement
  itemIcon?: React.ReactElement
  checkBoxSelection?: boolean
  multiSelectNode?: boolean
  multiSelectCheckBox?: boolean
  expanded?: number[]
  defaultExpanded?: number[]
  defaultSelected?: number[]
  onNodeToggle?: (event: any, expanded: number[]) => void
  onNodeSelect?: (event: any, selected: number[]) => void
  onCheckBoxSelect?: (event: any, selected: number[]) => void
}

const propTypes = {
  /**
   * Tree View Unique Identifier.
   */
  id: PropTypes.string.isRequired,
  /**
   * Default Collapse icon for all the Tree items including root node.
   */
  collapseIcon: PropTypes.element,

  /**
   * Default Expand icon for all the Tree items including root node.
   */
  expandIcon: PropTypes.element,

  /**
   * Icon to appear before the label.
   */
  itemIcon: PropTypes.element,

  /**
   * Enables checkbox selection on nodes.
   */
  checkBoxSelection: PropTypes.bool,

  /**
   * Enables Multiple Node selection.
   */
  multiSelectNode: PropTypes.bool,

  /**
   * Enables Multiple CheckBox selection.
   */
  multiSelectCheckBox: PropTypes.bool,

  /**
   * Nodes that needed to be expanded by default.
   */
  defaultExpanded: PropTypes.arrayOf(PropTypes.number),

  /**
   * Node(s) that needed to be selected by default (if multiSelect not enabled only the first node is considered).
   */
  defaultSelected: PropTypes.arrayOf(PropTypes.number),

  /**
   * To Expand the nodes manually.
   */
  expanded: PropTypes.arrayOf(PropTypes.number),

  /**
   * Callback when a node expands or collapse.
   */
  onNodeToggle: PropTypes.func,

  /**
   * Callback when a single node or multiple nodes selected.
   */
  onNodeSelect: PropTypes.func,

  /**
   * Callback when checkbox on a single or multiple nodes selected.
   */
  onCheckBoxSelect: PropTypes.func,
}

const TreeView = React.forwardRef<HTMLUListElement, TreeViewProps>(
  (
    {
      id,
      collapseIcon,
      expandIcon,
      itemIcon,
      onNodeToggle,
      onNodeSelect,
      onCheckBoxSelect,
      checkBoxSelection,
      multiSelectNode,
      multiSelectCheckBox,
      defaultExpanded,
      defaultSelected,
      expanded,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const nodes = React.useRef({})
    const expandedProp = React.useRef([])
    const [nodesExpanded, setExpanded] = React.useState<number[]>(
      [].concat(defaultExpanded)
    )
    const [nodesSelected, setNodeSelected] = React.useState<number[]>(
      [].concat(
        defaultSelected && defaultSelected.length > 1 && !multiSelectNode
          ? [defaultSelected[0]]
          : defaultSelected
      )
    )
    const [nodeCheckBoxSelected, setNodeCheckBoxSelected] = React.useState<
      number[]
    >([])
    const [droppableNode, setDroppableNode] = useState<number>()

    // Update nodesExpanded state only when the API expanded value changes
    React.useEffect(() => {
      if (expanded !== undefined && expandedProp.current !== expanded) {
        expandedProp.current = expanded
        setExpanded(expanded)
      }
    }, [expanded])

    // Tree view context
    // Actions
    const registerNode = React.useCallback((node: TreeItem) => {
      nodes.current[node.id] = node
    }, [])

    const unRegisterNode = React.useCallback((nodeId: number) => {
      const newNodes = { ...nodes.current }
      delete newNodes[nodeId]
      nodes.current = newNodes
    }, [])

    const toggleExpansion = React.useCallback((event: any, nodeId: number) => {
      let newExpanded = []
      setExpanded(prevState => {
        let oldExpanded = prevState || []
        if (oldExpanded.indexOf(nodeId) !== -1) {
          newExpanded = oldExpanded.filter(id => id !== nodeId)
        } else {
          newExpanded = [nodeId].concat(oldExpanded)
        }

        if (onNodeToggle) {
          onNodeToggle(event, newExpanded)
        }
        return newExpanded
      })
    }, [])

    const toggleNodeSelection = React.useCallback(
      (event: any, nodeId: number) => {
        // TODO: implement shift + click, ctrl + click for multi selection on node
        handleSelection(event, nodeId, setNodeSelected, onNodeSelect, false)
      },
      []
    )

    const toggleSingleCheckBoxSelection = React.useCallback(
      (event: any, nodeId: number) => {
        handleSelection(
          event,
          nodeId,
          setNodeCheckBoxSelected,
          onCheckBoxSelect,
          false
        )
      },
      []
    )

    const toggleMultiCheckBoxSelection = React.useCallback(
      (event: any, selected: number[], unselected: number[]) => {
        setNodeCheckBoxSelected(oldItems => {
          const newItems = [
            ...oldItems.filter(node => unselected.indexOf(node) < 0),
            ...selected,
          ]
          if (onCheckBoxSelect) onCheckBoxSelect(event, newItems)
          return newItems
        })
      },
      []
    )

    const updateDroppableNode = React.useCallback((nodeId: number | null) => {
      setDroppableNode(nodeId)
    }, [])

    const getDroppableNode = React.useCallback((x: any, y: any) => {
      const node = getNodesArray().find(({ id, ref }) => {
        const rect = ref.getBoundingClientRect()
        if (rect) {
          const inVerticalBounds = y >= rect.top && y <= rect.bottom
          const inHorizontalBounds = x >= rect.left && x <= rect.right
          return inVerticalBounds && inHorizontalBounds
        }
        return false
      })
      return node
    }, [])

    // Verifiers
    const isExpanded = React.useCallback(
      (nodeId: number) =>
        Array.isArray(nodesExpanded)
          ? nodesExpanded.indexOf(nodeId) !== -1
          : false,
      [nodesExpanded]
    )

    const isNodeSelected = React.useCallback(
      (nodeId: number) => {
        return nodesSelected.indexOf(nodeId) !== -1
      },
      [nodesSelected]
    )

    const isCheckBoxSelected = React.useCallback(
      (nodeId: number) =>
        Array.isArray(nodeCheckBoxSelected)
          ? nodeCheckBoxSelected.indexOf(nodeId) !== -1
          : nodeCheckBoxSelected === nodeId,
      [nodeCheckBoxSelected]
    )

    const isIndeterminate = React.useCallback(
      (nodeId: number) => {
        const childNodes = getChildren(getNodesArray(), nodeId)
        if (!childNodes || childNodes.length === 0) return false

        const unSelectChildNodes = childNodes.filter(
          node => nodeCheckBoxSelected.indexOf(node) < 0
        )

        if (
          unSelectChildNodes.length !== childNodes.length &&
          unSelectChildNodes.length > 0
        )
          return true
        return false
      },
      [nodeCheckBoxSelected]
    )

    // Handlers
    const handleSelection = (
      event: any,
      nodeId: number,
      setStatefn: (value: React.SetStateAction<number[]>) => void,
      callBackfn: (event: any, value: number[]) => void,
      multiple = false
    ) => {
      let newSelected = []
      if (multiple) {
        newSelected = handleMultipleSelect(nodeId, setStatefn)
      } else {
        newSelected = handleSingleSelect(nodeId, setStatefn)
      }

      if (callBackfn) callBackfn(event, newSelected)
    }

    const handleMultipleSelect = (
      value,
      setStatefn: (value: React.SetStateAction<number[]>) => void
    ): number[] => {
      let newSelected

      setStatefn(prevState => {
        const oldSelected = prevState || []
        const array = getNodesArray()
        const childNodes = getChildren(array, value)

        // unselect parents and children
        if (oldSelected.indexOf(value) !== -1) {
          const parents = getParents(value)
          let filtered = oldSelected.filter(
            id =>
              childNodes.indexOf(id) < 0 &&
              id !== value &&
              parents.indexOf(id) < 0
          )

          newSelected = filtered
        }
        // select children and parents with all child nodes selected
        else {
          let filtered = oldSelected.filter(id => childNodes.indexOf(id) < 0)
          newSelected = filtered.concat([value], childNodes)

          // let parentId = nodes[value].parentId
          // while(parentId){
          //   let siblings = getChildren
          // }
        }

        return newSelected
      })

      return newSelected
    }

    const handleSingleSelect = (
      value,
      setStatefn: (value: React.SetStateAction<number[]>) => void
    ): number[] => {
      const newSelected = [value]
      setStatefn(newSelected)

      return newSelected
    }

    // Helpers
    const getNodesArray = React.useCallback(
      () =>
        Object.keys(nodes.current).map(key => {
          return nodes.current[key]
        }) as TreeItem[],
      [nodes]
    )

    function getChildren(array: TreeItem[], nodeId: number): number[] {
      return array.reduce((r, { id, parentId }) => {
        if (parentId === nodeId) {
          r.push(id, ...getChildren(array, id))
        }
        return r
      }, [])
    }

    const getParents = React.useCallback(
      (nodeId: number): number[] => {
        let { parentId } = nodes.current[nodeId]
        let parents = []
        while (parentId != null) {
          parents.push(parentId)
          parentId = nodes.current[parentId].parentId
        }

        return parents
      },
      [nodes]
    )

    return (
      <TreeViewContext.Provider
        value={{
          id,
          registerNode,
          unRegisterNode,
          isExpanded,
          isNodeSelected,
          isCheckBoxSelected,
          isIndeterminate,
          toggleExpansion,
          toggleNodeSelection,
          toggleSingleCheckBoxSelection,
          toggleMultiCheckBoxSelection,
          updateDroppableNode,
          getDroppableNode,
          checkBoxSelection: checkBoxSelection || multiSelectCheckBox,
          multiSelectCheckBox,
          multiSelectNode,
          collapseIcon,
          expandIcon,
          itemIcon,
        }}
      >
        <TreeViewDragContext.Provider value={droppableNode}>
          <TreeViewItemContext.Provider value={{ parentId: null, level: 1 }}>
            <ul
              className={classNames("list-group", className)}
              {...props}
              id={id}
              ref={ref}
              role="tree"
            >
              {children}
            </ul>
          </TreeViewItemContext.Provider>
        </TreeViewDragContext.Provider>
      </TreeViewContext.Provider>
    )
  }
)

TreeView.propTypes = propTypes
TreeView.displayName = "TreeView"

export default TreeView
