/** Credit:
 *  https://github.com/reach/reach-ui/blob/86a046f54d53b6420e392b3fa56dd991d9d4e458/packages/descendants/README.md
 *  Modified to suit our purposes.
 *
 */

import React, {
  useState,
  useContext,
  useRef,
  useCallback,
  useEffect,
} from "react"
import TreeViewItemContext from "./TreeViewItemContext"
import { TreeItem, TreeItemExtended } from "./types"
import _findIndex from "lodash/findIndex"
import _every from "lodash/every"
import _merge from "lodash/merge"

export function useDescendant(
  nodeId,
  element,
  isCheckBoxSelected,
  toggleMultiCheckBoxSelection
) {
  const childNodes = useRef<TreeItemExtended[]>([])
  const {
    parentId,
    level,
    registerDescendant: registerOnParent,
    unRegisterDescendant: unRegisterOnParent,
    updateDescendant: updateParent,
    onDescendantToggleCbSelection: onDescendantToggleCbSelectionOnParent,
  } = useContext(TreeViewItemContext)
  const isRegisteredRef = useRef(false)

  useEffect(() => {
    if (registerOnParent && element) {
      isRegisteredRef.current = true
      registerOnParent(nodeId, childNodes.current, element)
    }

    return () => {
      unRegisterOnParent && unRegisterOnParent(nodeId)
    }
  }, [registerOnParent, unRegisterOnParent, element])

  const getChildNodes = useCallback(() => {
    return childNodes.current
  }, [childNodes])
  const setChildNodes = useCallback(
    data => {
      childNodes.current = data
    },
    [childNodes]
  )

  function binaryFindElement(array, element) {
    let start = 0
    let end = array.length - 1

    while (start <= end) {
      const middle = Math.floor((start + end) / 2)

      if (array[middle].element === element) {
        return middle
      }

      // eslint-disable-next-line no-bitwise

      if (
        array[middle].element &&
        array[middle].element.compareDocumentPosition(element) &
          Node.DOCUMENT_POSITION_PRECEDING
      ) {
        end = middle - 1
      } else {
        start = middle + 1
      }
    }

    return start
  }

  const registerDescendant = useCallback(
    (id, children, descendantElement) => {
      if (childNodes.current) {
        let newItems = childNodes.current
        let oldIndex = _findIndex(childNodes.current, node => node.id === id)

        // new index based on DOM position

        let newIndex =
          binaryFindElement(childNodes.current, descendantElement) ||
          childNodes.current.length

        // If the descendant already exist, delete it and insert at the new index
        if (oldIndex >= 0) {
          childNodes.current.splice(oldIndex, 1)
          childNodes.current.splice(newIndex, 0, {
            ...childNodes.current[oldIndex],
            id,
            children,
          })
        } else {
          childNodes.current.push({
            id,
            children,
            parentId: nodeId,
            index: newIndex,
            element: descendantElement,
          })
        }
        newItems.forEach((item, position) => {
          item.index = position
        })
        childNodes.current = newItems

        if (updateParent && isRegisteredRef.current) {
          updateParent(nodeId, childNodes.current, element)
        }
      }
    },
    [childNodes, nodeId, updateParent]
  )

  const unRegisterDescendant = useCallback(
    id => {
      if (childNodes.current) {
        childNodes.current = childNodes.current.filter(node => node.id !== id)
        childNodes.current.forEach((item, position) => {
          item.index = position
        })
      }
    },
    [childNodes]
  )

  const updateDescendant = useCallback(
    (id, children, descendantElement) => {
      if (childNodes.current) {
        let nodeIndex = _findIndex(childNodes.current, node => node.id === id)
        if (nodeIndex >= 0) {
          childNodes.current.splice(nodeIndex, 1, {
            ...childNodes.current[nodeIndex],
            id,
            children,
          })
        } else {
          childNodes.current.push({
            id,
            parentId: nodeId,
            children,
            element: descendantElement,
            index: childNodes.current.length,
          })
        }
        if (updateParent && isRegisteredRef.current) {
          updateParent(nodeId, childNodes.current, element)
        }
      }
    },
    [childNodes, nodeId, updateParent]
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
