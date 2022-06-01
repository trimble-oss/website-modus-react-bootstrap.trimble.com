import React, { useRef, useCallback, useState, useEffect } from "react"

import PropTypes from "prop-types"
import classNames from "classnames"
import _merge from "lodash/merge"

import { TreeItem, TreeItemExtended } from "./types"
import TreeViewContext from "./TreeViewContext"
import TreeViewItemContext from "./TreeViewItemContext"

export interface TreeViewProps
  extends Omit<React.HTMLProps<HTMLUListElement>, "expanded" | "selected"> {
  id: string
  collapseIcon?: React.ReactElement
  expandIcon?: React.ReactElement
  itemIcon?: React.ReactElement
  dragIcon?: React.ReactElement
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
   * Default icon to appear before the label for all the Tree items including root node.
   */
  itemIcon: PropTypes.element,

  /**
   * Default Dragging icon to appear before collapse/expand icon for all the Tree items including root node.
   */
  dragIcon: PropTypes.element,

  /**
   * Enables checkbox selection on all the Tree items.
   */
  checkBoxSelection: PropTypes.bool,

  /**
   * Enables selection on multiple Tree items by `Shift + Arrow Up/Down` or `Ctrl + mouse click`.
   */
  multiSelectNode: PropTypes.bool,

  /**
   * Enables checkBox selection on multiple Tree items.
   */
  multiSelectCheckBox: PropTypes.bool,

  /**
   * Tree items expanded by default.
   */
  defaultExpanded: PropTypes.arrayOf(PropTypes.number),

  /**
   * Tree items selected by default (if multiSelect not enabled only the first value is considered).
   */
  defaultSelected: PropTypes.arrayOf(PropTypes.number),

  /**
   * Expand the Tree items.
   */
  expanded: PropTypes.arrayOf(PropTypes.number),

  /**
   * Callback when a Tree item expands or collapse.
   */
  onNodeToggle: PropTypes.func,

  /**
   * Callback when Tree item(s) selected.
   */
  onNodeSelect: PropTypes.func,

  /**
   * Callback when a Tree item checkbox is selected.
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
      dragIcon,
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
    const nodes = useRef({})
    const expandedProp = useRef([])
    const [focusNodeId, setFocusNodeId] = useState<number>()
    const [nodesExpanded, setNodeExpanded] = useState<number[]>(
      [].concat(defaultExpanded)
    )
    const [nodesSelected, setNodeSelected] = useState<number[]>(
      [].concat(
        defaultSelected && defaultSelected.length > 1 && !multiSelectNode
          ? [defaultSelected[0]]
          : defaultSelected
      )
    )
    const [nodeCheckBoxSelected, setNodeCheckBoxSelected] = useState<number[]>(
      []
    )

    // Using expandedProp to track the changes in `expanded`API
    useEffect(() => {
      if (expanded !== undefined && expandedProp.current !== expanded) {
        expandedProp.current = expanded
        setNodeExpanded(expanded)
      }
    }, [expanded])

    // Tree view context
    // Actions
    const registerNode = useCallback((node: TreeItemExtended) => {
      nodes.current[node.id] = node
    }, [])

    const unRegisterNode = useCallback((nodeId: number) => {
      const newNodes = { ...nodes.current }
      delete newNodes[nodeId]
      nodes.current = newNodes
    }, [])

    const toggleExpansion = useCallback((event: any, nodeId: number) => {
      let newExpanded = []
      setNodeExpanded(prevState => {
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

    const toggleNodeSelection = useCallback((event: any, nodeId: number) => {
      // TODO: implement shift + click, ctrl + click for multi selection on node

      const multiple =
        multiSelectNode && (event.shiftKey || event.ctrlKey || event.metaKey)
      handleSelection(event, nodeId, setNodeSelected, onNodeSelect, multiple)
    }, [])

    const toggleSingleCheckBoxSelection = useCallback(
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

    const toggleMultiCheckBoxSelection = useCallback(
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

    const focusNode = useCallback(
      (event: any, nodeId: number, tabKey = false) => {
        setFocusNodeId(nodeId)
        // event.stopPropagation()
      },
      []
    )

    // Verifiers
    const isExpanded = useCallback(
      (nodeId: number) =>
        Array.isArray(nodesExpanded)
          ? nodesExpanded.indexOf(nodeId) !== -1
          : false,
      [nodesExpanded]
    )

    const isNodeSelected = useCallback(
      (nodeId: number) => {
        return nodesSelected.indexOf(nodeId) !== -1
      },
      [nodesSelected]
    )

    const isCheckBoxSelected = useCallback(
      (nodeId: number) =>
        Array.isArray(nodeCheckBoxSelected)
          ? nodeCheckBoxSelected.indexOf(nodeId) !== -1
          : nodeCheckBoxSelected === nodeId,
      [nodeCheckBoxSelected]
    )

    const isIndeterminate = useCallback(
      (nodeId: number) => {
        const childNodes = getChildrenIds(getNodesArray(), nodeId)
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

    const isNodeInFocus = useCallback(
      (nodeId: number) => {
        return focusNodeId === nodeId
      },
      [focusNodeId]
    )

    const isNodeDisabled = useCallback(
      (nodeId: number) => {
        return nodes.current[nodeId] ? nodes.current[nodeId].disabled : false
      },
      [nodes]
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
      setStatefn: (value: React.SetStateAction<number[]>) => void,
      recursive = false
    ): number[] => {
      let newSelected = []

      setStatefn(prevState => {
        const oldSelected = prevState || []

        if (recursive) {
          const array = getNodesArray()
          const childNodes = getChildrenIds(array, value)
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
          }
        } else {
          if (oldSelected.includes(value))
            newSelected = oldSelected.filter(id => id !== value)
          else newSelected = oldSelected.concat(value)
        }

        return newSelected
      })

      return newSelected
    }

    const handleSingleSelect = (
      value,
      setStatefn: (value: React.SetStateAction<number[]>) => void
    ): number[] => {
      let selection = []
      setStatefn(prevState => {
        selection = prevState && prevState.includes(value) ? [] : [value]
        return selection
      })
      return selection
    }

    /**
     * Issue with using on :focus css style on elements, we really need to show the focus style only when tab key is used to focus the elements
     * but then when mouse click focus css should not apply
     * how to do it !?
     */
    const handleKeyDown = (event, enterKeyPressAction) => {
      let flag = false
      const key = event.key

      // If the tree is empty there will be no focused node
      if (
        event.altKey ||
        event.currentTarget !== event.target ||
        !focusNodeId
      ) {
        return
      }

      switch (key) {
        case " ":
          toggleExpansion(event, focusNodeId)
          flag = true
          break
        case "Enter":
          enterKeyPressAction()
          event.stopPropagation()
          break
        case "ArrowDown":
          const nextNode = getNextNavigatableNode(focusNodeId)
          if (
            multiSelectNode &&
            event.shiftKey &&
            isNodeSelected(focusNodeId)
          ) {
            // deselect if going back to the selected node
            if (isNodeSelected(nextNode))
              toggleNodeSelection(event, focusNodeId)
            else toggleNodeSelection(event, nextNode)
          }

          focusNode(event, nextNode)
          flag = true
          break
        case "ArrowUp":
          const nodePrevious = getPreviousNavigatableNode(focusNodeId)
          if (
            multiSelectNode &&
            event.shiftKey &&
            isNodeSelected(focusNodeId)
          ) {
            // deselect if going back to the selected node
            if (isNodeSelected(nodePrevious))
              toggleNodeSelection(event, focusNodeId)
            else toggleNodeSelection(event, nodePrevious)
          }

          focusNode(event, nodePrevious)
          flag = true
          break
        case "ArrowRight":
          if (!isExpanded(focusNodeId)) toggleExpansion(event, focusNodeId)
          break
        case "ArrowLeft":
          if (isExpanded(focusNodeId)) toggleExpansion(event, focusNodeId)
          break

        default:
      }

      if (flag) {
        event.preventDefault()
        event.stopPropagation()
      }
    }

    // Helpers
    const getNodesArray = () =>
      Object.keys(nodes.current).map(key => {
        return nodes.current[key]
      }) as TreeItem[]

    const getChildrenIds = (
      array: TreeItem[],
      nodeId: number,
      recursive = true
    ): number[] => {
      return array.reduce((r, { id, parentId }) => {
        if (parentId === nodeId) {
          r.push(id, ...(recursive ? getChildrenIds(array, id) : []))
        }
        return r
      }, [])
    }

    const getImmediateChildrenIds = id =>
      Object.keys(nodes.current)
        .map(key => {
          return nodes.current[key]
        })
        .filter(node => node.parentId === id)
        .sort((a, b) => a.index - b.index)
        .map(child => child.id)

    const getParents = (nodeId: number): number[] => {
      let { parentId } = nodes.current[nodeId]
      let parents = []
      while (parentId != null) {
        parents.push(parentId)
        parentId = nodes.current[parentId].parentId
      }

      return parents
    }

    const getNavigableChildrenIds = id => {
      let childrenIds = getImmediateChildrenIds(id)
      childrenIds = childrenIds.filter(node => !isNodeDisabled(node))
      return childrenIds
    }

    const getNextNavigatableNode = id => {
      // If expanded get first child
      if (isExpanded(id) && getNavigableChildrenIds(id).length > 0) {
        return getNavigableChildrenIds(id)[0]
      }

      let node = nodes.current[id]
      while (node != null) {
        // Try to get next sibling
        const siblings = getNavigableChildrenIds(node.parentId)
        const nextSibling = siblings[siblings.indexOf(node.id) + 1]

        if (nextSibling) {
          return nextSibling
        }

        // If the sibling does not exist, go up a level to the parent and try again.
        node = nodes.current[node.parentId]
      }

      return id
    }

    const getPreviousNavigatableNode = id => {
      const node = nodes.current[id]
      const siblings = getNavigableChildrenIds(node.parentId)
      const nodeIndex = siblings.indexOf(id)

      if (nodeIndex === 0) {
        return node.parentId || id
      }

      let currentNode = siblings[nodeIndex - 1]
      while (
        isExpanded(currentNode) &&
        getNavigableChildrenIds(currentNode).length > 0
      ) {
        currentNode = getNavigableChildrenIds(currentNode).pop()
      }

      return currentNode
    }

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
          isNodeInFocus,
          toggleExpansion,
          toggleNodeSelection,
          toggleSingleCheckBoxSelection,
          toggleMultiCheckBoxSelection,
          onKeyPress: handleKeyDown,
          focusNode,
          checkBoxSelection: checkBoxSelection || multiSelectCheckBox,
          multiSelectCheckBox,
          multiSelectNode,
          collapseIcon,
          expandIcon,
          itemIcon,
          dragIcon,
        }}
      >
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
      </TreeViewContext.Provider>
    )
  }
)

TreeView.propTypes = propTypes
TreeView.displayName = "TreeView"

export default TreeView
