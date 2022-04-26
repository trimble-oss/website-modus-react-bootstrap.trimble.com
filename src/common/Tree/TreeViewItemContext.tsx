import * as React from "react"
import PropTypes from "prop-types"
import { TreeItem, TreeItemExtended } from "./types"

interface TreeViewItemContextProps {
  parentId?: number
  level: number
  registerDescendant?: (
    id: number,
    children: TreeItemExtended[],
    element: any,
    index?: number
  ) => void
  unRegisterDescendant?: (id: number) => void
  updateDescendant?: (
    id: number,
    children: TreeItemExtended[],
    element: any
  ) => void
  onDescendantToggleCbSelection?: (
    event: any,
    id: number,
    selected: number[],
    unselected: number[]
  ) => void
}
const TreeViewItemContext = React.createContext<TreeViewItemContextProps>(null)
export default TreeViewItemContext
