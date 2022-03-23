import * as React from "react"
import PropTypes, { number } from "prop-types"
import { TreeItem } from "./types"
import _findIndex from "lodash/findIndex"
import _every from "lodash/every"
import _merge from "lodash/merge"

/*!
 *  Material-ui
 *  https://github.com/mui/material-ui/blob/master/packages/mui-lab/src/TreeView/descendants.js
 *  Copyright (c) 2014 Call-Em-All
 *  Licensed under MIT (https://github.com/mui/material-ui/blob/master/LICENSE)
 *
 *  Modified according to our requirements
 */

// To replace with .findIndex() once we stop IE11 support.
// function findIndex(array, comp) {
//   for (let i = 0; i < array.length; i += 1) {
//     if (comp(array[i])) {
//       return i
//     }
//   }

//   return -1
// }

// function binaryFindElement(array, element) {
//   let start = 0
//   let end = array.length - 1

//   while (start <= end) {
//     const middle = Math.floor((start + end) / 2)

//     if (array[middle].element === element) {
//       return middle
//     }

//     // eslint-disable-next-line no-bitwise
//     if (
//       array[middle].element.compareDocumentPosition(element) &
//       Node.DOCUMENT_POSITION_PRECEDING
//     ) {
//       end = middle - 1
//     } else {
//       start = middle + 1
//     }
//   }

//   return start
// }

interface DescendantContextProps {
  parentId?: number
  level: number
  registerDescendant?: (
    id: number,
    children: TreeItem[],
    index?: number
  ) => void
  unRegisterDescendant?: (id: number) => void
  updateDescendant?: (id: number, children: TreeItem[]) => void
  onDescendantToggleCbSelection?: (
    event: any,
    id: number,
    selected: number[],
    unselected: number[]
  ) => void
}
const DescendantContext = React.createContext<DescendantContextProps>(null)

const noop = () => {}

// export function useDescendant(descendant) {
//   const [, forceUpdate] = React.useState(0)
//   const {
//     registerDescendant,
//     unregisterDescendant,
//     descendants,
//     parentId,
//     level: parentLevel,
//   } = React.useContext(DescendantContext)

//   // This will initially return -1 because we haven't registered the descendant
//   // on the first render. After we register, this will then return the correct
//   // index on the following render and we will re-register descendants
//   // so that everything is up-to-date before the user interacts with a
//   // collection.
//   const index = findIndex(
//     descendants,
//     item => item.element === descendant.element
//   )

//   const previousDescendants = usePrevious(descendants)

//   // We also need to re-register descendants any time ANY of the other
//   // descendants have changed. My brain was melting when I wrote this and it
//   // feels a little off, but checking in render and using the result in the
//   // effect's dependency array works well enough.
//   const someDescendantsHaveChanged = descendants.some(
//     (newDescendant, position) => {
//       return (
//         previousDescendants &&
//         previousDescendants[position] &&
//         previousDescendants[position].element !== newDescendant.element
//       )
//     }
//   )

//   // Prevent any flashing
//   React.useEffect(() => {
//     if (descendant.element) {
//       registerDescendant({
//         ...descendant,
//         index,
//       })
//       return () => {
//         unregisterDescendant(descendant.element)
//       }
//     }
//     forceUpdate(1)

//     return undefined
//   }, [
//     registerDescendant,
//     unregisterDescendant,
//     index,
//     someDescendantsHaveChanged,
//     descendant,
//   ])

//   return { parentId, index, parentLevel }
// }

interface DescendantProviderProps {
  level: number
  nodeId?: number
  onToggleMultiCheckBoxSelection?: (
    event: any,
    selected?: number[],
    unselected?: number[]
  ) => void
}
const DescendantProvider: React.FunctionComponent<DescendantProviderProps> = ({
  nodeId,
  level,
  onToggleMultiCheckBoxSelection,
  children,
  ...props
}) => {
  const childNodes = React.useRef<TreeItem[]>([])

  const registerDescendant = React.useCallback(
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

      console.log(
        `Node ${nodeId} children after added: ${
          childNodes.current && childNodes.current.map(i => i.id).toString()
        }`
      )
    },
    [nodeId, updateDescendantOnParent]
  )

  const unRegisterDescendant = React.useCallback(id => {
    if (childNodes.current) {
      childNodes.current = childNodes.current.filter(node => node.id !== id)
    }

    console.log(
      `Node ${nodeId} children after added: ${
        childNodes.current && childNodes.current.map(i => i.id).toString()
      }`
    )
  }, [])

  const updateDescendant = React.useCallback(
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

      console.log(
        `Node ${nodeId} children after updated: ${
          childNodes.current && childNodes.current.map(i => i.id).toString()
        }`
      )
    },
    [updateDescendantOnParent]
  )

  const onDescendantToggleCbSelection = React.useCallback(
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
      nodeId,
      isCheckBoxSelected,
      toggleMultiCheckBoxSelection,
      onDescendantToggleCbSelectionOnParent,
    ]
  )

  const value = React.useMemo(
    () => ({
      descendants: items,
      registerDescendant,
      unregisterDescendant,
      parentId: id,
      level,
    }),
    [items, registerDescendant, unregisterDescendant, id, level]
  )

  return (
    <DescendantContext.Provider value={value}>
      {children}
    </DescendantContext.Provider>
  )
}

DescendantProvider.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
  level: PropTypes.number,
}
