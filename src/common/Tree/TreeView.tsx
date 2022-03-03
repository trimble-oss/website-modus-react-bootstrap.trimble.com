import React from "react"
import PropTypes from "prop-types"
import TreeViewContext from "./TreeViewContext"
import { TreeItem } from "./types"
import TreeViewItemContext from "./TreeViewItemContext"
import classNames from "classnames"

export interface TreeViewProps extends React.HTMLProps<HTMLUListElement> {
  id: string
  collapseIcon?: React.ReactElement
  expandIcon?: React.ReactElement
  itemIcon?: React.ReactElement
  checkBoxSelection?: boolean
  multiSelectNode?: boolean
  multiSelectCheckBox?: boolean
  defaultExpanded?: number[]
  defaultSelected?: number[]
  onNodeToggle?: (expanded: number[]) => void
  onNodeSelect?: (selected: number[]) => void
  onCheckBoxSelect?: (selected: number[]) => void
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
      className,
      children,
      ...props
    },
    ref
  ) => {
    const nodes = React.useRef({})
    const [expanded, setExpanded] = React.useState<number[]>(
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

    React.useEffect(() => {
      if (onNodeSelect) {
        onNodeSelect(nodesSelected)
      }
    }, [nodesSelected])

    React.useEffect(() => {
      if (onNodeToggle) {
        onNodeToggle(expanded)
      }
    }, [expanded])

    React.useEffect(() => {
      if (onCheckBoxSelect) {
        onNodeSelect(nodeCheckBoxSelected)
      }
    }, [nodeCheckBoxSelected])

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

    const toggleNodeSelection = React.useCallback(
      (event: any, nodeId: number) => {
        // TODO: implement shift + click, ctrl + click for multi selection on node
        handleSelection(event, nodeId, setNodeSelected, false)
      },
      []
    )

    const toggleCheckBoxSelection = React.useCallback(
      (event: any, nodeId: number) => {
        handleSelection(
          event,
          nodeId,
          setNodeCheckBoxSelected,
          multiSelectCheckBox
        )
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

    // Verifiers
    const isExpanded = React.useCallback(
      (nodeId: number) =>
        Array.isArray(expanded) ? expanded.indexOf(nodeId) !== -1 : false,
      [expanded]
    )

    const isNodeSelected = React.useCallback(
      (nodeId: number) =>
        Array.isArray(nodesSelected)
          ? nodesSelected.indexOf(nodeId) !== -1
          : nodesSelected === nodeId,
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
      setCallBackfn: (value: React.SetStateAction<number[]>) => void,
      multiple = false
    ) => {
      if (multiple) {
        handleMultipleSelect(event, nodeId, setCallBackfn)
      } else {
        handleSingleSelect(event, nodeId, setCallBackfn)
      }
    }

    const handleMultipleSelect = (
      event,
      value,
      setCallBackfn: (value: React.SetStateAction<number[]>) => void
    ) => {
      let newSelected

      setCallBackfn(prevState => {
        const array = getNodesArray()
        const childNodes = getChildren(array, value)

        // unselect parents and children
        if (prevState.indexOf(value) !== -1) {
          const parents = getParents(value)
          let filtered = prevState.filter(
            id =>
              childNodes.indexOf(id) < 0 &&
              id !== value &&
              parents.indexOf(id) < 0
          )

          newSelected = filtered
        }
        // select children and parents with all child nodes selected
        else {
          let filtered = prevState.filter(id => childNodes.indexOf(id) < 0)
          newSelected = filtered.concat([value], childNodes)

          // let parentId = nodes[value].parentId
          // while(parentId){
          //   let siblings = getChildren
          // }
        }

        return newSelected
      })
    }

    const handleSingleSelect = (
      event,
      value,
      setCallBackfn: (value: React.SetStateAction<number[]>) => void
    ) => {
      const newSelected = [value]

      setCallBackfn(prevState => {
        return newSelected
      })
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
          toggleCheckBoxSelection,
          checkBoxSelection: checkBoxSelection || multiSelectCheckBox,
          multiSelectCheckBox,
          multiSelectNode,
          collapseIcon,
          expandIcon,
          itemIcon,
        }}
      >
        <TreeViewItemContext.Provider value={{ parentId: null, level: 1 }}>
          <ul
            className={classNames("list-group", className)}
            {...props}
            id={id}
            ref={ref}
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
