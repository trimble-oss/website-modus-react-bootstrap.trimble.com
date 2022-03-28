import * as React from "react"
import PropTypes from "prop-types"
import { TreeItem } from "./types"

interface TreeViewItemContextProps {
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
const TreeViewItemContext = React.createContext<TreeViewItemContextProps>(null)
export default TreeViewItemContext
