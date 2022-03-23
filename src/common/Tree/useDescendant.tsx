import React, {
  useState,
  useContext,
  useRef,
  useCallback,
  useEffect,
} from "react"
import TreeViewItemContext from "./TreeViewItemContext"
import { TreeItem } from "./types"
import _findIndex from "lodash/findIndex"
import _every from "lodash/every"
import _merge from "lodash/merge"

export function useDescendant(
  nodeId,
  isCheckBoxSelected,
  toggleMultiCheckBoxSelection
) {
  const childNodes = useRef<TreeItem[]>([])
  const {
    parentId,
    level,
    registerDescendant: registerDescendantOnParent,
    unRegisterDescendant: unRegisterDescendantOnParent,
    updateDescendant: updateDescendantOnParent,
    onDescendantToggleCbSelection: onDescendantToggleCbSelectionOnParent,
  } = useContext(TreeViewItemContext)

  useEffect(() => {
    registerDescendantOnParent &&
      registerDescendantOnParent(nodeId, childNodes.current)

    return () => {
      unRegisterDescendantOnParent && unRegisterDescendantOnParent(nodeId)
    }
  }, [registerDescendantOnParent, unRegisterDescendantOnParent])

  const getChildNodes = useCallback(() => {
    return childNodes.current
  }, [childNodes])
  const setChildNodes = useCallback(
    data => {
      childNodes.current = data
    },
    [childNodes]
  )

  const registerDescendant = useCallback(
    (id, children, index?: number) => {
      if (childNodes.current) {
        let nodeIndex = _findIndex(childNodes.current, node => node.id === id)
        if (nodeIndex >= 0) {
          if (index) {
            childNodes.current.splice(nodeIndex, 1)
            childNodes.current.splice(index, 0, {
              ...childNodes.current[nodeIndex],
              id,
              children,
            })
          } else {
            childNodes.current.splice(nodeIndex, 1, {
              ...childNodes.current[nodeIndex],
              id,
              children,
            })
          }
        } else {
          childNodes.current.push({ id, children, parentId: nodeId })
        }

        updateDescendantOnParent &&
          updateDescendantOnParent(nodeId, childNodes.current)
      }
    },
    [childNodes, nodeId, updateDescendantOnParent]
  )

  const unRegisterDescendant = useCallback(
    id => {
      if (childNodes.current) {
        childNodes.current = childNodes.current.filter(node => node.id !== id)
      }
    },
    [childNodes]
  )

  const updateDescendant = useCallback(
    (id, children) => {
      if (childNodes.current) {
        let nodeIndex = _findIndex(childNodes.current, node => node.id === id)
        if (nodeIndex >= 0) {
          childNodes.current.splice(nodeIndex, 1, {
            ...childNodes.current[nodeIndex],
            id,
            children,
          })
        } else {
          childNodes.current.push({ id, parentId: nodeId, children })
        }

        // update also the parent
        updateDescendantOnParent &&
          updateDescendantOnParent(nodeId, childNodes.current)
      }
    },
    [childNodes, nodeId, updateDescendantOnParent]
  )

  const onDescendantToggleCbSelection = useCallback(
    (event, descendantId, checkedArray, uncheckedArray) => {
      if (childNodes.current) {
        const childNodesFiltered = childNodes.current
          .map(node => node.id)
          .filter(id => id !== descendantId)

        let finalCheckedArray = [...checkedArray]
        let finalUnCheckedArray = [...uncheckedArray]
        childNodesFiltered.forEach(id => {
          if (isCheckBoxSelected(id)) finalCheckedArray.push(id)
          else finalUnCheckedArray.push(id)
        })

        // decides whether current node should be in the checked array or unchecked array
        if (finalUnCheckedArray.length > 0) finalUnCheckedArray.push(nodeId)
        else finalCheckedArray.push(nodeId)

        onDescendantToggleCbSelectionOnParent
          ? onDescendantToggleCbSelectionOnParent(
              event,
              nodeId,
              finalCheckedArray,
              finalUnCheckedArray
            )
          : toggleMultiCheckBoxSelection(
              event,
              finalCheckedArray,
              finalUnCheckedArray
            )
      }
    },
    [
      childNodes,
      nodeId,
      isCheckBoxSelected,
      onDescendantToggleCbSelectionOnParent,
      toggleMultiCheckBoxSelection,
    ]
  )

  return {
    parentId,
    level,
    getChildNodes,
    setChildNodes,
    registerDescendant,
    unRegisterDescendant,
    updateDescendant,
    onDescendantToggleCbSelection,
    onDescendantToggleCbSelectionOnParent,
  }
}
