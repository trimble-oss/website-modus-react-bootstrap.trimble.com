import * as React from "react"
import PropTypes from "prop-types"
import { TreeItem } from "./types"

// TODO:
// interface TreeViewItemContextProps {
//   parentId: number
//   level: number
//   descendants: Array<TreeItem>
//   registerDescendant: (descendant: TreeItem) => void
//   unregisterDescendant: (descendant: TreeItem) => void
// }
// export const TreeViewItemContext = React.createContext<TreeViewItemContextProps>(null)

// interface TreeViewItemContextProviderProps
//   extends React.PropsWithChildren<any> {
//   nodeId?: number
//   level?: number
//   onDescendantsChanged?: (descendants: TreeItem[]) => void
// }

// const TreeViewItemContextProvider = ({
//   children,
//   nodeId,
//   level,
//   onDescendantsChanged,
//   ...props
// }: TreeViewItemContextProviderProps) => {
//   const descendants = React.useRef({})

//   const registerDescendant = React.useCallback((node: TreeItem) => {
//     node.parentId = nodeId
//     descendants.current[node.id] = node
//     onDescendantsChanged(descendants.current)
//   }, [])

//   const unregisterDescendant = React.useCallback((node: TreeItem) => {
//     delete descendants.current[node.id]
//     onDescendantsChanged(descendants.current)
//   }, [])

//   return (
//     <TreeViewItemContext.Provider
//       value={{
//         level,
//         registerDescendant,
//         unregisterDescendant,
//         parentId: nodeId,
//         descendants: descendants.current,
//       }}
//     >
//       {children}
//     </TreeViewItemContext.Provider>
//   )
// }

// export default TreeViewItemContextProvider

const TreeViewItemContext =
  React.createContext<{ parentId: number | null; level: number }>(null)
export default TreeViewItemContext
